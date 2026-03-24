/**
 * RevealWaveImage - Vanilla JS version
 * Creates a Three.js canvas with wave distortion and mouse reveal effects
 */

class RevealWaveImage {
    constructor(containerId, imageSrc, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container with id "${containerId}" not found`);
            return;
        }

        this.imageSrc = imageSrc;
        this.options = {
            revealRadius: options.revealRadius || 0.2,
            revealSoftness: options.revealSoftness || 0.5,
            pixelSize: options.pixelSize || 3,
            waveSpeed: options.waveSpeed || 0.5,
            waveFrequency: options.waveFrequency || 3.0,
            waveAmplitude: options.waveAmplitude || 0.2,
            mouseRadius: options.mouseRadius || 0.2,
        };

        this.mouse = new THREE.Vector2(-10, -10);
        this.mouseActive = 0;
        this.isMouseInCanvas = false;
        this.hasEntered = false;

        this.init();
    }

    init() {
        console.log('RevealWaveImage: Initializing...');
        console.log('Container:', this.container);
        console.log('Image source:', this.imageSrc);
        
        // Create canvas element
        this.canvas = document.createElement('canvas');
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.display = 'block';
        this.container.appendChild(this.canvas);

        // Setup Three.js
        this.setupThree();
        this.loadTexture();
        this.setupEventListeners();
        this.animate();
    }

    setupThree() {
        console.log('Setting up Three.js renderer...');
        
        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = null; // Transparent background

        // Camera (create before renderer.setSize)
        this.camera = new THREE.PerspectiveCamera(75, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
        this.camera.position.z = 1;

        console.log('Camera position:', this.camera.position);
        
        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: false,
            alpha: true
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.updateSize();

        console.log('Renderer size:', this.renderer.getSize(new THREE.Vector2()));

        // Clock
        this.clock = new THREE.Clock();
    }

    loadTexture() {
        const loader = new THREE.TextureLoader();
        console.log('Loading texture from:', this.imageSrc);
        
        loader.load(
            this.imageSrc,
            (texture) => {
                console.log('Texture loaded successfully:', texture);
                this.texture = texture;
                const img = texture.image;
                this.aspectRatio = img.naturalWidth / img.naturalHeight;
                console.log('Image dimensions:', img.naturalWidth, 'x', img.naturalHeight);
                console.log('Aspect ratio:', this.aspectRatio);
                this.createMesh();
            },
            undefined,
            (error) => {
                console.error('Error loading texture:', error);
                console.error('Image path:', this.imageSrc);
            }
        );
    }

    createMesh() {
        console.log('Creating mesh with texture:', this.texture);
        
        const vertexShader = `
            varying vec2 vUv;
            
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `;

        const fragmentShader = `
            precision highp float;
            
            uniform sampler2D uTexture;
            uniform float uTime;
            uniform vec2 uMouse;
            uniform float uRevealRadius;
            uniform float uRevealSoftness;
            uniform float uPixelSize;
            uniform float uMouseActive;
            
            uniform float uWaveSpeed;
            uniform float uWaveFrequency;
            uniform float uWaveAmplitude;
            uniform float uMouseRadius;
            
            varying vec2 vUv;
            
            // Bayer 4x4 dithering pattern
            float bayer4x4(vec2 pos) {
                int x = int(mod(pos.x, 4.0));
                int y = int(mod(pos.y, 4.0));
                int index = x + y * 4;
                
                float pattern[16];
                pattern[0] = 0.0;    pattern[1] = 8.0;    pattern[2] = 2.0;    pattern[3] = 10.0;
                pattern[4] = 12.0;   pattern[5] = 4.0;    pattern[6] = 14.0;   pattern[7] = 6.0;
                pattern[8] = 3.0;    pattern[9] = 11.0;   pattern[10] = 1.0;   pattern[11] = 9.0;
                pattern[12] = 15.0;  pattern[13] = 7.0;   pattern[14] = 13.0;  pattern[15] = 5.0;
                
                for (int i = 0; i < 16; i++) {
                    if (i == index) return pattern[i] / 16.0;
                }
                return 0.0;
            }
            
            void main() {
                vec2 uv = vUv;
                
                // Wave and Ripple Distortions
                float time = uTime;
                float waveStrength = uWaveAmplitude * 0.1;
                
                // Continuous waves
                float wave1 = sin(uv.y * uWaveFrequency + time * uWaveSpeed) * waveStrength;
                float wave2 = sin(uv.x * uWaveFrequency * 0.7 + time * uWaveSpeed * 0.8) * waveStrength * 0.5;
                
                vec2 distortedUv = uv;
                distortedUv.x += wave1;
                distortedUv.y += wave2;
                
                // Mouse interaction (Ripple)
                if (uMouseActive > 0.01) {
                    vec2 mousePos = uMouse;
                    float dist = distance(uv, mousePos);
                    float mouseInfluence = smoothstep(uMouseRadius, 0.0, dist);
                    
                    float rippleFreq = uWaveFrequency * 5.0;
                    float rippleSpeed = uWaveSpeed * 1.0;
                    float rippleStrength = uWaveAmplitude * 0.05;
                    
                    float ripple = sin(dist * rippleFreq - time * rippleSpeed) * rippleStrength * mouseInfluence * uMouseActive;
                    distortedUv.x += ripple;
                    distortedUv.y += ripple;
                }
                
                // Sampling and Color Logic
                vec4 color = texture2D(uTexture, distortedUv);
                
                // Grayscale conversion
                float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
                
                // Dithering
                vec2 pixelCoord = floor(gl_FragCoord.xy / uPixelSize);
                float dither = bayer4x4(pixelCoord);
                
                // 2-level quantization
                float quantized;
                float adjusted = gray + (dither - 0.5) * 0.5;
                if (adjusted < 0.33) {
                    quantized = 0.0;
                } else if (adjusted < 0.66) {
                    quantized = 0.5;
                } else {
                    quantized = 1.0;
                }
                vec3 bwColor = vec3(quantized);
                
                // Reveal Flashlight
                float revealDist = distance(uv, uMouse);
                float innerRadius = uRevealRadius * (1.0 - uRevealSoftness);
                float outerRadius = uRevealRadius;
                float revealAmount = 1.0 - smoothstep(innerRadius, outerRadius, revealDist);
                revealAmount *= uMouseActive;
                
                vec3 finalColor = mix(bwColor, color.rgb, revealAmount);
                
                gl_FragColor = vec4(finalColor, color.a);
            }
        `;

        this.uniforms = {
            uTexture: { value: this.texture },
            uTime: { value: 0 },
            uMouse: { value: this.mouse },
            uRevealRadius: { value: this.options.revealRadius },
            uRevealSoftness: { value: this.options.revealSoftness },
            uPixelSize: { value: this.options.pixelSize },
            uMouseActive: { value: 0 },
            uWaveSpeed: { value: this.options.waveSpeed },
            uWaveFrequency: { value: this.options.waveFrequency },
            uWaveAmplitude: { value: this.options.waveAmplitude },
            uMouseRadius: { value: this.options.mouseRadius },
        };

        const geometry = new THREE.PlaneGeometry(2, 2);
        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: this.uniforms,
        });

        // Check for shader compilation errors
        material.needsUpdate = true;
        
        this.mesh = new THREE.Mesh(geometry, material);

        // Scale to cover (like object-fit: cover) - no black bars
        const containerAspect = this.container.clientWidth / this.container.clientHeight;
        
        if (this.aspectRatio > containerAspect) {
            // Image is wider than container - fit height, scale width
            const scale = this.aspectRatio / containerAspect;
            this.mesh.scale.set(scale, 1, 1);
        } else {
            // Image is taller than container - fit width, scale height
            const scale = containerAspect / this.aspectRatio;
            this.mesh.scale.set(1, scale, 1);
        }

        this.scene.add(this.mesh);
        console.log('Mesh created and added to scene');
        console.log('Mesh scale:', this.mesh.scale);
        console.log('Container aspect:', containerAspect, 'Image aspect:', this.aspectRatio);
    }

    setupEventListeners() {
        // Mouse move
        this.container.addEventListener('mousemove', (e) => {
            const rect = this.container.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            
            this.mouse.set((x + 1) / 2, (y + 1) / 2);
        });

        // Mouse enter/leave
        this.container.addEventListener('mouseenter', () => {
            this.isMouseInCanvas = true;
            this.hasEntered = true;
        });

        this.container.addEventListener('mouseleave', () => {
            this.isMouseInCanvas = false;
        });

        // Resize
        window.addEventListener('resize', () => this.updateSize());
    }

    updateSize() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        
        console.log('=== UPDATE SIZE DEBUG ===');
        console.log('Container element:', this.container);
        console.log('Container clientWidth:', width);
        console.log('Container clientHeight:', height);
        console.log('Container offsetWidth:', this.container.offsetWidth);
        console.log('Container offsetHeight:', this.container.offsetHeight);
        console.log('Container getBoundingClientRect:', this.container.getBoundingClientRect());
        console.log('Window innerWidth:', window.innerWidth);
        console.log('Window innerHeight:', window.innerHeight);
        
        // Check parent constraints
        let parent = this.container.parentElement;
        let level = 0;
        while (parent && level < 5) {
            console.log(`Parent ${level}:`, parent.tagName, parent.className);
            console.log(`  - clientWidth: ${parent.clientWidth}, offsetWidth: ${parent.offsetWidth}`);
            console.log(`  - computed width:`, window.getComputedStyle(parent).width);
            console.log(`  - computed max-width:`, window.getComputedStyle(parent).maxWidth);
            parent = parent.parentElement;
            level++;
        }
        console.log('========================');
        
        if (this.renderer) {
            this.renderer.setSize(width, height);
        }
        
        if (this.camera) {
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
        }
        
        // Update mesh scale on resize to maintain cover behavior
        if (this.mesh && this.aspectRatio) {
            const containerAspect = width / height;
            
            if (this.aspectRatio > containerAspect) {
                // Image is wider than container - fit height, scale width
                const scale = this.aspectRatio / containerAspect;
                this.mesh.scale.set(scale, 1, 1);
            } else {
                // Image is taller than container - fit width, scale height
                const scale = containerAspect / this.aspectRatio;
                this.mesh.scale.set(1, scale, 1);
            }
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        if (!this.mesh) return;

        // Update time
        this.uniforms.uTime.value = this.clock.getElapsedTime();

        // Update mouse active with easing
        const targetActive = this.isMouseInCanvas ? 1 : 0;
        const easingSpeed = 0.08;
        this.mouseActive += (targetActive - this.mouseActive) * easingSpeed;
        this.uniforms.uMouseActive.value = this.mouseActive;

        // Render
        this.renderer.render(this.scene, this.camera);
    }

    destroy() {
        if (this.renderer) {
            this.renderer.dispose();
        }
        if (this.mesh) {
            this.mesh.geometry.dispose();
            this.mesh.material.dispose();
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}


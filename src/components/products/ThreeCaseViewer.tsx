import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sparkles, ZoomIn } from 'lucide-react';

interface ThreeCaseViewerProps {
  textureUrl: string;
  colorHex?: string;
  className?: string;
  autoRotate?: boolean;
}

export const ThreeCaseViewer: React.FC<ThreeCaseViewerProps> = ({
  textureUrl,
  colorHex = '#F6DCE5',
  className = '',
  autoRotate = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.replaceChildren(renderer.domElement);

    // Group for the entire phone case
    const caseGroup = new THREE.Group();
    scene.add(caseGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfff5ea, 1.5);
    dirLight1.position.set(5, 8, 5);
    dirLight1.castShadow = true;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xdcd5ff, 0.8);
    dirLight2.position.set(-5, -3, 3);
    scene.add(dirLight2);

    const rimLight = new THREE.DirectionalLight(0xf6dce5, 1.0);
    rimLight.position.set(0, -6, -4);
    scene.add(rimLight);

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      textureUrl,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearFilter;
        texture.generateMipmaps = true;

        // Phone case back plate geometry
        // iPhone aspect ratio roughly 1 : 2
        const caseWidth = 2.4;
        const caseHeight = 4.8;
        const caseDepth = 0.28;

        // Rounded box shape or procedural phone case
        // Create main case body with rounded rectangle shape
        const shape = new THREE.Shape();
        const radius = 0.38;
        const x = -caseWidth / 2;
        const y = -caseHeight / 2;
        const w = caseWidth;
        const h = caseHeight;

        shape.moveTo(x + radius, y);
        shape.lineTo(x + w - radius, y);
        shape.quadraticCurveTo(x + w, y, x + w, y + radius);
        shape.lineTo(x + w, y + h - radius);
        shape.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
        shape.lineTo(x + radius, y + h);
        shape.quadraticCurveTo(x, y + h, x, y + h - radius);
        shape.lineTo(x, y + radius);
        shape.quadraticCurveTo(x, y, x + radius, y);

        const extrudeSettings = {
          depth: caseDepth,
          bevelEnabled: true,
          bevelSegments: 8,
          steps: 2,
          bevelSize: 0.08,
          bevelThickness: 0.08,
        };

        const caseGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        caseGeometry.center();

        // Material for bumper/frame
        const bumperMaterial = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(colorHex),
          roughness: 0.2,
          metalness: 0.1,
          clearcoat: 0.8,
          clearcoatRoughness: 0.15,
          transmission: 0.15, // slight acrylic jelly effect
          opacity: 0.98,
          transparent: true,
        });

        const caseMesh = new THREE.Mesh(caseGeometry, bumperMaterial);
        caseMesh.castShadow = true;
        caseMesh.receiveShadow = true;
        caseGroup.add(caseMesh);

        // Back Print Plane (Texture)
        const planeGeo = new THREE.PlaneGeometry(caseWidth - 0.12, caseHeight - 0.12);
        const printMaterial = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.25,
          metalness: 0.05,
        });

        const printMesh = new THREE.Mesh(planeGeo, printMaterial);
        printMesh.position.z = caseDepth / 2 + 0.081;
        caseGroup.add(printMesh);

        // Camera Bump Island (top-left)
        const bumpSize = 0.95;
        const bumpShape = new THREE.Shape();
        const bRadius = 0.2;
        const bx = -bumpSize / 2;
        const by = -bumpSize / 2;

        bumpShape.moveTo(bx + bRadius, by);
        bumpShape.lineTo(bx + bumpSize - bRadius, by);
        bumpShape.quadraticCurveTo(bx + bumpSize, by, bx + bumpSize, by + bRadius);
        bumpShape.lineTo(bx + bumpSize, by + bumpSize - bRadius);
        bumpShape.quadraticCurveTo(bx + bumpSize, by + bumpSize, bx + bumpSize - bRadius, by + bumpSize);
        bumpShape.lineTo(bx + bRadius, by + bumpSize);
        bumpShape.quadraticCurveTo(bx, by + bumpSize, bx, by + bumpSize - bRadius);
        bumpShape.lineTo(bx, by + bRadius);
        bumpShape.quadraticCurveTo(bx, by, bx + bRadius, by);

        const bumpGeometry = new THREE.ExtrudeGeometry(bumpShape, {
          depth: 0.12,
          bevelEnabled: true,
          bevelSegments: 4,
          bevelSize: 0.04,
          bevelThickness: 0.04,
        });
        bumpGeometry.center();

        const bumpMesh = new THREE.Mesh(bumpGeometry, bumperMaterial);
        bumpMesh.position.set(-caseWidth / 2 + 0.65, caseHeight / 2 - 0.72, caseDepth / 2 + 0.14);
        caseGroup.add(bumpMesh);

        // Dual Camera Lenses
        const lensGeo = new THREE.CylinderGeometry(0.19, 0.19, 0.06, 24);
        const lensRimMaterial = new THREE.MeshStandardMaterial({
          color: 0x222222,
          metalness: 0.9,
          roughness: 0.2,
        });
        const lensGlassMaterial = new THREE.MeshPhysicalMaterial({
          color: 0x050510,
          roughness: 0.05,
          metalness: 0.8,
          clearcoat: 1.0,
        });

        // Top lens
        const lens1 = new THREE.Mesh(lensGeo, lensRimMaterial);
        lens1.rotation.x = Math.PI / 2;
        lens1.position.set(-caseWidth / 2 + 0.65, caseHeight / 2 - 0.52, caseDepth / 2 + 0.23);
        const glass1 = new THREE.Mesh(new THREE.CircleGeometry(0.16, 20), lensGlassMaterial);
        glass1.position.set(0, 0.031, 0);
        glass1.rotation.x = -Math.PI / 2;
        lens1.add(glass1);
        caseGroup.add(lens1);

        // Bottom lens
        const lens2 = new THREE.Mesh(lensGeo, lensRimMaterial);
        lens2.rotation.x = Math.PI / 2;
        lens2.position.set(-caseWidth / 2 + 0.65, caseHeight / 2 - 0.92, caseDepth / 2 + 0.23);
        const glass2 = new THREE.Mesh(new THREE.CircleGeometry(0.16, 20), lensGlassMaterial);
        glass2.position.set(0, 0.031, 0);
        glass2.rotation.x = -Math.PI / 2;
        lens2.add(glass2);
        caseGroup.add(lens2);

        // Flash and microphone
        const flashGeo = new THREE.CircleGeometry(0.06, 16);
        const flashMat = new THREE.MeshBasicMaterial({ color: 0xfffae0 });
        const flash = new THREE.Mesh(flashGeo, flashMat);
        flash.position.set(-caseWidth / 2 + 0.98, caseHeight / 2 - 0.65, caseDepth / 2 + 0.22);
        caseGroup.add(flash);

        setLoading(false);
      },
      undefined,
      (err) => {
        console.error('Failed to load texture for 3D viewer', err);
        setLoading(false);
      }
    );

    // Initial slight angle
    caseGroup.rotation.y = 0.25;
    caseGroup.rotation.x = -0.1;

    // Interaction handling (drag to rotate)
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotY = 0.25;
    let targetRotX = -0.1;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      setIsInteracting(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - prevMouseX;
      const deltaY = clientY - prevMouseY;

      targetRotY += deltaX * 0.008;
      targetRotX += deltaY * 0.008;

      // Limit X rotation so case doesn't flip completely upside down
      targetRotX = Math.max(-0.6, Math.min(0.6, targetRotX));

      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
      setTimeout(() => setIsInteracting(false), 2000);
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onPointerDown);
    domEl.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('touchend', onPointerUp);

    // Resize handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (autoRotate && !isDragging) {
        targetRotY += delta * 0.35;
      }

      // Smooth damping
      caseGroup.rotation.y += (targetRotY - caseGroup.rotation.y) * 0.08;
      caseGroup.rotation.x += (targetRotX - caseGroup.rotation.x) * 0.08;

      // Subtle float wave
      caseGroup.position.y = Math.sin(clock.getElapsedTime() * 1.5) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      domEl.removeEventListener('mousedown', onPointerDown);
      domEl.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [textureUrl, colorHex, autoRotate]);

  return (
    <div className={`relative flex items-center justify-center overflow-hidden select-none cursor-grab active:cursor-grabbing ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-cream-50/70 backdrop-blur-sm z-10">
          <div className="w-10 h-10 border-2 border-blush-400 border-t-transparent rounded-full animate-spin mb-2" />
          <p className="text-xs font-medium text-charcoal-600">Loading 3D Studio...</p>
        </div>
      )}

      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="w-full h-full min-h-[380px]" />

      {/* Floating 3D Badge Indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-blush-200/60 flex items-center gap-1.5 pointer-events-none transition-opacity duration-300">
        <RotateCw className="w-3.5 h-3.5 text-blush-500 animate-spin" style={{ animationDuration: '6s' }} />
        <span className="text-[11px] font-semibold text-charcoal-700 tracking-wide">
          {isInteracting ? 'Rotating 3D Case...' : 'Drag to rotate 360°'}
        </span>
        <Sparkles className="w-3 h-3 text-roseGold" />
      </div>
    </div>
  );
};

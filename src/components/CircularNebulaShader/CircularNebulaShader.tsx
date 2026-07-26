"use client";

import { useEffect, useRef } from "react";

const VERTEX_SHADER_SOURCE = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER_SOURCE = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // Simple 2D hash for the very subtle film grain.
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  // Value noise function
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    
    // Hermite interpolation (smoothstep)
    vec2 u = f * f * (3.0 - 2.0 * f);
    
    float a = hash(i + vec2(0.0, 0.0));
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  // Fractional Brownian Motion (3 octaves)
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    // Rotate to reduce grid axis artifacts
    mat2 rot = mat2(0.8776, 0.4794, -0.4794, 0.8776);
    for (int i = 0; i < 3; ++i) {
      v += a * noise(p);
      p = rot * p * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  // One-directional bottom-to-top sweep angle & alpha generator with cooldown.
  vec2 getPhaseAndAlpha(float t) {
    float tSweep = 2.8; // duration of sweep along the arc from bottom to top (seconds)
    float tCool = 1.2;  // cooldown pause duration after reaching top (seconds)
    float totalPeriod = tSweep + tCool;
    float localTime = mod(t, totalPeriod);

    // Left edge arc angle range (centered at PI)
    // minAngle is at the bottom of the left edge, maxAngle is at the top.
    float minAngle = 3.14159265 - 0.85;
    float maxAngle = 3.14159265 + 0.85;

    if (localTime < tSweep) {
      float u = localTime / tSweep;
      // Quintic ease in-out for smooth acceleration and deceleration
      float ease = u * u * u * (u * (u * 6.0 - 15.0) + 10.0);
      float phase = mix(minAngle, maxAngle, ease);
      // Smooth fade in as it leaves bottom, smooth fade out as it reaches top
      float alpha = smoothstep(0.0, 0.12, u) * (1.0 - smoothstep(0.88, 1.0, u));
      return vec2(phase, alpha);
    } else {
      // Cooldown phase: reset to bottom, zero opacity
      return vec2(minAngle, 0.0);
    }
  }

  void main() {
    // Work in aspect-corrected coordinates so the moving light stays circular
    // on every viewport.
    vec2 uv = vUv - 0.5;
    float aspect = uResolution.x / uResolution.y;
    uv.x *= aspect;

    // Keep the existing black field and purple palette; only the left light's
    // motion treatment changes.
    vec3 finalColor = vec3(0.0);
    vec3 glowColor = vec3(0.55, 0.22, 0.90);

    // The emitter travels just outside the left edge in a bottom-to-top arc sweep.
    float orbitRadius = aspect * 0.5 + 0.15;
    vec2 orbitCenter = vec2(0.2, 0.0);
    vec2 phaseAndAlpha = getPhaseAndAlpha(uTime);
    float phase = phaseAndAlpha.x;
    float lightAlpha = phaseAndAlpha.y;
    float trailGlow = 0.0;

    // Dense sampling makes the wake a continuous ribbon when sweeping the edge (increased to 40 samples).
    for (int i = 0; i < 31; i++) {
      float index = float(i);
      float age = index / 30.0;
      // Original tail calculation preserved as requested.
      float trailPhase = phase - age * 2.85;
      vec2 trailPoint = orbitCenter + vec2(cos(trailPhase), -sin(trailPhase)) * orbitRadius;
      vec2 toTrail = uv - trailPoint;

      // Broad, vertically feathered ellipses create the soft edge bloom.
      float horizontalCompression = mix(3.9, 1.45, age);
      float verticalStretch = mix(1.60, 0.42, age);
      vec2 ellipse = vec2(toTrail.x * horizontalCompression, toTrail.y * verticalStretch);
      float width = mix(44.0, 5.0, age);
      float fade = exp(-age * 1.65) * mix(0.78, 0.07, age) * 0.52 * (22.0 / 40.0);
      trailGlow += exp(-dot(ellipse, ellipse) * width) * fade;
    }

    // A restrained broad bloom joins the individual trail samples together.
    vec2 head = orbitCenter + vec2(cos(phase), -sin(phase)) * orbitRadius;
    vec2 headOffset = uv - head;
    headOffset.x *= 3.45;
    headOffset.y *= 1.30;
    float atmosphericBloom = exp(-dot(headOffset, headOffset) * 10.0) * 0.22;
    float light = min(trailGlow * 0.36 + atmosphericBloom, 1.0);
    // Intensity boost: slightly richer, more luminous purple sweep glow.
    finalColor += glowColor * light * 2.40 * lightAlpha;

    // Original pulsating nebula on the right.
    vec2 nebulaCenter = vec2(aspect * 0.5 + 0.07, 0.0);
    nebulaCenter.x += sin(uTime * 0.2) * 0.04;
    nebulaCenter.y += cos(uTime * 0.3) * 0.04;
    float pulse = sin(uTime * 0.75) * 0.5 + 0.5;
    vec2 noisyUv = uv * 1.5;
    noisyUv.x -= uTime * 0.03;
    noisyUv.y += uTime * 0.02;
    float n1 = fbm(noisyUv + uTime * 0.02);
    float n2 = fbm(noisyUv * 2.0 - vec2(uTime * 0.04, uTime * 0.01));
    float gasNoise = mix(n1, n2, 0.5);
    vec2 toNebula = uv - nebulaCenter;
    toNebula.x *= 2.0;
    float baseRadius = mix(0.05, 0.15, pulse);
    float distToNebula = length(toNebula) - gasNoise * (0.09 + pulse * 0.07);
    float outerGlow = exp(-max(distToNebula - baseRadius, 0.0) * 5.0) * mix(0.22, 0.50, pulse);
    float coreRadius = mix(0.012, 0.04, pulse);
    float innerGlow = exp(-max(length(toNebula) - coreRadius - gasNoise * 0.045, 0.0) * 11.0) * mix(0.12, 0.35, pulse);
    // Intensity boost: slightly richer nebula glow.
    finalColor += glowColor * (outerGlow + innerGlow) * 1.30;

    float grain = (fract(sin(dot(vUv + uTime * 0.005, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.022;
    finalColor += vec3(grain);

    gl_FragColor = vec4(clamp(finalColor, 0.0, 1.0), 1.0);
  }
`;

interface CircularNebulaShaderProps {
  active?: boolean;
  animate?: boolean;
}

export default function CircularNebulaShader({ active = true, animate = true }: CircularNebulaShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);
  const animateRef = useRef(animate);
  const syncLoopRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    activeRef.current = active;
    animateRef.current = animate;
    syncLoopRef.current?.();
  }, [active, animate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: false, antialias: false });
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    const compileShader = (source: string, type: number): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(VERTEX_SHADER_SOURCE, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(FRAGMENT_SHADER_SOURCE, gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) {
      if (vertexShader) gl.deleteShader(vertexShader);
      if (fragmentShader) gl.deleteShader(fragmentShader);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      return;
    }
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      return;
    }

    gl.useProgram(program);

    const vertices = new Float32Array([
      -1.0, -1.0,
      1.0, -1.0,
      -1.0, 1.0,
      -1.0, 1.0,
      1.0, -1.0,
      1.0, 1.0,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, "uTime");
    const resolutionLoc = gl.getUniformLocation(program, "uResolution");

    let animationFrameId: number | null = null;
    let isLoopRunning = false;
    const startTime = performance.now();

    let resizeFrame: number | undefined;
    const resize = () => {
      if (resizeFrame !== undefined) cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.0); // Capped for performance
        const rect = canvas.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        canvas.width = width * dpr;
        canvas.height = height * dpr;

        gl.viewport(0, 0, canvas.width, canvas.height);
        if (resolutionLoc) {
          gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
        }
        resizeFrame = undefined;
      });
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    const render = () => {
      animationFrameId = null;
      if (!activeRef.current || document.visibilityState !== "visible") {
        isLoopRunning = false;
        return;
      }
      const elapsedSeconds = (performance.now() - startTime) / 1000;
      if (timeLoc) {
        gl.uniform1f(timeLoc, elapsedSeconds);
      }

      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (animateRef.current) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        isLoopRunning = false;
      }
    };

    const startLoop = () => {
      if (!isLoopRunning && activeRef.current && document.visibilityState === "visible") {
        isLoopRunning = true;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const stopLoop = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      isLoopRunning = false;
    };

    const syncLoop = () => {
      if (activeRef.current && document.visibilityState === "visible") startLoop();
      else stopLoop();
    };

    const handleVisibilityChange = syncLoop;

    document.addEventListener("visibilitychange", handleVisibilityChange);

    syncLoopRef.current = syncLoop;
    syncLoop();

    return () => {
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      stopLoop();
      if (syncLoopRef.current === syncLoop) syncLoopRef.current = null;
      if (resizeFrame !== undefined) cancelAnimationFrame(resizeFrame);

      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  return (
    <>
      {/* 1. Transparent WebGL Canvas covering the background */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      {/* 2. Lightweight static grain overlay (GPU-cheap, no per-frame reblur) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          zIndex: 2,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </>
  );
}

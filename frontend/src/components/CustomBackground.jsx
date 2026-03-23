import { useEffect, useRef } from "react";

const GRID_OPACITY_STEP = 255;
const BASE_DRIFT = 0.22;
const MIN_PARTICLE_SIZE = 0.2;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function toHexAlpha(opacity) {
  const clamped = clamp(opacity, 0, 1);
  return Math.round(clamped * GRID_OPACITY_STEP)
    .toString(16)
    .padStart(2, "0");
}

export default function CustomBackground({
  className = "",
  position = "fixed",
  zIndex = -1,
  base = "radial-gradient(circle at top, #f5f5f4 0%, #ffffff 52%)",
  overlay = "linear-gradient(130deg, rgba(255,255,255,0.74) 0%, rgba(255,255,255,0.3) 45%, rgba(255,255,255,0.74) 100%)",
  particles = 120,
  color = "#ffffff",
  size = 0.4,
  staticity = 55,
  ease = 18,
  vx = 0,
  vy = 0,
  magnetismMin = 0.1,
  magnetismMax = 4.1,
  opacityMin = 0.1,
  opacityMax = 0.7,
  edgeFadeDistance = 120,
  grid = false,
  gridSize = 56,
  gridOpacity = 0.14,
  noise = false,
  noiseOpacity = 0.05,
  blurStrength = 0,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return undefined;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return undefined;
    }

    const mouse = {
      x: 0,
      y: 0,
      active: false,
    };

    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const state = {
      width: 0,
      height: 0,
      particles: [],
      frame: 0,
    };
    let resizeFrame = 0;

    const quantity = Math.max(0, Math.floor(particles));
    const easing = Math.max(1, ease);
    const safeStaticity = Math.max(1, staticity);
    const opacityLow = Math.min(opacityMin, opacityMax);
    const opacityHigh = Math.max(opacityMin, opacityMax);
    const magnetismLow = Math.min(magnetismMin, magnetismMax);
    const magnetismHigh = Math.max(magnetismMin, magnetismMax);
    const fadeDistance = Math.max(1, edgeFadeDistance);

    function randomBetween(min, max) {
      return min + Math.random() * (max - min);
    }

    function createParticle(width, height, spawnFromEdge = false) {
      const edgeMargin = 24;
      let x = randomBetween(0, width);
      let y = randomBetween(0, height);

      if (spawnFromEdge) {
        const edge = Math.floor(Math.random() * 4);

        if (edge === 0) {
          x = -edgeMargin;
          y = randomBetween(0, height);
        } else if (edge === 1) {
          x = width + edgeMargin;
          y = randomBetween(0, height);
        } else if (edge === 2) {
          x = randomBetween(0, width);
          y = -edgeMargin;
        } else {
          x = randomBetween(0, width);
          y = height + edgeMargin;
        }
      }

      return {
        x,
        y,
        dx: randomBetween(-BASE_DRIFT, BASE_DRIFT),
        dy: randomBetween(-BASE_DRIFT, BASE_DRIFT),
        radius: Math.max(MIN_PARTICLE_SIZE, size * randomBetween(0.8, 1.8)),
        opacity: randomBetween(opacityLow, opacityHigh),
        magnetism: randomBetween(magnetismLow, magnetismHigh),
        offsetX: 0,
        offsetY: 0,
      };
    }

    function resetCanvas() {
      const bounds = canvas.getBoundingClientRect();
      state.width = Math.max(1, bounds.width);
      state.height = Math.max(1, bounds.height);

      canvas.width = Math.round(state.width * ratio);
      canvas.height = Math.round(state.height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      state.particles = Array.from({ length: quantity }, () =>
        createParticle(state.width, state.height, false)
      );
    }

    function scheduleReset() {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(resetCanvas);
    }

    function isOutside(particle) {
      const padding = 42;
      const drawX = particle.x + particle.offsetX;
      const drawY = particle.y + particle.offsetY;

      return (
        drawX < -padding ||
        drawX > state.width + padding ||
        drawY < -padding ||
        drawY > state.height + padding
      );
    }

    function edgeFade(drawX, drawY) {
      const edgeDistance = Math.min(drawX, state.width - drawX, drawY, state.height - drawY);
      return clamp(edgeDistance / fadeDistance, 0, 1);
    }

    function updatePointer(event) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      mouse.active = true;
    }

    function clearPointer() {
      mouse.active = false;
    }

    function animateFrame() {
      context.clearRect(0, 0, state.width, state.height);

      const centerX = state.width * 0.5;
      const centerY = state.height * 0.5;

      context.fillStyle = color;

      for (let index = 0; index < state.particles.length; index += 1) {
        const particle = state.particles[index];
        particle.x += particle.dx + vx;
        particle.y += particle.dy + vy;

        const targetOffsetX = mouse.active
          ? (mouse.x - centerX) / (safeStaticity / particle.magnetism)
          : 0;
        const targetOffsetY = mouse.active
          ? (mouse.y - centerY) / (safeStaticity / particle.magnetism)
          : 0;

        particle.offsetX += (targetOffsetX - particle.offsetX) / easing;
        particle.offsetY += (targetOffsetY - particle.offsetY) / easing;

        if (isOutside(particle)) {
          state.particles[index] = createParticle(state.width, state.height, true);
          continue;
        }

        const drawX = particle.x + particle.offsetX;
        const drawY = particle.y + particle.offsetY;
        const alpha = particle.opacity * edgeFade(drawX, drawY);

        if (alpha <= 0) {
          continue;
        }

        context.globalAlpha = alpha;
        context.beginPath();
        context.arc(drawX, drawY, particle.radius, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;
      state.frame = window.requestAnimationFrame(animateFrame);
    }

    const resizeObserver = new ResizeObserver(scheduleReset);

    resetCanvas();
    resizeObserver.observe(canvas);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    window.addEventListener("resize", scheduleReset);
    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("pointerleave", clearPointer);
    window.addEventListener("blur", clearPointer);

    state.frame = window.requestAnimationFrame(animateFrame);

    return () => {
      window.cancelAnimationFrame(state.frame);
      window.cancelAnimationFrame(resizeFrame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", scheduleReset);
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointerleave", clearPointer);
      window.removeEventListener("blur", clearPointer);
    };
  }, [
    particles,
    color,
    size,
    staticity,
    ease,
    vx,
    vy,
    magnetismMin,
    magnetismMax,
    opacityMin,
    opacityMax,
    edgeFadeDistance,
  ]);

  const rootClassName = [
    "pointer-events-none inset-0 overflow-hidden",
    position === "absolute" ? "absolute" : "fixed",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const gridColor = `#ffffff${toHexAlpha(gridOpacity)}`;
  const gridBackground = `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`;

  return (
    <div className={rootClassName} style={{ zIndex }} aria-hidden="true">
      <div className="absolute inset-0" style={{ background: base }} />

      {overlay ? <div className="absolute inset-0" style={{ background: overlay }} /> : null}

      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {grid ? (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: gridBackground,
            backgroundSize: `${gridSize}px ${gridSize}px`,
            maskImage:
              "radial-gradient(circle at center, rgba(0,0,0,0.48), rgba(0,0,0,0.12) 65%, transparent 100%)",
          }}
        />
      ) : null}

      {noise ? (
        <div
          className="absolute inset-0"
          style={{
            opacity: noiseOpacity,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.92' numOctaves='2'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.65'/%3E%3C/svg%3E\")",
          }}
        />
      ) : null}

      {blurStrength > 0 ? (
        <div className="absolute inset-0" style={{ backdropFilter: `blur(${blurStrength}px)` }} />
      ) : null}
    </div>
  );
}
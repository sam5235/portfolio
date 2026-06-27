import { Particles, ParticlesProvider } from '@tsparticles/react'
import type { Engine, ISourceOptions } from '@tsparticles/engine'
import { loadSlim } from '@tsparticles/slim'

// Module-scoped so its identity is stable across renders — ParticlesProvider
// requires a stable init callback. The provider only renders its children once
// the engine has loaded, so it wraps ONLY the canvas (never the whole app).
const initParticles = async (engine: Engine) => {
  await loadSlim(engine)
}

// Theme-independent on purpose: rebuilding the options reloads the engine and
// resets particle positions, which looked jarring on theme toggle. Orange
// (the brand accent) reads well on both the white and blue-black backgrounds.
// v4 uses `paint.color` for the dot fill (not the old `particles.color`).
const options: ISourceOptions = {
  fullScreen: { enable: false },
  background: { color: { value: 'transparent' } },
  fpsLimit: 120,
  detectRetina: true,
  interactivity: {
    // Detect on window so hover-repulse works while the canvas itself
    // stays click-through (pointer-events-none) for the buttons above it.
    detectsOn: 'window',
    events: {
      onHover: { enable: true, mode: 'repulse' },
      resize: { enable: true },
    },
    modes: {
      repulse: { distance: 120, duration: 0.4 },
    },
  },
  particles: {
    paint: { color: { value: '#6a2c00' } },
    links: {
      color: '#6a2c00',
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    move: {
      enable: true,
      direction: 'none',
      random: false,
      straight: false,
      speed: 0.8,
      outModes: { default: 'bounce' },
    },
    number: {
      value: 80,
      density: { enable: true, width: 800, height: 800 },
    },
    opacity: { value: 0.9, animation: { enable: false } },
    shape: { type: 'circle' },
    size: { value: { min: 1, max: 3 } },
  },
}

// Decorative connected-particle field for the hero — orange dots + links with
// gentle drift and hover-repulse, consistent across light and dark mode.
export function ParticlesBackground({ className = '' }: { className?: string }) {
  return (
    <ParticlesProvider init={initParticles}>
      <Particles
        id="hero-particles"
        className={`pointer-events-none absolute inset-0 ${className}`}
        options={options}
      />
    </ParticlesProvider>
  )
}

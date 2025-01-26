import type { ISourceOptions } from "@tsparticles/engine";

interface CreateParticlesConfigProps {
  onParticleCreated: () => void;
}

export const createParticlesConfig = ({ onParticleCreated }: CreateParticlesConfigProps): ISourceOptions => ({
  preset: "fireworks",
  background: {
    opacity: 0,
  },
  particles: {
    number: {
      value: 0,
      density: {
        enable: true,
        value_area: 800
      }
    },
    shape: {
      type: "circle"
    },
    move: {
      enable: true,
      speed: 3,
      direction: "none" as const,
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
    }
  },
  fullScreen: {
    enable: true,
    zIndex: 1,
  },
  emitters: {
    direction: "top",
    life: {
      count: 0,
      duration: 0.1,
      delay: 0.1,
    },
    rate: {
      delay: 0.15,
      quantity: 1,
    },
    size: {
      width: 100,
      height: 0,
    },
    position: {
      y: 100,
      x: 50,
    },
  },
  events: {
    particleCreated: onParticleCreated,
  },
  fpsLimit: 60,
  detectRetina: false
});

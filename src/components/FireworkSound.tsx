import { useEffect, useRef } from "react";

interface FireworkSoundProps {
  isPlaying: boolean;
}

const FireworkSound: React.FC<FireworkSoundProps> = ({ isPlaying }) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  const loadFireworkSound = async (context: AudioContext) => {
    try {
      const response = await fetch("/sounds/firework-sound.mp3");
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await context.decodeAudioData(arrayBuffer);
      audioBufferRef.current = audioBuffer;
    } catch (error) {
      console.error("Error loading firework sound:", error);
    }
  };

  const playFireworkSound = () => {
    if (!audioContextRef.current || !audioBufferRef.current || !isPlaying) return;

    try {
      // Stop any currently playing sound
      if (sourceRef.current) {
        sourceRef.current.stop();
      }

      // Create and configure new sound source
      const source = audioContextRef.current.createBufferSource();
      const gainNode = audioContextRef.current.createGain();
      
      sourceRef.current = source;
      source.buffer = audioBufferRef.current;
      
      // Connect nodes
      source.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);

      // Set random volume and playback rate for variety
      gainNode.gain.value = 0.1 + Math.random() * 0.2;
      source.playbackRate.value = 0.8 + Math.random() * 0.4;

      // Schedule next sound
      source.onended = () => {
        if (isPlaying) {
          setTimeout(() => {
            playFireworkSound();
          }, Math.random() * 1000); // Random delay between sounds
        }
      };

      source.start(0);
    } catch (error) {
      console.error("Error playing firework sound:", error);
    }
  };

  // Initialize audio context and load sound
  useEffect(() => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    audioContextRef.current = new AudioContext();

    loadFireworkSound(audioContextRef.current).then(() => {
      if (isPlaying) {
        playFireworkSound();
      }
    });

    return () => {
      if (sourceRef.current) {
        sourceRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle play/stop based on isPlaying prop
  useEffect(() => {
    if (isPlaying) {
      if (audioContextRef.current?.state === "suspended") {
        audioContextRef.current.resume().then(() => {
          playFireworkSound();
        });
      } else {
        playFireworkSound();
      }
    } else {
      if (sourceRef.current) {
        sourceRef.current.stop();
        sourceRef.current = null;
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  // Handle user interaction to start audio context
  useEffect(() => {
    const handleInteraction = () => {
      if (audioContextRef.current?.state === "suspended" && isPlaying) {
        audioContextRef.current.resume().then(() => {
          playFireworkSound();
        });
      }
    };

    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  return null;
};

export default FireworkSound; 

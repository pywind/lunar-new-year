import { useEffect, useRef } from "react";

interface FireworkSoundProps {
  isPlaying: boolean;
  shouldPlaySound: boolean;
}

function FireworkSound({ isPlaying, shouldPlaySound }: FireworkSoundProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize audio context
  useEffect(() => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    audioContextRef.current = new AudioContext();

    if (!audioRef.current) {
      audioRef.current = new Audio('/sounds/firework-sound.mp3');
      audioRef.current.volume = 0.5;
    }

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Handle user interaction to initialize audio
  useEffect(() => {
    const handleInteraction = () => {
      if (audioContextRef.current?.state === "suspended") {
        audioContextRef.current.resume();
      }
    };

    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, []);

  // Handle sound playback
  useEffect(() => {
    if (isPlaying && shouldPlaySound && audioRef.current && audioContextRef.current) {
      const sound = audioRef.current.cloneNode() as HTMLAudioElement;
      
      // Add random volume variation
      const randomVolume = 0.3 + Math.random() * 0.4; // Random volume between 0.3 and 0.7
      sound.volume = randomVolume;

      // Resume audio context if needed
      if (audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume().then(() => {
          sound.play().catch(error => {
            console.log('Audio playback failed:', error);
          });
        });
      } else {
        sound.play().catch(error => {
          console.log('Audio playback failed:', error);
        });
      }
    }
  }, [isPlaying, shouldPlaySound]);

  return null;
}

export default FireworkSound; 

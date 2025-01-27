import { useEffect, useRef, useState } from "react";

interface FireworkSoundProps {
  isPlaying: boolean;
  shouldPlaySound: boolean;
}

function FireworkSound({ isPlaying, shouldPlaySound }: FireworkSoundProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [isAudioInitialized, setIsAudioInitialized] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // Initialize audio
  useEffect(() => {
    const initializeAudio = () => {
      if (!isAudioInitialized) {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        const context = new AudioContext();
        setAudioContext(context);
        
        audioRef.current = new Audio('/sounds/firework-sound.mp3');
        audioRef.current.volume = 0.5;
        setIsAudioInitialized(true);

        startContinuousPlayback();
      }
    };

    const startContinuousPlayback = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = window.setInterval(() => {
        if (shouldPlaySound && audioRef.current && audioContext?.state !== 'suspended') {
          const sound = audioRef.current.cloneNode() as HTMLAudioElement;
          const randomVolume = 0.3 + Math.random() * 0.4;
          sound.volume = randomVolume;
          
          const playPromise = sound.play();
          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.log('Audio playback failed:', error);
            });
          }
        }
      }, 3000);
    };

    // Initialize on first user interaction
    const handleInteraction = () => {
      initializeAudio();
      if (audioContext?.state === "suspended") {
        audioContext.resume();
      }
    };

    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);
    
    // Also try to initialize on component mount
    initializeAudio();

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioContext?.close();
    };
  }, [isAudioInitialized]);

  // Handle sound playback
  useEffect(() => {
    const playSound = async () => {
      if (isPlaying && shouldPlaySound && audioRef.current && audioContext) {
        try {
          if (audioContext.state === "suspended") {
            await audioContext.resume();
          }
          
          const sound = audioRef.current.cloneNode() as HTMLAudioElement;
          const randomVolume = 0.3 + Math.random() * 0.4;
          sound.volume = randomVolume;
          
          const playPromise = sound.play();
          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.log('Audio playback failed:', error);
            });
          }
        } catch (error) {
          console.error('Error playing sound:', error);
        }
      }
    };

    playSound();
  }, [isPlaying, shouldPlaySound]);

  return null;
}

export default FireworkSound; 

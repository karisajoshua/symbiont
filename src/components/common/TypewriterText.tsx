
import React, { useState, useEffect, useRef } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 15, // Slightly faster typing
  onComplete,
  className = "text-terminal-green"
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Skip audio creation to avoid errors
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    // Reset when text changes
    setDisplayedText('');
    setCurrentIndex(0);
    
    // Clear any existing intervals
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }

    // Start typewriter effect
    intervalRef.current = window.setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
        
        // Skip audio playback to avoid errors
      } else {
        // End of text reached
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          if (onComplete) onComplete();
        }
      }
    }, speed);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text, speed, currentIndex, onComplete]);

  return <span className={className}>{displayedText}</span>;
};

export default TypewriterText;

'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface RedactedTextProps {
  children: string;
  className?: string;
}

export default function RedactedText({ children, className = '' }: RedactedTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const iterationRef = useRef(0);

  const hexChars = '0123456789ABCDEF';
  const totalIterations = 15;

  const [hasInitialized, setHasInitialized] = useState(false);

  // Initialize with blocks but KEEP spaces so word-wrapping matches the final text!
  useEffect(() => {
    if (!hasInitialized) {
      const initialBlocks = children
        .split('')
        .map(c => (c === ' ' ? ' ' : '█'))
        .join('');
      setDisplayText(initialBlocks);
      setHasInitialized(true);
    }
  }, [children, hasInitialized]);

  const scramble = useCallback((original: string, progress: number): string => {
    return original
      .split('')
      .map((char, i) => {
        if (char === ' ') return ' ';
        // Randomize whether a character is settled based on progress
        const threshold = (i / original.length) * totalIterations;
        if (progress >= threshold) return char;
        return hexChars[Math.floor(Math.random() * hexChars.length)];
      })
      .join('');
  }, []);

  const handleReveal = () => {
    if (isRevealed || intervalRef.current) return;

    iterationRef.current = 0;
    
    intervalRef.current = setInterval(() => {
      iterationRef.current += 1;
      setDisplayText(scramble(children, iterationRef.current));

      if (iterationRef.current >= totalIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(children);
        setIsRevealed(true);
      }
    }, 40);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <span
      onMouseEnter={handleReveal}
      onTouchStart={handleReveal}
      className={`font-mono transition-colors duration-300 inline ${
        isRevealed 
          ? 'text-[#00FF41] bg-transparent' 
          : 'text-[#00FF41] bg-[#00FF41] cursor-crosshair select-none'
      } ${className}`}
      style={{ 
        padding: '0 2px'
      }}
    >
      {displayText}
    </span>
  );
}

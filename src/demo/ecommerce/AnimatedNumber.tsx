import React, { useEffect, useState } from 'react';

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [direction, setDirection] = useState<'up' | 'down' | 'idle'>('idle');

  useEffect(() => {
    if (value === displayValue) return;

    const dir = value > displayValue ? 'up' : 'down';
    setDirection(dir);

    const startValue = displayValue;
    const diff = value - startValue;
    const duration = 420;
    const startTime = performance.now();

    let animationFrameId: number;

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startValue + diff * eased;
      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
        setTimeout(() => setDirection('idle'), 250);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value]);

  const formatted = displayValue.toLocaleString('tr-TR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span
      className={`inline-flex items-center font-mono tabular-nums transition-transform duration-300 ${
        direction === 'up'
          ? '-translate-y-0.5 text-[#25D366]'
          : direction === 'down'
          ? 'translate-y-0.5 text-amber-400'
          : ''
      } ${className}`}
    >
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

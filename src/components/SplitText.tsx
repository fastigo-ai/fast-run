import React from 'react';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export const SplitText: React.FC<SplitTextProps> = ({ text, className = "" }) => {
  return (
    <span className={className}>
      {text}
    </span>
  );
};

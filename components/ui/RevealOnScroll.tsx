'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function RevealOnScroll({ children, className = '' }: Props) {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? 'visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

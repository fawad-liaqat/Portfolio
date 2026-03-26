'use client';

import { useEffect, useRef, useState } from 'react';
import { signals } from '@/data/signals';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

function SignalCard({ signal }: { signal: (typeof signals)[number] }) {
  const { ref, isVisible } = useIntersectionObserver();
  const [display, setDisplay] = useState(signal.isNumeric ? '0' : '\u2014');
  const animated = useRef(false);

  useEffect(() => {
    if (!isVisible || animated.current) return;
    animated.current = true;

    if (!signal.isNumeric) {
      let i = 0;
      const text = signal.value;
      const interval = setInterval(() => {
        setDisplay(text.slice(0, ++i));
        if (i >= text.length) clearInterval(interval);
      }, 40);
      return () => clearInterval(interval);
    }

    const end = signal.target!;
    const suffix = signal.suffix || '';
    const hasDecimal = signal.value.includes('.');
    const duration = 2000;
    const start = performance.now();

    function update(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = (end * eased).toFixed(hasDecimal ? 1 : 0);
      setDisplay(current + suffix);
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }, [isVisible, signal]);

  return (
    <div ref={ref} className={`signal-card reveal ${isVisible ? 'visible' : ''}`}>
      <div className="signal-value">{display}</div>
      <div className="signal-label">{signal.label}</div>
      <div className="signal-context">{signal.context}</div>
    </div>
  );
}

export default function SignalStrip() {
  return (
    <section id="signal">
      {signals.map((s) => (
        <SignalCard key={s.id} signal={s} />
      ))}
    </section>
  );
}

import { useEffect, useState } from 'react';

// Lightweight global animated icons overlay shown on every page
const GlobalAnimatedIcons = () => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);

  if (reducedMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {/* Top-left */}
      <div className="absolute left-2 top-24 hidden sm:flex items-center justify-center">
        <span className="text-2xl sm:text-3xl md:text-4xl animate-bounce" style={{ animationDelay: '0.2s' }}>🧺</span>
      </div>
      {/* Top-right */}
      <div className="absolute right-4 top-32 hidden md:block">
        <span className="text-3xl md:text-4xl animate-bounce" style={{ animationDelay: '0.6s' }}>🍳</span>
      </div>
      {/* Middle-left */}
      <div className="absolute left-6 top-1/2 hidden lg:block">
        <span className="text-4xl animate-bounce" style={{ animationDelay: '0.8s' }}>🧊</span>
      </div>
      {/* Bottom-right */}
      <div className="absolute right-8 bottom-16 hidden sm:block">
        <span className="text-3xl animate-bounce" style={{ animationDelay: '1s' }}>🧹</span>
      </div>
    </div>
  );
};

export default GlobalAnimatedIcons;




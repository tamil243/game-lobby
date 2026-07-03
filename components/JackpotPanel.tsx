import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { animateIn } from '@/lib/animations';

interface JackpotPanelProps {
  provider: 'egt' | 'amusnet';
}

export const JackpotPanel: React.FC<JackpotPanelProps> = ({ provider }) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (panelRef.current) {
      animateIn(panelRef.current, 0);
    }

    // Animate jackpot values
    const animateJackpot = () => {
      gsap.to('.jackpot-value', {
        textContent: provider === 'egt' 
          ? Math.floor(Math.random() * 50000 + 100000)
          : Math.floor(Math.random() * 75000 + 150000),
        snap: { textContent: 1 },
        duration: 0.6,
        delay: 2,
        repeat: -1,
        repeatDelay: 3,
      });
    };

    animateJackpot();
  }, [provider]);

  const egtJackpots = [
    { name: 'Divine Fortune', value: 145230, color: '#FF006E' },
    { name: 'Mystical Dragon', value: 98765, color: '#00D9FF' },
    { name: 'Lucky Wizard', value: 234567, color: '#B026FF' },
  ];

  const amusnetJackpots = [
    { name: 'Golden Chance', value: 256789, color: '#FF006E' },
    { name: 'Mega Spin', value: 189456, color: '#00D9FF' },
    { name: 'Lucky Diamonds', value: 345678, color: '#B026FF' },
  ];

  const jackpots = provider === 'egt' ? egtJackpots : amusnetJackpots;

  return (
    <div
      ref={panelRef}
      className="glass rounded-xl p-6 mb-6"
      style={{
        boxShadow: '0 0 30px rgba(0, 217, 255, 0.15)',
        opacity: 0,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">🎰 Live Jackpots</h2>
          <p className="text-sm text-gray-400">
            {provider === 'egt' ? 'EGT Digital' : 'AmusNet'} Provider
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 mb-1">Total Network</p>
          <p className="text-2xl font-bold glow-blue">
            ${jackpots.reduce((sum, j) => sum + j.value, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Jackpots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {jackpots.map((jackpot, index) => (
          <div
            key={index}
            className="rounded-lg p-4 border transition-all duration-300 hover:scale-105 cursor-pointer group"
            style={{
              backgroundColor: jackpot.color + '15',
              borderColor: jackpot.color + '44',
              boxShadow: `0 0 15px ${jackpot.color}22`,
            }}
          >
            <p className="text-sm text-gray-400 mb-2">{jackpot.name}</p>
            <p
              className="jackpot-value text-3xl font-bold"
              style={{ color: jackpot.color }}
            >
              ${jackpot.value.toLocaleString()}
            </p>
            <div className="mt-3 h-1 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full animate-pulse"
                style={{
                  backgroundColor: jackpot.color,
                  width: `${Math.random() * 100}%`,
                }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Updated {Math.floor(Math.random() * 59) + 1}s ago
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JackpotPanel;

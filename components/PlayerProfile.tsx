import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGameStore } from '@/lib/store';
import { soundManager } from '@/lib/sounds';
import { animateIn, animateClick } from '@/lib/animations';

export const PlayerProfile: React.FC = () => {
  const { playerName, volume, isSoundEnabled, setVolume, toggleSound } = useGameStore();
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (profileRef.current) {
      animateIn(profileRef.current, 0.3);
    }
  }, []);

  const handleSoundToggle = () => {
    if (profileRef.current) {
      animateClick(profileRef.current);
    }
    soundManager.playButtonClick();
    toggleSound();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    soundManager.setVolume(newVolume);
    soundManager.playNotification();
  };

  return (
    <div
      ref={profileRef}
      className="glass rounded-xl p-6 mb-6"
      style={{
        boxShadow: '0 0 20px rgba(0, 217, 255, 0.1)',
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-white font-bold text-lg">
            {playerName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-white font-bold">{playerName}</p>
            <p className="text-gray-400 text-sm">Level 5 • 2,450 XP</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-neon-blue font-bold">Online</p>
          <p className="text-gray-400 text-sm">1,234 playing</p>
        </div>
      </div>

      {/* Volume and Sound Control */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-300 font-medium">Volume</span>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-neon-blue"
            />
            <span className="text-neon-blue font-bold w-8">{Math.round(volume * 100)}%</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-300 font-medium">Sound Effects</span>
          <button
            onClick={handleSoundToggle}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
              isSoundEnabled ? 'bg-neon-blue' : 'bg-gray-700'
            }`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                isSoundEnabled ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;

import React, { useRef, useEffect } from 'react';
import { soundManager } from '@/lib/sounds';
import {
  animateCardHover,
  animateCardHoverOut,
  animateClick,
  createParticles,
} from '@/lib/animations';

interface GameCardProps {
  id: string;
  title: string;
  description: string;
  players: number;
  maxPlayers: number;
  icon: string;
  color: string;
  onSelect: (gameId: string) => void;
}

export const GameCard: React.FC<GameCardProps> = ({
  id,
  title,
  description,
  players,
  maxPlayers,
  icon,
  color,
  onSelect,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      soundManager.playButtonHover();
      animateCardHover(cardRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      animateCardHoverOut(cardRef.current);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (cardRef.current) {
      soundManager.playButtonClick();
      animateClick(cardRef.current);
      createParticles(e.clientX, e.clientY);
      onSelect(id);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    handleMouseEnter();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    handleMouseLeave();
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="card glass rounded-xl p-6 min-w-[280px] cursor-pointer touch-feedback"
      style={{
        borderColor: color + '33',
        boxShadow: `0 10px 30px rgba(0, 0, 0, 0.3)`,
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="text-4xl w-12 h-12 flex items-center justify-center rounded-lg"
          style={{ backgroundColor: color + '22', color }}
        >
          {icon}
        </div>
        <div className="text-xs font-semibold px-2 py-1 rounded" style={{ backgroundColor: color + '22', color }}>
          {players}/{maxPlayers}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>

      {/* Description */}
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{description}</p>

      {/* Players bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-500">Players Online</span>
          <span className="text-xs font-semibold" style={{ color }}>
            {players}
          </span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${(players / maxPlayers) * 100}%`,
              backgroundColor: color,
            }}
          />
        </div>
      </div>

      {/* Button */}
      <button
        className="w-full py-2 px-4 rounded-lg font-semibold text-sm transition-all duration-300 text-white"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 20px ${color}40`,
        }}
      >
        Join Game
      </button>
    </div>
  );
};

export default GameCard;

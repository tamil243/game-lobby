import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import GameCard from './GameCard';
import { soundManager } from '@/lib/sounds';
import { animateIn, animateClick } from '@/lib/animations';

interface Game {
  id: string;
  title: string;
  description: string;
  players: number;
  maxPlayers: number;
  icon: string;
  color: string;
}

interface GameCarouselProps {
  title: string;
  games: Game[];
  onGameSelect: (gameId: string) => void;
}

export const GameCarousel: React.FC<GameCarouselProps> = ({ title, games, onGameSelect }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    if (carouselRef.current) {
      animateIn(carouselRef.current, 0.4);
    }
  }, []);

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    containerRef.current?.addEventListener('scroll', checkScroll);
    return () => {
      containerRef.current?.removeEventListener('scroll', checkScroll);
    };
  }, []);

  const scroll = (direction: number) => {
    if (containerRef.current) {
      soundManager.playButtonClick();
      gsap.to(containerRef.current, {
        scrollLeft: containerRef.current.scrollLeft + direction * 300,
        duration: 0.6,
        ease: 'power2.inOut',
      });
    }
  };

  const handleArrowClick = (direction: number, ref: HTMLButtonElement | null) => {
    if (ref) {
      animateClick(ref);
    }
    scroll(direction);
  };

  return (
    <div
      ref={carouselRef}
      className="mb-8"
      style={{
        opacity: 0,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-2">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="flex gap-2">
          <button
            ref={(el) => {
              if (el) {
                const handleClick = () => handleArrowClick(-1, el);
                el.removeEventListener('click', handleClick);
                el.addEventListener('click', handleClick);
              }
            }}
            disabled={!canScrollLeft}
            className="p-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: canScrollLeft ? 'rgba(0, 217, 255, 0.2)' : 'rgba(100, 100, 100, 0.2)',
              color: '#00D9FF',
            }}
          >
            ←
          </button>
          <button
            ref={(el) => {
              if (el) {
                const handleClick = () => handleArrowClick(1, el);
                el.removeEventListener('click', handleClick);
                el.addEventListener('click', handleClick);
              }
            }}
            disabled={!canScrollRight}
            className="p-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: canScrollRight ? 'rgba(0, 217, 255, 0.2)' : 'rgba(100, 100, 100, 0.2)',
              color: '#00D9FF',
            }}
          >
            →
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={containerRef}
        className="carousel flex gap-4 overflow-x-auto pb-2"
        style={{
          scrollSnapType: 'x mandatory',
        }}
      >
        {games.map((game) => (
          <div key={game.id} style={{ scrollSnapAlign: 'start' }}>
            <GameCard {...game} onSelect={onGameSelect} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameCarousel;

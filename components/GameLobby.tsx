'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import PlayerProfile from './PlayerProfile';
import GameCarousel from './GameCarousel';
import JackpotPanel from './JackpotPanel';
import Footer from './Footer';
import { soundManager } from '@/lib/sounds';
import { useGameStore } from '@/lib/store';
import { animateIn, animateClick, animateCountUp, createParticles } from '@/lib/animations';

interface Game {
  id: string;
  title: string;
  description: string;
  players: number;
  maxPlayers: number;
  icon: string;
  color: string;
}

interface Lobby {
  featured: Game[];
  action: Game[];
  strategy: Game[];
  multiplayer: Game[];
}

export const GameLobby: React.FC = () => {
  const { selectedGame, setSelectedGame, playersOnline, setPlayersOnline } = useGameStore();
  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<HTMLDivElement>(null);
  const [selectedGameData, setSelectedGameData] = useState<Game | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const lobbies: Lobby = {
    featured: [
      {
        id: 'battle-royale',
        title: 'Battle Royale',
        description: 'Drop in and be the last one standing in an epic 100-player battle.',
        players: 8742,
        maxPlayers: 100,
        icon: '🎮',
        color: '#FF006E',
      },
      {
        id: 'moba',
        title: 'MOBA Arena',
        description: 'Team-based 5v5 strategy battles with unique heroes.',
        players: 6234,
        maxPlayers: 10,
        icon: '⚔️',
        color: '#B026FF',
      },
      {
        id: 'racing',
        title: 'Speed Racing',
        description: 'High-speed racing competitions on amazing tracks.',
        players: 4567,
        maxPlayers: 12,
        icon: '🏎️',
        color: '#00D9FF',
      },
    ],
    action: [
      {
        id: 'fps',
        title: 'FPS Legends',
        description: 'Fast-paced first-person shooter with intense gameplay.',
        players: 9876,
        maxPlayers: 64,
        icon: '🎯',
        color: '#FF006E',
      },
      {
        id: 'melee',
        title: 'Melee Combat',
        description: 'Close combat fighters with dynamic abilities.',
        players: 3456,
        maxPlayers: 8,
        icon: '⚡',
        color: '#00D9FF',
      },
      {
        id: 'survival',
        title: 'Survival Mode',
        description: 'Survive waves of enemies with teammates.',
        players: 5678,
        maxPlayers: 4,
        icon: '🧟',
        color: '#B026FF',
      },
    ],
    strategy: [
      {
        id: 'rts',
        title: 'RTS Master',
        description: 'Real-time strategy with base building and commanding.',
        players: 2345,
        maxPlayers: 8,
        icon: '🏰',
        color: '#B026FF',
      },
      {
        id: 'chess',
        title: 'Chess Masters',
        description: 'Classic chess with beautiful 3D boards.',
        players: 1234,
        maxPlayers: 2,
        icon: '♟️',
        color: '#00D9FF',
      },
      {
        id: 'cards',
        title: 'Card Wars',
        description: 'Collectible card game with thousands of cards.',
        players: 4321,
        maxPlayers: 2,
        icon: '🎴',
        color: '#FF006E',
      },
    ],
    multiplayer: [
      {
        id: 'coop',
        title: 'Co-op Quest',
        description: 'Join friends for epic cooperative dungeons.',
        players: 7654,
        maxPlayers: 4,
        icon: '🐉',
        color: '#00D9FF',
      },
      {
        id: 'sports',
        title: 'Sports Arena',
        description: 'Competitive sports games for all players.',
        players: 5432,
        maxPlayers: 22,
        icon: '⚽',
        color: '#FF006E',
      },
      {
        id: 'party',
        title: 'Party Games',
        description: 'Fun mini-games to play with friends.',
        players: 6789,
        maxPlayers: 8,
        icon: '🎉',
        color: '#B026FF',
      },
    ],
  };

  // Initialize animations
  useEffect(() => {
    if (headerRef.current) {
      animateIn(headerRef.current, 0);
    }
    if (countersRef.current) {
      animateIn(countersRef.current, 0.2);
    }

    // Update player count
    const totalPlayers = Object.values(lobbies)
      .flat()
      .reduce((sum, game) => sum + game.players, 0);
    setPlayersOnline(totalPlayers);

    // Animate counter
    if (countersRef.current) {
      const counter = countersRef.current.querySelector('[data-counter]');
      if (counter) {
        animateCountUp(counter as HTMLElement, 0, totalPlayers, 1.5);
      }
    }
  }, []);

  const handleGameSelect = (gameId: string) => {
    const allGames = Object.values(lobbies).flat();
    const game = allGames.find((g) => g.id === gameId);

    if (game) {
      soundManager.playSuccess();
      setSelectedGame(gameId);
      setSelectedGameData(game);
      setShowNotification(true);

      // Show notification
      setTimeout(() => {
        if (containerRef.current) {
          const notification = document.createElement('div');
          notification.className =
            'fixed bottom-48 right-6 glass rounded-lg p-6 text-white max-w-sm z-50';
          notification.style.boxShadow = `0 0 30px ${game.color}40`;
          notification.innerHTML = `
            <div class="font-bold text-lg mb-2">🎮 Game Selected</div>
            <p class="text-sm text-gray-300 mb-4">You joined <span class="font-semibold" style="color: ${game.color}">${game.title}</span></p>
            <button class="w-full py-2 px-4 rounded-lg font-semibold text-sm" style="background-color: ${game.color}; box-shadow: 0 0 20px ${game.color}40">
              Ready to Play
            </button>
          `;
          document.body.appendChild(notification);

          gsap.fromTo(
            notification,
            { opacity: 0, y: 20, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out' }
          );

          gsap.to(notification, {
            opacity: 0,
            y: 20,
            delay: 5,
            duration: 0.6,
            ease: 'back.in',
            onComplete: () => notification.remove(),
          });
        }
      }, 300);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Here you can filter games based on category
    console.log('Selected category:', categoryId);
  };

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      {/* Main Content - Scrollable */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-6 pb-40"
        style={{
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {/* Header */}
        <div ref={headerRef} style={{ opacity: 0 }} className="mb-10">
          <h1 className="text-5xl font-bold text-white mb-2 glow-blue">Game Lobby</h1>
          <p className="text-gray-400 text-lg">Welcome to the ultimate gaming experience</p>
        </div>

        {/* Stats */}
        <div
          ref={countersRef}
          style={{ opacity: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
        >
          <div className="glass rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-2">Players Online</p>
            <p className="text-3xl font-bold text-neon-blue" data-counter>
              0
            </p>
          </div>
          <div className="glass rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-2">Active Games</p>
            <p className="text-3xl font-bold text-neon-purple">
              {Object.keys(lobbies).length}
            </p>
          </div>
          <div className="glass rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-2">Your Status</p>
            <p className="text-3xl font-bold">
              <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              <span className="text-neon-blue">Ready</span>
            </p>
          </div>
        </div>

        {/* Player Profile */}
        <PlayerProfile />

        {/* Jackpot Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <JackpotPanel provider="egt" />
          <JackpotPanel provider="amusnet" />
        </div>

        {/* Featured Games */}
        <GameCarousel
          title="Featured Games"
          games={lobbies.featured}
          onGameSelect={handleGameSelect}
        />

        {/* Action Games */}
        <GameCarousel
          title="Action"
          games={lobbies.action}
          onGameSelect={handleGameSelect}
        />

        {/* Strategy Games */}
        <GameCarousel
          title="Strategy"
          games={lobbies.strategy}
          onGameSelect={handleGameSelect}
        />

        {/* Multiplayer Games */}
        <GameCarousel
          title="Multiplayer"
          games={lobbies.multiplayer}
          onGameSelect={handleGameSelect}
        />

        {/* Footer Spacing */}
        <div className="h-20"></div>
      </div>

      {/* Fixed Footer */}
      <Footer 
        onCategorySelect={handleCategorySelect} 
        activeCategory={selectedCategory}
      />
    </div>
  );
};

export default GameLobby;

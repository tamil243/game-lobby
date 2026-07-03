import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { soundManager } from '@/lib/sounds';
import { animateClick } from '@/lib/animations';

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
}

interface FooterProps {
  onCategorySelect?: (categoryId: string) => void;
  activeCategory?: string;
}

export const Footer: React.FC<FooterProps> = ({ onCategorySelect, activeCategory }) => {
  const footerRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<Category[]>([
    { id: 'all', name: 'All Games', icon: '🎮', color: '#00D9FF', count: 48 },
    { id: 'egt', name: 'EGT Digital', icon: '🎰', color: '#FF006E', count: 18 },
    { id: 'amusnet', name: 'AmusNet', icon: '🎲', color: '#B026FF', count: 15 },
    { id: 'slots', name: 'Slots', icon: '🎯', color: '#00D9FF', count: 32 },
    { id: 'table', name: 'Table Games', icon: '♠️', color: '#FF006E', count: 12 },
    { id: 'live', name: 'Live Casino', icon: '📹', color: '#B026FF', count: 8 },
    { id: 'jackpot', name: 'Jackpots', icon: '💎', color: '#00D9FF', count: 5 },
  ]);
  const [selected, setSelected] = useState<string>(activeCategory || 'all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (footerRef.current) {
      gsap.fromTo(
        footerRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'back.out' }
      );
    }
  }, []);

  const handleCategoryClick = (categoryId: string, ref: HTMLButtonElement | null) => {
    soundManager.playButtonClick();
    if (ref) {
      animateClick(ref);
    }
    setSelected(categoryId);
    onCategorySelect?.(categoryId);

    // Smooth scroll to make selected category visible
    if (scrollContainerRef.current) {
      const selectedButton = scrollContainerRef.current.querySelector(
        `[data-category="${categoryId}"]`
      );
      if (selectedButton) {
        selectedButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  return (
    <div
      ref={footerRef}
      className="fixed bottom-0 left-0 right-0 glass border-t border-gray-700"
      style={{
        backgroundColor: 'rgba(10, 14, 39, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.5)',
        zIndex: 100,
      }}
    >
      {/* Categories */}
      <div className="overflow-x-auto" ref={scrollContainerRef} style={{ scrollBehavior: 'smooth' }}>
        <div className="flex gap-2 p-4 min-w-min">
          {categories.map((category) => {
            const isActive = selected === category.id;
            return (
              <button
                key={category.id}
                data-category={category.id}
                ref={(ref) => {
                  if (ref) {
                    const handleClick = () => handleCategoryClick(category.id, ref);
                    ref.removeEventListener('click', handleClick);
                    ref.addEventListener('click', handleClick);
                  }
                }}
                className={`whitespace-nowrap py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                  isActive ? 'ring-2' : 'ring-0'
                }`}
                style={{
                  backgroundColor: isActive ? category.color + '30' : 'rgba(100, 100, 100, 0.1)',
                  color: category.color,
                  borderColor: category.color,
                  border: isActive ? `2px solid ${category.color}` : 'none',
                  boxShadow: isActive ? `0 0 20px ${category.color}40` : 'none',
                  ringColor: category.color,
                }}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
                <span className="ml-1 text-xs opacity-75">({category.count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div
        className="flex items-center justify-between px-4 py-3 border-t border-gray-700"
        style={{ backgroundColor: 'rgba(21, 26, 58, 0.5)' }}
      >
        <div className="flex items-center gap-6 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
            <span>1,234 Players Online</span>
          </div>
          <div>Last Updated: {new Date().toLocaleTimeString()}</div>
        </div>

        <div className="flex items-center gap-4">
          <button
            className="text-xs px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 transition-colors text-gray-300"
            onClick={() => soundManager.playButtonClick()}
          >
            🔔 Notifications
          </button>
          <button
            className="text-xs px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 transition-colors text-gray-300"
            onClick={() => soundManager.playButtonClick()}
          >
            ⚙️ Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;

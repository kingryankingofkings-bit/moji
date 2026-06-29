'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Emoji,
  EmojiCategory,
  getEmojisByCategory,
  searchEmojis,
  getAllCategories,
  addFavorite,
  removeFavorite,
  addRecentEmoji,
  getRecentEmojis,
  getFavorites,
} from '@moji/shared';
import debounce from 'lodash.debounce';

interface EmojiKeyboardProps {
  onEmojiSelect: (emoji: string) => void;
  animationsEnabled?: boolean;
}

const getCategoryIcon = (category: EmojiCategory): string => {
  const icons: Record<EmojiCategory, string> = {
    [EmojiCategory.RECENT]: '🕐',
    [EmojiCategory.SMILEYS]: '😀',
    [EmojiCategory.PEOPLE]: '👋',
    [EmojiCategory.NATURE]: '🌸',
    [EmojiCategory.FOOD]: '🍎',
    [EmojiCategory.TRAVEL]: '✈️',
    [EmojiCategory.ACTIVITIES]: '⚽',
    [EmojiCategory.OBJECTS]: '💡',
    [EmojiCategory.SYMBOLS]: '❤️',
    [EmojiCategory.FLAGS]: '🏳️',
    [EmojiCategory.MEDIEVAL]: '⚔️',
    [EmojiCategory.HERB]: '🌿',
    [EmojiCategory.SCIFI]: '🛸',
    [EmojiCategory.HORROR]: '💀',
    [EmojiCategory.MUSIC]: '🎵',
    [EmojiCategory.OCEAN]: '🌊',
  };
  return icons[category];
};

export const EmojiKeyboard: React.FC<EmojiKeyboardProps> = ({
  onEmojiSelect,
  animationsEnabled = true,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EmojiCategory>(
    EmojiCategory.RECENT
  );
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentEmojis, setRecentEmojis] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(false);
    const [favs, recent] = await Promise.all([
      getFavorites(),
      getRecentEmojis(),
    ]);
    setFavorites(favs.map(f => f.emoji));
    setRecentEmojis(recent.map(r => r.emoji));
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        if (query.length > 0) {
          setSelectedCategory(EmojiCategory.SMILEYS);
        }
      }, 300),
    []
  );

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    debouncedSearch(text);
  };

  const emojiData = useMemo(() => {
    if (searchQuery) {
      return searchEmojis(searchQuery);
    }
    if (selectedCategory === EmojiCategory.RECENT) {
      return recentEmojis.map(emoji => ({
        id: emoji,
        emoji,
        name: emoji,
        category: EmojiCategory.RECENT,
        keywords: [],
        hasSkinTones: false,
      } as Emoji));
    }
    return getEmojisByCategory(selectedCategory);
  }, [searchQuery, selectedCategory, recentEmojis]);

  const handleEmojiClick = async (emoji: string) => {
    onEmojiSelect(emoji);
    await addRecentEmoji(emoji);
    const recent = await getRecentEmojis();
    setRecentEmojis(recent.map(r => r.emoji));
  };

  const handleFavoriteToggle = async (e: React.MouseEvent, emoji: string) => {
    e.stopPropagation();
    const isFav = favorites.includes(emoji);
    if (isFav) {
      await removeFavorite(emoji);
      setFavorites(favorites.filter(f => f !== emoji));
    } else {
      await addFavorite(emoji);
      setFavorites([...favorites, emoji]);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-500">Loading emojis...</div>
      </div>
    );
  }

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden"
      initial={animationsEnabled ? { opacity: 0, y: 10 } : {}}
      animate={animationsEnabled ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4">
        <input
          type="text"
          placeholder="Search emojis..."
          value={searchQuery}
          onChange={e => handleSearchChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex border-b border-gray-200 px-2 py-1 overflow-x-auto">
        {getAllCategories().map(category => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setSearchQuery('');
            }}
            className={`flex-shrink-0 px-3 py-2 text-2xl transition-colors ${
              selectedCategory === category
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {getCategoryIcon(category)}
          </button>
        ))}
        <button
          onClick={() => {
            setSelectedCategory(EmojiCategory.RECENT);
            setSearchQuery('');
          }}
          className={`flex-shrink-0 px-3 py-2 text-2xl transition-colors ${
            selectedCategory === EmojiCategory.RECENT
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          {getCategoryIcon(EmojiCategory.RECENT)}
        </button>
      </div>

      {emojiData.length > 0 ? (
        <div className="grid grid-cols-6 gap-2 p-4 max-h-96 overflow-y-auto">
          {emojiData.map(emoji => (
            <motion.button
              key={emoji.id}
              onClick={() => handleEmojiClick(emoji.emoji)}
              onContextMenu={e => handleFavoriteToggle(e, emoji.emoji)}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
              whileHover={animationsEnabled ? { scale: 1.1 } : {}}
              whileTap={animationsEnabled ? { scale: 0.95 } : {}}
            >
              <span className="text-4xl">{emoji.emoji}</span>
              {favorites.includes(emoji.emoji) && (
                <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full" />
              )}
            </motion.button>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-96 text-gray-500">
          No emojis found
        </div>
      )}
    </motion.div>
  );
};

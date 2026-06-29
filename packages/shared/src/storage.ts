import { Favorite, RecentEmoji } from './types';

const FAVORITES_KEY = 'moji_favorites';
const RECENT_KEY = 'moji_recent';
const MAX_RECENT = 25;
const MAX_FAVORITES = 100;

export interface StorageAdapter {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

let adapter: StorageAdapter | null = null;

export const setStorageAdapter = (newAdapter: StorageAdapter) => {
  adapter = newAdapter;
};

const getAdapter = (): StorageAdapter => {
  if (!adapter) {
    throw new Error('Storage adapter not initialized');
  }
  return adapter;
};

export const getFavorites = async (): Promise<Favorite[]> => {
  try {
    const data = await getAdapter().getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const addFavorite = async (emoji: string): Promise<void> => {
  const favorites = await getFavorites();
  const exists = favorites.some(fav => fav.emoji === emoji);

  if (!exists) {
    favorites.unshift({
      emojiId: emoji,
      emoji,
      timestamp: Date.now()
    });

    if (favorites.length > MAX_FAVORITES) {
      favorites.pop();
    }

    await getAdapter().setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
};

export const removeFavorite = async (emoji: string): Promise<void> => {
  let favorites = await getFavorites();
  favorites = favorites.filter(fav => fav.emoji !== emoji);
  await getAdapter().setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const isFavorite = async (emoji: string): Promise<boolean> => {
  const favorites = await getFavorites();
  return favorites.some(fav => fav.emoji === emoji);
};

export const getRecentEmojis = async (): Promise<RecentEmoji[]> => {
  try {
    const data = await getAdapter().getItem(RECENT_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const addRecentEmoji = async (emoji: string): Promise<void> => {
  const recent = await getRecentEmojis();

  const existingIndex = recent.findIndex(r => r.emoji === emoji);
  if (existingIndex !== -1) {
    recent.splice(existingIndex, 1);
  }

  recent.unshift({
    emoji,
    timestamp: Date.now()
  });

  if (recent.length > MAX_RECENT) {
    recent.pop();
  }

  await getAdapter().setItem(RECENT_KEY, JSON.stringify(recent));
};

export const clearRecentEmojis = async (): Promise<void> => {
  await getAdapter().removeItem(RECENT_KEY);
};

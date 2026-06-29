export interface Emoji {
  id: string;
  emoji: string;
  name: string;
  category: EmojiCategory;
  keywords: string[];
  hasSkinTones: boolean;
  skinToneVariants?: string[];
}

export enum EmojiCategory {
  RECENT = 'Recent',
  SMILEYS = 'Smileys & Emotion',
  PEOPLE = 'People',
  NATURE = 'Nature',
  FOOD = 'Food & Drink',
  TRAVEL = 'Travel & Places',
  ACTIVITIES = 'Activities',
  OBJECTS = 'Objects',
  SYMBOLS = 'Symbols',
  FLAGS = 'Flags'
}

export interface EmojiWithSkinTone {
  emoji: string;
  skinTone: SkinTone | null;
}

export enum SkinTone {
  LIGHT = '🏻',
  MEDIUM_LIGHT = '🏼',
  MEDIUM = '🏽',
  MEDIUM_DARK = '🏾',
  DARK = '🏿'
}

export interface Favorite {
  emojiId: string;
  emoji: string;
  timestamp: number;
}

export interface RecentEmoji {
  emoji: string;
  timestamp: number;
}

export interface EmojiKitConfig {
  animationsEnabled: boolean;
  columnsPerRow: number;
  recentEmojiLimit: number;
  favoritesLimit: number;
}

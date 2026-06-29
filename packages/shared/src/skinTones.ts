import { SkinTone } from './types';

const SKIN_TONE_REGEX = /[\u{1F3FB}-\u{1F3FF}]/u;

export const applySkinTone = (emoji: string, skinTone: SkinTone): string => {
  return removeSkinTone(emoji) + skinTone;
};

export const removeSkinTone = (emoji: string): string => {
  return emoji.replace(SKIN_TONE_REGEX, '');
};

export const hasSkinTone = (emoji: string): boolean => {
  return SKIN_TONE_REGEX.test(emoji);
};

export const extractSkinTone = (emoji: string): SkinTone | null => {
  const match = emoji.match(SKIN_TONE_REGEX);
  return (match?.[0] as SkinTone) || null;
};

export const getAllSkinToneVariants = (baseEmoji: string): Record<string, string> => {
  const clean = removeSkinTone(baseEmoji);
  return {
    default: clean,
    light: clean + SkinTone.LIGHT,
    mediumLight: clean + SkinTone.MEDIUM_LIGHT,
    medium: clean + SkinTone.MEDIUM,
    mediumDark: clean + SkinTone.MEDIUM_DARK,
    dark: clean + SkinTone.DARK
  };
};

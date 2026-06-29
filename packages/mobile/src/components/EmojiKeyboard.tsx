import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  ActivityIndicator,
  Modal,
  ScrollView,
} from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
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

const { width } = Dimensions.get('window');
const COLUMNS = 6;
const EMOJI_SIZE = Math.floor((width - 24) / COLUMNS);

const SKIN_TONES = ['🏻', '🏼', '🏽', '🏾', '🏿'];

interface EmojiKeyboardProps {
  onEmojiSelect: (emoji: string) => void;
  animationsEnabled?: boolean;
}

export const EmojiKeyboard: React.FC<EmojiKeyboardProps> = ({
  onEmojiSelect,
  animationsEnabled = true,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EmojiCategory>(EmojiCategory.RECENT);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [recentEmojis, setRecentEmojis] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [skinToneTarget, setSkinToneTarget] = useState<Emoji | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const [favs, recent] = await Promise.all([getFavorites(), getRecentEmojis()]);
    setFavorites(new Set(favs.map(f => f.emoji)));
    setRecentEmojis(recent.map(r => r.emoji));
    setIsLoading(false);
  };

  const debouncedSearch = useMemo(
    () => debounce((query: string) => {
      if (query.length > 0) setSelectedCategory(EmojiCategory.SMILEYS);
    }, 300),
    []
  );

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    debouncedSearch(text);
  };

  const emojiData = useMemo(() => {
    if (searchQuery) return searchEmojis(searchQuery);
    if (selectedCategory === EmojiCategory.RECENT) {
      return recentEmojis.map(emoji => ({
        id: emoji, emoji, name: emoji,
        category: EmojiCategory.RECENT,
        keywords: [], hasSkinTones: false,
      } as Emoji));
    }
    return getEmojisByCategory(selectedCategory);
  }, [searchQuery, selectedCategory, recentEmojis]);

  const commitEmoji = async (emoji: string) => {
    onEmojiSelect(emoji);
    await addRecentEmoji(emoji);
    const recent = await getRecentEmojis();
    setRecentEmojis(recent.map(r => r.emoji));
    setSkinToneTarget(null);
  };

  const handleEmojiPress = (item: Emoji) => {
    if (item.hasSkinTones && item.skinToneVariants?.length) {
      setSkinToneTarget(item);
    } else {
      commitEmoji(item.emoji);
    }
  };

  const handleFavoriteToggle = async (emoji: string) => {
    if (favorites.has(emoji)) {
      await removeFavorite(emoji);
      setFavorites(prev => { const next = new Set(prev); next.delete(emoji); return next; });
    } else {
      await addFavorite(emoji);
      setFavorites(prev => new Set(prev).add(emoji));
    }
  };

  const handleSkinToneSelect = (tone: string) => {
    if (!skinToneTarget) return;
    const base = skinToneTarget.emoji.replace(/[\u{1F3FB}-\u{1F3FF}]/u, '');
    commitEmoji(tone ? base + tone : base);
  };

  const renderEmojiItem = ({ item }: { item: Emoji }) => {
    const isFav = favorites.has(item.emoji);
    return (
      <TouchableOpacity
        style={styles.emojiItem}
        onPress={() => handleEmojiPress(item)}
        onLongPress={() => handleFavoriteToggle(item.emoji)}
        delayLongPress={400}
      >
        <Text style={styles.emojiText}>{item.emoji}</Text>
        {isFav && <View style={styles.favoriteIndicator} />}
        {item.hasSkinTones && <View style={styles.skinToneIndicator} />}
      </TouchableOpacity>
    );
  };

  const renderCategoryButton = (category: EmojiCategory) => {
    const isSelected = selectedCategory === category;
    return (
      <TouchableOpacity
        key={category}
        style={[styles.categoryButton, isSelected && styles.categoryButtonActive]}
        onPress={() => { setSelectedCategory(category); setSearchQuery(''); }}
      >
        <Text style={styles.categoryText}>{CATEGORY_ICONS[category]}</Text>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <>
      <Animated.View
        style={styles.container}
        entering={animationsEnabled ? FadeIn : undefined}
      >
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search emojis..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={handleSearchChange}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          <View style={styles.categoriesContainer}>
            {renderCategoryButton(EmojiCategory.RECENT)}
            {getAllCategories().map(renderCategoryButton)}
          </View>
        </ScrollView>

        {emojiData.length > 0 ? (
          <FlatList
            data={emojiData}
            renderItem={renderEmojiItem}
            keyExtractor={item => item.id}
            numColumns={COLUMNS}
            scrollEnabled
            contentContainerStyle={styles.emojiGrid}
          />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No emojis found</Text>
          </View>
        )}
      </Animated.View>

      <Modal
        visible={skinToneTarget !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSkinToneTarget(null)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setSkinToneTarget(null)}
        >
          <View style={styles.skinTonePanel}>
            <Text style={styles.skinTonePanelTitle}>Select skin tone</Text>
            <View style={styles.skinToneRow}>
              <TouchableOpacity
                style={styles.skinToneOption}
                onPress={() => handleSkinToneSelect('')}
              >
                <Text style={styles.skinToneEmoji}>{skinToneTarget?.emoji}</Text>
              </TouchableOpacity>
              {SKIN_TONES.map(tone => (
                <TouchableOpacity
                  key={tone}
                  style={styles.skinToneOption}
                  onPress={() => handleSkinToneSelect(tone)}
                >
                  <Text style={styles.skinToneEmoji}>
                    {skinToneTarget?.emoji.replace(/[\u{1F3FB}-\u{1F3FF}]/u, '') + tone}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const CATEGORY_ICONS: Record<EmojiCategory, string> = {
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  searchContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  searchInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000',
  },
  categoriesScroll: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 4,
  },
  categoryButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryButtonActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  categoryText: {
    fontSize: 20,
  },
  emojiGrid: {
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  emojiItem: {
    width: EMOJI_SIZE,
    height: EMOJI_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  emojiText: {
    fontSize: 28,
  },
  favoriteIndicator: {
    position: 'absolute',
    top: 3,
    right: 3,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#FF3B30',
  },
  skinToneIndicator: {
    position: 'absolute',
    bottom: 3,
    right: 3,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#8E8E93',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  skinTonePanel: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  skinTonePanelTitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 12,
    fontWeight: '600',
  },
  skinToneRow: {
    flexDirection: 'row',
    gap: 8,
  },
  skinToneOption: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
  },
  skinToneEmoji: {
    fontSize: 28,
  },
});

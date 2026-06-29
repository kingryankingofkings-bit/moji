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
  isFavorite,
  addRecentEmoji,
  getRecentEmojis,
  getFavorites,
} from '@moji/shared';
import debounce from 'lodash.debounce';

const { width } = Dimensions.get('window');
const COLUMNS = 6;
const EMOJI_SIZE = width / COLUMNS - 8;

interface EmojiKeyboardProps {
  onEmojiSelect: (emoji: string) => void;
  animationsEnabled?: boolean;
}

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
  const [favoriteStates, setFavoriteStates] = useState<Record<string, boolean>>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const [favs, recent] = await Promise.all([
      getFavorites(),
      getRecentEmojis(),
    ]);
    setFavorites(favs.map(f => f.emoji));
    setRecentEmojis(recent.map(r => r.emoji));
    setIsLoading(false);
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

  const handleEmojiPress = async (emoji: string) => {
    onEmojiSelect(emoji);
    await addRecentEmoji(emoji);
    const recent = await getRecentEmojis();
    setRecentEmojis(recent.map(r => r.emoji));
  };

  const handleFavoriteToggle = async (emoji: string) => {
    const isFav = favoriteStates[emoji];
    if (isFav) {
      await removeFavorite(emoji);
      setFavorites(favorites.filter(f => f !== emoji));
      setFavoriteStates(prev => ({ ...prev, [emoji]: false }));
    } else {
      await addFavorite(emoji);
      setFavorites([...favorites, emoji]);
      setFavoriteStates(prev => ({ ...prev, [emoji]: true }));
    }
  };

  const renderEmojiItem = ({ item }: { item: Emoji }) => {
    const isFav = favorites.includes(item.emoji);

    return (
      <TouchableOpacity
        style={styles.emojiItem}
        onPress={() => handleEmojiPress(item.emoji)}
        onLongPress={() => handleFavoriteToggle(item.emoji)}
      >
        <Text style={styles.emojiText}>{item.emoji}</Text>
        {isFav && <View style={styles.favoriteIndicator} />}
      </TouchableOpacity>
    );
  };

  const renderCategoryButton = (category: EmojiCategory) => {
    const isSelected = selectedCategory === category;
    return (
      <TouchableOpacity
        key={category}
        style={[styles.categoryButton, isSelected && styles.categoryButtonActive]}
        onPress={() => {
          setSelectedCategory(category);
          setSearchQuery('');
        }}
      >
        <Text style={[styles.categoryText, isSelected && styles.categoryTextActive]}>
          {getCategoryIcon(category)}
        </Text>
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

      <View style={styles.categoriesContainer}>
        {getAllCategories().map(renderCategoryButton)}
        {renderCategoryButton(EmojiCategory.RECENT)}
      </View>

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
  );
};

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
  };
  return icons[category];
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
  categoriesContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingHorizontal: 8,
  },
  categoryButton: {
    flex: 1,
    paddingVertical: 12,
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
  categoryTextActive: {
    opacity: 1,
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
    margin: 4,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  emojiText: {
    fontSize: 32,
  },
  favoriteIndicator: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
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
});

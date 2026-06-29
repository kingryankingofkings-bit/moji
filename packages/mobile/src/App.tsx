import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { setStorageAdapter } from '@moji/shared';
import * as SecureStore from 'expo-secure-store';
import { EmojiKeyboard } from './components/EmojiKeyboard';
import { EmojiInputField } from './components/EmojiInputField';

const createStorageAdapter = () => ({
  getItem: async (key: string) => {
    try {
      return await SecureStore.getItemAsync(key);
    } catch {
      return null;
    }
  },
  setItem: async (key: string, value: string) => {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error('Failed to set storage item:', error);
    }
  },
  removeItem: async (key: string) => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error('Failed to remove storage item:', error);
    }
  },
});

export default function App() {
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [selectedEmoji, setSelectedEmoji] = useState<string>('');

  useEffect(() => {
    setStorageAdapter(createStorageAdapter());
  }, []);

  const handleEmojiSelect = (emoji: string) => {
    setSelectedEmoji(emoji);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <EmojiInputField selectedEmoji={selectedEmoji} />
        <EmojiKeyboard
          onEmojiSelect={handleEmojiSelect}
          animationsEnabled={animationsEnabled}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
  },
});

import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { setStorageAdapter } from '@moji/shared';
import { EmojiKeyboard } from './components/EmojiKeyboard';
import { EmojiInputField } from './components/EmojiInputField';
import { KeyboardSetupScreen } from './screens/KeyboardSetupScreen';

// Try to use the native storage bridge (syncs with keyboard extensions).
// Falls back to SecureStore if the native module isn't linked yet.
let mojiStorageAdapter: Parameters<typeof setStorageAdapter>[0] | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  mojiStorageAdapter = require('@moji/storage').mojiStorageAdapter;
} catch {
  // Native module not linked — happens in Expo Go; SecureStore fallback below
}

const secureStoreAdapter = {
  getItem: async (key: string) => {
    try { return await SecureStore.getItemAsync(key); } catch { return null; }
  },
  setItem: async (key: string, value: string) => {
    // SecureStore has a 2 KB value limit; chunk large values if needed
    try { await SecureStore.setItemAsync(key, value); } catch {}
  },
  removeItem: async (key: string) => {
    try { await SecureStore.deleteItemAsync(key); } catch {}
  },
};

const SETUP_SEEN_KEY = 'moji_setup_seen';

export default function App() {
  const [ready, setReady] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [selectedEmoji, setSelectedEmoji] = useState('');

  useEffect(() => {
    const adapter = mojiStorageAdapter ?? secureStoreAdapter;
    setStorageAdapter(adapter);

    adapter.getItem(SETUP_SEEN_KEY).then(seen => {
      if (!seen) setShowSetup(true);
      setReady(true);
    });
  }, []);

  const handleSetupDismiss = async () => {
    const adapter = mojiStorageAdapter ?? secureStoreAdapter;
    await adapter.setItem(SETUP_SEEN_KEY, '1');
    setShowSetup(false);
  };

  if (!ready) return null;

  if (showSetup) {
    return <KeyboardSetupScreen onDismiss={handleSetupDismiss} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Moji</Text>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => setShowSetup(true)}
        >
          <Text style={styles.headerBtnText}>Setup</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.headerBtn, animationsEnabled && styles.headerBtnActive]}
          onPress={() => setAnimationsEnabled(v => !v)}
        >
          <Text style={[styles.headerBtnText, animationsEnabled && styles.headerBtnTextActive]}>
            {animationsEnabled ? '✨ On' : '✨ Off'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <EmojiInputField selectedEmoji={selectedEmoji} />
        <EmojiKeyboard
          onEmojiSelect={setSelectedEmoji}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    backgroundColor: '#FFF',
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  headerBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 8,
    backgroundColor: '#F0F0F0',
  },
  headerBtnActive: {
    backgroundColor: '#E8F0FE',
  },
  headerBtnText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
  },
  headerBtnTextActive: {
    color: '#007AFF',
  },
  container: {
    flex: 1,
  },
});

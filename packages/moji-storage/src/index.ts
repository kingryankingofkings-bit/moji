import { requireNativeModule } from 'expo-modules-core';
import { StorageAdapter } from '@moji/shared';

// The native module bridges to:
//   Android: SharedPreferences("moji_data", MODE_PRIVATE)
//   iOS:     UserDefaults(suiteName: "group.com.moji.keyboard")
// Both use the same key names as the keyboard extensions, so data syncs automatically.
const NativeMojiStorage = requireNativeModule('MojiStorage');

export const mojiStorageAdapter: StorageAdapter = {
  getItem: (key: string): Promise<string | null> =>
    NativeMojiStorage.getItem(key),
  setItem: (key: string, value: string): Promise<void> =>
    NativeMojiStorage.setItem(key, value),
  removeItem: (key: string): Promise<void> =>
    NativeMojiStorage.removeItem(key),
};

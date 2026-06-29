'use client';

import { useState, useEffect } from 'react';
import { setStorageAdapter } from '@moji/shared';
import { EmojiKeyboard } from '@/components/EmojiKeyboard';
import { EmojiInputField } from '@/components/EmojiInputField';

const createLocalStorageAdapter = () => ({
  getItem: (key: string) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key: string, value: string) => {
    localStorage.setItem(key, value);
    return Promise.resolve();
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
    return Promise.resolve();
  },
});

export default function Home() {
  const [selectedEmoji, setSelectedEmoji] = useState<string>('');
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  useEffect(() => {
    setStorageAdapter(createLocalStorageAdapter());
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Moji</h1>
          <p className="text-gray-600">
            Fast, feature-rich emoji keyboard for Android, iOS, and desktop
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Emoji Keyboard
            </h2>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={animationsEnabled}
                onChange={e => setAnimationsEnabled(e.target.checked)}
                className="w-4 h-4 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">Animations</span>
            </label>
          </div>

          <EmojiInputField selectedEmoji={selectedEmoji} />
          <EmojiKeyboard
            onEmojiSelect={setSelectedEmoji}
            animationsEnabled={animationsEnabled}
          />
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>💡 Tips:</p>
          <ul className="mt-2 space-y-1">
            <li>• Click an emoji to select it</li>
            <li>• Right-click to add/remove from favorites</li>
            <li>• Use the search bar to find emojis quickly</li>
            <li>• Recently used emojis appear in the Recent tab</li>
          </ul>
        </div>
      </div>
    </main>
  );
}

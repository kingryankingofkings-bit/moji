'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface EmojiInputFieldProps {
  selectedEmoji: string;
}

export const EmojiInputField: React.FC<EmojiInputFieldProps> = ({
  selectedEmoji,
}) => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopyEmoji = async () => {
    if (!selectedEmoji) {
      alert('Please select an emoji first');
      return;
    }

    try {
      await navigator.clipboard.writeText(selectedEmoji);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert('Failed to copy emoji to clipboard');
    }
  };

  const handlePasteEmoji = async () => {
    try {
      const pastedText = await navigator.clipboard.readText();
      setText(prevText => prevText + pastedText);
    } catch {
      alert('Failed to paste from clipboard');
    }
  };

  const handleInsertEmoji = () => {
    if (selectedEmoji) {
      setText(prevText => prevText + selectedEmoji);
    } else {
      alert('Please select an emoji to insert');
    }
  };

  const handleClearText = () => {
    setText('');
  };

  return (
    <motion.div
      className="bg-gray-50 rounded-lg shadow-lg p-6 mb-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-4 pb-4 border-b border-gray-300">
        <p className="text-sm font-semibold text-gray-600 mb-2">Selected:</p>
        <div className="flex items-center gap-4">
          <div className="text-5xl min-w-16 text-center">
            {selectedEmoji || '(none)'}
          </div>
          <motion.button
            onClick={handleCopyEmoji}
            disabled={!selectedEmoji}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedEmoji
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            whileHover={selectedEmoji ? { scale: 1.05 } : {}}
            whileTap={selectedEmoji ? { scale: 0.95 } : {}}
          >
            {copied ? '✓ Copied' : 'Copy'}
          </motion.button>
        </div>
      </div>

      <div className="mb-4">
        <textarea
          placeholder="Text with emojis..."
          value={text}
          onChange={e => setText(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={4}
        />
      </div>

      <div className="flex gap-2">
        <motion.button
          onClick={handleInsertEmoji}
          disabled={!selectedEmoji}
          className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
            selectedEmoji
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          whileHover={selectedEmoji ? { scale: 1.02 } : {}}
          whileTap={selectedEmoji ? { scale: 0.98 } : {}}
        >
          Insert Emoji
        </motion.button>
        <motion.button
          onClick={handlePasteEmoji}
          className="flex-1 px-4 py-2 rounded-lg font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Paste
        </motion.button>
        <motion.button
          onClick={handleClearText}
          className="flex-1 px-4 py-2 rounded-lg font-semibold bg-white border border-gray-300 text-blue-500 hover:bg-gray-50 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Clear
        </motion.button>
      </div>
    </motion.div>
  );
};

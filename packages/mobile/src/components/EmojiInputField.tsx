import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';

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
      Alert.alert('No emoji selected', 'Please select an emoji first');
      return;
    }

    try {
      await Clipboard.setStringAsync(selectedEmoji);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      Alert.alert('Error', 'Failed to copy emoji to clipboard');
    }
  };

  const handlePasteEmoji = async () => {
    try {
      const pastedText = await Clipboard.getStringAsync();
      setText(prevText => prevText + pastedText);
    } catch (error) {
      Alert.alert('Error', 'Failed to paste from clipboard');
    }
  };

  const handleInsertEmoji = () => {
    if (selectedEmoji) {
      setText(prevText => prevText + selectedEmoji);
    } else {
      Alert.alert('No emoji selected', 'Please select an emoji to insert');
    }
  };

  const handleClearText = () => {
    setText('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.selectedEmojiContainer}>
        <Text style={styles.selectedEmojiLabel}>Selected:</Text>
        <Text style={styles.selectedEmoji}>
          {selectedEmoji || '(none)'}
        </Text>
        <TouchableOpacity
          style={styles.copyButton}
          onPress={handleCopyEmoji}
          disabled={!selectedEmoji}
        >
          <Text style={styles.copyButtonText}>
            {copied ? '✓ Copied' : 'Copy'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Text with emojis..."
          placeholderTextColor="#999"
          value={text}
          onChangeText={setText}
          multiline
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, !selectedEmoji && styles.buttonDisabled]}
          onPress={handleInsertEmoji}
          disabled={!selectedEmoji}
        >
          <Text style={styles.buttonText}>Insert Emoji</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handlePasteEmoji}
        >
          <Text style={styles.buttonText}>Paste</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary]}
          onPress={handleClearText}
        >
          <Text style={styles.buttonSecondaryText}>Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F9F9F9',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  selectedEmojiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  selectedEmojiLabel: {
    fontSize: 12,
    color: '#666',
    marginRight: 8,
    fontWeight: '600',
  },
  selectedEmoji: {
    fontSize: 28,
    marginRight: 12,
    flex: 1,
  },
  copyButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  copyButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: 12,
  },
  textInput: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#000',
    minHeight: 60,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#CCC',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  buttonSecondary: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  buttonSecondaryText: {
    color: '#007AFF',
    fontSize: 12,
    fontWeight: '600',
  },
});

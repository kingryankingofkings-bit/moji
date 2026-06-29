import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Linking,
  SafeAreaView,
} from 'react-native';

interface KeyboardSetupScreenProps {
  onDismiss: () => void;
}

const IOS_STEPS = [
  { icon: '⚙️', text: 'Open the Settings app' },
  { icon: '📱', text: 'Tap General → Keyboard' },
  { icon: '⌨️', text: 'Tap Keyboards → Add New Keyboard…' },
  { icon: '✅', text: 'Select Moji from the list' },
  { icon: '🌐', text: 'When typing, tap the globe 🌐 key to switch to Moji' },
];

const ANDROID_STEPS = [
  { icon: '⚙️', text: 'Open the Settings app' },
  { icon: '📱', text: 'Go to General Management → Language & Input' },
  { icon: '⌨️', text: 'Tap On-screen Keyboard → Manage Keyboards' },
  { icon: '✅', text: 'Toggle on Moji Emoji Keyboard' },
  { icon: '⌨️', text: 'When typing, tap the keyboard icon in the toolbar to switch to Moji' },
];

const steps = Platform.OS === 'ios' ? IOS_STEPS : ANDROID_STEPS;

export const KeyboardSetupScreen: React.FC<KeyboardSetupScreenProps> = ({ onDismiss }) => {
  const openSettings = () => Linking.openSettings();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} bounces={false}>
        <View style={styles.header}>
          <Text style={styles.icon}>⌨️</Text>
          <Text style={styles.title}>Enable Moji Keyboard</Text>
          <Text style={styles.subtitle}>
            Follow these steps to set up Moji as your{'\n'}
            {Platform.OS === 'ios' ? 'iOS' : 'Android'} emoji keyboard
          </Text>
        </View>

        <View style={styles.stepsContainer}>
          {steps.map((step, index) => (
            <View key={index} style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.stepIcon}>{step.icon}</Text>
              <Text style={styles.stepText}>{step.text}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.settingsButton} onPress={openSettings}>
          <Text style={styles.settingsButtonText}>Open Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dismissButton} onPress={onDismiss}>
          <Text style={styles.dismissButtonText}>I've enabled it, let's go →</Text>
        </TouchableOpacity>

        <Text style={styles.note}>
          You can return to this guide anytime from the settings icon in the app.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    padding: 24,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  icon: {
    fontSize: 56,
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  stepsContainer: {
    width: '100%',
    marginBottom: 28,
    gap: 16,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 14,
    gap: 12,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 14,
  },
  stepIcon: {
    fontSize: 22,
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    color: '#222',
    lineHeight: 20,
  },
  settingsButton: {
    width: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  settingsButtonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '600',
  },
  dismissButton: {
    width: '100%',
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  dismissButtonText: {
    color: '#007AFF',
    fontSize: 17,
    fontWeight: '600',
  },
  note: {
    fontSize: 13,
    color: '#AAA',
    textAlign: 'center',
    lineHeight: 18,
  },
});

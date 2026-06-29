# Moji - Cross-Platform Emoji Keyboard

A feature-rich, fast emoji keyboard for Android, iOS, and desktop with beautiful animations, favorites, recently used tracking, and full skin tone variant support.

## Features

✨ **Core Features**
- 🎯 Full emoji database with 300+ emojis
- 🔍 Lightning-fast search and filtering
- ❤️ Favorites system (long-press on mobile, right-click on web)
- 🕐 Recently used emoji tracking
- 👥 Complete skin tone variant support
- 📋 Copy to clipboard functionality
- ⚡ Optimized performance on all platforms

🎨 **Design & UX**
- Beautiful, intuitive interface
- Toggle-able animations for smooth interactions
- Category-based emoji organization
- Touch-friendly on mobile, mouse-friendly on web
- Dark/Light mode support (web)

📱 **Cross-Platform**
- **Android**: Native React Native app with IME integration ready
- **iOS**: Native React Native app with keyboard extension ready
- **Desktop/Web**: Modern Next.js web app

## Project Structure

```
moji/
├── packages/
│   ├── shared/          # Core logic, emoji database, storage
│   ├── mobile/          # React Native app (iOS/Android)
│   └── web/             # Next.js web app (Desktop)
├── package.json         # Workspace configuration
└── README.md
```

### Shared Package (`packages/shared`)
- **Emoji Database**: Comprehensive emoji data with categories and keywords
- **Type Definitions**: TypeScript types for emoji data
- **Storage Layer**: Abstract storage adapter for favorites and recent emojis
- **Utilities**: Skin tone handling and emoji manipulation

### Mobile Package (`packages/mobile`)
- React Native app using Expo
- Native iOS and Android support
- Secure storage with `expo-secure-store`
- Clipboard integration with `expo-clipboard`
- Ready for keyboard extension setup

### Web Package (`packages/web`)
- Next.js 14 with App Router
- Tailwind CSS for styling
- Framer Motion for animations
- LocalStorage for persistence
- Fully responsive design

## Installation

### Prerequisites
- Node.js 18+
- Yarn or npm
- Expo CLI (for mobile development)
- iOS: macOS with Xcode
- Android: Android Studio and SDK

### Setup

1. **Clone and install dependencies**
```bash
git clone <repo>
cd moji
yarn install
```

2. **Development**

**Run web version:**
```bash
yarn workspace @moji/web dev
# Visit http://localhost:3000
```

**Run mobile version:**
```bash
yarn workspace @moji/mobile start
# Follow Expo CLI prompts to run on iOS/Android
```

3. **Build for production**
```bash
yarn build
```

## Usage

### Web (Desktop)
1. Visit the app in your browser
2. Search or browse emoji categories
3. Click any emoji to select it
4. Right-click to add/remove from favorites
5. Use buttons to insert, copy, or paste
6. Toggle animations on/off in the header

### Mobile (iOS/Android)
1. Open the app
2. Browse emojis by category or search
3. Long-press emoji to add to favorites (red dot indicator)
4. Tap to select and insert into the text field
5. Use the input field area to compose and copy text

## Emoji Categories

- 😀 **Smileys & Emotion** - 40+ emojis
- 👋 **People** - 25+ hand gestures and body parts (with skin tones)
- 🌸 **Nature** - 15+ animals, plants, and natural elements
- 🍎 **Food & Drink** - 20+ food and beverage emojis
- ✈️ **Travel & Places** - 15+ travel and location emojis
- ⚽ **Activities** - 10+ sports and games
- 💡 **Objects** - 20+ everyday objects
- ❤️ **Symbols** - 25+ hearts and symbols
- 🏳️ **Flags** - Flag support ready

## Configuration

### Animation Toggle
Enable/disable animations for better performance on older devices or personal preference. Toggle is available in the web UI, and can be configured in mobile code.

### Storage Persistence
- **Web**: Uses browser's localStorage
- **Mobile**: Uses Expo's SecureStore for encrypted storage

### Skin Tones
All hand/person emojis support 5 skin tone variants:
- 🏻 Light
- 🏼 Medium-Light
- 🏽 Medium
- 🏾 Medium-Dark
- 🏿 Dark

## API Reference

### Core Functions (Shared Package)

#### Emoji Database
```typescript
import {
  getEmojisByCategory,
  searchEmojis,
  getAllCategories,
  emojiDatabase,
} from '@moji/shared';

// Get emojis by category
const smileys = getEmojisByCategory(EmojiCategory.SMILEYS);

// Search emojis
const results = searchEmojis('smile');

// Get all categories
const categories = getAllCategories();
```

#### Storage
```typescript
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  getRecentEmojis,
  addRecentEmoji,
} from '@moji/shared';

// Work with favorites
await addFavorite('😀');
const favorites = await getFavorites();

// Work with recently used
await addRecentEmoji('😀');
const recent = await getRecentEmojis();
```

#### Skin Tones
```typescript
import {
  applySkinTone,
  removeSkinTone,
  hasSkinTone,
  getAllSkinToneVariants,
} from '@moji/shared';

const darkWave = applySkinTone('👋', SkinTone.DARK);
const variants = getAllSkinToneVariants('👋');
```

## Performance Considerations

- ✅ Optimized emoji rendering with FlatList (mobile)
- ✅ Debounced search with 300ms delay
- ✅ Memoized emoji data to prevent unnecessary re-renders
- ✅ Virtual scrolling ready (can be added if needed)
- ✅ Lazy-loaded animations
- ✅ Efficient storage operations

## Future Enhancements

- [ ] Keyboard IME integration for Android
- [ ] iOS keyboard extension
- [ ] Custom emoji support
- [ ] Emoji variations/modifiers (ZWJ sequences)
- [ ] Emoji history/analytics
- [ ] Cloud sync across devices
- [ ] Emoji packs/themes
- [ ] Accessibility improvements (VoiceOver, TalkBack)
- [ ] Haptic feedback on mobile
- [ ] Dark mode on mobile

## Contributing

1. Create a feature branch
2. Make your changes
3. Test on web and mobile
4. Submit a pull request

## License

MIT

## Support

For issues, feature requests, or questions, please open an issue on GitHub.

---

**Made with ❤️ for emoji lovers everywhere**

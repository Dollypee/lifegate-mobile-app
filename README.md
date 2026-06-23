# Lifegate Outreach Center — Mobile App

A full-featured React Native (Expo) mobile app for Lifegate Outreach Center.

## Features
- 🏠 **Home** — Daily verse, quick access grid, featured sermon, upcoming events
- 🎙 **Sermons** — Searchable sermon library with filtering by series/topic
- 📖 **Bible Reader** — KJV, WEB & ASV, book/chapter/verse picker, bookmarks, highlights
- 🎧 **Audio Bible** — Text-to-speech playback, repeat any verse 1-50 times, adjustable speed, single verse or full chapter mode
- 🎵 **Music** — Worship music library linking to YouTube, Spotify, SoundCloud
- 📅 **Events** — Church calendar with categories and details
- 👤 **Members** — New member & first-timer registration form
- 🔔 **Notifications** — Push notification centre
- ⚙️ **Settings** — Dark/light mode toggle, preferences
- 🌙 **Dark Mode** — Full dark/light theme support throughout

## Quick Start

### Prerequisites
- Node.js 18+
- Expo CLI: `npm install -g expo`
- Expo Go app on your phone (iOS/Android)

### Run the App

```bash
# Install dependencies
npm install

# Start development server
npx expo start

# Scan the QR code with Expo Go on your phone
```

### Run on Emulator
```bash
# iOS Simulator (Mac only)
npx expo start --ios

# Android Emulator
npx expo start --android
```

## Project Structure
```
src/
├── components/         # Reusable UI components (Card, Badge, Header)
├── context/            # ThemeContext (dark/light mode)
├── data/               # Sample data + Bible verse bundles (KJV, WEB, ASV)
├── navigation/         # Bottom tab + stack navigator
├── screens/
│   ├── Home/           # HomeScreen
│   ├── Sermons/        # SermonsScreen
│   ├── Bible/          # BibleScreen (read)
│   ├── AudioBible/     # AudioBibleScreen (listen + repeat)
│   ├── Music/          # MusicScreen
│   ├── Events/         # EventsScreen
│   ├── Members/        # MembersScreen (registration)
│   ├── Notifications/  # NotificationsScreen
│   └── Settings/       # SettingsScreen
└── types/              # TypeScript types
```

## Audio Bible — How to Use
1. Tap **Audio Bible** from Home or the Bible tab
2. Select a **Book** and **Chapter** (tap the title in the hero)
3. Choose **Version**: KJV, WEB, or ASV
4. Select **Play Mode**: Single Verse or Full Chapter
5. Pick a **verse** (for single mode)
6. Set **Repeat Count** (1×, 2×, 3×, 5×, 7×, 10×, 15×, 20× or use +/- for custom up to 50)
7. Set **Playback Speed** (0.5x to 2x)
8. Tap **Play** — the verse will be spoken the chosen number of times
9. Tap **Stop** at any time

> **Bundled Chapters**: John 3, Psalms 23 & 119, Proverbs 3, Philippians 4, Romans 8, Isaiah 40, Matthew 6 & 11, Joshua 1, Jeremiah 29, Genesis 1, Revelation 1.
> For the full Bible, add a `bible-api` integration (see BIBLE_INTEGRATION.md).

## Adding Full Bible Data
See `BIBLE_INTEGRATION.md` for instructions on integrating the complete KJV, WEB and ASV from a free Bible API or offline JSON files.

## Build for Production
```bash
# Install EAS CLI
npm install -g eas-cli

# Configure your project
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

## Tech Stack
- **React Native** with **Expo SDK 56**
- **TypeScript** — fully typed
- **React Navigation** v6 (bottom tabs + native stack)
- **NativeWind** — Tailwind CSS for React Native
- **Expo Speech** — Audio Bible text-to-speech
- **Expo Linear Gradient** — Beautiful gradient headers
- **Expo AV** — Future audio/video playback
- **Expo Notifications** — Push notification support
- **AsyncStorage** — Theme preference persistence

## Customisation
- Replace sample data in `src/data/sampleData.ts` with your real content
- Update church info, colours in `src/context/ThemeContext.tsx`
- Add push notification backend integration as needed
- The primary brand colour is `#C8400A` (burnt orange) — change in `ThemeContext.tsx`

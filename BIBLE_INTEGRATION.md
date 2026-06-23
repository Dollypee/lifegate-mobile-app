# Full Bible Integration Guide

The app comes with key popular passages pre-bundled (John 3, Psalms 23, Proverbs 3, etc.).
To unlock the **complete KJV, WEB and ASV** (all 66 books), follow one of these approaches:

---

## Option A: Free Bible API (Recommended for Production)

Use [api.bible](https://scripture.api.bible) — free tier, 5000 requests/day.

1. Register at https://scripture.api.bible and get an API key
2. Install axios: `npm install axios`
3. Create `src/utils/bibleApi.ts`:

```typescript
import axios from 'axios';

const API_KEY = 'YOUR_API_BIBLE_KEY';
const BASE = 'https://api.scripture.api.bible/v1';

// Bible IDs on api.bible:
// KJV: de4e12af7f28f599-02
// WEB: 9879dbb7cfe39e4d-04
// ASV: 06125adad2d5898a-01

export async function fetchVerse(bibleId: string, bookId: string, chapter: number, verse: number) {
  const res = await axios.get(
    `${BASE}/bibles/${bibleId}/verses/${bookId}.${chapter}.${verse}`,
    { headers: { 'api-key': API_KEY }, params: { 'content-type': 'text' } }
  );
  return res.data.data.content.replace(/<[^>]*>/g, '').trim();
}

export async function fetchChapter(bibleId: string, bookId: string, chapter: number) {
  const res = await axios.get(
    `${BASE}/bibles/${bibleId}/chapters/${bookId}.${chapter}/verses`,
    { headers: { 'api-key': API_KEY } }
  );
  return res.data.data; // array of verse objects
}
```

---

## Option B: Offline JSON Files (Best for Offline Use)

Download pre-built Bible JSON files (freely available):

- KJV: https://github.com/aruljohn/Bible-kjv (JSON format)
- WEB: https://github.com/scrollmapper/bible_databases
- ASV: https://github.com/scrollmapper/bible_databases

Structure expected:
```json
{
  "John": {
    "3": {
      "16": "For God so loved the world..."
    }
  }
}
```

Place files as:
- `src/data/kjv_full.json`
- `src/data/web_full.json`  
- `src/data/asv_full.json`

Then update `src/data/bibleVerses.ts`:
```typescript
import KJV_FULL from './kjv_full.json';
import WEB_FULL from './web_full.json';
import ASV_FULL from './asv_full.json';
```

> Note: Full Bible JSON is ~4-6MB per version. Bundle all three for ~15MB total — 
> acceptable for a church app. Use dynamic imports if bundle size is a concern.

---

## Option C: YouVersion / Bible Gateway Deep Links

For audio Bible with professional voice recordings, open the native app:

```typescript
import { Linking } from 'react-native';

// Opens YouVersion app or website for the passage
const openYouVersion = (book: string, chapter: number, verse: number) => {
  const url = `youversion://bible?reference=${book}.${chapter}.${verse}`;
  Linking.openURL(url).catch(() => {
    Linking.openURL(`https://www.bible.com/bible/1/${book}.${chapter}.${verse}`);
  });
};
```

---

The current **expo-speech** implementation works offline and is great for meditation/memorisation.
For professional narration audio files, consider purchasing/licensing from:
- Faithlife / Logos Bible Software
- American Bible Society
- Faith Comes By Hearing (https://www.faithcomesbyhearing.com)

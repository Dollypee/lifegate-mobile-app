// Comprehensive KJV Bible verses - Key passages bundled inline
// Full Bible data loaded from JSON files (kjv.json, web.json, asv.json)
// This provides immediate access to popular verses

import KJV_FULL from './kjv_full.json';
// import WEB_FULL from './web_full.json';
import ASV_FULL from './asv_full.json';

type BibleData = Record<string, Record<number, Record<number, string>>>;

function convertBibleJson(json: any): BibleData {
  return json.books.reduce((books: BibleData, book: any) => {
    books[book.name] = {};

    book.chapters.forEach((chapter: any) => {
      books[book.name][chapter.chapter] = {};

      chapter.verses.forEach((verse: any) => {
        books[book.name][chapter.chapter][verse.verse] = verse.text;
      });
    });

    return books;
  }, {});
}

export const KJV_POPULAR = convertBibleJson(KJV_FULL);
// export const WEB_POPULAR = convertBibleJson(WEB_FULL);
export const ASV_POPULAR = convertBibleJson(ASV_FULL);

type VersionKey = 'KJV'  | 'ASV';
const VERSION_DATA: Record<VersionKey, typeof KJV_POPULAR> = {
  KJV: KJV_POPULAR,
  // WEB: WEB_POPULAR,
  ASV: ASV_POPULAR,
};

export function getVerse(book: string, chapter: number, verse: number, version: VersionKey = 'KJV'): string | null {
  const data = VERSION_DATA[version];
  return data?.[book]?.[chapter]?.[verse] || KJV_POPULAR?.[book]?.[chapter]?.[verse] || null;
}

export function getChapterVerses(book: string, chapter: number, version: VersionKey = 'KJV'): Record<number, string> {
  const data = VERSION_DATA[version];
  return data?.[book]?.[chapter] || KJV_POPULAR?.[book]?.[chapter] || {};
}

export const DAILY_VERSE = {
  text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
  reference: "Proverbs 3:5-6",
  version: "KJV"
};

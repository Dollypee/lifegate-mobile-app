export interface Sermon {
  id: string;
  title: string;
  preacher: string;
  series?: string;
  topic?: string;
  date: string;
  audioUrl?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  description?: string;
  duration?: string;
  isFeatured?: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  bannerUrl?: string;
  category: 'service' | 'fellowship' | 'outreach' | 'youth' | 'prayer' | 'special';
}

export interface MusicItem {
  id: string;
  title: string;
  artist: string;
  album?: string;
  streamUrl: string;
  platform: 'youtube' | 'spotify' | 'soundcloud' | 'other';
  thumbnailUrl?: string;
  isFavorite?: boolean;
}

export interface BibleVerse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
  version: 'KJV' | 'WEB' | 'ASV';
}

export interface ReadingPlan {
  id: string;
  title: string;
  description: string;
  days: ReadingDay[];
  currentDay: number;
  streak: number;
}

export interface ReadingDay {
  day: number;
  passages: string[];
  completed: boolean;
}

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  joinDate: string;
  isFirstTimer: boolean;
  department?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  date: string;
  isRead: boolean;
  type: 'sermon' | 'event' | 'announcement' | 'devotional';
}

export interface Bookmark {
  id: string;
  book: string;
  chapter: number;
  verse: number;
  text: string;
  version: string;
  note?: string;
  highlight?: string;
  createdAt: string;
}

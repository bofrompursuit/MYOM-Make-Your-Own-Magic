export type TemplateKind = 'book-cover' | 'book-page' | 'event-invite' | 'instagram';

export interface TemplateSpec {
  id: TemplateKind;
  name: string;
  width: number;
  height: number;
  description: string;
}

export type InstagramSizeKey = 'square' | 'portrait' | 'landscape' | 'story';

export interface InstagramSizeSpec {
  key: InstagramSizeKey;
  label: string;
  width: number;
  height: number;
  description: string;
}

export const INSTAGRAM_SIZES: Record<InstagramSizeKey, InstagramSizeSpec> = {
  square: {
    key: 'square',
    label: 'Square (1080×1080)',
    width: 1080,
    height: 1080,
    description: 'Standard feed post',
  },
  portrait: {
    key: 'portrait',
    label: 'Portrait (1080×1350)',
    width: 1080,
    height: 1350,
    description: 'Portrait feed post',
  },
  landscape: {
    key: 'landscape',
    label: 'Landscape (1080×566)',
    width: 1080,
    height: 566,
    description: 'Landscape feed post',
  },
  story: {
    key: 'story',
    label: 'Story / Reel (1080×1920)',
    width: 1080,
    height: 1920,
    description: 'Story or Reel cover',
  },
};

export const TEMPLATE_SPECS: Record<TemplateKind, TemplateSpec> = {
  'book-cover': {
    id: 'book-cover',
    name: 'Book Cover',
    width: 405,
    height: 585,
    description: 'Standard 6×9" book cover (72 DPI)',
  },
  'book-page': {
    id: 'book-page',
    name: 'Book Page',
    width: 396,
    height: 612,
    description: 'Standard 5.5×8.5" interior page',
  },
  'event-invite': {
    id: 'event-invite',
    name: 'Event Invite',
    width: 360,
    height: 504,
    description: '5×7" invite (portrait)',
  },
  instagram: {
    id: 'instagram',
    name: 'Instagram Post',
    width: INSTAGRAM_SIZES.square.width,
    height: INSTAGRAM_SIZES.square.height,
    description: INSTAGRAM_SIZES.square.label,
  },
};

// Editable fields per template type
export interface BookCoverData {
  title: string;
  subtitle: string;
  author: string;
  backgroundColor: string;
  textColor: string;
}

export interface BookPageData {
  title: string;
  body: string;
  pageNumber: string;
  backgroundColor: string;
  textColor: string;
}

export interface EventInviteData {
  title: string;
  subtitle: string;
  date: string;
  time: string;
  place: string;
  rsvp: string;
  backgroundColor: string;
  textColor: string;
}

export interface InstagramSticker {
  id: string;
  text: string;
  x: number; // 0–1 relative
  y: number; // 0–1 relative
  scale: number;
  rotation: number;
}

export interface InstagramData {
  headline: string;
  subtext: string;
  backgroundColor: string;
  textColor: string;
  size: InstagramSizeKey;
  backgroundImage?: string; // data URL
  stickers: InstagramSticker[];
}

export type TemplateData =
  | { kind: 'book-cover'; data: BookCoverData }
  | { kind: 'book-page'; data: BookPageData }
  | { kind: 'event-invite'; data: EventInviteData }
  | { kind: 'instagram'; data: InstagramData };

export const DEFAULT_BOOK_COVER: BookCoverData = {
  title: 'Your Book Title',
  subtitle: 'A compelling subtitle here',
  author: 'Author Name',
  backgroundColor: '#1a1a2e',
  textColor: '#eaeaea',
};

export const DEFAULT_BOOK_PAGE: BookPageData = {
  title: 'Chapter One',
  body: 'Your story begins here. Replace this with your own text and style the page to match your book.',
  pageNumber: '1',
  backgroundColor: '#faf8f5',
  textColor: '#1a1a1a',
};

export const DEFAULT_EVENT_INVITE: EventInviteData = {
  title: 'You\'re Invited',
  subtitle: 'To a special evening',
  date: 'Saturday, March 15',
  time: '7:00 PM',
  place: '123 Main Street',
  rsvp: 'RSVP by March 1 • name@email.com',
  backgroundColor: '#0f172a',
  textColor: '#f8fafc',
};

export const DEFAULT_INSTAGRAM: InstagramData = {
  headline: 'Your Headline',
  subtext: 'Supporting text or CTA',
  backgroundColor: '#0f0f23',
  textColor: '#ffffff',
  size: 'square',
  stickers: [],
};

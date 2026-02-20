export type TemplateKind = 'book-cover' | 'book-page' | 'event-invite' | 'instagram';

export type FontKey = 'dm-sans' | 'inter' | 'playfair' | 'georgia' | 'system';

export interface FontOption {
  key: FontKey;
  label: string;
  fontFamily: string;
}

export const FONT_OPTIONS: Record<FontKey, FontOption> = {
  'dm-sans': { key: 'dm-sans', label: 'DM Sans', fontFamily: '"DM Sans", "Helvetica Neue", sans-serif' },
  inter: { key: 'inter', label: 'Inter', fontFamily: '"Inter", system-ui, sans-serif' },
  playfair: { key: 'playfair', label: 'Playfair Display', fontFamily: '"Playfair Display", Georgia, serif' },
  georgia: { key: 'georgia', label: 'Georgia', fontFamily: 'Georgia, "Times New Roman", serif' },
  system: { key: 'system', label: 'System', fontFamily: 'system-ui, -apple-system, sans-serif' },
};

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
  fontFamily: FontKey;
}

export interface BookPageData {
  title: string;
  body: string;
  pageNumber: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: FontKey;
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
  fontFamily: FontKey;
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
  headlineX: number; // 0–1
  headlineY: number;
  subtextX: number;
  subtextY: number;
  backgroundColor: string;
  textColor: string;
  fontFamily: FontKey;
  size: InstagramSizeKey;
  backgroundImage?: string;
  backgroundImageScale: number; // 0.5–2
  backgroundImageX: number; // 0–1
  backgroundImageY: number;
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
  fontFamily: 'georgia',
};

export const DEFAULT_BOOK_PAGE: BookPageData = {
  title: 'Chapter One',
  body: 'Your story begins here. Replace this with your own text and style the page to match your book.',
  pageNumber: '1',
  backgroundColor: '#faf8f5',
  textColor: '#1a1a1a',
  fontFamily: 'georgia',
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
  fontFamily: 'playfair',
};

export const DEFAULT_INSTAGRAM: InstagramData = {
  headline: 'Your Headline',
  subtext: 'Supporting text or CTA',
  headlineX: 0.5,
  headlineY: 0.4,
  subtextX: 0.5,
  subtextY: 0.6,
  backgroundColor: '#0f0f23',
  textColor: '#ffffff',
  fontFamily: 'dm-sans',
  size: 'square',
  backgroundImageScale: 1,
  backgroundImageX: 0.5,
  backgroundImageY: 0.5,
  stickers: [],
};

export interface Template {
  id: string;
  name: string;
  occasion: string;
  background: string;
  textColor: string;
  accentColor: string;
  defaultMessage: string;
  decorations: Decoration[];
  fontFamily: string;
}

export interface Decoration {
  type: 'emoji' | 'icon';
  content: string;
  position: { x: number; y: number };
  size: number;
}

export const templates: Template[] = [
  {
    id: 'diwali',
    name: 'Diwali Celebration',
    occasion: 'Diwali',
    background: 'linear-gradient(135deg, #FF6B35 0%, #FF8E53 50%, #FFA500 100%)',
    textColor: '#FFFFFF',
    accentColor: '#FFD700',
    defaultMessage: 'Happy Diwali',
    fontFamily: 'Playfair Display',
    decorations: [
      { type: 'emoji', content: '🪔', position: { x: 10, y: 10 }, size: 60 },
      { type: 'emoji', content: '✨', position: { x: 85, y: 15 }, size: 50 },
      { type: 'emoji', content: '🪔', position: { x: 15, y: 85 }, size: 55 },
      { type: 'emoji', content: '✨', position: { x: 82, y: 88 }, size: 48 },
    ],
  },
  {
    id: 'birthday',
    name: 'Birthday Celebration',
    occasion: 'Birthday',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    textColor: '#FFFFFF',
    accentColor: '#FFD700',
    defaultMessage: 'Happy Birthday',
    fontFamily: 'Playfair Display',
    decorations: [
      { type: 'emoji', content: '🎂', position: { x: 12, y: 12 }, size: 60 },
      { type: 'emoji', content: '🎈', position: { x: 82, y: 10 }, size: 65 },
      { type: 'emoji', content: '🎉', position: { x: 15, y: 82 }, size: 58 },
      { type: 'emoji', content: '🎁', position: { x: 85, y: 85 }, size: 55 },
    ],
  },
  {
    id: 'christmas',
    name: 'Christmas Joy',
    occasion: 'Christmas',
    background: 'linear-gradient(135deg, #C33764 0%, #1D2671 50%, #00416A 100%)',
    textColor: '#FFFFFF',
    accentColor: '#FFD700',
    defaultMessage: 'Merry Christmas',
    fontFamily: 'Playfair Display',
    decorations: [
      { type: 'emoji', content: '🎄', position: { x: 10, y: 12 }, size: 65 },
      { type: 'emoji', content: '⭐', position: { x: 85, y: 8 }, size: 55 },
      { type: 'emoji', content: '🎅', position: { x: 12, y: 85 }, size: 60 },
      { type: 'emoji', content: '🎁', position: { x: 83, y: 87 }, size: 58 },
    ],
  },
  {
    id: 'eid',
    name: 'Eid Mubarak',
    occasion: 'Eid',
    background: 'linear-gradient(135deg, #4A00E0 0%, #8E2DE2 50%, #DA22FF 100%)',
    textColor: '#FFFFFF',
    accentColor: '#FFD700',
    defaultMessage: 'Eid Mubarak',
    fontFamily: 'Playfair Display',
    decorations: [
      { type: 'emoji', content: '🌙', position: { x: 12, y: 10 }, size: 60 },
      { type: 'emoji', content: '⭐', position: { x: 85, y: 12 }, size: 50 },
      { type: 'emoji', content: '🕌', position: { x: 15, y: 85 }, size: 65 },
      { type: 'emoji', content: '✨', position: { x: 82, y: 88 }, size: 48 },
    ],
  },
];

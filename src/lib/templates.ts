import diwaliImage from '@/assets/diwali-bg.jpg';
import birthdayImage from '@/assets/birthday-bg.jpg';
import christmasImage from '@/assets/christmas-bg.jpg';
import eidImage from '@/assets/eid-bg.jpg';

export interface Template {
  id: string;
  name: string;
  occasion: string;
  backgroundImage: string;
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
    backgroundImage: diwaliImage,
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
    backgroundImage: birthdayImage,
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
    backgroundImage: christmasImage,
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
    backgroundImage: eidImage,
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

import { Categories } from 'emoji-picker-react';
import dynamic from 'next/dynamic';

export const Picker = dynamic(
  () => {
    return import('emoji-picker-react');
  },
  { ssr: false }
);

export const previewConfig = {
  defaultEmoji: '1f60a',
  defaultCaption: '관련 이모티콘을 선택해주세요!',
  showPreview: true,
};

export const categoryConfig = [
  {
    category: 'suggested' as Categories,
    name: 'Recently Used',
  },
  {
    category: 'food_drink' as Categories,
    name: 'Food & Drink',
  },
  {
    category: 'animals_nature' as Categories,
    name: 'Animal & Nature',
  },
  {
    category: 'travel_places' as Categories,
    name: 'Travel & Places',
  },
  {
    category: 'activities' as Categories,
    name: 'Activities',
  },
  {
    category: 'objects' as Categories,
    name: 'Objects',
  },
  {
    category: 'symbols' as Categories,
    name: 'Symbols',
  },
];

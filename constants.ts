import { ServiceItem, Stylist } from './types';

export const SERVICES: ServiceItem[] = [
  {
    id: '1',
    name: 'Signature Cut & Style',
    price: '$85+',
    description: 'Precision cut tailored to your face shape and lifestyle, finished with a luxury blowout.',
    duration: '60 min',
    category: 'hair'
  },
  {
    id: '2',
    name: 'Balayage & Gloss',
    price: '$220+',
    description: 'Hand-painted highlights for a natural, sun-kissed look, including a shine-enhancing gloss.',
    duration: '180 min',
    category: 'color'
  },
  {
    id: '3',
    name: 'Keratin Treatment',
    price: '$300+',
    description: 'Smoothing therapy that eliminates frizz and improves hair health for up to 4 months.',
    duration: '150 min',
    category: 'hair'
  },
  {
    id: '4',
    name: 'Deep Conditioning Ritual',
    price: '$45',
    description: 'Intense hydration mask with scalp massage to restore vitality.',
    duration: '30 min',
    category: 'spa'
  },
  {
    id: '5',
    name: 'Full Color Transformation',
    price: '$180+',
    description: 'Root-to-tip permanent color using ammonia-free, oil-rich formulas.',
    duration: '120 min',
    category: 'color'
  },
  {
    id: '6',
    name: 'Bridal Updo',
    price: '$150+',
    description: 'Elegant styling for your special day. Trial run recommended.',
    duration: '90 min',
    category: 'hair'
  }
];

export const STYLISTS: Stylist[] = [
  {
    id: 's1',
    name: 'Elena Vance',
    role: 'Creative Director',
    bio: 'With 15 years in Paris and NYC, Elena specializes in transformative cuts and avant-garde styling.',
    imageUrl: 'https://picsum.photos/300/300?random=10'
  },
  {
    id: 's2',
    name: 'Marco Rossi',
    role: 'Color Specialist',
    bio: 'Marco is a master of balayage and color correction, creating seamless, lived-in color dimensions.',
    imageUrl: 'https://picsum.photos/300/300?random=11'
  },
  {
    id: 's3',
    name: 'Sarah Jenkins',
    role: 'Senior Stylist',
    bio: 'Expert in curly hair textures and sustainable beauty practices.',
    imageUrl: 'https://picsum.photos/300/300?random=12'
  }
];

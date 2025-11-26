export enum View {
  HOME = 'HOME',
  SERVICES = 'SERVICES',
  BOOKING = 'BOOKING',
  CONSULTANT = 'CONSULTANT',
  CONTACT = 'CONTACT'
}

export interface ServiceItem {
  id: string;
  name: string;
  price: string;
  description: string;
  duration: string;
  category: 'hair' | 'spa' | 'color';
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

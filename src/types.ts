export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  type?: 'flight' | 'hotel' | 'restaurant' | 'park' | 'general';
  data?: any;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
}

export interface SearchFilters {
  destination: string;
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  budget: number;
  travelers: number;
}

export interface TravelSuggestion {
  type: 'flight' | 'hotel' | 'restaurant' | 'park';
  title: string;
  description: string;
  price?: string;
  rating?: number;
  image?: string;
  location: {
    lat: number;
    lng: number;
  };
}
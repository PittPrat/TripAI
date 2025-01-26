import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { TravelMap } from './components/TravelMap';
import { Message, ChatState, SearchFilters as SearchFiltersType, TravelSuggestion } from './types';
import { Plane, Hotel, Utensils, Trees } from 'lucide-react';
import { SearchFiltersv1 } from './components/SearchFiltersv1';

const generateResponse = async (prompt: string, filters: SearchFiltersType): Promise<Message> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate different types of suggestions based on prompt keywords
  const type = prompt.toLowerCase().includes('flight') ? 'flight' 
    : prompt.toLowerCase().includes('hotel') ? 'hotel'
    : prompt.toLowerCase().includes('restaurant') ? 'restaurant'
    : prompt.toLowerCase().includes('park') ? 'park'
    : 'general';

  // Mock suggestion data
  const mockSuggestions: TravelSuggestion[] = [{
    type: type as any,
    title: `Sample ${type} suggestion`,
    description: `This is a sample ${type} suggestion based on your search for ${filters.destination}`,
    price: type !== 'park' ? '$299' : undefined,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
    location: {
      lat: 40.7128,
      lng: -74.0060
    }
  }];

  return {
    id: Date.now().toString(),
    content: `Here are some ${type} suggestions for your trip to ${filters.destination}`,
    role: 'assistant',
    timestamp: new Date(),
    type,
    data: mockSuggestions
  };
};

function App() {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false
  });
  
  const [filters, setFilters] = useState<SearchFiltersType>({
    destination: '',
    dateRange: {
      start: null,
      end: null
    },
    budget: 0,
    travelers: 1
  });

  const [selectedSuggestion, setSelectedSuggestion] = useState<TravelSuggestion>();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date()
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true
    }));

    try {
      const response = await generateResponse(content, filters);
      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, response],
        isLoading: false
      }));
    } catch (error) {
      console.error('Error generating response:', error);
      setChatState(prev => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plane className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl font-semibold">AtlAI Travel Assistant</h1>
          </div>
          <div className="flex gap-4">
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <Hotel className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <Utensils className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <Trees className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto w-full p-4 space-y-4 flex-1">
        <SearchFiltersv1 filters={filters} onChange={setFilters} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-16rem)]">
          <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatState.messages.map(message => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {chatState.isLoading && (
                <div className="flex items-center gap-2 text-gray-500">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <ChatInput onSend={handleSendMessage} disabled={chatState.isLoading} />
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <TravelMap 
              suggestions={chatState.messages
                .filter(m => m.type && m.data)
                .flatMap(m => m.data)}
              selectedSuggestion={selectedSuggestion}
              onSelectSuggestion={setSelectedSuggestion}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { Message, ChatState } from './types';
import { Brain } from 'lucide-react';

// Simulated response generation
const generateResponse = async (prompt: string): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const responses = [
    "That's an interesting question. Based on my analysis...",
    "Let me help you understand this better...",
    "Here's what I found about your query...",
    "According to my knowledge base..."
  ];
  
  return `${responses[Math.floor(Math.random() * responses.length)]} ${prompt}`;
};

function App() {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages]);

  const handleSendMessage = async (content: string) => {
    // Add user message
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

    // Generate and add AI response
    try {
      const response = await generateResponse(content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date()
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false
      }));
    } catch (error) {
      console.error('Error generating response:', error);
      setChatState(prev => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-2">
          <Brain className="w-8 h-8 text-blue-600" />
          <h1 className="text-xl font-semibold">AI Chat Assistant</h1>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          {chatState.messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <Brain className="w-16 h-16 text-blue-600 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Welcome to AI Chat Assistant</h2>
              <p className="text-gray-600 max-w-md">
                Ask me anything! I'm here to help you with your questions and engage in meaningful conversations.
              </p>
            </div>
          ) : (
            chatState.messages.map(message => (
              <ChatMessage key={message.id} message={message} />
            ))
          )}
          {chatState.isLoading && (
            <div className="p-6 bg-gray-50">
              <div className="flex items-center gap-2 text-gray-500">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input */}
      <ChatInput onSend={handleSendMessage} disabled={chatState.isLoading} />
    </div>
  );
}

export default App;
import React from 'react';
import { Bot, User, Volume2, VolumeX } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../types';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const { speak, stop, isSpeaking, error } = useSpeechSynthesis();

  const handleSpeak = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak(message.content);
    }
  };

  return (
    <div className={`flex gap-4 p-6 ${message.role === 'assistant' ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="flex-shrink-0">
        {message.role === 'assistant' ? (
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
        ) : (
          <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start gap-4">
          <div className="prose max-w-none flex-1">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
          {message.role === 'assistant' && (
            <button
              onClick={handleSpeak}
              className={`p-2 rounded-lg transition-colors ${
                isSpeaking 
                  ? 'bg-blue-100 text-blue-600 hover:bg-blue-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={isSpeaking ? 'Stop speaking' : 'Speak message'}
            >
              {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          )}
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
}
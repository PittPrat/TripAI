import { TravelSuggestion } from '../types';
import { Star, MapPin, DollarSign } from 'lucide-react';

interface TravelSuggestionCardProps {
  suggestion: TravelSuggestion;
  onClick: () => void;
  isSelected: boolean;
}

export function TravelSuggestionCard({ suggestion, onClick, isSelected }: TravelSuggestionCardProps) {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all
        ${isSelected ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'}`}
      onClick={onClick}
    >
      {suggestion.image && (
        <img 
          src={suggestion.image} 
          alt={suggestion.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{suggestion.title}</h3>
          {suggestion.rating && (
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm">{suggestion.rating}</span>
            </div>
          )}
        </div>
        <p className="text-gray-600 text-sm mb-3">{suggestion.description}</p>
        <div className="flex items-center justify-between">
          {suggestion.price && (
            <div className="flex items-center text-green-600">
              <DollarSign className="w-4 h-4" />
              <span className="font-semibold">{suggestion.price}</span>
            </div>
          )}
          <div className="flex items-center text-gray-500">
            <MapPin className="w-4 h-4" />
            <span className="text-sm ml-1">View on map</span>
          </div>
        </div>
      </div>
    </div>
  );
}
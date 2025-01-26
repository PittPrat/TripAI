import React from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import { TravelSuggestion } from '../types';
import { MapPin } from 'lucide-react';

interface TravelMapProps {
  suggestions: TravelSuggestion[];
  selectedSuggestion?: TravelSuggestion;
  onSelectSuggestion: (suggestion: TravelSuggestion) => void;
}

export function TravelMap({ suggestions, selectedSuggestion, onSelectSuggestion }: TravelMapProps) {
  const [viewport, setViewport] = React.useState({
    latitude: 40,
    longitude: -100,
    zoom: 3.5
  });

  return (
    <Map
      {...viewport}
      onMove={evt => setViewport(evt.viewState)}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken="YOUR_MAPBOX_TOKEN"
    >
      {suggestions.map((suggestion, index) => (
        <Marker
          key={index}
          latitude={suggestion.location.lat}
          longitude={suggestion.location.lng}
          onClick={() => onSelectSuggestion(suggestion)}
        >
          <MapPin className={`w-6 h-6 ${
            selectedSuggestion === suggestion 
              ? 'text-blue-600' 
              : 'text-gray-700'
          }`} />
        </Marker>
      ))}

      {selectedSuggestion && (
        <Popup
          latitude={selectedSuggestion.location.lat}
          longitude={selectedSuggestion.location.lng}
          closeButton={true}
          closeOnClick={false}
          onClose={() => onSelectSuggestion(selectedSuggestion)}
        >
          <div className="p-2">
            <h3 className="font-semibold">{selectedSuggestion.title}</h3>
            <p className="text-sm text-gray-600">{selectedSuggestion.description}</p>
            {selectedSuggestion.price && (
              <p className="text-sm font-semibold text-green-600">{selectedSuggestion.price}</p>
            )}
          </div>
        </Popup>
      )}
    </Map>
  );
}
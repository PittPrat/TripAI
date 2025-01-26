import React from 'react';
import DatePicker from 'react-datepicker';
import { SearchFilters } from '../types';
import { Calendar, Users, DollarSign, MapPin } from 'lucide-react';
import "react-datepicker/dist/react-datepicker.css";

interface SearchFiltersProps {
  filters: SearchFiltersv1;
  onChange: (filters: SearchFiltersv1) => void;
}

export function SearchFiltersv1({ filters, onChange }: SearchFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="relative">
        <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Where to?"
          value={filters.destination}
          onChange={(e) => onChange({ ...filters, destination: e.target.value })}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex gap-2">
        <Calendar className="text-gray-400 w-5 h-5 mt-2" />
        <div className="flex-1 grid grid-cols-2 gap-2">
          <DatePicker
            selected={filters.dateRange.start}
            onChange={(date) => 
              onChange({ 
                ...filters, 
                dateRange: { ...filters.dateRange, start: date } 
              })
            }
            selectsStart
            startDate={filters.dateRange.start}
            endDate={filters.dateRange.end}
            placeholderText="Start Date"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <DatePicker
            selected={filters.dateRange.end}
            onChange={(date) => 
              onChange({ 
                ...filters, 
                dateRange: { ...filters.dateRange, end: date } 
              })
            }
            selectsEnd
            startDate={filters.dateRange.start}
            endDate={filters.dateRange.end}
            minDate={filters.dateRange.start}
            placeholderText="End Date"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="relative">
        <DollarSign className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
        <input
          type="number"
          placeholder="Budget"
          value={filters.budget || ''}
          onChange={(e) => onChange({ ...filters, budget: Number(e.target.value) })}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="relative">
        <Users className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
        <input
          type="number"
          placeholder="Travelers"
          value={filters.travelers || ''}
          onChange={(e) => onChange({ ...filters, travelers: Number(e.target.value) })}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
}
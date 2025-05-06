
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SentimentFilterProps {
  onFilterChange: (filter: FilterState) => void;
  filters: FilterState;
}

export interface FilterState {
  platform: string;
  region: string;
  sentiment: string;
  search: string;
}

const SentimentFilter: React.FC<SentimentFilterProps> = ({ onFilterChange, filters }) => {
  const handleSelectChange = (value: string, name: keyof FilterState) => {
    onFilterChange({
      ...filters,
      [name]: value
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      search: e.target.value
    });
  };

  const handleReset = () => {
    onFilterChange({
      platform: 'all',
      region: 'all',
      sentiment: 'all',
      search: ''
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6 border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
          <Select 
            value={filters.platform} 
            onValueChange={(value) => handleSelectChange(value, 'platform')}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
          <Select 
            value={filters.region} 
            onValueChange={(value) => handleSelectChange(value, 'region')}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="abu-dhabi">Abu Dhabi</SelectItem>
              <SelectItem value="dubai">Dubai</SelectItem>
              <SelectItem value="sharjah">Sharjah</SelectItem>
              <SelectItem value="ajman">Ajman</SelectItem>
              <SelectItem value="umm-al-quwain">Umm Al Quwain</SelectItem>
              <SelectItem value="ras-al-khaimah">Ras Al Khaimah</SelectItem>
              <SelectItem value="fujairah">Fujairah</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sentiment</label>
          <Select 
            value={filters.sentiment}
            onValueChange={(value) => handleSelectChange(value, 'sentiment')}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Sentiment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sentiments</SelectItem>
              <SelectItem value="positive">Positive</SelectItem>
              <SelectItem value="neutral">Neutral</SelectItem>
              <SelectItem value="negative">Negative</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="relative">
            <Search className="absolute top-2.5 left-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by keyword..."
              value={filters.search}
              onChange={handleSearchChange}
              className="pl-9"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Button 
          variant="outline" 
          onClick={handleReset}
          className="text-sm"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default SentimentFilter;

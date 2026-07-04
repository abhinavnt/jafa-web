'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';

interface SearchItem {
  title: string;
  category?: string;
}

interface SearchWithSuggestionsProps {
  items: SearchItem[];
  placeholder: string;
  onSubmit: (query: string) => void;
}

export default function SearchWithSuggestions({ items, placeholder, onSubmit }: SearchWithSuggestionsProps) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Generate suggestions based on typed characters
  const suggestions = React.useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    const seen = new Set<string>();
    const results: string[] = [];

    for (const item of items) {
      // Match by title
      if (item.title.toLowerCase().includes(lowerQuery) && !seen.has(item.title)) {
        seen.add(item.title);
        results.push(item.title);
      }
      // Match by category
      if (item.category && item.category.toLowerCase().includes(lowerQuery) && !seen.has(item.category)) {
        seen.add(item.category);
        results.push(item.category);
      }
      if (results.length >= 6) break;
    }
    return results;
  }, [query, items]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const executeSearch = (searchTerm: string) => {
    setQuery(searchTerm);
    setShowSuggestions(false);
    onSubmit(searchTerm);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(query);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(value.trim().length > 0);
    setHighlightedIndex(-1);

    // If user clears the input, reset the search
    if (value.trim() === '') {
      onSubmit('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      executeSearch(suggestions[highlightedIndex]);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-[480px]">
      <form
        onSubmit={handleFormSubmit}
        className="flex items-center w-full bg-[#EAE1D6] rounded-full p-1.5 md:p-2 border border-[#DCD0C3] focus-within:border-[#B89B82] transition-colors shadow-sm"
      >
        <div className="pl-3 md:pl-4 text-[#8C7A6B]">
          <Search size={18} />
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => { if (query.trim()) setShowSuggestions(true); }}
          className="flex-1 bg-transparent border-none outline-none px-3 md:px-4 text-[12px] md:text-sm text-[#2A1A12] placeholder:text-[#8C7A6B]"
          autoComplete="off"
        />
        <button
          type="submit"
          className="bg-[#2A1A12] text-[#F8F2EA] px-6 md:px-8 py-2.5 md:py-3 rounded-full text-[10px] md:text-[12px] font-bold tracking-wider hover:bg-[#4A2C11] transition-colors shrink-0"
        >
          SEARCH
        </button>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md rounded-xl border border-[#DCD0C3] shadow-xl z-50 overflow-hidden">
          {suggestions.map((suggestion, idx) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => executeSearch(suggestion)}
              onMouseEnter={() => setHighlightedIndex(idx)}
              className={`w-full text-left px-4 py-2.5 md:py-3 text-[12px] md:text-[13px] transition-colors flex items-center gap-2.5 ${
                idx === highlightedIndex
                  ? 'bg-[#EAE1D6] text-[#2A1A12]'
                  : 'text-[#5C3D2E] hover:bg-[#F8F2EA]'
              }`}
            >
              <Search size={13} className="text-[#8C7A6B] shrink-0" />
              <span className="truncate">{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

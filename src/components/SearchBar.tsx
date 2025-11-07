import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column flex-sm-row gap-2 w-100">
      <div className="input-group">
        <span className="input-group-text">
          <i className="fas fa-search"></i>
        </span>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={query}
          onChange={handleChange}
          className="form-control"
        />
        {query && (
          <button 
            type="button" 
            onClick={handleClear} 
            className="btn btn-outline-secondary"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
      <button type="submit" className="btn btn-primary w-100 w-sm-auto">
        <i className="fas fa-search me-1 d-inline d-sm-none"></i>
        <span className="d-none d-sm-inline">Search</span>
      </button>
    </form>
  );
};

export default SearchBar;
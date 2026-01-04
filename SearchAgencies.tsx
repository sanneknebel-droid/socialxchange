import React, { useState } from 'react';

interface AgencyResult {
  name: string;
  description: string;
  email: string;
  phone: string;
  website: string;
  location: string;
}

const SearchAgencies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<AgencyResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const searchAgencies = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setSearched(true);

    // For now, using mock data
    // You can replace this with a real API call later
    setTimeout(() => {
      setResults([{
        name: searchQuery,
        description: 'Leading global PR and marketing agency',
        email: 'contact@agency.com',
        phone: '+1 (212) 555-0100',
        website: 'https://www.agency.com',
        location: 'New York, NY, USA'
      }]);
      setLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchAgencies();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Agencies & PR Teams</h1>
        <p className="text-gray-600">
          Find contact information for agencies and PR teams
        </p>
      </div>

      <div className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search for agencies (e.g., Ketchum, Edelman, Weber Shandwick)"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            onClick={searchAgencies}
            disabled={loading || !searchQuery.trim()}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-center py-8">
          <p className="text-gray-500">Searching...</p>
        </div>
      )}

      {!loading && searched && results.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No results found. Try a different search term.</p>
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.map((agency, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{agency.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{agency.description}</p>

              <div className="space-y-3">
                <div className="p-3 bg-purple-50 rounded">
                  <p className="text-xs font-semibold text-gray-700 mb-1">📧 Email</p>
                  <p className="text-gray-800">{agency.email}</p>
                </div>

                <div className="p-3 bg-pink-50 rounded">
                  <p className="text-xs font-semibold text-gray-700 mb-1">📞 Phone</p>
                  <p className="text-gray-800">{agency.phone}</p>
                </div>

                <div className="p-3 bg-blue-50 rounded">
                  <p className="text-xs font-semibold text-gray-700 mb-1">🌐 Website</p>
                  <a 
                    href={agency.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline"
                  >
                    {agency.website}
                  </a>
                </div>

                <div className="p-3 bg-green-50 rounded">
                  <p className="text-xs font-semibold text-gray-700 mb-1">📍 Location</p>
                  <p className="text-gray-800">{agency.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!searched && !loading && (
        <div className="text-center py-8 bg-white rounded-lg shadow p-8">
          <p className="text-gray-600">Search for any agency or PR team to find their contact information</p>
          <p className="text-gray-500 text-sm mt-2">Try: Ketchum, Edelman, Weber Shandwick, FleishmanHillard</p>
        </div>
      )}
    </div>
  );
};

export default SearchAgencies;
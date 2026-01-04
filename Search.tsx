import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface SearchResult {
  userId: number;
  name: string;
  email: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  phone?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  website?: string;
  bio?: string;
}

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);

    try {
      const response = await axios.get('/api/profile/search', {
        params: { query: query || undefined }
      });
      setResults(response.data);
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Influencers</h1>
        <p className="text-gray-600">
          Find influencers by name, location, or social media handles
        </p>
      </div>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email, Instagram, TikTok, city, state..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {loading && (
        <div className="text-center py-8">
          <p className="text-gray-500">Searching...</p>
        </div>
      )}

      {!loading && searched && results.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No influencers found. Try a different search term.</p>
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((influencer) => (
            <div
              key={influencer.userId}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{influencer.name}</h3>
              
              {influencer.bio && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{influencer.bio}</p>
              )}

              <div className="space-y-2 text-sm">
                {influencer.email && (
                  <div className="flex items-center text-gray-700">
                    <span className="font-medium w-20">Email:</span>
                    <span>{influencer.email}</span>
                  </div>
                )}
                {influencer.phone && (
                  <div className="flex items-center text-gray-700">
                    <span className="font-medium w-20">Phone:</span>
                    <span>{influencer.phone}</span>
                  </div>
                )}
                {(influencer.address || influencer.city || influencer.state) && (
                  <div className="flex items-start text-gray-700">
                    <span className="font-medium w-20">Location:</span>
                    <span>
                      {[influencer.address, influencer.city, influencer.state, influencer.country]
                        .filter(Boolean)
                        .join(', ')}
                    </span>
                  </div>
                )}
                {influencer.instagram && (
                  <div className="flex items-center text-gray-700">
                    <span className="font-medium w-20">Instagram:</span>
                    <span>{influencer.instagram}</span>
                  </div>
                )}
                {influencer.tiktok && (
                  <div className="flex items-center text-gray-700">
                    <span className="font-medium w-20">TikTok:</span>
                    <span>{influencer.tiktok}</span>
                  </div>
                )}
                {influencer.youtube && (
                  <div className="flex items-center text-gray-700">
                    <span className="font-medium w-20">YouTube:</span>
                    <span className="truncate">{influencer.youtube}</span>
                  </div>
                )}
                {influencer.website && (
                  <div className="flex items-center text-gray-700">
                    <span className="font-medium w-20">Website:</span>
                    <a
                      href={influencer.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline truncate"
                    >
                      {influencer.website}
                    </a>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <Link
                  to={`/messages?userId=${influencer.userId}`}
                  className="block w-full text-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Send Message
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}



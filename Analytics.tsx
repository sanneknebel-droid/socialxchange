import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for demographics
const demographicsData = [
  { ageGroup: '13-17', percentage: 8 },
  { ageGroup: '18-24', percentage: 32 },
  { ageGroup: '25-34', percentage: 28 },
  { ageGroup: '35-44', percentage: 18 },
  { ageGroup: '45-54', percentage: 10 },
  { ageGroup: '55+', percentage: 4 }
];

const genderData = [
  { name: 'Female', value: 58 },
  { name: 'Male', value: 40 },
  { name: 'Other', value: 2 }
];

const locationData = [
  { country: 'USA', percentage: 45 },
  { country: 'UK', percentage: 15 },
  { country: 'Canada', percentage: 12 },
  { country: 'Australia', percentage: 10 },
  { country: 'Germany', percentage: 8 },
  { country: 'Others', percentage: 10 }
];

// Mock data for story link activity (last 7 days)
const storyLinkData = [
  { day: 'Mon', clicks: 245, views: 1240 },
  { day: 'Tue', clicks: 312, views: 1580 },
  { day: 'Wed', clicks: 289, views: 1420 },
  { day: 'Thu', clicks: 405, views: 1890 },
  { day: 'Fri', clicks: 378, views: 1750 },
  { day: 'Sat', clicks: 456, views: 2100 },
  { day: 'Sun', clicks: 423, views: 1980 }
];

// Mock data for follower counts
const followerData = [
  { platform: 'Instagram', followers: 125000, growth: '+12.5%' },
  { platform: 'YouTube', followers: 89000, growth: '+8.3%' },
  { platform: 'TikTok', followers: 234000, growth: '+23.1%' },
  { platform: 'Facebook', followers: 45000, growth: '+3.2%' }
];

// Follower growth over time (last 6 months)
const followerGrowthData = [
  { month: 'Jun', Instagram: 98000, YouTube: 75000, TikTok: 156000, Facebook: 41000 },
  { month: 'Jul', Instagram: 105000, YouTube: 78000, TikTok: 175000, Facebook: 42000 },
  { month: 'Aug', Instagram: 110000, YouTube: 81000, TikTok: 192000, Facebook: 42500 },
  { month: 'Sep', Instagram: 115000, YouTube: 84000, TikTok: 208000, Facebook: 43500 },
  { month: 'Oct', Instagram: 120000, YouTube: 86000, TikTok: 220000, Facebook: 44200 },
  { month: 'Nov', Instagram: 125000, YouTube: 89000, TikTok: 234000, Facebook: 45000 }
];

const COLORS = ['#8B5CF6', '#EC4899', '#06B6D4'];

const Analytics = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('Instagram');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Analytics Dashboard</h1>

        {/* Follower Count Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {followerData.map((platform) => (
            <div key={platform.platform} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-700">{platform.platform}</h3>
                <span className="text-green-600 text-sm font-medium">{platform.growth}</span>
              </div>
              <p className="text-3xl font-bold text-purple-600">
                {platform.followers.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 mt-1">Total Followers</p>
            </div>
          ))}
        </div>

        {/* Follower Growth Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Follower Growth (6 Months)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={followerGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Instagram" stroke="#E4405F" strokeWidth={2} />
              <Line type="monotone" dataKey="YouTube" stroke="#FF0000" strokeWidth={2} />
              <Line type="monotone" dataKey="TikTok" stroke="#000000" strokeWidth={2} />
              <Line type="monotone" dataKey="Facebook" stroke="#1877F2" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Demographics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Age Demographics */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedPlatform} - Age Demographics
            </h2>
            <div className="mb-4">
              <select 
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option>Instagram</option>
                <option>YouTube</option>
                <option>TikTok</option>
                <option>Facebook</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={demographicsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ageGroup" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="percentage" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gender Distribution */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Gender Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Location Demographics */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Top Locations</h2>
          <ResponsiveContainer width="80%" height={300}>
            <BarChart data={locationData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="country" type="category" />
              <Tooltip />
              <Bar dataKey="percentage" fill="#EC4899" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Story Link Activity */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Story Link Activity (Last 7 Days)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Total Clicks</p>
              <p className="text-2xl font-bold text-purple-600">
                {storyLinkData.reduce((sum, day) => sum + day.clicks, 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-pink-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-pink-600">
                {storyLinkData.reduce((sum, day) => sum + day.views, 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Click-Through Rate</p>
              <p className="text-2xl font-bold text-blue-600">
                {((storyLinkData.reduce((sum, day) => sum + day.clicks, 0) / 
                   storyLinkData.reduce((sum, day) => sum + day.views, 0)) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={storyLinkData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="views" stroke="#8B5CF6" strokeWidth={2} name="Story Views" />
              <Line type="monotone" dataKey="clicks" stroke="#EC4899" strokeWidth={2} name="Link Clicks" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
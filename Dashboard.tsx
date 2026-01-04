import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();

  const getWelcomeMessage = () => {
    switch (user?.userType) {
      case 'influencer':
        return 'Welcome! Keep your contact information up to date so agencies and PR teams can reach you.';
      case 'agency':
        return 'Welcome! Search for influencers and connect with them directly.';
      case 'pr_team':
        return 'Welcome! Find influencers and manage your PR campaigns.';
      default:
        return 'Welcome to SocialXchange!';
    }
  };

  const getQuickActions = () => {
    const actions = [
      {
        title: 'Update Profile',
        description: 'Keep your address and contact information current',
        link: '/profile',
        icon: '📝',
        gradient: 'from-purple-400 via-pink-400 to-red-400'
      },
      {
        title: 'Messages',
        description: 'Chat with agencies, PR teams, and influencers',
        link: '/messages',
        icon: '💬',
        gradient: 'from-blue-400 via-cyan-400 to-teal-400'
      }
    ];

    if (user?.userType === 'agency' || user?.userType === 'pr_team') {
      actions.push({
        title: 'Search Influencers',
        description: 'Find influencers by name, location, or social media',
        link: '/search',
        icon: '🔍',
        gradient: 'from-orange-400 via-yellow-400 to-green-400'
      });
    }

    if (user?.userType === 'influencer') {
      actions.push({
        title: 'Search Agencies & PR Teams',
        description: 'Find agencies and PR teams you want to work with',
        link: '/search-agencies',
        icon: '🏢',
        gradient: 'from-orange-400 via-yellow-400 to-green-400'
      });
      actions.push({
        title: 'Analytics',
        description: 'View your followers, engagement rates, and demographics',
        link: '/analytics',
        icon: '📊',
        gradient: 'from-green-400 via-emerald-400 to-teal-400'
      });
    }

    return actions;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Hello, {user?.name}!
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          {getWelcomeMessage()}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getQuickActions().map((action) => (
          <Link
            key={action.title}
            to={action.link}
            className={`block p-6 rounded-lg shadow-md hover:shadow-xl transition-all transform hover:scale-105 bg-gradient-to-br ${action.gradient} text-white`}
          >
            <div className="text-4xl mb-4">{action.icon}</div>
            <h3 className="text-xl font-semibold mb-2">
              {action.title}
            </h3>
            <p className="text-white/90">{action.description}</p>
          </Link>
        ))}
      </div>

      {user?.userType === 'influencer' && (
        <div className="mt-8 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-md p-6 text-white">
          <h2 className="text-2xl font-bold mb-4">Agencies and PR Teams</h2>
          <p className="text-white/95 mb-4">
            If you are on a PR or agencies brand list for PR, the agencies will appear in the box below.
          </p>
          <div className="mt-4 p-4 bg-white/20 backdrop-blur-sm rounded-md border border-white/30">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center font-bold text-lg">
                    T
                  </div>
                  <div>
                    <h4 className="font-semibold">Tarte</h4>
                    <p className="text-white/70 text-sm">Beauty & Cosmetics</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center font-bold text-lg">
                    C
                  </div>
                  <div>
                    <h4 className="font-semibold">Cuisinart</h4>
                    <p className="text-white/70 text-sm">Kitchen Appliances</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center font-bold text-lg">
                    S
                  </div>
                  <div>
                    <h4 className="font-semibold">Sephora</h4>
                    <p className="text-white/70 text-sm">Beauty Retail</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 rounded-lg shadow-md p-6 text-white">
        <h2 className="text-2xl font-bold mb-4">Platform Overview</h2>
        <div className="space-y-4 text-white/95">
          <p>
            <strong>SocialXchange</strong> is your central platform for connecting influencers,
            agencies, and PR teams. Here's what you can do:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Update your contact information in real-time</li>
            <li>Search and discover influencers (for agencies and PR teams)</li>
            <li>Chat directly with other users</li>
            <li>Keep your profile information current and accessible</li>
          </ul>
        </div>
      </div>
    </div>
  );
}


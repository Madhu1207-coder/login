import { LogOut, Home, User, Settings, Bell } from 'lucide-react';

interface HomePageProps {
  user: { email: string };
  onLogout: () => void;
}

export function HomePage({ user, onLogout }: HomePageProps) {
  return (
    <div className="size-full flex flex-col bg-gradient-to-br from-[#f0f4ff] to-[#e0e8ff]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#5B9EFF] to-[#2E5FFF] rounded-lg flex items-center justify-center shadow-md">
                <Home className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-gray-900">Home</h2>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right">
                  <p className="text-sm text-gray-900">{user.email}</p>
                  <p className="text-xs text-gray-500">Logged in</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-[#5B9EFF] to-[#2E5FFF] rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5B9EFF] to-[#4A8AFF] text-white rounded-lg hover:from-[#4A8AFF] hover:to-[#3977EE] transition-all shadow-md"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-[#5B9EFF] to-[#4A8AFF] rounded-2xl p-8 mb-8 shadow-xl text-white">
            <h1 className="mb-2">Welcome Back!</h1>
            <p className="text-white/90 text-lg">
              You're successfully logged in as {user.email}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Total Projects', value: '12', icon: '📊', color: 'from-blue-500 to-blue-600' },
              { label: 'Active Tasks', value: '28', icon: '✓', color: 'from-green-500 to-green-600' },
              { label: 'Completed', value: '156', icon: '🎯', color: 'from-purple-500 to-purple-600' },
              { label: 'Team Members', value: '8', icon: '👥', color: 'from-orange-500 to-orange-600' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center text-2xl mb-4`}>
                  {stat.icon}
                </div>
                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-gray-900 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { text: 'Successfully logged in', time: 'Just now', color: 'bg-green-500' },
                  { text: 'Profile updated', time: '2 hours ago', color: 'bg-blue-500' },
                  { text: 'New project created', time: '1 day ago', color: 'bg-purple-500' },
                  { text: 'Settings changed', time: '2 days ago', color: 'bg-orange-500' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className={`w-2 h-2 ${activity.color} rounded-full mt-2`} />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-gray-900 mb-6">Quick Actions</h3>
              <div className="space-y-3">
                {[
                  { text: 'Create New Project', icon: '📁', color: 'from-blue-500 to-blue-600' },
                  { text: 'Invite Team Member', icon: '➕', color: 'from-green-500 to-green-600' },
                  { text: 'View Reports', icon: '📈', color: 'from-purple-500 to-purple-600' },
                  { text: 'Settings', icon: '⚙️', color: 'from-orange-500 to-orange-600' },
                ].map((action) => (
                  <button
                    key={action.text}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r hover:shadow-md transition-all rounded-lg group bg-gray-50 hover:bg-gray-100"
                  >
                    <div className={`w-10 h-10 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center text-lg`}>
                      {action.icon}
                    </div>
                    <span className="text-left text-gray-900">{action.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

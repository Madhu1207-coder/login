import { LogOut, User, Settings, Bell, Home } from 'lucide-react';

interface DashboardProps {
  user: { email: string };
  onLogout: () => void;
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const stats = [
    { label: 'Total Projects', value: '12', change: '+2 this week' },
    { label: 'Active Tasks', value: '28', change: '+5 pending' },
    { label: 'Completed', value: '156', change: '87% success rate' },
    { label: 'Team Members', value: '8', change: '2 online now' },
  ];

  return (
    <div className="size-full flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-primary-foreground" />
              </div>
              <h2 className="text-foreground">Dashboard</h2>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-accent rounded-[--radius-md] transition-colors">
                <Bell className="w-5 h-5 text-foreground" />
              </button>
              <button className="p-2 hover:bg-accent rounded-[--radius-md] transition-colors">
                <Settings className="w-5 h-5 text-foreground" />
              </button>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right">
                  <p className="text-sm text-foreground">{user.email}</p>
                  <p className="text-xs text-muted-foreground">Account Settings</p>
                </div>
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-[--radius-md] hover:bg-secondary/80 transition-colors"
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-foreground mb-2">Welcome back!</h1>
            <p className="text-muted-foreground">
              Here's what's happening with your projects today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-card border border-border rounded-[--radius-lg] p-6 hover:shadow-lg transition-shadow"
              >
                <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
                <p className="text-3xl text-foreground mb-2">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-[--radius-lg] p-6">
              <h3 className="text-foreground mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { action: 'Project "Website Redesign" updated', time: '2 hours ago' },
                  { action: 'New task assigned to you', time: '4 hours ago' },
                  { action: 'Meeting scheduled for tomorrow', time: '6 hours ago' },
                  { action: 'Document "Q1 Report" shared', time: '1 day ago' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-[--radius-lg] p-6">
              <h3 className="text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {[
                  'Create New Project',
                  'Add Team Member',
                  'Schedule Meeting',
                  'Upload Document',
                ].map((action) => (
                  <button
                    key={action}
                    className="w-full text-left px-4 py-3 bg-accent text-accent-foreground rounded-[--radius-md] hover:bg-accent/80 transition-colors"
                  >
                    {action}
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

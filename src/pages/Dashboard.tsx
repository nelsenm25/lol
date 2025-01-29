import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Sidebar } from '@/components/ui/sidebar';
import { BarChart, LineChart } from '@/components/ui/chart';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  Users,
  Settings,
  HelpCircle,
  Bell,
  Trophy,
  Target,
  Activity,
  ChevronUp,
  Gamepad2
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  useEffect(() => {
    // Animate progress on mount
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      });
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "There was a problem signing out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const mockData = {
    weeklyStats: [
      { name: 'Mon', value: 40 },
      { name: 'Tue', value: 30 },
      { name: 'Wed', value: 45 },
      { name: 'Thu', value: 25 },
      { name: 'Fri', value: 55 },
      { name: 'Sat', value: 20 },
      { name: 'Sun', value: 35 },
    ],
    monthlyGrowth: [
      { name: 'Week 1', users: 400 },
      { name: 'Week 2', users: 600 },
      { name: 'Week 3', users: 500 },
      { name: 'Week 4', users: 700 },
    ],
    recentActivity: [
      { id: 1, action: 'Completed Game Test', game: 'Cyber Nexus', time: '2 hours ago', status: 'success' },
      { id: 2, action: 'Submitted Feedback', game: 'Star Voyager', time: '5 hours ago', status: 'success' },
      { id: 3, action: 'Started New Test', game: 'Medieval Quest', time: '1 day ago', status: 'pending' },
      { id: 4, action: 'Earned Badge', game: 'Robot Wars', time: '2 days ago', status: 'success' },
    ],
  };

  if (!user) return null;

  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Gamepad2, label: 'Games' },
    { icon: Trophy, label: 'Achievements' },
    { icon: Activity, label: 'Analytics' },
    { icon: Users, label: 'Community' },
    { icon: Settings, label: 'Settings' },
    { icon: HelpCircle, label: 'Help' },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar items={sidebarItems} className="hidden md:block" />
      
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00ff8c] to-[#ff00ff] bg-clip-text text-transparent">
                Welcome Back, {user.email?.split('@')[0]}
              </h1>
              <p className="text-gray-400 mt-1">Here's what's happening with your game testing journey</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-[#ff00ff] rounded-full text-[10px] flex items-center justify-center">3</span>
              </Button>
              <Button 
                onClick={handleSignOut}
                variant="outline"
                className="border-[#00ff8c] hover:bg-[#00ff8c]/10"
              >
                Sign Out
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-black/30 backdrop-blur-lg border-[#00ff8c]/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-[#00ff8c]">
                  Games Tested
                </CardTitle>
                <Target className="h-4 w-4 text-[#00ff8c]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-gray-400">
                  <ChevronUp className="h-4 w-4 text-[#00ff8c] inline" />
                  +2 from last week
                </p>
              </CardContent>
            </Card>
            <Card className="bg-black/30 backdrop-blur-lg border-[#00ff8c]/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-[#00ff8c]">
                  Feedback Score
                </CardTitle>
                <Activity className="h-4 w-4 text-[#00ff8c]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-gray-400">
                  <ChevronUp className="h-4 w-4 text-[#00ff8c] inline" />
                  +5% this month
                </p>
              </CardContent>
            </Card>
            <Card className="bg-black/30 backdrop-blur-lg border-[#00ff8c]/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-[#00ff8c]">
                  Achievements
                </CardTitle>
                <Trophy className="h-4 w-4 text-[#00ff8c]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-gray-400">
                  <ChevronUp className="h-4 w-4 text-[#00ff8c] inline" />
                  2 new unlocked
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Weekly Activity Chart */}
            <Card className="bg-black/30 backdrop-blur-lg border-[#00ff8c]/20">
              <CardHeader>
                <CardTitle className="text-[#00ff8c]">Weekly Activity</CardTitle>
                <CardDescription>Your gaming test sessions this week</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={mockData.weeklyStats}
                  className="h-[200px]"
                />
              </CardContent>
            </Card>

            {/* Monthly Growth */}
            <Card className="bg-black/30 backdrop-blur-lg border-[#00ff8c]/20">
              <CardHeader>
                <CardTitle className="text-[#00ff8c]">Monthly Progress</CardTitle>
                <CardDescription>Your testing growth over time</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={mockData.monthlyGrowth}
                  className="h-[200px]"
                />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card className="bg-black/30 backdrop-blur-lg border-[#00ff8c]/20">
              <CardHeader>
                <CardTitle className="text-[#00ff8c]">Profile</CardTitle>
                <CardDescription>Your testing profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} />
                    <AvatarFallback>GT</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{user.email}</p>
                    <Badge className="mt-1 bg-[#00ff8c]/20 text-[#00ff8c]">Pro Tester</Badge>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">Profile Completion</p>
                  <Progress value={progress} className="h-2" />
                  <p className="text-xs text-gray-400 mt-2">{progress}% complete</p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="md:col-span-2 bg-black/30 backdrop-blur-lg border-[#00ff8c]/20">
              <CardHeader>
                <CardTitle className="text-[#00ff8c]">Recent Activity</CardTitle>
                <CardDescription>Your latest testing activities</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-4">
                    {mockData.recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                      >
                        <div>
                          <p className="font-medium text-sm">{activity.action}</p>
                          <p className="text-xs text-gray-400">{activity.game}</p>
                        </div>
                        <div className="text-right">
                          <Badge
                            className={
                              activity.status === 'success'
                                ? 'bg-[#00ff8c]/20 text-[#00ff8c]'
                                : 'bg-yellow-500/20 text-yellow-500'
                            }
                          >
                            {activity.status}
                          </Badge>
                          <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

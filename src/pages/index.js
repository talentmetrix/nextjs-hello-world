import { 
  DollarSign, 
  Users, 
  Briefcase, 
  BarChart, 
  ChevronDown, 
  CircleUser,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Phone,
  Mail,
  Calendar,
  Star,
  Filter,
  Search,
  Plus,
  Eye,
  Edit,
  Download,
  Bell,
  Target,
  Award,
  RefreshCw,
  FileText,
  MessageSquare,
  BarChart3,
  MoreHorizontal
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { AreaChart, Area, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from "recharts";

// --- ENHANCED MOCK DATA ---
const stats = [
  { title: "Total Revenue", value: "$245,831.89", change: "+20.1%", trend: "up", icon: DollarSign, color: "text-green-600" },
  { title: "New Leads", value: "2,847", change: "+180.1%", trend: "up", icon: Users, color: "text-blue-600" },
  { title: "Active Deals", value: "1,573", change: "+21", trend: "up", icon: Briefcase, color: "text-purple-600" },
  { title: "Conversion Rate", value: "24.5%", change: "+1.2%", trend: "up", icon: BarChart, color: "text-orange-600" },
  { title: "Customer Satisfaction", value: "4.8/5", change: "+0.3", trend: "up", icon: Star, color: "text-yellow-600" },
  { title: "Pipeline Value", value: "$1.2M", change: "+15.3%", trend: "up", icon: Target, color: "text-indigo-600" },
  { title: "Team Performance", value: "92%", change: "+5%", trend: "up", icon: Award, color: "text-pink-600" },
  { title: "Monthly Recurring Revenue", value: "$45,200", change: "+8.7%", trend: "up", icon: RefreshCw, color: "text-teal-600" }
];

const recentDeals = [
  { 
    id: 1, name: "John Doe", email: "john.doe@email.com", value: "$15,999.00", 
    company: "TechCorp Inc.", status: "negotiation", priority: "high", 
    lastContact: "2 hours ago", stage: "Proposal Sent", probability: 75, avatar: "JD"
  },
  { 
    id: 2, name: "Jane Smith", email: "jane.smith@email.com", value: "$8,500.00", 
    company: "Innovation Labs", status: "qualified", priority: "medium",
    lastContact: "1 day ago", stage: "Demo Completed", probability: 60, avatar: "JS"
  },
  { 
    id: 3, name: "Michael Johnson", email: "michael.j@email.com", value: "$22,300.00", 
    company: "Global Solutions", status: "closed-won", priority: "high",
    lastContact: "3 days ago", stage: "Closed Won", probability: 100, avatar: "MJ"
  },
  { 
    id: 4, name: "Emily Davis", email: "emily.d@email.com", value: "$12,750.00", 
    company: "StartupX", status: "proposal", priority: "low",
    lastContact: "5 hours ago", stage: "Needs Analysis", probability: 40, avatar: "ED"
  },
  { 
    id: 5, name: "David Wilson", email: "david.w@email.com", value: "$31,200.00", 
    company: "Enterprise Corp", status: "negotiation", priority: "high",
    lastContact: "30 minutes ago", stage: "Contract Review", probability: 85, avatar: "DW"
  }
];

const taskData = [
  { id: 1, title: "Follow up with InnoTech", deadline: "Due in 2 days", completed: false, priority: "high", category: "follow-up", assignee: "You" },
  { id: 2, title: "Prepare Q4 presentation", deadline: "Due tomorrow", completed: false, priority: "high", category: "presentation", assignee: "Marketing Team" },
  { id: 3, title: "Onboard new client: Stellar Solutions", deadline: "Due in 5 days", completed: false, priority: "medium", category: "onboarding", assignee: "Customer Success" },
  { id: 4, title: "Review contract with AlphaCorp", deadline: "Completed", completed: true, priority: "medium", category: "legal", assignee: "Legal Team" },
  { id: 5, title: "Schedule demo for QuantumLeap", deadline: "Due today", completed: false, priority: "high", category: "demo", assignee: "Sales Team" },
  { id: 6, title: "Send proposal to TechStart", deadline: "Due in 3 days", completed: false, priority: "medium", category: "proposal", assignee: "You" },
  { id: 7, title: "Customer feedback analysis", deadline: "Due in 1 week", completed: false, priority: "low", category: "analysis", assignee: "Analytics Team" },
  { id: 8, title: "Update CRM database", deadline: "Due today", completed: false, priority: "medium", category: "maintenance", assignee: "IT Team" }
];

const revenueData = [
  { month: 'Jan', revenue: 65000, deals: 45, leads: 320 },
  { month: 'Feb', revenue: 59000, deals: 52, leads: 280 },
  { month: 'Mar', revenue: 80000, deals: 48, leads: 410 },
  { month: 'Apr', revenue: 81000, deals: 61, leads: 390 },
  { month: 'May', revenue: 95000, deals: 55, leads: 520 },
  { month: 'Jun', revenue: 88000, deals: 67, leads: 480 },
  { month: 'Jul', revenue: 102000, deals: 72, leads: 560 },
  { month: 'Aug', revenue: 98000, deals: 69, leads: 530 },
  { month: 'Sep', revenue: 115000, deals: 78, leads: 620 },
  { month: 'Oct', revenue: 120000, deals: 85, leads: 680 },
  { month: 'Nov', revenue: 135000, deals: 92, leads: 750 },
  { month: 'Dec', revenue: 145000, deals: 98, leads: 810 }
];

const salesPipelineData = [
  { name: 'Prospecting', value: 45, color: '#3B82F6' },
  { name: 'Qualified', value: 32, color: '#10B981' },
  { name: 'Proposal', value: 28, color: '#F59E0B' },
  { name: 'Negotiation', value: 15, color: '#EF4444' },
  { name: 'Closed Won', value: 12, color: '#8B5CF6' }
];

const topPerformers = [
  { name: "Sarah Johnson", deals: 28, revenue: "$245,000", avatar: "SJ", growth: "+15%" },
  { name: "Mike Chen", deals: 24, revenue: "$198,000", avatar: "MC", growth: "+22%" },
  { name: "Lisa Rodriguez", deals: 22, revenue: "$187,000", avatar: "LR", growth: "+8%" },
  { name: "Tom Wilson", deals: 19, revenue: "$156,000", avatar: "TW", growth: "+12%" },
  { name: "Anna Davis", deals: 17, revenue: "$142,000", avatar: "AD", growth: "+18%" }
];

const recentActivities = [
  { id: 1, type: "deal", message: "New deal created with TechCorp Inc.", time: "2 minutes ago", user: "John Doe", icon: Briefcase },
  { id: 2, type: "call", message: "Call completed with Jane Smith", time: "15 minutes ago", user: "Sarah Johnson", icon: Phone },
  { id: 3, type: "email", message: "Email sent to 15 prospects", time: "1 hour ago", user: "Marketing Team", icon: Mail },
  { id: 4, type: "meeting", message: "Demo scheduled with Global Solutions", time: "2 hours ago", user: "Mike Chen", icon: Calendar },
  { id: 5, type: "task", message: "Task completed: Contract review", time: "3 hours ago", user: "Legal Team", icon: CheckCircle },
  { id: 6, type: "lead", message: "New lead assigned from website", time: "4 hours ago", user: "System", icon: Users }
];

const upcomingMeetings = [
  { id: 1, title: "Demo with Enterprise Corp", time: "10:00 AM", attendees: 4, type: "demo" },
  { id: 2, title: "Team Standup", time: "11:30 AM", attendees: 8, type: "internal" },
  { id: 3, title: "Client Review - TechStart", time: "2:00 PM", attendees: 3, type: "review" },
  { id: 4, title: "Sales Training Session", time: "3:30 PM", attendees: 12, type: "training" },
  { id: 5, title: "Quarterly Planning", time: "4:30 PM", attendees: 6, type: "planning" }
];

// --- HELPER COMPONENTS ---
function Card({ children, className = "", onClick }) {
  return (
    <div 
      className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

function CardHeader({ children, className = "" }) {
  return (
    <div className={`p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  );
}

function CardContent({ children, className = "" }) {
  return (
    <div className={`p-4 sm:p-6 ${className}`}>
      {children}
    </div>
  );
}

function StatCard({ title, value, change, trend, icon: Icon, color }) {
  return (
    <Card className="hover:scale-105 transition-transform duration-200">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</h3>
        <div className={`p-2 rounded-lg bg-gray-50 dark:bg-gray-700 ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{value}</div>
        <div className="flex items-center text-xs">
          {trend === 'up' ? (
            <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
          ) : (
            <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
          )}
          <span className={`${trend === 'up' ? 'text-green-500' : 'text-red-500'} font-medium`}>
            {change}
          </span>
          <span className="text-gray-500 dark:text-gray-400 ml-1">from last month</span>
        </div>
      </CardContent>
    </Card>
  );
}

function Avatar({ children, className = "" }) {
  return (
    <div className={`w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium ${className}`}>
      {children}
    </div>
  );
}

function Badge({ children, variant = "default", className = "" }) {
  const variants = {
    default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    danger: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

function ProgressBar({ value, max = 100, className = "" }) {
  return (
    <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 ${className}`}>
      <div 
        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  );
}

function EnhancedRevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={revenueData}>
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis dataKey="month" stroke="#6B7280" />
        <YAxis stroke="#6B7280" />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#F9FAFB', 
            border: '1px solid #E5E7EB', 
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
          }}
        />
        <Area 
          type="monotone" 
          dataKey="revenue" 
          stroke="#3B82F6" 
          strokeWidth={2}
          fillOpacity={1} 
          fill="url(#colorRevenue)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function PipelineChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <RechartsPieChart>
        <Pie
          data={salesPipelineData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={5}
          dataKey="value"
        >
          {salesPipelineData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}

function LeadsChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <RechartsBarChart data={revenueData.slice(-6)}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis dataKey="month" stroke="#6B7280" />
        <YAxis stroke="#6B7280" />
        <Tooltip />
        <Bar dataKey="leads" fill="#10B981" radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}

// --- MAIN DASHBOARD COMPONENT ---
export default function ComprehensiveCRMDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTimeRange, setSelectedTimeRange] = useState('This Month');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  function getStatusColor(status) {
    const colors = {
      'negotiation': 'warning',
      'qualified': 'info',
      'closed-won': 'success',
      'proposal': 'default',
      'prospecting': 'info'
    };
    return colors[status] || 'default';
  }

  function getPriorityColor(priority) {
    const colors = {
      'high': 'danger',
      'medium': 'warning',
      'low': 'success'
    };
    return colors[priority] || 'default';
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white">
      {/* Top Navigation */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 backdrop-blur-lg bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <BarChart className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold">CRM Pro</h1>
              </div>
              <div className="hidden md:flex space-x-1">
                {['overview', 'deals', 'leads', 'analytics'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
                      activeTab === tab 
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search deals, contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
              </div>
              <button className="relative p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-2">
                <Avatar>JD</Avatar>
                <span className="hidden md:block text-sm font-medium">John Doe</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Sales Dashboard
              </h1>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                Welcome back! Here's what's happening with your sales today.
              </p>
              <p className="text-sm text-gray-400 mt-1">
                {currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString()}
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-2">
              <select 
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="px-4 py-2 text-sm font-medium bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
              >
                <option>This Week</option>
                <option>This Month</option>
                <option>This Quarter</option>
                <option>This Year</option>
              </select>
              <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-md shadow-sm hover:from-blue-700 hover:to-purple-700 flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-blue-600 rounded-md shadow-sm hover:from-green-700 hover:to-blue-700 flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>New Deal</span>
              </button>
            </div>
          </div>

          {/* Enhanced Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Revenue Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">Revenue Overview</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Monthly revenue performance</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
                      <BarChart3 className="w-4 h-4 mr-1" />
                      Chart
                    </button>
                    <button className="flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
                      Last 12 Months 
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <EnhancedRevenueChart />
              </CardContent>
            </Card>

            {/* Sales Pipeline */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Sales Pipeline</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Current deal distribution</p>
              </CardHeader>
              <CardContent>
                <PipelineChart />
                <div className="mt-4 space-y-2">
                  {salesPipelineData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Performers */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Top Performers</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">This month's leaders</p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-4 p-6">
                  {topPerformers.map((performer, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="w-10 h-10">{performer.avatar}</Avatar>
                          {index < 3 && (
                            <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                              index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-600'
                            }`}>
                              {index + 1}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{performer.name}</p>
                          <p className="text-sm text-gray-500">{performer.deals} deals</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">{performer.revenue}</p>
                        <p className="text-xs text-green-500">{performer.growth}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Deals */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">Recent Deals</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Latest deal activity</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                      <Filter className="w-4 h-4" />
                    </button>
                    <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Company</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Value</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stage</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Probability</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {recentDeals.map((deal) => (
                        <tr key={deal.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-3">
                              <Avatar>{deal.avatar}</Avatar>
                              <div>
                                <p className="text-sm text-gray-500">{deal.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <p className="font-medium">{deal.company}</p>
                              <p className="text-sm text-gray-500">{deal.lastContact}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <p className="font-semibold text-green-600">{deal.value}</p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant={getStatusColor(deal.status)}>
                              {deal.stage}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <ProgressBar value={deal.probability} className="w-16" />
                              <span className="text-sm font-medium">{deal.probability}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <button className="p-1 text-gray-400 hover:text-blue-600">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-green-600">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-red-600">
                                <MoreHorizontal className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Secondary Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Recent Activities</h3>
                  <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-80 overflow-y-auto">
                  {recentActivities.map((activity) => {
                    const IconComponent = activity.icon;
                    return (
                      <div key={activity.id} className="flex items-start space-x-3 p-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {activity.message}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {activity.user} • {activity.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Meetings */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Today's Schedule</h3>
                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    <Calendar className="w-4 h-4" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-3 p-4">
                  {upcomingMeetings.map((meeting) => (
                    <div key={meeting.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                        <div>
                          <p className="font-medium text-sm">{meeting.title}</p>
                          <p className="text-xs text-gray-500">{meeting.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">{meeting.attendees}</span>
                        <Users className="w-3 h-3 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Lead Generation Chart */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Lead Generation</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Last 6 months</p>
              </CardHeader>
              <CardContent>
                <LeadsChart />
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Tasks Section */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Task Management</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Your priority tasks and team assignments</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200">
                    All Tasks
                  </button>
                  <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700">
                    My Tasks
                  </button>
                  <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700">
                    Overdue
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {taskData.map((task) => (
                  <div 
                    key={task.id} 
                    className={`p-4 border rounded-lg hover:shadow-md transition-shadow ${
                      task.completed 
                        ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
                        : 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {task.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Clock className="w-5 h-5 text-yellow-500" />
                        )}
                        <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                          {task.priority}
                        </Badge>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                    <h4 className={`font-medium mb-2 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                      {task.title}
                    </h4>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{task.assignee}</span>
                      <Badge variant={task.completed ? 'success' : 'warning'} className="text-xs">
                        {task.deadline}
                      </Badge>
                    </div>
                    <div className="mt-3 flex items-center space-x-2">
                      <Badge variant="default" className="text-xs">
                        {task.category}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions & Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="text-center hover:scale-105 transition-transform cursor-pointer">
              <CardContent>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Plus className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-1">New Lead</h3>
                <p className="text-sm text-gray-500">Add a potential customer</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:scale-105 transition-transform cursor-pointer">
              <CardContent>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-1">Schedule Call</h3>
                <p className="text-sm text-gray-500">Book a meeting</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:scale-105 transition-transform cursor-pointer">
              <CardContent>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Mail className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-1">Send Campaign</h3>
                <p className="text-sm text-gray-500">Email marketing</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:scale-105 transition-transform cursor-pointer">
              <CardContent>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-1">Generate Report</h3>
                <p className="text-sm text-gray-500">Analytics & insights</p>
              </CardContent>
            </Card>
          </div>

          {/* Footer Metrics */}
          <Card>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">98.5%</div>
                  <div className="text-sm text-gray-500">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">2.3s</div>
                  <div className="text-sm text-gray-500">Avg Response</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">1,247</div>
                  <div className="text-sm text-gray-500">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">89%</div>
                  <div className="text-sm text-gray-500">Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">5.2M</div>
                  <div className="text-sm text-gray-500">API Calls</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-600">24/7</div>
                  <div className="text-sm text-gray-500">Support</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform">
          <MessageSquare className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

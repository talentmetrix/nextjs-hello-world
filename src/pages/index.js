// Crm Dashboard - app/page.tsx
// Make sure to run `npm install lucide-react` for icons

'use client'; // This directive is needed for using hooks like useState, etc., in App Router

import { 
  DollarSign, 
  Users, 
  Briefcase, 
  BarChart, 
  ChevronDown, 
  CircleUser,
  CheckCircle,
  Clock
} from "lucide-react";
import React from "react";

// --- MOCK DATA ---
const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1% from last month",
    icon: <DollarSign className="w-6 h-6 text-gray-500" />
  },
  {
    title: "New Leads",
    value: "+1,230",
    change: "+180.1% from last month",
    icon: <Users className="w-6 h-6 text-gray-500" />
  },
  {
    title: "Active Deals",
    value: "573",
    change: "+21 since last week",
    icon: <Briefcase className="w-6 h-6 text-gray-500" />
  },
  {
    title: "Conversion Rate",
    value: "12.5%",
    change: "+1.2% from last month",
    icon: <BarChart className="w-6 h-6 text-gray-500" />
  },
];

const recentDeals = [
  { name: "John Doe", email: "john.doe@email.com", value: "+$1,999.00" },
  { name: "Jane Smith", email: "jane.smith@email.com", value: "+$39.00" },
  { name: "Michael Johnson", email: "michael.j@email.com", value: "+$299.00" },
  { name: "Emily Davis", email: "emily.d@email.com", value: "+$99.00" },
  { name: "David Wilson", email: "david.w@email.com", value: "+$1,200.00" },
];

const taskData = [
    { title: "Follow up with InnoTech", deadline: "Due in 2 days", completed: false },
    { title: "Prepare Q3 presentation", deadline: "Due tomorrow", completed: false },
    { title: "Onboard new client: Stellar Solutions", deadline: "Due in 5 days", completed: false },
    { title: "Review contract with AlphaCorp", deadline: "Completed", completed: true },
    { title: "Schedule demo for QuantumLeap", deadline: "Due today", completed: false },
];

const revenueData = [
    { month: 'Jan', revenue: 4000 },
    { month: 'Feb', revenue: 3000 },
    { month: 'Mar', revenue: 5000 },
    { month: 'Apr', revenue: 4500 },
    { month: 'May', revenue: 6000 },
    { month: 'Jun', revenue: 5500 },
    { month: 'Jul', revenue: 7000 },
    { month: 'Aug', revenue: 6500 },
    { month: 'Sep', revenue: 7500 },
    { month: 'Oct', revenue: 8000 },
    { month: 'Nov', revenue: 9000 },
    { month: 'Dec', revenue: 8500 },
];

// --- HELPER COMPONENTS (for better structure) ---

const Card = ({ children, className = "" }) => (
  <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-4 sm:p-6 ${className}`}>
    {children}
  </div>
);

const StatCard = ({ title, value, change, icon }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</h3>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{change}</p>
    </CardContent>
  </Card>
);

const RevenueChart = () => {
    const maxRevenue = Math.max(...revenueData.map(d => d.revenue));

    return (
        <div className="w-full h-80 flex items-end space-x-2 sm:space-x-4">
            {revenueData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center justify-end group">
                    <div 
                        className="w-full bg-blue-500 rounded-t-lg hover:bg-blue-600 transition-all duration-300"
                        style={{ height: `${(data.revenue / maxRevenue) * 100}%` }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs text-center p-1 bg-gray-900 rounded-md -mt-8">
                        ${data.revenue.toLocaleString()}
                      </div>
                    </div>
                    <span className="mt-2 text-xs text-gray-500 dark:text-gray-400">{data.month}</span>
                </div>
            ))}
        </div>
    );
};


// --- MAIN DASHBOARD COMPONENT ---

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">CRM Dashboard</h1>
              <p className="mt-1 text-gray-500 dark:text-gray-400">Welcome back! Here's a summary of your sales activity.</p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-2">
              <button className="px-4 py-2 text-sm font-medium bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700">
                This Month
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700">
                Export Report
              </button>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            
            {/* Revenue Overview (Main Chart) */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Revenue Overview</h3>
                    <button className="flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
                        Last 12 Months <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                </div>
              </CardHeader>
              <CardContent>
                <RevenueChart />
              </CardContent>
            </Card>

            {/* Recent Deals */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Recent Deals</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">You have 250 new deals this month.</p>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {recentDeals.map((deal, index) => (
                    <li key={index} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <CircleUser className="w-6 h-6 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium">{deal.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{deal.email}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-green-600">{deal.value}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* My Tasks */}
             <Card className="lg:col-span-3">
               <CardHeader>
                 <h3 className="text-lg font-semibold">My Tasks</h3>
                 <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Your priority tasks for the week.</p>
               </CardHeader>
               <CardContent>
                 <div className="space-y-4">
                   {taskData.map((task, index) => (
                     <div key={index} className="flex items-center">
                       {task.completed ? (
                         <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                       ) : (
                         <Clock className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0" />
                       )}
                       <div className="flex-grow">
                         <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                           {task.title}
                         </p>
                       </div>
                       <div className={`text-sm px-2 py-1 rounded-full ${
                          task.completed 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                        }`}>
                         {task.deadline}
                       </div>
                     </div>
                   ))}
                 </div>
               </CardContent>
             </Card>

          </div>
        </div>
      </main>
    </div>
  );
}

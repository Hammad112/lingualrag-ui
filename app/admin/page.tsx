'use client';

import { useState, useEffect } from 'react';
import { ProtectedLayout } from '@/components/ProtectedLayout';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Users,
  MessageSquare,
  FileText,
  TrendingUp,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { AnalyticsData } from '@/types';
import { getAxiosInstance, handleAPIError } from '@/lib/api-client';

const StatCard = ({
  icon: Icon,
  label,
  value,
  change,
}: {
  icon: React.ComponentType<{ size: number }>;
  label: string;
  value: string | number;
  change?: string;
}) => (
  <Card className="p-6">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        <p className="text-2xl md:text-3xl font-bold text-foreground">
          {value}
        </p>
        {change && (
          <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
            <TrendingUp size={14} />
            {change}
          </p>
        )}
      </div>
      <div className="p-3 bg-primary/10 rounded-lg text-primary">
        <Icon size={24} />
      </div>
    </div>
  </Card>
);

const COLORS = [
  '#4f46e5',
  '#0ea5e9',
  '#8b5cf6',
  '#ec4899',
  '#22c55e',
  '#f59e0b',
];

export default function AdminPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const api = getAxiosInstance();

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await api.get<AnalyticsData>('/admin/analytics');
        setAnalytics(response.data);
      } catch (err) {
        const apiError = handleAPIError(err);
        setError(apiError.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [api]);

  if (isLoading) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <Loader2 size={32} className="animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading analytics...</p>
          </div>
        </div>
      </ProtectedLayout>
    );
  }

  if (error) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center h-full p-6">
          <Card className="p-8 max-w-md">
            <div className="flex items-center gap-3 text-destructive mb-3">
              <AlertCircle size={24} />
              <h2 className="font-semibold">Error Loading Analytics</h2>
            </div>
            <p className="text-sm text-muted-foreground">{error}</p>
          </Card>
        </div>
      </ProtectedLayout>
    );
  }

  if (!analytics) {
    return (
      <ProtectedLayout>
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">No analytics data available</p>
        </div>
      </ProtectedLayout>
    );
  }

  const languageData = Object.entries(analytics.languageDistribution || {}).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  return (
    <ProtectedLayout>
      <div className="flex flex-col h-full max-h-screen overflow-hidden bg-background">
        {/* Header */}
        <div className="flex-shrink-0 px-4 py-4 border-b border-border md:px-6 md:py-5">
          <h1 className="text-xl md:text-2xl font-bold text-foreground">
            Admin Analytics
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time system performance and usage metrics
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Stats grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
            >
              <StatCard
                icon={Users}
                label="Total Users"
                value={analytics.totalUsers}
                change="+12% this month"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <StatCard
                icon={MessageSquare}
                label="Total Queries"
                value={analytics.totalQueries}
                change="+8% this week"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <StatCard
                icon={FileText}
                label="Avg Response Time"
                value={`${analytics.averageResponseTime.toFixed(2)}s`}
                change="-15% improvement"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <StatCard
                icon={TrendingUp}
                label="System Health"
                value="98.5%"
                change="Excellent"
              />
            </motion.div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily queries chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Daily Queries
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analytics.dailyQueries}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="date"
                      stroke="#6b7280"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#4f46e5"
                      dot={{ fill: '#4f46e5', r: 4 }}
                      activeDot={{ r: 6 }}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>

            {/* Language distribution chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Language Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={languageData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) =>
                        `${name}: ${value}`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {languageData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}

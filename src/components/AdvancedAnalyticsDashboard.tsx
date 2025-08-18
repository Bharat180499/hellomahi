"use client"
import { CardContent, CardHeader, CardTitle, Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, User, Users, MapPin, Download, Award, Activity, TrendingUp, ArrowUp, ArrowDown, RefreshCw, BarChart3, PieChart, Minus, Eye, Calendar, DollarSign, MessageCircle, Target } from 'lucide-react'

interface AnalyticsData {
  period: string
  bookings: number
  revenue: number
  views: number
  messages: number
  rating: number
  conversionRate: number
}

interface MetricCard {
  title: string
  value: string
  change: number
  changeType: 'increase' | 'decrease' | 'neutral'
  icon: any
  color: string
}

export default function AdvancedAnalyticsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d')
  const [selectedMetric, setSelectedMetric] = useState<'bookings' | 'revenue' | 'views' | 'rating'>('bookings')

  const mockData: AnalyticsData[] = [
    { period: 'Jan 1', bookings: 12, revenue: 180000, views: 450, messages: 25, rating: 4.8, conversionRate: 2.7 },
    { period: 'Jan 2', bookings: 15, revenue: 225000, views: 520, messages: 30, rating: 4.9, conversionRate: 2.9 },
    { period: 'Jan 3', bookings: 8, revenue: 120000, views: 380, messages: 18, rating: 4.7, conversionRate: 2.1 },
    { period: 'Jan 4', bookings: 20, revenue: 300000, views: 600, messages: 35, rating: 4.8, conversionRate: 3.3 },
    { period: 'Jan 5', bookings: 18, revenue: 270000, views: 550, messages: 32, rating: 4.9, conversionRate: 3.3 },
    { period: 'Jan 6', bookings: 22, revenue: 330000, views: 650, messages: 40, rating: 4.8, conversionRate: 3.4 },
    { period: 'Jan 7', bookings: 25, revenue: 375000, views: 700, messages: 45, rating: 4.9, conversionRate: 3.6 }
  ]

  const metrics: MetricCard[] = [
    {
      title: 'Total Bookings',
      value: '120',
      change: 15.3,
      changeType: 'increase',
      icon: Calendar,
      color: 'text-blue-600'
    },
    {
      title: 'Revenue',
      value: '₹18.5L',
      change: 8.7,
      changeType: 'increase',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Profile Views',
      value: '3,850',
      change: -2.1,
      changeType: 'decrease',
      icon: Eye,
      color: 'text-purple-600'
    },
    {
      title: 'Messages',
      value: '225',
      change: 12.4,
      changeType: 'increase',
      icon: MessageCircle,
      color: 'text-orange-600'
    },
    {
      title: 'Average Rating',
      value: '4.8',
      change: 0.2,
      changeType: 'increase',
      icon: Star,
      color: 'text-yellow-600'
    },
    {
      title: 'Conversion Rate',
      value: '3.1%',
      change: 0.5,
      changeType: 'increase',
      icon: Target,
      color: 'text-indigo-600'
    }
  ]

  const topCities = [
    { city: 'Mumbai', bookings: 45, revenue: 675000, growth: 12.5 },
    { city: 'Delhi', bookings: 38, revenue: 570000, growth: 8.3 },
    { city: 'Bangalore', bookings: 32, revenue: 480000, growth: 15.7 },
    { city: 'Hyderabad', bookings: 28, revenue: 420000, growth: 6.2 },
    { city: 'Chennai', bookings: 25, revenue: 375000, growth: 9.1 }
  ]

  const serviceBreakdown = [
    { service: 'Companionship', bookings: 65, revenue: 975000, percentage: 54.2 },
    { service: 'Dinner Date', bookings: 25, revenue: 375000, percentage: 20.8 },
    { service: 'Massage', bookings: 15, revenue: 225000, percentage: 12.5 },
    { service: 'Travel', bookings: 10, revenue: 150000, percentage: 8.3 },
    { service: 'VIP Service', bookings: 5, revenue: 75000, percentage: 4.2 }
  ]

  const recentActivity = [
    { type: 'booking', message: 'New booking from Rahul V. for tonight', time: '2 min ago', amount: 30000 },
    { type: 'message', message: 'Message from Amit P. about weekend availability', time: '15 min ago' },
    { type: 'review', message: '5-star review received from Priya S.', time: '1 hour ago' },
    { type: 'payment', message: 'Payment received from Vikram M.', time: '2 hours ago', amount: 45000 },
    { type: 'view', message: 'Profile viewed by 12 new clients', time: '3 hours ago' }
  ]

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'increase':
        return <ArrowUp className="h-4 w-4 text-green-600" />
      case 'decrease':
        return <ArrowDown className="h-4 w-4 text-red-600" />
      default:
        return <Minus className="h-4 w-4 text-gray-600" />
    }
  }

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'increase':
        return 'text-green-600'
      case 'decrease':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track your performance and insights
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as any)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {metric.title}
                  </p>
                  <p className="text-2xl font-bold mt-1">
                    {metric.value}
                  </p>
                  <div className="flex items-center space-x-1 mt-2">
                    {getChangeIcon(metric.changeType)}
                    <span className={`text-sm font-medium ${getChangeColor(metric.changeType)}`}>
                      {metric.change}%
                    </span>
                    <span className="text-sm text-muted-foreground">
                      vs last period
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-full bg-muted ${metric.color}`}>
                  <metric.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Performance Overview
              </CardTitle>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value as any)}
                className="px-3 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="bookings">Bookings</option>
                <option value="revenue">Revenue</option>
                <option value="views">Views</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between space-x-2">
              {mockData.map((data, index) => {
                const value = data[selectedMetric as keyof AnalyticsData] as number
                const maxValue = Math.max(...mockData.map(d => d[selectedMetric as keyof AnalyticsData] as number))
                const height = (value / maxValue) * 100
                
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-primary rounded-t transition-all duration-300 hover:bg-primary/80"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-muted-foreground mt-2">
                      {data.period}
                    </span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="h-5 w-5 mr-2" />
              Service Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {serviceBreakdown.map((service, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{
                        backgroundColor: `hsl(${index * 60}, 70%, 50%)`
                      }}
                    />
                    <span className="text-sm font-medium">{service.service}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {service.bookings} bookings
                    </div>
                    <div className="text-xs text-muted-foreground">
                      ₹{service.revenue.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Cities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Top Performing Cities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCities.map((city, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{city.city}</div>
                      <div className="text-sm text-muted-foreground">
                        {city.bookings} bookings
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      ₹{city.revenue.toLocaleString()}
                    </div>
                    <div className={`text-sm ${city.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {city.growth > 0 ? '+' : ''}{city.growth}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'booking' ? 'bg-green-500' :
                    activity.type === 'message' ? 'bg-blue-500' :
                    activity.type === 'review' ? 'bg-yellow-500' :
                    activity.type === 'payment' ? 'bg-purple-500' :
                    'bg-gray-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm">{activity.message}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">
                        {activity.time}
                      </span>
                      {activity.amount && (
                        <span className="text-xs font-medium">
                          ₹{activity.amount.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2" />
            Key Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold text-green-800 dark:text-green-200">
                Growing Revenue
              </h4>
              <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                Your revenue has increased by 15.3% this month
              </p>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold text-blue-800 dark:text-blue-200">
                High Conversion
              </h4>
              <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">
                3.1% of profile views convert to bookings
              </p>
            </div>
            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">
                Excellent Rating
              </h4>
              <p className="text-sm text-yellow-600 dark:text-yellow-300 mt-1">
                Maintained 4.8+ rating consistently
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
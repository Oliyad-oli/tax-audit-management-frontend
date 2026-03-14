import { useState, useEffect } from 'react'
import MainLayout from "../layouts/MainLayout"
import { useAuth } from '../context/AuthContext'
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'

function Dashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalCases: 0,
    activeCases: 0,
    completedCases: 0,
    pendingCases: 0,
    totalAssessments: 0,
    averageCompletion: 0
  })

  // Mock data - replace with API calls
  const monthlyData = [
    { month: 'Jan', completed: 12, pending: 8, planned: 20 },
    { month: 'Feb', completed: 15, pending: 10, planned: 22 },
    { month: 'Mar', completed: 18, pending: 7, planned: 25 },
    { month: 'Apr', completed: 22, pending: 12, planned: 28 },
    { month: 'May', completed: 20, pending: 9, planned: 26 },
    { month: 'Jun', completed: 25, pending: 11, planned: 30 }
  ]

  const auditTypeData = [
    { name: 'Desk Audit', value: 45 },
    { name: 'Comprehensive', value: 28 },
    { name: 'Issue Audit', value: 18 },
    { name: 'Transfer Pricing', value: 12 },
    { name: 'Joint Audit', value: 8 }
  ]

  const riskDistribution = [
    { name: 'High Risk', value: 25, color: '#ef4444' },
    { name: 'Medium Risk', value: 45, color: '#f59e0b' },
    { name: 'Low Risk', value: 30, color: '#10b981' }
  ]

  const COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899']

  useEffect(() => {
    // Fetch dashboard stats from API
    const fetchStats = async () => {
      try {
        // const response = await dashboardService.getStats()
        // setStats(response.data)
        
        // Mock data
        setStats({
          totalCases: 248,
          activeCases: 54,
          completedCases: 170,
          pendingCases: 24,
          totalAssessments: 3450000,
          averageCompletion: 78
        })
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      }
    }

    fetchStats()
  }, [])

  return (
    <MainLayout>

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 mb-6 text-white">
        <h2 className="text-2xl font-bold mb-2">
          Welcome back, {user?.name || 'Auditor'}!
        </h2>
        <p className="opacity-90">
          You have {stats.pendingCases} pending cases requiring your attention.
        </p>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-3 gap-6 mb-8">

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-gray-500 text-sm">Total Audit Cases</h3>
          <p className="text-4xl font-bold">{stats.totalCases}</p>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-green-600">↑ 12%</span>
            <span className="text-gray-500 ml-2">vs last month</span>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-gray-500 text-sm">Active Audits</h3>
          <p className="text-4xl font-bold">{stats.activeCases}</p>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-blue-600">{stats.pendingCases} pending</span>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-gray-500 text-sm">Completed Audits</h3>
          <p className="text-4xl font-bold">{stats.completedCases}</p>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full" 
              style={{ width: `${stats.averageCompletion}%` }}
            ></div>
          </div>
        </div>

      </div>

      {/* Assessment Summary */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Assessment Summary</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              Br {(stats.totalAssessments / 1000000).toFixed(1)}M
            </p>
            <p className="text-sm text-gray-500">Total Assessments</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">Br 2.1M</p>
            <p className="text-sm text-gray-500">Collected</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">Br 850K</p>
            <p className="text-sm text-gray-500">Under Dispute</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">Br 500K</p>
            <p className="text-sm text-gray-500">Pending</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6 mb-8">

        {/* Monthly Trend Chart */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Monthly Audit Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="planned" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Audit Type Distribution */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Audit Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={auditTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {auditTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Risk Distribution and Recent Activities */}
      <div className="grid grid-cols-2 gap-6">

        {/* Risk Distribution */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Risk Distribution</h3>
          <div className="space-y-4">
            {riskDistribution.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.name}</span>
                  <span className="font-medium">{item.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{ 
                      width: `${item.value}%`,
                      backgroundColor: item.color 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 mt-2 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">Audit case AC-2024-015 completed</p>
                <p className="text-xs text-gray-500">10 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">New transfer pricing case assigned</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 mt-2 bg-yellow-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">Quality assurance review scheduled</p>
                <p className="text-xs text-gray-500">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 mt-2 bg-purple-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">Documents uploaded for joint audit</p>
                <p className="text-xs text-gray-500">Yesterday</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-5 gap-3">
          <button className="p-3 border rounded-lg hover:bg-gray-50 text-center">
            <div className="text-2xl mb-1">📋</div>
            <span className="text-sm">Create Case</span>
          </button>
          <button className="p-3 border rounded-lg hover:bg-gray-50 text-center">
            <div className="text-2xl mb-1">📊</div>
            <span className="text-sm">Generate Report</span>
          </button>
          <button className="p-3 border rounded-lg hover:bg-gray-50 text-center">
            <div className="text-2xl mb-1">👥</div>
            <span className="text-sm">Assign Auditor</span>
          </button>
          <button className="p-3 border rounded-lg hover:bg-gray-50 text-center">
            <div className="text-2xl mb-1">📎</div>
            <span className="text-sm">Upload Docs</span>
          </button>
          <button className="p-3 border rounded-lg hover:bg-gray-50 text-center">
            <div className="text-2xl mb-1">✓</div>
            <span className="text-sm">Quality Check</span>
          </button>
        </div>
      </div>

    </MainLayout>
  )
}

export default Dashboard
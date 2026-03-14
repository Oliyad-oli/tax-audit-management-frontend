import MainLayout from "../layouts/MainLayout"
import CreateAuditPlanForm from "../components/CreateAuditPlanForm"
import { useState } from "react"

function AuditPlan() {
  const [activeTab, setActiveTab] = useState('create')

  // Sample data for existing plans
  const existingPlans = [
    { id: 1, name: 'Q1 2024 Audit Plan', type: 'Comprehensive', status: 'Active', date: '2024-01-15' },
    { id: 2, name: 'Transfer Pricing Review', type: 'Transfer Pricing', status: 'Pending', date: '2024-01-20' },
    { id: 3, name: 'SME Desk Audit Plan', type: 'Desk Audit', status: 'Approved', date: '2024-01-10' },
    { id: 4, name: 'Joint Audit Q1', type: 'Joint Audit', status: 'Draft', date: '2024-01-25' },
  ]

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      case 'Approved': return 'bg-blue-100 text-blue-800'
      case 'Draft': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <MainLayout>
      {/* Header Section with Gradient */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Audit Planning</h1>
            <p className="text-gray-600 mt-1">Create and manage annual audit plans</p>
          </div>
          
          {/* Quick Stats - Responsive Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 md:mt-0">
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-blue-600">12</p>
              <p className="text-xs text-gray-600">Active Plans</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-green-600">8</p>
              <p className="text-xs text-gray-600">Completed</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-yellow-600">4</p>
              <p className="text-xs text-gray-600">Pending</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-purple-600">24</p>
              <p className="text-xs text-gray-600">Total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs - Responsive */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex flex-wrap -mb-px">
          <button
            onClick={() => setActiveTab('create')}
            className={`mr-6 py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'create'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <span className="flex items-center space-x-2">
              <span>📝</span>
              <span>Create New Plan</span>
            </span>
          </button>
          <button
            onClick={() => setActiveTab('existing')}
            className={`mr-6 py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'existing'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <span className="flex items-center space-x-2">
              <span>📋</span>
              <span>Existing Plans</span>
            </span>
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'templates'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <span className="flex items-center space-x-2">
              <span>📁</span>
              <span>Templates</span>
            </span>
          </button>
        </nav>
      </div>

      {/* Content Area */}
      <div className="min-h-[500px]">
        {/* Create Plan Tab */}
        {activeTab === 'create' && (
          <div>
            {/* Info Banner */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <div className="text-blue-600 text-xl">💡</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Planning Guidelines</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Create audit plans based on risk assessment, available resources, and annual audit tactics. 
                    Plans can be reviewed and approved by the audit director.
                  </p>
                </div>
              </div>
            </div>

            {/* Form Card with Hover Effect */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              
              {/* Card Header */}
              <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-8 bg-blue-600 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-gray-800">Audit Plan Details</h3>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Fill in the information below to create a new audit plan
                </p>
              </div>

              {/* Form */}
              <div className="p-6">
                <CreateAuditPlanForm />
              </div>

              {/* Card Footer with Tips */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="text-yellow-500 mr-2">⚠️</span>
                  <span>Remember to consider resource allocation and risk priorities</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Existing Plans Tab */}
        {activeTab === 'existing' && (
          <div>
            {/* Search and Filter Bar - Responsive */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search plans..."
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>All Types</option>
                    <option>Desk Audit</option>
                    <option>Comprehensive</option>
                    <option>Transfer Pricing</option>
                    <option>Joint Audit</option>
                  </select>
                  <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Pending</option>
                    <option>Approved</option>
                    <option>Draft</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Plans Grid - Responsive Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {existingPlans.map((plan) => (
                <div 
                  key={plan.id} 
                  className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                        <span className="text-xl">📊</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(plan.status)}`}>
                        {plan.status}
                      </span>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-1">{plan.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">{plan.type}</p>
                    
                    <div className="flex items-center text-xs text-gray-400 mb-4">
                      <span>📅</span>
                      <span className="ml-1">Created: {plan.date}</span>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                        View Details →
                      </button>
                      <div className="flex space-x-2">
                        <button className="p-1 hover:bg-gray-100 rounded" title="Edit">
                          ✏️
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded" title="More">
                          ⋮
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Create New Card */}
              <div 
                onClick={() => setActiveTab('create')}
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-md border-2 border-dashed border-gray-300 hover:border-blue-400 hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <div className="p-6 h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                    <span className="text-3xl text-gray-400 group-hover:text-blue-600">+</span>
                  </div>
                  <h3 className="font-semibold text-gray-700 group-hover:text-blue-600">Create New Plan</h3>
                  <p className="text-sm text-gray-500 mt-1">Start a new audit plan</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📁</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Plan Templates</h3>
              <p className="text-gray-500 mb-6">Use pre-configured templates for common audit types</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                <div className="p-4 border rounded-lg hover:border-blue-400 hover:shadow cursor-pointer transition-all">
                  <div className="text-2xl mb-2">📋</div>
                  <h4 className="font-medium">Desk Audit</h4>
                  <p className="text-xs text-gray-500">Standard desk audit template</p>
                </div>
                <div className="p-4 border rounded-lg hover:border-blue-400 hover:shadow cursor-pointer transition-all">
                  <div className="text-2xl mb-2">🔍</div>
                  <h4 className="font-medium">Comprehensive</h4>
                  <p className="text-xs text-gray-500">Full scope audit template</p>
                </div>
                <div className="p-4 border rounded-lg hover:border-blue-400 hover:shadow cursor-pointer transition-all">
                  <div className="text-2xl mb-2">💱</div>
                  <h4 className="font-medium">Transfer Pricing</h4>
                  <p className="text-xs text-gray-500">TP audit with benchmarks</p>
                </div>
                <div className="p-4 border rounded-lg hover:border-blue-400 hover:shadow cursor-pointer transition-all">
                  <div className="text-2xl mb-2">🤝</div>
                  <h4 className="font-medium">Joint Audit</h4>
                  <p className="text-xs text-gray-500">Multi-agency coordination</p>
                </div>
              </div>

              <button className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Browse All Templates
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Help Section - Responsive */}
      <div className="mt-8 bg-blue-50 rounded-lg p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-3">
            <span className="text-blue-600 text-xl">❓</span>
            <div>
              <h4 className="font-semibold text-gray-900">Need help with audit planning?</h4>
              <p className="text-sm text-gray-600">Check the planning guidelines or contact the audit director</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-white text-blue-600 rounded-lg border border-blue-300 hover:bg-blue-50 transition-colors text-sm font-medium whitespace-nowrap">
            View Guidelines
          </button>
        </div>
      </div>

    </MainLayout>
  )
}

export default AuditPlan
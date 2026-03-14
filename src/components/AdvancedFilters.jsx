import { useState } from 'react'

function AdvancedFilters({ onApply, onReset, filters = {} }) {
  const [localFilters, setLocalFilters] = useState({
    auditType: '',
    status: '',
    dateRange: 'all',
    startDate: '',
    endDate: '',
    riskLevel: '',
    assignedTo: '',
    ...filters
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setLocalFilters(prev => ({ ...prev, [name]: value }))
  }

  const handleApply = () => {
    onApply(localFilters)
  }

  const handleReset = () => {
    setLocalFilters({
      auditType: '',
      status: '',
      dateRange: 'all',
      startDate: '',
      endDate: '',
      riskLevel: '',
      assignedTo: ''
    })
    onReset()
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Advanced Filters</h3>
      
      <div className="grid grid-cols-3 gap-4">

        <div>
          <label className="block text-sm font-medium mb-1">Audit Type</label>
          <select
            name="auditType"
            value={localFilters.auditType}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="">All Types</option>
            <option value="desk">Desk Audit</option>
            <option value="comprehensive">Comprehensive Audit</option>
            <option value="issue">Issue Audit</option>
            <option value="transfer">Transfer Pricing</option>
            <option value="joint">Joint Audit</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            value={localFilters.status}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Risk Level</label>
          <select
            name="riskLevel"
            value={localFilters.riskLevel}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="">All Risks</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Date Range</label>
          <select
            name="dateRange"
            value={localFilters.dateRange}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>

        {localFilters.dateRange === 'custom' && (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={localFilters.startDate}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input
                type="date"
                name="endDate"
                value={localFilters.endDate}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
          </>
        )}

      </div>

      <div className="flex justify-end space-x-3 mt-4">
        <button
          onClick={handleReset}
          className="px-4 py-2 border rounded hover:bg-gray-50"
        >
          Reset Filters
        </button>
        <button
          onClick={handleApply}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Apply Filters
        </button>
      </div>
    </div>
  )
}

export default AdvancedFilters
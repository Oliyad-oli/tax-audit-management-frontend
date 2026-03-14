import MainLayout from "../layouts/MainLayout"
import Table from "../components/Table"
import { useState, useEffect } from "react"
import toast from 'react-hot-toast'

function AuditCases() {
  const [cases, setCases] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedCase, setSelectedCase] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [newCase, setNewCase] = useState({
    caseNumber: '',
    taxpayerName: '',
    taxpayerTIN: '',
    auditType: '',
    status: 'Pending',
    assignedAuditor: '',
    riskLevel: 'Medium',
    startDate: '',
    endDate: '',
    description: '',
    sector: '',
    amount: ''
  })

  // Load cases from localStorage
  useEffect(() => {
    loadCases()
  }, [])

  const loadCases = () => {
    setIsLoading(true)
    try {
      const savedCases = localStorage.getItem('auditCases')
      if (savedCases) {
        setCases(JSON.parse(savedCases))
      } else {
        // Sample data
        const sampleCases = [
          { 
            id: '1', 
            caseNumber: 'AC-101', 
            taxpayerName: 'ABC Trading PLC', 
            taxpayerTIN: '1000234567',
            auditType: 'Desk Audit', 
            status: 'Active', 
            assignedAuditor: 'John',
            riskLevel: 'Medium',
            startDate: '2024-01-15',
            endDate: '2024-02-15',
            description: 'Regular desk audit for import/export company',
            sector: 'Import/Export',
            amount: '500000'
          },
          { 
            id: '2', 
            caseNumber: 'AC-102', 
            taxpayerName: 'Sunrise PLC', 
            taxpayerTIN: '1000789456',
            auditType: 'Comprehensive', 
            status: 'Pending', 
            assignedAuditor: 'Sara',
            riskLevel: 'High',
            startDate: '2024-02-01',
            endDate: '2024-04-30',
            description: 'Full scope audit due to discrepancies in VAT returns',
            sector: 'Manufacturing',
            amount: '1200000'
          },
          { 
            id: '3', 
            caseNumber: 'AC-103', 
            taxpayerName: 'EthioTech PLC', 
            taxpayerTIN: '1000345678',
            auditType: 'Issue Audit', 
            status: 'Completed', 
            assignedAuditor: 'Daniel',
            riskLevel: 'Low',
            startDate: '2024-01-10',
            endDate: '2024-01-25',
            description: 'Audit of R&D tax credits',
            sector: 'Technology',
            amount: '350000'
          },
        ]
        setCases(sampleCases)
        localStorage.setItem('auditCases', JSON.stringify(sampleCases))
      }
    } catch (error) {
      toast.error('Failed to load cases')
    } finally {
      setIsLoading(false)
    }
  }

  // Generate unique case number
  const generateCaseNumber = () => {
    const lastCase = cases[cases.length - 1]
    if (lastCase) {
      const lastNum = parseInt(lastCase.caseNumber.split('-')[1])
      return `AC-${String(lastNum + 1).padStart(3, '0')}`
    }
    return 'AC-101'
  }

  // Create new case
  const handleCreateCase = () => {
    try {
      const caseToCreate = {
        ...newCase,
        id: Date.now().toString(),
        caseNumber: generateCaseNumber(),
        createdAt: new Date().toISOString().split('T')[0]
      }
      
      const updatedCases = [...cases, caseToCreate]
      setCases(updatedCases)
      localStorage.setItem('auditCases', JSON.stringify(updatedCases))
      
      toast.success('Audit case created successfully!')
      setShowCreateModal(false)
      setNewCase({
        caseNumber: '',
        taxpayerName: '',
        taxpayerTIN: '',
        auditType: '',
        status: 'Pending',
        assignedAuditor: '',
        riskLevel: 'Medium',
        startDate: '',
        endDate: '',
        description: '',
        sector: '',
        amount: ''
      })
    } catch (error) {
      toast.error('Failed to create case')
    }
  }

  // Update case
  const handleUpdateCase = () => {
    try {
      const updatedCases = cases.map(c => 
        c.id === selectedCase.id ? selectedCase : c
      )
      
      setCases(updatedCases)
      localStorage.setItem('auditCases', JSON.stringify(updatedCases))
      
      toast.success('Case updated successfully!')
      setShowEditModal(false)
      setSelectedCase(null)
    } catch (error) {
      toast.error('Failed to update case')
    }
  }

  // Delete case
  const handleDeleteCase = () => {
    try {
      const updatedCases = cases.filter(c => c.id !== selectedCase.id)
      setCases(updatedCases)
      localStorage.setItem('auditCases', JSON.stringify(updatedCases))
      
      toast.success('Case deleted successfully!')
      setShowDeleteModal(false)
      setSelectedCase(null)
    } catch (error) {
      toast.error('Failed to delete case')
    }
  }

  // Update case status
  const handleStatusChange = (caseId, newStatus) => {
    try {
      const updatedCases = cases.map(c => 
        c.id === caseId ? { ...c, status: newStatus } : c
      )
      
      setCases(updatedCases)
      localStorage.setItem('auditCases', JSON.stringify(updatedCases))
      
      toast.success(`Status updated to ${newStatus}`)
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  // Filter cases
  const filteredCases = cases.filter(c => {
    const matchesSearch = 
      c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.taxpayerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.taxpayerTIN.includes(searchTerm)
    
    const matchesType = filterType ? c.auditType === filterType : true
    const matchesStatus = filterStatus ? c.status === filterStatus : true
    
    return matchesSearch && matchesType && matchesStatus
  })

  // Calculate stats
  const stats = {
    total: cases.length,
    active: cases.filter(c => c.status === 'Active').length,
    pending: cases.filter(c => c.status === 'Pending').length,
    completed: cases.filter(c => c.status === 'Completed').length,
    highRisk: cases.filter(c => c.riskLevel === 'High').length
  }

  const getStatusBadge = (status) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800 border-green-200',
      'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Completed': 'bg-blue-100 text-blue-800 border-blue-200',
      'Cancelled': 'bg-gray-100 text-gray-800 border-gray-200'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getRiskBadge = (risk) => {
    const colors = {
      'High': 'bg-red-100 text-red-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'Low': 'bg-green-100 text-green-800'
    }
    return colors[risk] || 'bg-gray-100 text-gray-800'
  }

  // Table columns with actions
  const columns = [
    "Case ID",
    "Taxpayer",
    "TIN",
    "Audit Type",
    "Status",
    "Risk",
    "Assigned Auditor",
    "Actions"
  ]

  const data = filteredCases.map(c => [
    <div className="font-medium text-blue-600">{c.caseNumber}</div>,
    <div>
      <div className="font-medium">{c.taxpayerName}</div>
      <div className="text-xs text-gray-500">{c.sector}</div>
    </div>,
    c.taxpayerTIN,
    c.auditType,
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(c.status)}`}>
      {c.status}
    </span>,
    <span className={`px-2 py-1 rounded text-xs ${getRiskBadge(c.riskLevel)}`}>
      {c.riskLevel}
    </span>,
    c.assignedAuditor,
    <div className="flex space-x-2">
      <button 
        onClick={() => {
          setSelectedCase(c)
          setShowViewModal(true)
        }}
        className="text-blue-600 hover:text-blue-800 text-sm"
        title="View"
      >
        👁️
      </button>
      <button 
        onClick={() => {
          setSelectedCase(c)
          setShowEditModal(true)
        }}
        className="text-green-600 hover:text-green-800 text-sm"
        title="Edit"
      >
        ✏️
      </button>
      <button 
        onClick={() => {
          setSelectedCase(c)
          setShowDeleteModal(true)
        }}
        className="text-red-600 hover:text-red-800 text-sm"
        title="Delete"
      >
        🗑️
      </button>
      <div className="relative group">
        <button className="text-gray-600 hover:text-gray-800 text-sm">
          ⋮
        </button>
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border hidden group-hover:block z-10">
          <div className="py-1">
            {c.status !== 'Active' && (
              <button 
                onClick={() => handleStatusChange(c.id, 'Active')}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                ▶️ Mark Active
              </button>
            )}
            {c.status !== 'Pending' && (
              <button 
                onClick={() => handleStatusChange(c.id, 'Pending')}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                ⏳ Set Pending
              </button>
            )}
            {c.status !== 'Completed' && (
              <button 
                onClick={() => handleStatusChange(c.id, 'Completed')}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                ✅ Mark Complete
              </button>
            )}
            <hr className="my-1" />
            <button className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-100">
              📋 View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  ])

  return (
    <MainLayout>
      {/* Header with Stats */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Audit Cases</h1>
            <p className="text-gray-600 mt-1">Manage and track all audit cases</p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4 md:mt-0">
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
              <p className="text-xs text-gray-600">Total</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              <p className="text-xs text-gray-600">Active</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              <p className="text-xs text-gray-600">Pending</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.completed}</p>
              <p className="text-xs text-gray-600">Completed</p>
            </div>
            <div className="bg-red-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-red-600">{stats.highRisk}</p>
              <p className="text-xs text-gray-600">High Risk</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by case number, taxpayer name, or TIN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <select 
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="Desk Audit">Desk Audit</option>
              <option value="Comprehensive">Comprehensive</option>
              <option value="Issue Audit">Issue Audit</option>
              <option value="Transfer Pricing">Transfer Pricing</option>
              <option value="Joint Audit">Joint Audit</option>
            </select>
            <select 
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
            >
              <span className="mr-1">+</span> Create Case
            </button>
          </div>
        </div>
        
        {/* Active Filters */}
        {(searchTerm || filterType || filterStatus) && (
          <div className="mt-3 flex items-center">
            <span className="text-sm text-gray-500 mr-2">Active filters:</span>
            {searchTerm && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">
                Search: {searchTerm}
              </span>
            )}
            {filterType && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">
                Type: {filterType}
              </span>
            )}
            {filterStatus && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">
                Status: {filterStatus}
              </span>
            )}
            <button
              onClick={() => {
                setSearchTerm('')
                setFilterType('')
                setFilterStatus('')
              }}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-2 text-gray-600">Loading cases...</p>
        </div>
      ) : (
        <Table columns={columns} data={data} />
      )}

      {/* No Results */}
      {!isLoading && filteredCases.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center mt-6">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No cases found</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || filterType || filterStatus 
              ? 'No cases match your search criteria' 
              : 'Start by creating your first audit case'}
          </p>
          {(searchTerm || filterType || filterStatus) ? (
            <button
              onClick={() => {
                setSearchTerm('')
                setFilterType('')
                setFilterStatus('')
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Clear Filters
            </button>
          ) : (
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create New Case
            </button>
          )}
        </div>
      )}

      {/* Create Case Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <h3 className="text-xl font-bold text-white">Create New Audit Case</h3>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Taxpayer Name *</label>
                  <input
                    type="text"
                    value={newCase.taxpayerName}
                    onChange={(e) => setNewCase({...newCase, taxpayerName: e.target.value})}
                    className="w-full border rounded-lg p-2"
                    placeholder="Enter taxpayer name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">TIN *</label>
                  <input
                    type="text"
                    value={newCase.taxpayerTIN}
                    onChange={(e) => setNewCase({...newCase, taxpayerTIN: e.target.value})}
                    className="w-full border rounded-lg p-2"
                    placeholder="10 digits"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Sector</label>
                  <input
                    type="text"
                    value={newCase.sector}
                    onChange={(e) => setNewCase({...newCase, sector: e.target.value})}
                    className="w-full border rounded-lg p-2"
                    placeholder="e.g., Manufacturing"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Audit Type *</label>
                  <select
                    value={newCase.auditType}
                    onChange={(e) => setNewCase({...newCase, auditType: e.target.value})}
                    className="w-full border rounded-lg p-2"
                  >
                    <option value="">Select Type</option>
                    <option value="Desk Audit">Desk Audit</option>
                    <option value="Comprehensive">Comprehensive</option>
                    <option value="Issue Audit">Issue Audit</option>
                    <option value="Transfer Pricing">Transfer Pricing</option>
                    <option value="Joint Audit">Joint Audit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Risk Level</label>
                  <select
                    value={newCase.riskLevel}
                    onChange={(e) => setNewCase({...newCase, riskLevel: e.target.value})}
                    className="w-full border rounded-lg p-2"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Assigned Auditor</label>
                  <input
                    type="text"
                    value={newCase.assignedAuditor}
                    onChange={(e) => setNewCase({...newCase, assignedAuditor: e.target.value})}
                    className="w-full border rounded-lg p-2"
                    placeholder="Auditor name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Start Date *</label>
                  <input
                    type="date"
                    value={newCase.startDate}
                    onChange={(e) => setNewCase({...newCase, startDate: e.target.value})}
                    className="w-full border rounded-lg p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">End Date *</label>
                  <input
                    type="date"
                    value={newCase.endDate}
                    onChange={(e) => setNewCase({...newCase, endDate: e.target.value})}
                    className="w-full border rounded-lg p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Assessment Amount (Br)</label>
                  <input
                    type="number"
                    value={newCase.amount}
                    onChange={(e) => setNewCase({...newCase, amount: e.target.value})}
                    className="w-full border rounded-lg p-2"
                    placeholder="0"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={newCase.description}
                    onChange={(e) => setNewCase({...newCase, description: e.target.value})}
                    rows="3"
                    className="w-full border rounded-lg p-2"
                    placeholder="Enter case description"
                  />
                </div>

              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                <button
                  onClick={() => {
                    setShowCreateModal(false)
                    setNewCase({
                      caseNumber: '',
                      taxpayerName: '',
                      taxpayerTIN: '',
                      auditType: '',
                      status: 'Pending',
                      assignedAuditor: '',
                      riskLevel: 'Medium',
                      startDate: '',
                      endDate: '',
                      description: '',
                      sector: '',
                      amount: ''
                    })
                  }}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateCase}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  disabled={!newCase.taxpayerName || !newCase.taxpayerTIN || !newCase.auditType || !newCase.startDate || !newCase.endDate}
                >
                  Create Case
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Case Modal */}
      {showViewModal && selectedCase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Case Details: {selectedCase.caseNumber}</h3>
              <button 
                onClick={() => setShowViewModal(false)}
                className="text-white hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Case Number</p>
                  <p className="font-medium">{selectedCase.caseNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium inline-block mt-1 ${getStatusBadge(selectedCase.status)}`}>
                    {selectedCase.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Taxpayer Name</p>
                  <p className="font-medium">{selectedCase.taxpayerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">TIN</p>
                  <p className="font-medium">{selectedCase.taxpayerTIN}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Sector</p>
                  <p className="font-medium">{selectedCase.sector || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Audit Type</p>
                  <p className="font-medium">{selectedCase.auditType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Risk Level</p>
                  <span className={`px-2 py-1 rounded text-xs inline-block mt-1 ${getRiskBadge(selectedCase.riskLevel)}`}>
                    {selectedCase.riskLevel}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Assigned Auditor</p>
                  <p className="font-medium">{selectedCase.assignedAuditor || 'Unassigned'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="font-medium">{selectedCase.startDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">End Date</p>
                  <p className="font-medium">{selectedCase.endDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Assessment Amount</p>
                  <p className="font-medium">Br {parseInt(selectedCase.amount || 0).toLocaleString()}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="font-medium">{selectedCase.description || 'No description'}</p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Case Modal */}
      {showEditModal && selectedCase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
              <h3 className="text-xl font-bold text-white">Edit Case: {selectedCase.caseNumber}</h3>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Taxpayer Name</label>
                  <input
                    type="text"
                    value={selectedCase.taxpayerName}
                    onChange={(e) => setSelectedCase({...selectedCase, taxpayerName: e.target.value})}
                    className="w-full border rounded-lg p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">TIN</label>
                  <input
                    type="text"
                    value={selectedCase.taxpayerTIN}
                    onChange={(e) => setSelectedCase({...selectedCase, taxpayerTIN: e.target.value})}
                    className="w-full border rounded-lg p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Sector</label>
                  <input
                    type="text"
                    value={selectedCase.sector}
                    onChange={(e) => setSelectedCase({...selectedCase, sector: e.target.value})}
                    className="w-full border rounded-lg p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Audit Type</label>
                  <select
                    value={selectedCase.auditType}
                    onChange={(e) => setSelectedCase({...selectedCase, auditType: e.target.value})}
                    className="w-full border rounded-lg p-2"
                  >
                    <option value="Desk Audit">Desk Audit</option>
                    <option value="Comprehensive">Comprehensive</option>
                    <option value="Issue Audit">Issue Audit</option>
                    <option value="Transfer Pricing">Transfer Pricing</option>
                    <option value="Joint Audit">Joint Audit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    value={selectedCase.status}
                    onChange={(e) => setSelectedCase({...selectedCase, status: e.target.value})}
                    className="w-full border rounded-lg p-2"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Risk Level</label>
                  <select
                    value={selectedCase.riskLevel}
                    onChange={(e) => setSelectedCase({...selectedCase, riskLevel: e.target.value})}
                    className="w-full border rounded-lg p-2"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Assigned Auditor</label>
                  <input
                    type="text"
                    value={selectedCase.assignedAuditor}
                    onChange={(e) => setSelectedCase({...selectedCase, assignedAuditor: e.target.value})}
                    className="w-full border rounded-lg p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <input
                    type="date"
                    value={selectedCase.startDate}
                    onChange={(e) => setSelectedCase({...selectedCase, startDate: e.target.value})}
                    className="w-full border rounded-lg p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">End Date</label>
                  <input
                    type="date"
                    value={selectedCase.endDate}
                    onChange={(e) => setSelectedCase({...selectedCase, endDate: e.target.value})}
                    className="w-full border rounded-lg p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Assessment Amount</label>
                  <input
                    type="number"
                    value={selectedCase.amount}
                    onChange={(e) => setSelectedCase({...selectedCase, amount: e.target.value})}
                    className="w-full border rounded-lg p-2"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={selectedCase.description}
                    onChange={(e) => setSelectedCase({...selectedCase, description: e.target.value})}
                    rows="3"
                    className="w-full border rounded-lg p-2"
                  />
                </div>

              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                <button
                  onClick={() => {
                    setShowEditModal(false)
                    setSelectedCase(null)
                  }}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateCase}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Update Case
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedCase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete case <span className="font-semibold">{selectedCase.caseNumber}</span> for {selectedCase.taxpayerName}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false)
                  setSelectedCase(null)
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCase}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Case
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow flex items-center space-x-3">
          <span className="text-2xl">📊</span>
          <div className="text-left">
            <p className="font-medium">Generate Report</p>
            <p className="text-xs text-gray-500">Export cases summary</p>
          </div>
        </button>
        <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow flex items-center space-x-3">
          <span className="text-2xl">📎</span>
          <div className="text-left">
            <p className="font-medium">Bulk Upload</p>
            <p className="text-xs text-gray-500">Import multiple cases</p>
          </div>
        </button>
        <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow flex items-center space-x-3">
          <span className="text-2xl">📋</span>
          <div className="text-left">
            <p className="font-medium">Assign Batch</p>
            <p className="text-xs text-gray-500">Assign multiple cases</p>
          </div>
        </button>
        <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow flex items-center space-x-3">
          <span className="text-2xl">📈</span>
          <div className="text-left">
            <p className="font-medium">Analytics</p>
            <p className="text-xs text-gray-500">View case statistics</p>
          </div>
        </button>
      </div>

    </MainLayout>
  )
}

export default AuditCases
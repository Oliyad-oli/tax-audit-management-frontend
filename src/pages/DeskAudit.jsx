import MainLayout from "../layouts/MainLayout"
import { useState, useEffect } from "react"
import toast from 'react-hot-toast'

function DeskAudit() {
  const [activeCase, setActiveCase] = useState(null)
  const [checklist, setChecklist] = useState([
    { id: 1, item: 'Review tax declaration', completed: false, notes: '' },
    { id: 2, item: 'Verify VAT submissions', completed: false, notes: '' },
    { id: 3, item: 'Check financial statements', completed: false, notes: '' },
    { id: 4, item: 'Validate expense records', completed: false, notes: '' },
    { id: 5, item: 'Verify payroll taxes', completed: false, notes: '' },
    { id: 6, item: 'Review previous audit findings', completed: false, notes: '' },
    { id: 7, item: 'Check third-party data matches', completed: false, notes: '' },
    { id: 8, item: 'Validate input VAT claims', completed: false, notes: '' },
  ])
  
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [findings, setFindings] = useState('')
  const [adjustments, setAdjustments] = useState([])
  const [newAdjustment, setNewAdjustment] = useState({ description: '', amount: '', type: 'addition' })
  const [activeTab, setActiveTab] = useState('overview')
  const [showFindingsModal, setShowFindingsModal] = useState(false)
  const [showCompletionModal, setShowCompletionModal] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  // Sample taxpayer data
  const taxpayerInfo = {
    name: 'ABC Trading PLC',
    tin: '1000234567',
    sector: 'Import & Export',
    address: 'Bole Road, Addis Ababa',
    phone: '+251-911-234-567',
    email: 'info@abctrading.com',
    registrationDate: '2018-05-15',
    lastAudit: '2023-02-10',
    riskScore: '78',
    riskLevel: 'Medium'
  }

  // Sample financial data
  const financialData = {
    revenue: '8,500,000',
    expenses: '6,200,000',
    profit: '2,300,000',
    vatDeclared: '1,275,000',
    vatPaid: '1,200,000',
    payrollTax: '850,000'
  }

  // Load saved progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('deskAuditProgress')
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress)
      setChecklist(parsed.checklist || checklist)
      setFindings(parsed.findings || '')
      setAdjustments(parsed.adjustments || [])
    }
  }, [])

  // Save progress to localStorage
  const saveProgress = () => {
    const progress = {
      checklist,
      findings,
      adjustments,
      lastUpdated: new Date().toISOString()
    }
    localStorage.setItem('deskAuditProgress', JSON.stringify(progress))
    toast.success('Progress saved successfully!')
  }

  // Handle checklist item toggle
  const toggleChecklist = (id) => {
    setChecklist(checklist.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ))
  }

  // Handle checklist notes update
  const updateChecklistNotes = (id, notes) => {
    setChecklist(checklist.map(item =>
      item.id === id ? { ...item, notes } : item
    ))
  }

  // Handle file upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / 1024).toFixed(2),
      type: file.type,
      uploadedAt: new Date().toLocaleString()
    }))
    
    setUploadedFiles([...uploadedFiles, ...newFiles])
    toast.success(`${files.length} file(s) uploaded successfully!`)
  }

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / 1024).toFixed(2),
      type: file.type,
      uploadedAt: new Date().toLocaleString()
    }))
    
    setUploadedFiles([...uploadedFiles, ...newFiles])
    toast.success(`${files.length} file(s) uploaded successfully!`)
  }

  // Remove uploaded file
  const removeFile = (id) => {
    setUploadedFiles(uploadedFiles.filter(f => f.id !== id))
    toast.success('File removed')
  }

  // Add adjustment
  const addAdjustment = () => {
    if (newAdjustment.description && newAdjustment.amount) {
      setAdjustments([...adjustments, { 
        ...newAdjustment, 
        id: Date.now(),
        amount: parseFloat(newAdjustment.amount)
      }])
      setNewAdjustment({ description: '', amount: '', type: 'addition' })
      toast.success('Adjustment added')
    }
  }

  // Remove adjustment
  const removeAdjustment = (id) => {
    setAdjustments(adjustments.filter(a => a.id !== id))
    toast.success('Adjustment removed')
  }

  // Calculate total adjustment
  const totalAdjustment = adjustments.reduce((sum, adj) => {
    return adj.type === 'addition' ? sum + adj.amount : sum - adj.amount
  }, 0)

  // Submit audit
  const submitAudit = () => {
    if (checklist.filter(i => i.completed).length < checklist.length) {
      toast.error('Please complete all checklist items before submitting')
      return
    }
    
    const auditReport = {
      taxpayer: taxpayerInfo,
      checklist,
      findings,
      adjustments,
      totalAdjustment,
      completedAt: new Date().toISOString(),
      auditor: 'John Doe'
    }
    
    localStorage.setItem('completedAudit', JSON.stringify(auditReport))
    toast.success('Audit completed successfully!')
    setShowCompletionModal(false)
  }

  // Calculate progress percentage
  const progressPercentage = (checklist.filter(i => i.completed).length / checklist.length) * 100

  const getRiskColor = (level) => {
    switch(level) {
      case 'High': return 'text-red-600 bg-red-50'
      case 'Medium': return 'text-yellow-600 bg-yellow-50'
      case 'Low': return 'text-green-600 bg-green-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <MainLayout>
      {/* Header with Progress */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Desk Audit Execution</h1>
            <p className="text-gray-600 mt-1">Conduct desk audit for assigned taxpayer</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Audit Progress</p>
              <p className="text-2xl font-bold text-blue-600">{Math.round(progressPercentage)}%</p>
            </div>
            <div className="w-32 bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex flex-wrap -mb-px">
          <button
            onClick={() => setActiveTab('overview')}
            className={`mr-6 py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            📋 Overview
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`mr-6 py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'checklist'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            ✅ Audit Checklist
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`mr-6 py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'documents'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            📎 Documents
          </button>
          <button
            onClick={() => setActiveTab('findings')}
            className={`mr-6 py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'findings'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            🔍 Findings & Adjustments
          </button>
        </nav>
      </div>

      {/* Content Area */}
      <div className="min-h-[600px]">
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* Taxpayer Info Card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <span className="mr-2">👤</span>
                  Taxpayer Information
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-gray-500">Company Name</p>
                    <p className="font-semibold text-gray-900">{taxpayerInfo.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">TIN Number</p>
                    <p className="font-semibold text-gray-900">{taxpayerInfo.tin}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Sector</p>
                    <p className="font-semibold text-gray-900">{taxpayerInfo.sector}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-semibold text-gray-900">{taxpayerInfo.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="font-semibold text-gray-900">{taxpayerInfo.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold text-gray-900">{taxpayerInfo.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Registration Date</p>
                    <p className="font-semibold text-gray-900">{taxpayerInfo.registrationDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Audit</p>
                    <p className="font-semibold text-gray-900">{taxpayerInfo.lastAudit}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Risk Score/Level</p>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900">{taxpayerInfo.riskScore}</span>
                      <span className={`px-2 py-1 rounded text-xs ${getRiskColor(taxpayerInfo.riskLevel)}`}>
                        {taxpayerInfo.riskLevel}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Summary Card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <span className="mr-2">📊</span>
                  Financial Summary
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Revenue</p>
                    <p className="text-lg font-bold text-gray-900">Br {financialData.revenue}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Expenses</p>
                    <p className="text-lg font-bold text-gray-900">Br {financialData.expenses}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Profit</p>
                    <p className="text-lg font-bold text-green-600">Br {financialData.profit}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">VAT Declared</p>
                    <p className="text-lg font-bold text-gray-900">Br {financialData.vatDeclared}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">VAT Paid</p>
                    <p className="text-lg font-bold text-gray-900">Br {financialData.vatPaid}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Payroll Tax</p>
                    <p className="text-lg font-bold text-gray-900">Br {financialData.payrollTax}</p>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>⚠️ Discrepancy Alert:</strong> VAT declared (Br {financialData.vatDeclared}) vs VAT paid (Br {financialData.vatPaid}) difference of Br 75,000
                  </p>
                </div>
              </div>
            </div>

            {/* Audit Status Card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold mb-4">Audit Status</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Current Status</p>
                  <span className="inline-block mt-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                    In Progress
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Assigned Auditor</p>
                  <p className="font-semibold">John Doe</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="font-semibold">2024-01-15</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Target Completion</p>
                  <p className="font-semibold">2024-02-15</p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Checklist Tab */}
        {activeTab === 'checklist' && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <span className="mr-2">✅</span>
                Audit Checklist
              </h3>
            </div>
            <div className="p-6">
              
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Overall Progress</span>
                  <span className="text-blue-600 font-bold">{Math.round(progressPercentage)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Checklist Items */}
              <div className="space-y-4">
                {checklist.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => toggleChecklist(item.id)}
                          className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <div className="flex-1">
                          <label className={`font-medium ${item.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                            {item.item}
                          </label>
                          <input
                            type="text"
                            placeholder="Add notes..."
                            value={item.notes}
                            onChange={(e) => updateChecklistNotes(item.id, e.target.value)}
                            className="mt-2 w-full text-sm border-0 border-b border-gray-200 focus:border-blue-500 focus:ring-0 outline-none p-1"
                          />
                        </div>
                      </div>
                      {item.completed && (
                        <span className="text-green-600 text-sm ml-2">✓ Done</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={saveProgress}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Progress
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <div className="space-y-6">
            
            {/* Upload Area */}
            <div 
              className={`bg-white rounded-xl shadow-lg border-2 border-dashed p-8 text-center transition-colors ${
                isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
              }`}
              onDragOver={(e) => {
                e.preventDefault()
                setIsDragging(true)
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <div className="text-5xl mb-4">📎</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Upload Supporting Documents
              </h3>
              <p className="text-gray-500 mb-4">
                Drag and drop files here or click to browse
              </p>
              <input
                type="file"
                id="file-upload"
                multiple
                className="hidden"
                onChange={handleFileUpload}
              />
              <label
                htmlFor="file-upload"
                className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
              >
                Browse Files
              </label>
              <p className="text-xs text-gray-400 mt-2">
                Supported: PDF, Excel, Word, Images (Max 10MB each)
              </p>
            </div>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <span className="mr-2">📋</span>
                    Uploaded Documents ({uploadedFiles.length})
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">
                            {file.type.includes('pdf') ? '📄' : 
                             file.type.includes('excel') || file.type.includes('sheet') ? '📊' : 
                             file.type.includes('word') ? '📝' : 
                             file.type.includes('image') ? '🖼️' : '📎'}
                          </span>
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-xs text-gray-500">
                              {file.size} KB • Uploaded {file.uploadedAt}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFile(file.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Findings & Adjustments Tab */}
        {activeTab === 'findings' && (
          <div className="space-y-6">
            
            {/* Findings Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 px-6 py-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <span className="mr-2">🔍</span>
                  Audit Findings
                </h3>
              </div>
              <div className="p-6">
                <textarea
                  value={findings}
                  onChange={(e) => setFindings(e.target.value)}
                  placeholder="Document your audit findings here..."
                  rows="6"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                ></textarea>
              </div>
            </div>

            {/* Adjustments Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <span className="mr-2">💰</span>
                  Tax Adjustments
                </h3>
              </div>
              <div className="p-6">
                
                {/* Add Adjustment Form */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      placeholder="Adjustment description"
                      value={newAdjustment.description}
                      onChange={(e) => setNewAdjustment({...newAdjustment, description: e.target.value})}
                      className="w-full border rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Amount (Br)"
                      value={newAdjustment.amount}
                      onChange={(e) => setNewAdjustment({...newAdjustment, amount: e.target.value})}
                      className="w-full border rounded-lg p-2"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <select
                      value={newAdjustment.type}
                      onChange={(e) => setNewAdjustment({...newAdjustment, type: e.target.value})}
                      className="border rounded-lg p-2"
                    >
                      <option value="addition">+ Addition</option>
                      <option value="deduction">- Deduction</option>
                    </select>
                    <button
                      onClick={addAdjustment}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 whitespace-nowrap"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Adjustments List */}
                {adjustments.length > 0 ? (
                  <div className="space-y-3">
                    {adjustments.map((adj) => (
                      <div key={adj.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">{adj.description}</p>
                          <p className={`text-sm ${adj.type === 'addition' ? 'text-green-600' : 'text-red-600'}`}>
                            {adj.type === 'addition' ? '+' : '-'} Br {adj.amount.toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => removeAdjustment(adj.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          ✕
                        </button>
                      </div>
                    ))}

                    {/* Total Adjustment */}
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Total Adjustment:</span>
                        <span className={`text-xl font-bold ${totalAdjustment >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {totalAdjustment >= 0 ? '+' : '-'} Br {Math.abs(totalAdjustment).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-4">No adjustments added yet</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={saveProgress}
                className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
              >
                Save Draft
              </button>
              <button
                onClick={() => setShowFindingsModal(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Review Findings
              </button>
              <button
                onClick={() => setShowCompletionModal(true)}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Complete Audit
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Review Findings Modal */}
      {showFindingsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Review Audit Findings</h3>
              <button 
                onClick={() => setShowFindingsModal(false)}
                className="text-white hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Findings Summary</h4>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{findings || 'No findings documented'}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Adjustments Summary</h4>
                  {adjustments.length > 0 ? (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      {adjustments.map(adj => (
                        <div key={adj.id} className="flex justify-between text-sm py-1">
                          <span>{adj.description}</span>
                          <span className={adj.type === 'addition' ? 'text-green-600' : 'text-red-600'}>
                            {adj.type === 'addition' ? '+' : '-'} Br {adj.amount.toLocaleString()}
                          </span>
                        </div>
                      ))}
                      <div className="border-t mt-2 pt-2 font-bold flex justify-between">
                        <span>Total</span>
                        <span className={totalAdjustment >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {totalAdjustment >= 0 ? '+' : '-'} Br {Math.abs(totalAdjustment).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500">No adjustments made</p>
                  )}
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Checklist Completion</h4>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="mb-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      {checklist.filter(i => i.completed).length} of {checklist.length} items completed
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowFindingsModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowFindingsModal(false)
                    saveProgress()
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save & Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Complete Audit Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Complete Desk Audit</h3>
            
            {progressPercentage < 100 ? (
              <>
                <div className="text-center py-4">
                  <span className="text-6xl mb-4 block">⚠️</span>
                  <p className="text-red-600 mb-2">
                    Cannot complete audit: Checklist is not fully completed
                  </p>
                  <p className="text-sm text-gray-600">
                    {checklist.filter(i => i.completed).length} of {checklist.length} items completed ({Math.round(progressPercentage)}%)
                  </p>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setShowCompletionModal(false)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Go Back
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to complete this audit? This will generate the final report and close the case.
                </p>
                
                <div className="bg-yellow-50 p-3 rounded-lg mb-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Summary:</strong> Total adjustment of Br {Math.abs(totalAdjustment).toLocaleString()} ({totalAdjustment >= 0 ? 'additional tax due' : 'refund due'})
                  </p>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowCompletionModal(false)}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitAudit}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Complete Audit
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={saveProgress}
          className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 flex items-center justify-center text-2xl"
          title="Save Progress"
        >
          💾
        </button>
      </div>

    </MainLayout>
  )
}

export default DeskAudit
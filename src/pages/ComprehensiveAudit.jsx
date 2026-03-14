import MainLayout from "../layouts/MainLayout"
import { useState, useEffect } from "react"
import toast from 'react-hot-toast'

function ComprehensiveAudit() {
  const [activeTab, setActiveTab] = useState('financial')
  const [showFindingsModal, setShowFindingsModal] = useState(false)
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [showEscalateModal, setShowEscalateModal] = useState(false)
  const [requestType, setRequestType] = useState('')
  const [requestNotes, setRequestNotes] = useState('')
  const [findings, setFindings] = useState('')
  const [auditNotes, setAuditNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [selectedDocuments, setSelectedDocuments] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [fraudIndicators, setFraudIndicators] = useState([
    { id: 1, type: 'Import Under-valuation', severity: 'High', status: 'Active', value: 'Br 250,000' },
    { id: 2, type: 'Income Discrepancy', severity: 'Medium', status: 'Under Review', value: 'Br 7,000' },
    { id: 3, type: 'Expense Overstatement', severity: 'Low', status: 'Verified', value: 'Br 15,000' },
  ])

  // Sample timeline data
  const [timeline, setTimeline] = useState([
    { id: 1, date: '2024-01-10', action: 'Audit started', user: 'Daniel M.', status: 'completed' },
    { id: 2, date: '2024-01-12', action: 'Document request sent', user: 'Daniel M.', status: 'completed' },
    { id: 3, date: '2024-01-15', action: 'Initial documents received', user: 'System', status: 'completed' },
    { id: 4, date: '2024-01-18', action: 'Financial analysis completed', user: 'Daniel M.', status: 'completed' },
    { id: 5, date: '2024-01-20', action: 'Third-party data verification', user: 'System', status: 'in-progress' },
    { id: 6, date: '2024-01-25', action: 'Site visit scheduled', user: 'Daniel M.', status: 'pending' },
  ])

  // Load saved data
  useEffect(() => {
    const savedData = localStorage.getItem('comprehensiveAudit')
    if (savedData) {
      const parsed = JSON.parse(savedData)
      setFindings(parsed.findings || '')
      setAuditNotes(parsed.auditNotes || [])
      setFraudIndicators(parsed.fraudIndicators || fraudIndicators)
    }
  }, [])

  // Save progress
  const saveProgress = () => {
    const data = {
      findings,
      auditNotes,
      fraudIndicators,
      lastUpdated: new Date().toISOString()
    }
    localStorage.setItem('comprehensiveAudit', JSON.stringify(data))
    toast.success('Progress saved successfully!')
  }

  // Add audit note
  const addAuditNote = () => {
    if (newNote.trim()) {
      const note = {
        id: Date.now(),
        text: newNote,
        timestamp: new Date().toLocaleString(),
        user: 'Daniel M.'
      }
      setAuditNotes([note, ...auditNotes])
      setNewNote('')
      toast.success('Note added')
    }
  }

  // Delete note
  const deleteNote = (id) => {
    setAuditNotes(auditNotes.filter(n => n.id !== id))
    toast.success('Note deleted')
  }

  // Handle document selection
  const handleDocumentSelect = (doc) => {
    if (selectedDocuments.includes(doc)) {
      setSelectedDocuments(selectedDocuments.filter(d => d !== doc))
    } else {
      setSelectedDocuments([...selectedDocuments, doc])
    }
  }

  // Submit data request
  const submitDataRequest = () => {
    if (requestType && requestNotes) {
      toast.success(`Request for ${requestType} submitted successfully`)
      setShowRequestModal(false)
      setRequestType('')
      setRequestNotes('')
      
      // Add to timeline
      const newTimelineItem = {
        id: timeline.length + 1,
        date: new Date().toISOString().split('T')[0],
        action: `Data request: ${requestType}`,
        user: 'Daniel M.',
        status: 'pending'
      }
      setTimeline([newTimelineItem, ...timeline])
    } else {
      toast.error('Please fill all fields')
    }
  }

  // Escalate to investigation
  const escalateToInvestigation = () => {
    toast.success('Case escalated to Intelligence & Investigation')
    setShowEscalateModal(false)
    
    // Update fraud indicators
    const updatedIndicators = fraudIndicators.map(i => 
      i.type === 'Import Under-valuation' ? { ...i, status: 'Escalated' } : i
    )
    setFraudIndicators(updatedIndicators)
  }

  // Generate report
  const generateReport = () => {
    setIsLoading(true)
    setTimeout(() => {
      toast.success('Audit report generated successfully!')
      setIsLoading(false)
    }, 2000)
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Active': return 'bg-red-100 text-red-800 border-red-200'
      case 'Under Review': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Verified': return 'bg-green-100 text-green-800 border-green-200'
      case 'Escalated': return 'bg-purple-100 text-purple-800 border-purple-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'High': return 'bg-red-100 text-red-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <MainLayout>
      {/* Header with Progress */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
<h1 className="text-3xl font-bold text-green-600 dark:text-green-400">Comprehensive Audit</h1>            <p className="text-gray-600 dark:text-gray-400 mt-1">In-depth analysis and verification</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <button
              onClick={saveProgress}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <span>💾</span>
              <span>Save Progress</span>
            </button>
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">Audit Progress</p>
              <p className="text-2xl font-bold text-green-600">65%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Case Header with Gradient */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-xl p-6 mb-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-2xl font-bold">CA-2024-001 - Sunrise PLC</h2>
              <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium">
                ⚡ In Progress
              </span>
            </div>
            <p className="text-blue-100">Comprehensive audit - Manufacturing sector</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <p className="text-sm opacity-90">Risk Score</p>
              <p className="text-2xl font-bold">78/100</p>
            </div>
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <p className="text-sm opacity-90">Materiality</p>
              <p className="text-2xl font-bold">Br 850K</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-sm">
          <div>
            <p className="text-blue-200">TIN Number</p>
            <p className="font-semibold">1000456789</p>
          </div>
          <div>
            <p className="text-blue-200">Sector</p>
            <p className="font-semibold">Manufacturing</p>
          </div>
          <div>
            <p className="text-blue-200">Period</p>
            <p className="font-semibold">2023/2024</p>
          </div>
          <div>
            <p className="text-blue-200">Lead Auditor</p>
            <p className="font-semibold">Daniel M.</p>
          </div>
          <div>
            <p className="text-blue-200">Start Date</p>
            <p className="font-semibold">2024-01-10</p>
          </div>
          <div>
            <p className="text-blue-200">Target End</p>
            <p className="font-semibold">2024-02-20</p>
          </div>
          <div>
            <p className="text-blue-200">Days Remaining</p>
            <p className="font-semibold text-yellow-300">25 days</p>
          </div>
          <div>
            <p className="text-blue-200">Team Size</p>
            <p className="font-semibold">3 auditors</p>
          </div>
        </div>
      </div>

      {/* Enhanced Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 mb-6 overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex flex-wrap">
            {[
              { id: 'financial', label: 'Financial Analysis', icon: '📊' },
              { id: 'documents', label: 'Document Review', icon: '📋' },
              { id: 'third-party', label: 'Third-Party Data', icon: '🔗' },
              { id: 'findings', label: 'Findings', icon: '🔍' },
              { id: 'timeline', label: 'Timeline', icon: '⏱️' },
              { id: 'notes', label: 'Audit Notes', icon: '📝' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50 dark:bg-blue-900/20'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Financial Analysis Tab */}
          {activeTab === 'financial' && (
            <div className="space-y-6">
              
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">Br 8.5M</p>
                  <p className="text-xs text-green-600 mt-1">↑ 12% vs last year</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Net Profit</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">Br 2.3M</p>
                  <p className="text-xs text-yellow-600 mt-1">Margin: 27%</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Tax Paid</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">Br 1.8M</p>
                  <p className="text-xs text-blue-600 mt-1">Effective rate: 21%</p>
                </div>
              </div>

              {/* Balance Sheet & Industry Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Balance Sheet */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-blue-600 mr-2">📊</span>
                    Balance Sheet Summary
                  </h4>
                  <div className="space-y-3">
                    {[
                      { label: 'Total Assets', value: 'Br 5,200,000', change: '+8%' },
                      { label: 'Total Liabilities', value: 'Br 2,800,000', change: '+5%' },
                      { label: 'Equity', value: 'Br 2,400,000', change: '+12%' },
                      { label: 'Working Capital', value: 'Br 950,000', change: '-2%' },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                        <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
                        <div className="text-right">
                          <span className="font-bold text-gray-900 dark:text-white">{item.value}</span>
                          <span className="text-xs text-green-600 ml-2">{item.change}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Industry Comparison */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <span className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center text-green-600 mr-2">📈</span>
                    Industry Comparison
                  </h4>
                  <div className="space-y-4">
                    {[
                      { label: 'Profit Margin', value: '12.5%', benchmark: '15%', diff: '-2.5%', status: 'warning' },
                      { label: 'Expense Ratio', value: '45%', benchmark: '48%', diff: '+3%', status: 'success' },
                      { label: 'Asset Turnover', value: '1.8', benchmark: '2.1', diff: '-0.3', status: 'danger' },
                      { label: 'ROE', value: '18.5%', benchmark: '16%', diff: '+2.5%', status: 'success' },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
                          <p className="text-xs text-gray-500">Industry: {item.benchmark}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-gray-900 dark:text-white">{item.value}</span>
                          <p className={`text-xs ${
                            item.status === 'success' ? 'text-green-600' :
                            item.status === 'warning' ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>{item.diff}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Ratio Analysis Table */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 border-b border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Automated Ratio Analysis</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ratio</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Taxpayer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Benchmark</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Variance</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Risk Level</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {[
                        { ratio: 'Current Ratio', taxpayer: '1.8', benchmark: '2.1', variance: '-0.3', risk: 'Medium' },
                        { ratio: 'Quick Ratio', taxpayer: '1.1', benchmark: '1.3', variance: '-0.2', risk: 'Low' },
                        { ratio: 'Debt to Equity', taxpayer: '1.2', benchmark: '0.9', variance: '+0.3', risk: 'High' },
                        { ratio: 'Inventory Turnover', taxpayer: '4.5', benchmark: '5.2', variance: '-0.7', risk: 'Medium' },
                        { ratio: 'Gross Margin', taxpayer: '32%', benchmark: '35%', variance: '-3%', risk: 'Low' },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{row.ratio}</td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{row.taxpayer}</td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{row.benchmark}</td>
                          <td className={`px-6 py-4 text-sm ${
                            row.variance.startsWith('+') ? 'text-red-600' : 'text-green-600'
                          }`}>{row.variance}</td>
                          <td className="px-6 py-4 text-sm">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              row.risk === 'High' ? 'bg-red-100 text-red-800' :
                              row.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {row.risk}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Document Review Tab */}
          {activeTab === 'documents' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Financial Statements 2023', type: 'PDF', size: '2.4 MB', status: 'verified' },
                  { name: 'Tax Returns', type: 'Excel', size: '1.8 MB', status: 'pending' },
                  { name: 'Bank Statements', type: 'PDF', size: '5.2 MB', status: 'verified' },
                  { name: 'Invoices Q4 2023', type: 'PDF', size: '3.1 MB', status: 'reviewing' },
                  { name: 'Payroll Records', type: 'Excel', size: '1.2 MB', status: 'pending' },
                  { name: 'Asset Register', type: 'PDF', size: '0.9 MB', status: 'verified' },
                ].map((doc, i) => (
                  <div
                    key={i}
                    onClick={() => handleDocumentSelect(doc.name)}
                    className={`p-4 border rounded-xl cursor-pointer transition-all ${
                      selectedDocuments.includes(doc.name)
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">📄</span>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{doc.name}</p>
                          <p className="text-xs text-gray-500">{doc.type} • {doc.size}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        doc.status === 'verified' ? 'bg-green-100 text-green-800' :
                        doc.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {doc.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-3 mt-4">
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                  Download Selected
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Request More Documents
                </button>
              </div>
            </div>
          )}

          {/* Third-Party Data Tab */}
          {activeTab === 'third-party' && (
            <div className="space-y-6">
              
              {/* Data Matching Cards */}
              <div className="space-y-3">
                {[
                  { source: 'Customs Data - Imports', declared: '1,200,000', actual: '1,450,000', diff: '250,000', status: 'high' },
                  { source: 'Bank Data - Interest Income', declared: '85,000', actual: '92,000', diff: '7,000', status: 'medium' },
                  { source: 'Supplier Data - Purchases', declared: '950,000', actual: '965,000', diff: '15,000', status: 'low' },
                  { source: 'Tax Clearance Status', declared: 'Compliant', actual: 'Compliant', diff: '0', status: 'good' },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">{item.source}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Declared: Br {item.declared}</span>
                          <span className="text-gray-400">→</span>
                          <span className="text-gray-600 dark:text-gray-400">Actual: Br {item.actual}</span>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0 flex items-center space-x-3">
                        {item.diff !== '0' ? (
                          <>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              item.status === 'high' ? 'bg-red-100 text-red-800' :
                              item.status === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              Discrepancy: Br {item.diff}
                            </span>
                            <button className="text-blue-600 hover:text-blue-800 text-sm">Investigate →</button>
                          </>
                        ) : (
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            ✓ Verified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={() => {
                    setRequestType('Customs')
                    setShowRequestModal(true)
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Request Customs Data
                </button>
                <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                  Run Data Matching
                </button>
                <button className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50">
                  Export Comparison Report
                </button>
              </div>

              {/* Matching Progress */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold mb-3">Data Matching Progress</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Customs Data</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Bank Data</span>
                      <span className="font-medium">60%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Supplier Data</span>
                      <span className="font-medium">100%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Findings Tab */}
          {activeTab === 'findings' && (
            <div className="space-y-6">
              
              {/* Fraud Indicators */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-b border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-red-800 dark:text-red-400 flex items-center">
                    <span className="mr-2">⚠️</span>
                    Fraud Indicators Detected
                  </h4>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {fraudIndicators.map(indicator => (
                      <div key={indicator.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{indicator.type}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Amount: {indicator.value}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(indicator.severity)}`}>
                            {indicator.severity}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(indicator.status)}`}>
                            {indicator.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setShowEscalateModal(true)}
                    className="mt-4 w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium flex items-center justify-center space-x-2"
                  >
                    <span>🚨</span>
                    <span>Escalate to Intelligence & Investigation</span>
                  </button>
                </div>
              </div>

              {/* Audit Findings */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 border-b border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Audit Findings</h4>
                </div>
                <div className="p-6">
                  <textarea
                    value={findings}
                    onChange={(e) => setFindings(e.target.value)}
                    placeholder="Document your audit findings here..."
                    rows="6"
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          {/* Timeline Tab */}
          {activeTab === 'timeline' && (
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <div key={item.id} className="relative flex items-start space-x-4 pb-4">
                  {index < timeline.length - 1 && (
                    <div className="absolute left-5 top-8 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                  )}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    item.status === 'completed' ? 'bg-green-100 dark:bg-green-900' :
                    item.status === 'in-progress' ? 'bg-blue-100 dark:bg-blue-900' :
                    'bg-gray-100 dark:bg-gray-700'
                  }`}>
                    <span className={
                      item.status === 'completed' ? 'text-green-600' :
                      item.status === 'in-progress' ? 'text-blue-600' :
                      'text-gray-600'
                    }>
                      {item.status === 'completed' ? '✓' : item.status === 'in-progress' ? '◉' : '○'}
                    </span>
                  </div>
                  <div className="flex-1 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{item.action}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">by {item.user}</p>
                      </div>
                      <p className="text-sm text-gray-500">{item.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Audit Notes Tab */}
          {activeTab === 'notes' && (
            <div className="space-y-4">
              {/* Add Note */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add an audit note..."
                  rows="3"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                ></textarea>
                <div className="flex justify-end mt-2">
                  <button
                    onClick={addAuditNote}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add Note
                  </button>
                </div>
              </div>

              {/* Notes List */}
              {auditNotes.map(note => (
                <div key={note.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-start">
                    <p className="text-gray-900 dark:text-white">{note.text}</p>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                    <span>{note.user}</span>
                    <span>{note.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Audit Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Audit Actions</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all flex flex-col items-center">
            <span className="text-2xl mb-2">📋</span>
            <span className="text-sm font-medium">Request Documents</span>
          </button>

          <button className="p-4 border border-green-600 text-green-600 rounded-xl hover:bg-green-50 dark:hover:bg-green-900/20 transition-all flex flex-col items-center">
            <span className="text-2xl mb-2">🏢</span>
            <span className="text-sm font-medium">Schedule Site Visit</span>
          </button>

          <button className="p-4 border border-yellow-600 text-yellow-600 rounded-xl hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all flex flex-col items-center">
            <span className="text-2xl mb-2">❓</span>
            <span className="text-sm font-medium">Send Query Sheet</span>
          </button>

          <button 
            onClick={generateReport}
            disabled={isLoading}
            className="p-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all flex flex-col items-center disabled:opacity-50"
          >
            <span className="text-2xl mb-2">📄</span>
            <span className="text-sm font-medium">
              {isLoading ? 'Generating...' : 'Generate Audit Report'}
            </span>
          </button>
        </div>

        {/* Fraud Alert */}
        <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border border-red-200 dark:border-red-800 rounded-xl">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">🚨</span>
            <div className="flex-1">
              <p className="font-semibold text-red-800 dark:text-red-400">Fraud Indicator Detected</p>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                Pattern of under-reporting detected in import values. Total discrepancy: Br 250,000
              </p>
              <div className="flex mt-3 space-x-3">
                <button 
                  onClick={() => setShowFindingsModal(true)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                >
                  Review Details
                </button>
                <button 
                  onClick={() => setShowEscalateModal(true)}
                  className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 text-sm"
                >
                  Escalate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Request Data Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Request {requestType} Data</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Request Type</label>
                <select
                  value={requestType}
                  onChange={(e) => setRequestType(e.target.value)}
                  className="w-full border rounded-lg p-2 dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="Customs">Customs Data</option>
                  <option value="Bank">Bank Data</option>
                  <option value="Supplier">Supplier Data</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Notes</label>
                <textarea
                  value={requestNotes}
                  onChange={(e) => setRequestNotes(e.target.value)}
                  rows="4"
                  className="w-full border rounded-lg p-2 dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Specify what data you need..."
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowRequestModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={submitDataRequest}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Escalate Modal */}
      {showEscalateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4 text-red-600">Escalate to Investigation</h3>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Are you sure you want to escalate this case to Intelligence & Investigation? This action cannot be undone.
            </p>

            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg mb-4">
              <p className="text-sm text-red-800 dark:text-red-400">
                <strong>Case:</strong> CA-2024-001 - Sunrise PLC<br />
                <strong>Reason:</strong> Import under-valuation detected (Br 250,000 discrepancy)
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowEscalateModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={escalateToInvestigation}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Confirm Escalation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Findings Modal */}
      {showFindingsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Fraud Indicator Details</h3>
            
            <div className="space-y-4">
              {fraudIndicators.map(indicator => (
                <div key={indicator.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{indicator.type}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(indicator.severity)}`}>
                      {indicator.severity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Amount: {indicator.value}</p>
                  <p className="text-sm text-gray-500">Status: {indicator.status}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowFindingsModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            </div>
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

export default ComprehensiveAudit
import MainLayout from "../layouts/MainLayout"

function JointAudit() {
  return (
    <MainLayout>

      <h2 className="text-2xl font-bold mb-6">
        Joint Audit Management
      </h2>

      {/* Joint Audit Committee Section */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">
          Joint Audit Committee - Case Review
        </h3>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <h4 className="font-medium mb-3">Case Details</h4>
            <div className="space-y-2 text-sm">
              <p><strong>Case ID:</strong> JA-2024-008</p>
              <p><strong>Taxpayer:</strong> Mega Industries PLC</p>
              <p><strong>TIN:</strong> 1000891234</p>
              <p><strong>Sector:</strong> Manufacturing & Export</p>
              <p><strong>Risk Score:</strong> <span className="bg-red-100 text-red-800 px-2 py-1 rounded">95/100 - Critical</span></p>
              <p><strong>Proposed Audit Type:</strong> Joint Comprehensive Audit</p>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Committee Members</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Sarah M. - LTO (Lead)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Tekle W. - MTO</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Abebe K. - Customs</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">Helen G. - Transfer Pricing (Pending)</span>
              </div>
            </div>

            <button className="mt-4 bg-blue-600 text-white px-3 py-1 rounded text-sm">
              Assign Additional Member
            </button>
          </div>

        </div>

        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-sm font-medium text-yellow-800">
            Committee Meeting Scheduled: January 25, 2024 at 10:00 AM
          </p>
        </div>
      </div>

      {/* Multi-Agency Coordination */}
      <div className="grid grid-cols-2 gap-6 mb-6">

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            Participating Agencies
          </h3>

          <div className="space-y-3">

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium">Large Taxpayers Office (LTO)</p>
                <p className="text-xs text-gray-600">Lead Agency</p>
              </div>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Confirmed</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium">Medium Taxpayers Office (MTO)</p>
                <p className="text-xs text-gray-600">Supporting Agency</p>
              </div>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Confirmed</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium">Customs Department</p>
                <p className="text-xs text-gray-600">Import/Export Verification</p>
              </div>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Confirmed</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium">Transfer Pricing Unit</p>
                <p className="text-xs text-gray-600">Specialized Support</p>
              </div>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Pending</span>
            </div>

          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            Shared Resources
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Audit Working Papers</span>
              <button className="text-blue-600 text-sm">View</button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Third-Party Data Access</span>
              <button className="text-blue-600 text-sm">Request</button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Document Repository</span>
              <button className="text-blue-600 text-sm">Access</button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Meeting Minutes</span>
              <button className="text-blue-600 text-sm">Upload</button>
            </div>
          </div>

          <div className="mt-4 border-t pt-3">
            <h4 className="font-medium text-sm mb-2">Shared Documents</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>📄 Audit Plan v2.3</span>
                <span className="text-gray-500">2 days ago</span>
              </div>
              <div className="flex justify-between">
                <span>📊 Financial Analysis</span>
                <span className="text-gray-500">3 days ago</span>
              </div>
              <div className="flex justify-between">
                <span>📝 Risk Assessment</span>
                <span className="text-gray-500">5 days ago</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Joint Audit Progress */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">
          Joint Audit Progress
        </h3>

        <div className="space-y-4">

          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">✓</div>
            <div className="ml-4 flex-1">
              <p className="font-medium">Joint Audit Planning</p>
              <div className="w-full bg-gray-200 h-2 rounded mt-1">
                <div className="bg-green-500 h-2 rounded" style={{ width: '100%' }}></div>
              </div>
            </div>
            <span className="text-sm text-green-600">Completed</span>
          </div>

          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">✓</div>
            <div className="ml-4 flex-1">
              <p className="font-medium">Document Request & Collection</p>
              <div className="w-full bg-gray-200 h-2 rounded mt-1">
                <div className="bg-green-500 h-2 rounded" style={{ width: '100%' }}></div>
              </div>
            </div>
            <span className="text-sm text-green-600">Completed</span>
          </div>

          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">2</div>
            <div className="ml-4 flex-1">
              <p className="font-medium">Joint Field Audit</p>
              <div className="w-full bg-gray-200 h-2 rounded mt-1">
                <div className="bg-blue-500 h-2 rounded" style={{ width: '60%' }}></div>
              </div>
            </div>
            <span className="text-sm text-blue-600">In Progress (60%)</span>
          </div>

          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white text-sm">3</div>
            <div className="ml-4 flex-1">
              <p className="font-medium">Findings Discussion</p>
              <div className="w-full bg-gray-200 h-2 rounded mt-1">
                <div className="bg-gray-300 h-2 rounded" style={{ width: '0%' }}></div>
              </div>
            </div>
            <span className="text-sm text-gray-500">Pending</span>
          </div>

          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white text-sm">4</div>
            <div className="ml-4 flex-1">
              <p className="font-medium">Joint Report Preparation</p>
              <div className="w-full bg-gray-200 h-2 rounded mt-1">
                <div className="bg-gray-300 h-2 rounded" style={{ width: '0%' }}></div>
              </div>
            </div>
            <span className="text-sm text-gray-500">Pending</span>
          </div>

        </div>
      </div>

      {/* Joint Findings */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">
          Preliminary Joint Findings
        </h3>

        <table className="min-w-full text-sm mb-4">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Finding Area</th>
              <th className="text-left px-4 py-2">Description</th>
              <th className="text-left px-4 py-2">Tax Impact</th>
              <th className="text-left px-4 py-2">Agency</th>
              <th className="text-left px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2">Transfer Pricing</td>
              <td className="px-4 py-2">Related party transactions above arm's length</td>
              <td className="px-4 py-2 text-red-600">Br 450,000</td>
              <td className="px-4 py-2">TP Unit</td>
              <td className="px-4 py-2">
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Under Review</span>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Customs Valuation</td>
              <td className="px-4 py-2">Under-invoicing of imports</td>
              <td className="px-4 py-2 text-red-600">Br 280,000</td>
              <td className="px-4 py-2">Customs</td>
              <td className="px-4 py-2">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Confirmed</span>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">VAT Reconciliation</td>
              <td className="px-4 py-2">Input VAT claims without valid invoices</td>
              <td className="px-4 py-2 text-red-600">Br 125,000</td>
              <td className="px-4 py-2">LTO</td>
              <td className="px-4 py-2">
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Disputed</span>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-between items-center border-t pt-4">
          <div>
            <p className="text-sm font-bold">Total Potential Assessment:</p>
            <p className="text-2xl font-bold text-red-600">Br 855,000</p>
          </div>
          <button className="bg-green-600 text-white px-6 py-2 rounded">
            Generate Joint Audit Report
          </button>
        </div>
      </div>

    </MainLayout>
  )
}

export default JointAudit
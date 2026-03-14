import MainLayout from "../layouts/MainLayout"

function QualityAssurance() {
  return (
    <MainLayout>

      <h2 className="text-2xl font-bold mb-6">
        Audit Quality Assurance Review
      </h2>

      {/* QA Overview Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-gray-500 text-sm">Cases for Review</h3>
          <p className="text-3xl font-bold">24</p>
          <span className="text-yellow-600 text-sm">12 this week</span>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-gray-500 text-sm">Reviews Completed</h3>
          <p className="text-3xl font-bold">156</p>
          <span className="text-green-600 text-sm">+18% vs last quarter</span>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-gray-500 text-sm">Quality Score</h3>
          <p className="text-3xl font-bold">87%</p>
          <span className="text-green-600 text-sm">Above target</span>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-gray-500 text-sm">Findings</h3>
          <p className="text-3xl font-bold">42</p>
          <span className="text-red-600 text-sm">12 critical</span>
        </div>

      </div>

      {/* Sampling Configuration */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">
          Automated Case Selection for QA
        </h3>

        <div className="grid grid-cols-3 gap-4 mb-4">

          <div>
            <label className="block text-sm mb-1">Sampling Method</label>
            <select className="w-full border p-2 rounded">
              <option>Random Sampling</option>
              <option>Stratified Sampling</option>
              <option>Risk-Based Selection</option>
              <option>Systematic Sampling</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Sample Size</label>
            <input type="number" className="w-full border p-2 rounded" value="10" />
          </div>

          <div>
            <label className="block text-sm mb-1">Period</label>
            <select className="w-full border p-2 rounded">
              <option>Last Month</option>
              <option>Last Quarter</option>
              <option>Last 6 Months</option>
              <option>Custom Range</option>
            </select>
          </div>

        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Generate QA Sample
        </button>
      </div>

      {/* Cases Selected for QA */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">
          Cases Selected for Quality Assurance
        </h3>

        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Case ID</th>
              <th className="text-left px-4 py-2">Taxpayer</th>
              <th className="text-left px-4 py-2">Audit Type</th>
              <th className="text-left px-4 py-2">Auditor</th>
              <th className="text-left px-4 py-2">Completion Date</th>
              <th className="text-left px-4 py-2">QA Status</th>
              <th className="text-left px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2">AC-101</td>
              <td className="px-4 py-2">ABC Trading PLC</td>
              <td className="px-4 py-2">Desk Audit</td>
              <td className="px-4 py-2">John D.</td>
              <td className="px-4 py-2">2024-01-10</td>
              <td className="px-4 py-2">
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Pending Review</span>
              </td>
              <td className="px-4 py-2">
                <button className="text-blue-600">Assign</button>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">AC-105</td>
              <td className="px-4 py-2">Sunrise PLC</td>
              <td className="px-4 py-2">Comprehensive</td>
              <td className="px-4 py-2">Sara M.</td>
              <td className="px-4 py-2">2024-01-12</td>
              <td className="px-4 py-2">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Approved</span>
              </td>
              <td className="px-4 py-2">
                <button className="text-blue-600">View</button>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">AC-108</td>
              <td className="px-4 py-2">Tech Solutions</td>
              <td className="px-4 py-2">Issue Audit</td>
              <td className="px-4 py-2">Daniel K.</td>
              <td className="px-4 py-2">2024-01-14</td>
              <td className="px-4 py-2">
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded">Needs Improvement</span>
              </td>
              <td className="px-4 py-2">
                <button className="text-blue-600">Review</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* QA Review Form */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">
          Quality Assurance Review - Case AC-101
        </h3>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <h4 className="font-medium mb-3">Review Checklist</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Audit plan properly documented</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">All required evidence collected</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Working papers complete</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Calculations verified</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Proper approvals obtained</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Taxpayer notified appropriately</span>
              </label>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">QA Assessment</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Quality Rating</label>
                <select className="w-full border p-2 rounded">
                  <option>Select Rating</option>
                  <option>Excellent (95-100%)</option>
                  <option>Good (85-94%)</option>
                  <option>Satisfactory (70-84%)</option>
                  <option>Needs Improvement (Below 70%)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">Comments</label>
                <textarea className="w-full border p-2 rounded h-24" 
                  placeholder="Enter QA review comments..."></textarea>
              </div>
              <div>
                <label className="block text-sm mb-1">Recommendations</label>
                <textarea className="w-full border p-2 rounded h-24"
                  placeholder="Enter recommendations for improvement..."></textarea>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-6 flex space-x-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Submit QA Review
          </button>
          <button className="border border-gray-300 px-4 py-2 rounded">
            Save Draft
          </button>
          <button className="border border-red-300 text-red-600 px-4 py-2 rounded">
            Request Rework
          </button>
        </div>
      </div>

    </MainLayout>
  )
}

export default QualityAssurance
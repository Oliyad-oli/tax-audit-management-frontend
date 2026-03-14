import MainLayout from "../layouts/MainLayout"

function TransferPricingAudit() {
  return (
    <MainLayout>

      <h2 className="text-2xl font-bold mb-6">
        Transfer Pricing Audit
      </h2>

      {/* Case Header with Risk Assessment */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            TP Case: TP-2024-015 - Global Import PLC
          </h3>
          <div className="space-x-2">
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
              High Risk
            </span>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
              Cross-Border Transaction
            </span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 text-sm">
          <p><strong>TIN:</strong> 1000789456</p>
          <p><strong>Sector:</strong> Import/Export</p>
          <p><strong>Related Party:</strong> Global Trading Ltd (UAE)</p>
          <p><strong>Transaction Type:</strong> Import of Electronics</p>
          <p><strong>Lead Auditor:</strong> Michael T.</p>
          <p><strong>Start Date:</strong> 2024-01-15</p>
          <p><strong>Revenue at Risk:</strong> Br 1.2M</p>
        </div>

      </div>

      {/* Transfer Pricing Methods */}
      <div className="grid grid-cols-3 gap-6 mb-6">

        <div className="bg-white shadow rounded-lg p-6">
          <h4 className="font-medium mb-3">CUP Method</h4>
          <p className="text-sm text-gray-600 mb-2">Comparable Uncontrolled Price</p>
          <div className="text-sm">
            <div className="flex justify-between py-1">
              <span>Related Party Price:</span>
              <span className="font-bold">$45/unit</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Market Price:</span>
              <span className="font-bold">$38/unit</span>
            </div>
            <div className="flex justify-between py-1 text-red-600">
              <span>Difference:</span>
              <span className="font-bold">+$7/unit (18.4%)</span>
            </div>
          </div>
          <button className="mt-3 text-blue-600 text-sm">View Comparables</button>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h4 className="font-medium mb-3">Resale Price Method</h4>
          <p className="text-sm text-gray-600 mb-2">Gross Margin Analysis</p>
          <div className="text-sm">
            <div className="flex justify-between py-1">
              <span>Resale Price:</span>
              <span className="font-bold">$85/unit</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Purchase Price:</span>
              <span className="font-bold">$45/unit</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Gross Margin:</span>
              <span className="font-bold">47%</span>
            </div>
            <div className="flex justify-between py-1 text-yellow-600">
              <span>Industry Margin:</span>
              <span className="font-bold">35%</span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h4 className="font-medium mb-3">TNMM Method</h4>
          <p className="text-sm text-gray-600 mb-2">Transactional Net Margin</p>
          <div className="text-sm">
            <div className="flex justify-between py-1">
              <span>Net Profit Margin:</span>
              <span className="font-bold">12.5%</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Industry Average:</span>
              <span className="font-bold">8.2%</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Quartile Range:</span>
              <span className="font-bold">6.5% - 9.8%</span>
            </div>
          </div>
          <button className="mt-3 text-blue-600 text-sm">View Benchmark Study</button>
        </div>

      </div>

      {/* Customs Data Comparison */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">
          Customs Valuation Comparison
        </h3>

        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2">Product</th>
              <th className="text-left px-4 py-2">HS Code</th>
              <th className="text-left px-4 py-2">Declared Value</th>
              <th className="text-left px-4 py-2">Customs Value</th>
              <th className="text-left px-4 py-2">Benchmark</th>
              <th className="text-left px-4 py-2">Variance</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2">Smartphones</td>
              <td className="px-4 py-2">8517.12</td>
              <td className="px-4 py-2">$45.00/unit</td>
              <td className="px-4 py-2">$52.00/unit</td>
              <td className="px-4 py-2">$50.00/unit</td>
              <td className="px-4 py-2 text-red-600">-$7.00 (-14%)</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Laptops</td>
              <td className="px-4 py-2">8471.30</td>
              <td className="px-4 py-2">$320.00/unit</td>
              <td className="px-4 py-2">$380.00/unit</td>
              <td className="px-4 py-2">$375.00/unit</td>
              <td className="px-4 py-2 text-red-600">-$55.00 (-14.7%)</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Tablets</td>
              <td className="px-4 py-2">8471.41</td>
              <td className="px-4 py-2">$150.00/unit</td>
              <td className="px-4 py-2">$165.00/unit</td>
              <td className="px-4 py-2">$160.00/unit</td>
              <td className="px-4 py-2 text-red-600">-$10.00 (-6.25%)</td>
            </tr>
          </tbody>
        </table>

        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
          <p className="text-sm font-medium text-red-800">
            Alert: Systematic under-valuation detected across multiple product lines
          </p>
        </div>
      </div>

      {/* Benchmark Analysis */}
      <div className="grid grid-cols-2 gap-6 mb-6">

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            Industry Benchmark - Profitability
          </h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Taxpayer EBIT Margin</span>
                <span className="font-bold">12.5%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded">
                <div className="bg-blue-600 h-2 rounded" style={{ width: '80%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Industry Average</span>
                <span className="font-bold">8.2%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded">
                <div className="bg-green-600 h-2 rounded" style={{ width: '55%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Comparable Set Median</span>
                <span className="font-bold">7.8%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded">
                <div className="bg-yellow-600 h-2 rounded" style={{ width: '52%' }}></div>
              </div>
            </div>

            <div className="border-t pt-3">
              <p className="text-sm text-yellow-600">
                <strong>Finding:</strong> Taxpayer's margin is 4.3% above industry average
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            Functional Analysis
          </h3>

          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded">
              <p className="font-medium">Functions Performed</p>
              <p className="text-sm">Distribution, Marketing, Warranty Services</p>
            </div>

            <div className="p-3 bg-gray-50 rounded">
              <p className="font-medium">Risks Assumed</p>
              <p className="text-sm">Market risk, Credit risk, Inventory risk</p>
            </div>

            <div className="p-3 bg-gray-50 rounded">
              <p className="font-medium">Assets Used</p>
              <p className="text-sm">Warehouse, Distribution network, Brand license</p>
            </div>

            <div className="p-3 bg-blue-50 rounded">
              <p className="font-medium text-blue-800">Preliminary Conclusion</p>
              <p className="text-sm text-blue-600">Distributor with limited risks - expecting lower returns</p>
            </div>
          </div>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">
          Transfer Pricing Actions
        </h3>

        <div className="flex space-x-4">

          <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
            Request TP Documentation
          </button>

          <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded text-sm">
            Search External Databases
          </button>

          <button className="border border-green-600 text-green-600 px-4 py-2 rounded text-sm">
            Prepare Benchmarking Report
          </button>

          <button className="border border-yellow-600 text-yellow-600 px-4 py-2 rounded text-sm">
            Draft Adjustment Notice
          </button>

        </div>

        <div className="mt-6 flex justify-end">
          <button className="bg-green-600 text-white px-6 py-2 rounded">
            Generate TP Audit Report
          </button>
        </div>
      </div>

    </MainLayout>
  )
}

export default TransferPricingAudit
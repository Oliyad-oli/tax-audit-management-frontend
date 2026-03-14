import { Link } from "react-router-dom"

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-6 fixed overflow-y-auto">

      <h2 className="text-2xl font-bold mb-8">
        Audit System
      </h2>

      <nav className="flex flex-col space-y-2">

        <Link to="/" className="block py-2 px-3 hover:bg-gray-800 rounded">
          📊 Dashboard
        </Link>

        <div className="py-2">
          <p className="text-gray-400 text-xs uppercase font-semibold mb-2">Planning</p>
          <Link to="/audit-plan" className="block py-2 px-3 hover:bg-gray-800 rounded ml-2">
            📋 Audit Plan
          </Link>
          <Link to="/audit-cases" className="block py-2 px-3 hover:bg-gray-800 rounded ml-2">
            📁 Audit Cases
          </Link>
        </div>

        <div className="py-2">
          <p className="text-gray-400 text-xs uppercase font-semibold mb-2">Audit Execution</p>
          <Link to="/desk-audit" className="block py-2 px-3 hover:bg-gray-800 rounded ml-2">
            🖥️ Desk Audit
          </Link>
          <Link to="/comprehensive-audit" className="block py-2 px-3 hover:bg-gray-800 rounded ml-2">
            🔍 Comprehensive Audit
          </Link>
          <Link to="/transfer-pricing" className="block py-2 px-3 hover:bg-gray-800 rounded ml-2">
            💱 Transfer Pricing
          </Link>
          <Link to="/joint-audit" className="block py-2 px-3 hover:bg-gray-800 rounded ml-2">
            🤝 Joint Audit
          </Link>
        </div>

        <div className="py-2">
          <p className="text-gray-400 text-xs uppercase font-semibold mb-2">Quality & Reports</p>
          <Link to="/quality-assurance" className="block py-2 px-3 hover:bg-gray-800 rounded ml-2">
            ✓ Quality Assurance
          </Link>
          <Link to="/reports" className="block py-2 px-3 hover:bg-gray-800 rounded ml-2">
            📈 Reports
          </Link>
        </div>

      </nav>

    </div>
  )
}

export default Sidebar
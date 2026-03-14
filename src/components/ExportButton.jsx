import { useState } from 'react'
import { exportToExcel, exportToPDF, exportToCSV } from '../utils/exportUtils'
import toast from 'react-hot-toast'

function ExportButton({ data, columns, fileName, title }) {
  const [showOptions, setShowOptions] = useState(false)

  const handleExport = (format) => {
    try {
      switch(format) {
        case 'excel':
          exportToExcel(data, fileName)
          toast.success('Excel file downloaded')
          break
        case 'pdf':
          exportToPDF(data, columns, title)
          toast.success('PDF file downloaded')
          break
        case 'csv':
          exportToCSV(data, fileName)
          toast.success('CSV file downloaded')
          break
        default:
          break
      }
    } catch (error) {
      toast.error('Export failed')
      console.error('Export error:', error)
    }
    setShowOptions(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center space-x-2"
      >
        <span>📥</span>
        <span>Export</span>
      </button>

      {showOptions && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border z-50">
          <div className="py-1">
            <button
              onClick={() => handleExport('excel')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              📊 Export to Excel
            </button>
            <button
              onClick={() => handleExport('pdf')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              📄 Export to PDF
            </button>
            <button
              onClick={() => handleExport('csv')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              📝 Export to CSV
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ExportButton
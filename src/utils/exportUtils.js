import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

export const exportToExcel = (data, fileName = 'audit-report') => {
  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
  XLSX.writeFile(wb, `${fileName}.xlsx`)
}

export const exportToPDF = (data, columns, title = 'Audit Report') => {
  const doc = new jsPDF()
  
  doc.setFontSize(18)
  doc.text(title, 14, 22)
  
  doc.setFontSize(11)
  doc.setTextColor(100)
  
  const tableData = data.map(row => 
    columns.map(col => row[col.field] || '')
  )
  
  doc.autoTable({
    head: [columns.map(col => col.label)],
    body: tableData,
    startY: 30,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [41, 128, 185] }
  })
  
  doc.save(`${title.toLowerCase().replace(/\s+/g, '-')}.pdf`)
}

export const exportToCSV = (data, fileName = 'audit-report') => {
  const headers = Object.keys(data[0] || {})
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(field => JSON.stringify(row[field] || '')).join(','))
  ].join('\n')
  
  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${fileName}.csv`
  link.click()
  window.URL.revokeObjectURL(url)
}
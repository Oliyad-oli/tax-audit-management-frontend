// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// API endpoints
export const API_ENDPOINTS = {
  // Audit Plan endpoints
  AUDIT_PLANS: '/audit-plans',
  AUDIT_PLAN_CREATE: '/audit-plans/create',
  AUDIT_PLAN_APPROVE: '/audit-plans/approve',
  
  // Audit Case endpoints
  AUDIT_CASES: '/audit-cases',
  AUDIT_CASE_ASSIGN: '/audit-cases/assign',
  AUDIT_CASE_STATUS: '/audit-cases/status',
  
  // Desk Audit endpoints
  DESK_AUDIT: '/desk-audit',
  DESK_AUDIT_FINDINGS: '/desk-audit/findings',
  DESK_AUDIT_DOCUMENTS: '/desk-audit/documents',
  
  // Comprehensive Audit endpoints
  COMPREHENSIVE_AUDIT: '/comprehensive-audit',
  COMPREHENSIVE_RATIOS: '/comprehensive-audit/ratios',
  THIRD_PARTY_DATA: '/third-party-data',
  
  // Reports endpoints
  REPORTS: '/reports',
  REPORT_GENERATE: '/reports/generate',
  
  // User/Auth endpoints
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  CURRENT_USER: '/auth/me'
}

// API request function (to be used with axios later)
export const apiRequest = async (endpoint, method = 'GET', data = null) => {
  // This will be implemented when we add axios
  console.log(`API Request: ${method} ${endpoint}`, data)
  
  // Mock response for now
  return {
    success: true,
    data: null,
    message: 'API call simulated'
  }
}
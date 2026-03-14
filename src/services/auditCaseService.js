import axiosInstance from './axiosConfig'

export const auditCaseService = {
  // Get all audit cases
  getAll: async (params = {}) => {
    const response = await axiosInstance.get('/audit-cases', { params })
    return response.data
  },

  // Get single audit case
  getById: async (id) => {
    const response = await axiosInstance.get(`/audit-cases/${id}`)
    return response.data
  },

  // Create new audit case
  create: async (data) => {
    const response = await axiosInstance.post('/audit-cases', data)
    return response.data
  },

  // Update audit case
  update: async (id, data) => {
    const response = await axiosInstance.put(`/audit-cases/${id}`, data)
    return response.data
  },

  // Delete audit case
  delete: async (id) => {
    const response = await axiosInstance.delete(`/audit-cases/${id}`)
    return response.data
  },

  // Assign auditor
  assignAuditor: async (caseId, auditorId) => {
    const response = await axiosInstance.post(`/audit-cases/${caseId}/assign`, {
      auditorId
    })
    return response.data
  },

  // Update status
  updateStatus: async (caseId, status) => {
    const response = await axiosInstance.patch(`/audit-cases/${caseId}/status`, {
      status
    })
    return response.data
  }
}
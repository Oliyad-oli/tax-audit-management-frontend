import { useState, useEffect } from 'react'
import { auditCaseService } from '../services/auditCaseService'
import toast from 'react-hot-toast'

export const useAuditCases = (initialParams = {}) => {
  const [cases, setCases] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [params, setParams] = useState(initialParams)
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0
  })

  const fetchCases = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await auditCaseService.getAll(params)
      setCases(response.data)
      setPagination(response.pagination)
    } catch (err) {
      setError(err.message)
      toast.error('Failed to fetch audit cases')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCases()
  }, [params])

  const createCase = async (data) => {
    try {
      const response = await auditCaseService.create(data)
      toast.success('Audit case created successfully')
      fetchCases() // Refresh list
      return response
    } catch (err) {
      toast.error('Failed to create audit case')
      throw err
    }
  }

  const updateCase = async (id, data) => {
    try {
      const response = await auditCaseService.update(id, data)
      toast.success('Audit case updated successfully')
      fetchCases()
      return response
    } catch (err) {
      toast.error('Failed to update audit case')
      throw err
    }
  }

  const deleteCase = async (id) => {
    try {
      await auditCaseService.delete(id)
      toast.success('Audit case deleted successfully')
      fetchCases()
    } catch (err) {
      toast.error('Failed to delete audit case')
      throw err
    }
  }

  return {
    cases,
    loading,
    error,
    pagination,
    params,
    setParams,
    createCase,
    updateCase,
    deleteCase,
    refresh: fetchCases
  }
}
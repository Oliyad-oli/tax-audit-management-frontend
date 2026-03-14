import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Dashboard from "../pages/Dashboard"
import AuditCases from "../pages/AuditCases"
import AuditPlan from "../pages/AuditPlan"
import DeskAudit from "../pages/DeskAudit"
import ComprehensiveAudit from "../pages/ComprehensiveAudit"
import TransferPricingAudit from "../pages/TransferPricingAudit"
import JointAudit from "../pages/JointAudit"
import QualityAssurance from "../pages/QualityAssurance"
import Reports from "../pages/Reports"
import ProtectedRoute from "../components/ProtectedRoute"

// Optional: Keep login page but make it accessible
import Login from "../pages/Login"

function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Login page - accessible but not required */}
        <Route path="/login" element={<Login />} />

        {/* All routes are directly accessible now */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/audit-cases" element={
          <ProtectedRoute>
            <AuditCases />
          </ProtectedRoute>
        } />

        <Route path="/audit-plan" element={
          <ProtectedRoute>
            <AuditPlan />
          </ProtectedRoute>
        } />

        <Route path="/desk-audit" element={
          <ProtectedRoute>
            <DeskAudit />
          </ProtectedRoute>
        } />

        <Route path="/comprehensive-audit" element={
          <ProtectedRoute>
            <ComprehensiveAudit />
          </ProtectedRoute>
        } />

        <Route path="/transfer-pricing" element={
          <ProtectedRoute>
            <TransferPricingAudit />
          </ProtectedRoute>
        } />

        <Route path="/joint-audit" element={
          <ProtectedRoute>
            <JointAudit />
          </ProtectedRoute>
        } />

        <Route path="/quality-assurance" element={
          <ProtectedRoute>
            <QualityAssurance />
          </ProtectedRoute>
        } />

        <Route path="/reports" element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        } />

        {/* Redirect root to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" />} />

      </Routes>

    </BrowserRouter>
  )
}

export default AppRoutes
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import AuditCases from "../pages/AuditCases";
import AuditPlan from "../pages/AuditPlan";
import DeskAudit from "../pages/DeskAudit";
import ComprehensiveAudit from "../pages/ComprehensiveAudit";
import TransferPricingAudit from "../pages/TransferPricingAudit";
import JointAudit from "../pages/JointAudit";
import QualityAssurance from "../pages/QualityAssurance";
import Reports from "../pages/Reports";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
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
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
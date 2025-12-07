// src/App.jsx - Updated version
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DashboardProvider } from './context/DashboardContext';
import DashboardLayout from './components/layout/DashboardLayout';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import RentOverview from './dashboards/rent/pages/RentOverview';
import RentBrowse from './dashboards/rent/pages/RentBrowse';

function App() {
  return (
    <AuthProvider>
      <DashboardProvider>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Main Dashboard Route */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            {/* Default redirect to rent dashboard */}
            <Route index element={<Navigate to="rent" />} />
            
            {/* Rent Dashboard Routes */}
            <Route path="rent">
              <Route index element={<Navigate to="overview" />} />
              <Route path="overview" element={<RentOverview />} />
              <Route path="browse" element={<RentBrowse />} /> 
              <Route path="applications" element={<div>Rent Applications Page</div>} />
              <Route path="my-properties" element={<div>Rent My Properties Page</div>} />
              <Route path="maintenance" element={<div>Rent Maintenance Page</div>} />
              <Route path="payments" element={<div>Rent Payments Page</div>} />
              <Route path="messages" element={<div>Rent Messages Page</div>} />
              {/* Note: favorites is NOT here - it's a shared route below */}
            </Route>
            
            {/* Buy Dashboard Routes */}
            <Route path="buy">
              <Route index element={<Navigate to="overview" />} />
              <Route path="overview" element={<div>Buy Overview Page</div>} />
              <Route path="browse" element={<div>Buy Browse Properties Page</div>} />
              <Route path="applications" element={<div>Buy Applications Page</div>} />
              <Route path="my-properties" element={<div>Buy My Properties Page</div>} />
            </Route>
            
            {/* SHARED ROUTES (Available from any dashboard) */}
            <Route path="favorites" element={<div>Favorites Page</div>} />
            <Route path="settings" element={<div>Settings Page</div>} />
            
            {/* Catch-all for any undefined route within dashboard */}
            <Route path="*" element={<Navigate to="rent/overview" />} />
          </Route>
          
          {/* Redirect root to signup */}
          <Route path="/" element={<Navigate to="/signup" />} />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/signup" />} />
        </Routes>
      </DashboardProvider>
    </AuthProvider>
  );
}

export default App;
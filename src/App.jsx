// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DashboardProvider } from './context/DashboardContext';
import DashboardLayout from './components/layout/DashboardLayout';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import RentOverview from './dashboards/rent/pages/RentOverview'; // ← This line

function App() {
  return (
    <AuthProvider>
      <DashboardProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Navigate to="rent" />} />
            
            {/* Rent Dashboard */}
            <Route path="rent">
              <Route index element={<Navigate to="overview" />} />
              <Route path="overview" element={<RentOverview />} />
              {/* ... other rent routes */}
            </Route>
            
            {/* ... rest of your code */}
          </Route>
          
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="*" element={<Navigate to="/signup" />} />
        </Routes>
      </DashboardProvider>
    </AuthProvider>
  );
}

export default App;
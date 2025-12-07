
src/dashboards/rent/pages/RentBrowse.jsx                    # MAIN PAGE (already exists, will modify)
src/dashboards/rent/components/browse-properties/          # NEW FOLDER
├── components/
│   ├── HeroSearchSection/
│   │   ├── HeroSearchSection.jsx
│   │   ├── ManagementTypeToggle.jsx
│   │   └── SearchFilters.jsx
│   ├── PropertyFilters/
│   │   ├── PropertyFilters.jsx
│   │   ├── AdvancedFiltersModal.jsx
│   │   └── FilterOptions.jsx
│   ├── PropertyGrid/
│   │   ├── PropertyGrid.jsx
│   │   ├── PropertyCard.jsx
│   │   ├── GridPagination.jsx
│   │   └── ViewToggle.jsx
│   └── SortOptions/
│       └── SortOptions.jsx
├── hooks/
│   ├── usePropertyFilters.js
│   ├── useProperties.js
│   └── usePagination.js
├── utils/
│   ├── propertyData.js          # Mock data with Nigerian properties
│   ├── propertyFilters.js
│   └── constants.js








src/
├───dashboards/                    # ← NEW MAIN FOLDER
│   ├───rent/
│   │   ├───components/           # Rent-specific UI components
│   │   │   ├───overview/        # Overview sub-components
│   │   │   │   ├───ContinueJourney.jsx
│   │   │   │   ├───StatsCards.jsx
│   │   │   │   ├───RecentlyViewedProperty.jsx
│   │   │   │   ├───TimelineCalendar.jsx
│   │   │   │   ├───PerformanceDashboard.jsx
│   │   │   │   ├───UnifiedActionsPanel.jsx
│   │   │   │   └───RentalJourneyStatus.jsx
│   │   │   ├───browse/
│   │   │   ├───applications/
│   │   │   └───properties/
│   │   ├───pages/               # Full page components
│   │   │   ├───RentOverview.jsx
│   │   │   ├───RentBrowse.jsx
│   │   │   ├───RentApplications.jsx
│   │   │   └───RentMyProperties.jsx
│   │   └───hooks/               # Rent-specific hooks
│   │
│   ├───buy/                     # Same structure later
│   ├───commercial/              # Same structure later
│   └───shortlet/                # Same structure later
│
├───components/                  # ← REORGANIZED
│   ├───auth/                   # Login, Signup
│   ├───layout/                 # DashboardLayout, Header, Sidebar
│   ├───ui/                     # Modal, NotificationBell, UserMenu
│   └───shared/                 # Cross-dashboard components
│       ├───PropertyCard.jsx    # Generic property card
│       ├───PropertyFilters.jsx
│       └───PropertyGrid.jsx
│
├───context/
├───hooks/
├───utils/
└───App.jsx

import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DashboardProvider } from './context/DashboardContext';

// Layout Components
import DashboardLayout from './components/layout/DashboardLayout';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import DashboardSwitcher from './components/layout/DashboardSwitcher';

// Auth Components
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

// Property Components
// import PropertyCard from './components/properties/PropertyCard';
// import PropertyGrid from './components/properties/PropertyGrid';
// import PropertyFilters from './components/properties/PropertyFilters';
// import PropertyDetailsModal from './components/properties/PropertyDetailsModal';

// Application Components
// import ForRentApplications from './components/applications/forrent-applications/ForRentApplications';
// import ForShortletApplication from './components/applications/forshortlet-application/ForShortletApplication';
// import ForCommercialApplication from './components/applications/forcommercial-application/ForCommercialApplication';
// import ForBuyApplications from './components/applications/forbuy-applications/ForBuyApplications';

// UI Components
// import Modal from './components/ui/Modal';
// import NotificationBell from './components/ui/NotificationBell';
// import UserMenu from './components/ui/UserMenu';

// Dashboard Sections
// import ForRentDashboard from './sections/dashboards/ForRentDashboard';
// import ShortletDashboard from './sections/dashboards/ShortletDashboard';
// import CommercialDashboard from './sections/dashboards/CommercialDashboard';
// import BuyDashboard from './sections/dashboards/BuyDashboard';

// Other Sections
// import Overview from './sections/overview/Overview';
// import Settings from './sections/settings/Settings';

function App() {
  return (
    <AuthProvider>
      <DashboardProvider>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Main Dashboard Route (not active yet) */}
          
          <Route path="/dashboard" element={<DashboardLayout />} />
          {/* <Route index element={<Navigate to="rent" />} />
          <Route path="rent" element={<ForRentDashboard />} />
          <Route path="shortlet" element={<ShortletDashboard />} />
          <Route path="commercial" element={<CommercialDashboard />} />
          <Route path="buy" element={<BuyDashboard />} />
          <Route path="settings" element={<Settings />} /> */}

          
          {/* Redirect root to signup for now */}
          <Route path="/" element={<Navigate to="/signup" />} />
        </Routes>
      </DashboardProvider>
    </AuthProvider>
  );
}

export default App;
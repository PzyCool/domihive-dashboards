// src/components/auth/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Add AuthContext hook
  
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState('+234');
  
  // Image paths constants
  const IMAGES = {
    icon: "/src/assets/domihive-lcon.png",
    logo: "/src/assets/domihive-logo.png",
    placeholderIcon: 'https://via.placeholder.com/40?text=DH',
    placeholderLogo: 'https://via.placeholder.com/200x50?text=DomiHive'
  };

  // Country codes data (same as signup)
  const countryCodes = [
    { code: '+234', country: 'Nigeria', flag: '🇳🇬' },
    { code: '+233', country: 'Ghana', flag: '🇬🇭' },
    { code: '+254', country: 'Kenya', flag: '🇰🇪' },
    { code: '+27', country: 'South Africa', flag: '🇿🇦' },
    { code: '+1', country: 'USA/Canada', flag: '🇺🇸' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+971', country: 'UAE', flag: '🇦🇪' },
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+86', country: 'China', flag: '🇨🇳' },
  ];

  // Disable body scrolling
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Load remembered phone if exists
  useEffect(() => {
    const rememberedPhone = localStorage.getItem('domihive_remembered_phone');
    if (rememberedPhone) {
      try {
        const phoneData = JSON.parse(rememberedPhone);
        setFormData(prev => ({
          ...prev,
          phone: phoneData.number,
          rememberMe: true
        }));
        setCountryCode(phoneData.countryCode);
      } catch (error) {
        console.error('Error loading remembered phone:', error);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear errors for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  const showNotification = (message, type) => {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 ${
      type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    
    try {
      // Save remembered phone if checked
      if (formData.rememberMe) {
        localStorage.setItem('domihive_remembered_phone', JSON.stringify({
          number: formData.phone,
          countryCode: countryCode
        }));
      } else {
        localStorage.removeItem('domihive_remembered_phone');
      }
      
      // Get full phone number with country code
      const fullPhone = countryCode + formData.phone.replace(/\D/g, '');
      
      // Use AuthContext login function
      const result = await login(fullPhone, formData.password);
      
      if (result.success) {
        showNotification('Login successful!', 'success');
        
        // Check if user has a last dashboard saved
        const lastDashboard = localStorage.getItem('domihive_last_dashboard');
        
        // Redirect to dashboard after delay
        setTimeout(() => {
          if (lastDashboard) {
            navigate(`/dashboard/${lastDashboard}`);
          } else {
            // Default to rent dashboard
            navigate('/dashboard/rent');
          }
        }, 1000);
        
      } else {
        setErrors({ general: result.error || 'Login failed. Please check your credentials.' });
        showNotification('Login failed. Please try again.', 'error');
      }
      
    } catch (error) {
      setErrors({ general: 'Login failed. Please check your credentials.' });
      showNotification('Login failed. Please try again.', 'error');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const goToSignup = () => {
    navigate('/signup');
  };

  const handleForgotPassword = () => {
    if (!formData.phone.trim()) {
      setErrors({ phone: 'Please enter your phone number to reset password' });
      return;
    }
    
    showNotification('Password reset link sent to your phone', 'success');
  };

  return (
    <div className="h-screen overflow-hidden flex bg-[var(--light-gray)]">
      {/* Left Side - Branding & Features */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[var(--primary)] to-[#1a2d5f] p-12 overflow-hidden">
        <div className="flex flex-col justify-between h-full w-full">
          <div className="scrollbar-hide overflow-y-auto pr-4">
            <div>
              <div className="mb-12">
                <img 
                  src={IMAGES.logo}
                  alt="DomiHive Logo" 
                  className="h-10"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = IMAGES.placeholderLogo;
                  }}
                />
              </div>
              
              <div className="mb-12">
                <h1 className="text-4xl font-bold text-white mb-6">
                  Welcome Back
                </h1>
                <p className="text-xl text-gray-300 mb-10">
                  Sign in to continue your property journey with DomiHive's verified properties and professional management.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center">
                      <i className="fas fa-home text-white text-lg"></i>
                    </div>
                    <span className="text-lg text-white font-medium">Access Your Properties</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center">
                      <i className="fas fa-file-alt text-white text-lg"></i>
                    </div>
                    <span className="text-lg text-white font-medium">Manage Applications</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center">
                      <i className="fas fa-bell text-white text-lg"></i>
                    </div>
                    <span className="text-lg text-white font-medium">Get Notifications</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <i className="fas fa-quote-left text-[var(--accent)] text-2xl"></i>
                  <p className="text-white italic">
                    "DomiHive made finding my apartment seamless. The verification process gave me peace of mind."
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                  <div>
                    <p className="text-white font-medium">Sarah Johnson</p>
                    <p className="text-gray-300 text-sm">Lagos, Nigeria</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Top Navigation */}
        <div className="pt-8 px-4 lg:px-8 flex justify-end">
          <button
            onClick={goToSignup}
            className="px-4 py-2 text-sm font-medium text-[var(--primary)] hover:text-[#1a2d5f] transition-colors"
          >
            Don't have an account? <span className="font-semibold">Sign Up</span>
          </button>
        </div>

        {/* Scrollable Form Area */}
        <div className="form-scroll-area flex-1 px-4 lg:px-8 pb-8">
          <div className="max-w-md mx-auto pt-8 lg:pt-16">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={IMAGES.icon}
                  alt="DomiHive Icon"
                  className="h-10 w-10"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = IMAGES.placeholderIcon;
                  }}
                />
                <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
              </div>
              <p className="text-gray-600">Sign in to your DomiHive account</p>
            </div>

            {errors.general && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{errors.general}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Phone Number */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <div className="w-32">
                    <select
                      value={countryCode}
                      onChange={handleCountryCodeChange}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent bg-white appearance-none"
                    >
                      {countryCodes.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.flag} {country.code}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-colors ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="801 234 5678"
                    />
                  </div>
                </div>
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-[var(--primary)] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-colors pr-12 ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword ? (
                      <i className="fas fa-eye-slash text-lg"></i>
                    ) : (
                      <i className="fas fa-eye text-lg"></i>
                    )}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-[var(--primary)] rounded focus:ring-[var(--primary)] border-gray-300"
                  />
                  <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--primary)] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#1a2d5f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <i className="fas fa-spinner fa-spin"></i>
                    <span>Signing In...</span>
                  </div>
                ) : 'Sign In'}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <i className="fab fa-google text-red-500"></i>
                  <span>Google</span>
                </button>
                <button
                  type="button"
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <i className="fab fa-apple text-gray-900"></i>
                  <span>Apple</span>
                </button>
              </div>

              {/* Terms */}
              <p className="text-xs text-gray-500 text-center">
                By signing in, you agree to our{' '}
                <a href="#" className="text-[var(--primary)] hover:underline font-medium">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-[var(--primary)] hover:underline font-medium">
                  Privacy Policy
                </a>
              </p>

              {/* Signup Link */}
              <div className="text-center pt-4 border-t">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={goToSignup}
                    className="text-[var(--primary)] font-medium hover:underline"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </form>

            {/* Demo Account Note */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <i className="fas fa-info-circle text-blue-500 mt-0.5"></i>
                <div>
                  <p className="text-sm font-medium text-blue-800 mb-1">Demo Account</p>
                  <p className="text-xs text-blue-700">
                    For testing, use any phone number and password (minimum 6 characters). 
                    The system will authenticate against your signup data.
                  </p>
                  <p className="text-xs text-blue-700 mt-1">
                    <strong>Test user:</strong> Use the same phone number and password you used during signup.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
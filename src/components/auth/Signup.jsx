// src/components/auth/Signup.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  
  // Image paths constants
  const IMAGES = {
    icon: "/src/assets/domihive-lcon.png",
    logo: "/src/assets/domihive-logo.png",
    placeholderIcon: "https://via.placeholder.com/40?text=DH",
    placeholderLogo: "https://via.placeholder.com/200x50?text=DomiHive"
  };

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+234",
    password: "",
    confirmPassword: "",
    otp: "",
    profilePhoto: null,
    username: "",
    agreeTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [imageToEdit, setImageToEdit] = useState(null);

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password strength state
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: "",
    color: "bg-gray-200",
    width: "0%",
    requirements: {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      specialChar: false,
    },
  });

  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Country codes data
  const countryCodes = [
    { code: "+234", country: "Nigeria", flag: "🇳🇬" },
    { code: "+233", country: "Ghana", flag: "🇬🇭" },
    { code: "+254", country: "Kenya", flag: "🇰🇪" },
    { code: "+27", country: "South Africa", flag: "🇿🇦" },
    { code: "+1", country: "USA/Canada", flag: "🇺🇸" },
    { code: "+44", country: "UK", flag: "🇬🇧" },
    { code: "+971", country: "UAE", flag: "🇦🇪" },
    { code: "+91", country: "India", flag: "🇮🇳" },
    { code: "+86", country: "China", flag: "🇨🇳" },
  ];

  // Disable body scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Calculate password strength
  const calculatePasswordStrength = (password) => {
    if (!password) {
      setPasswordStrength({
        score: 0,
        feedback: "",
        color: "bg-gray-200",
        width: "0%",
        requirements: {
          length: false,
          uppercase: false,
          lowercase: false,
          number: false,
          specialChar: false,
        },
      });
      return;
    }

    // Check requirements
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[^A-Za-z0-9]/.test(password),
    };

    // Calculate score
    let score = 0;
    Object.values(requirements).forEach((req) => req && score++);

    // Add bonus for length
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;

    // Cap score at 7
    score = Math.min(score, 7);

    // Determine strength level
    let color, feedbackText, width;

    if (score <= 2) {
      color = "bg-red-500";
      feedbackText = "Weak";
      width = `${(score / 7) * 100}%`;
    } else if (score <= 4) {
      color = "bg-yellow-500";
      feedbackText = "Fair";
      width = `${(score / 7) * 100}%`;
    } else if (score <= 6) {
      color = "bg-blue-500";
      feedbackText = "Good";
      width = `${(score / 7) * 100}%`;
    } else {
      color = "bg-green-500";
      feedbackText = "Strong";
      width = "100%";
    }

    setPasswordStrength({
      score,
      feedback: feedbackText,
      color,
      width,
      requirements,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Calculate password strength when password changes
    if (name === "password") {
      calculatePasswordStrength(value);
    }

    // Clear errors for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          profilePhoto: "File size must be less than 5MB",
        }));
        return;
      }

      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          profilePhoto: "Please upload an image file",
        }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setImageToEdit(e.target.result);
        setShowCropModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveCroppedImage = () => {
    if (canvasRef.current && imageToEdit) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const img = new Image();
      img.onload = () => {
        const size = Math.min(img.width, img.height);
        const x = (img.width - size) / 2;
        const y = (img.height - size) / 2;

        canvas.width = 200;
        canvas.height = 200;
        ctx.drawImage(img, x, y, size, size, 0, 0, 200, 200);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const fileName = `profile-${Date.now()}.jpg`;
              const file = new File([blob], fileName, { type: "image/jpeg" });

              setFormData((prev) => ({
                ...prev,
                profilePhoto: file,
              }));

              setImagePreview(canvas.toDataURL());
              setShowCropModal(false);
              setImageToEdit(null);

              if (errors.profilePhoto) {
                setErrors((prev) => ({
                  ...prev,
                  profilePhoto: "",
                }));
              }
            }
          },
          "image/jpeg",
          0.9
        );
      };
      img.src = imageToEdit;
    }
  };

  const editProfilePhoto = () => {
    if (imagePreview) {
      setImageToEdit(imagePreview);
      setShowCropModal(true);
    } else {
      fileInputRef.current?.click();
    }
  };

  const removeProfilePhoto = () => {
    setFormData((prev) => ({ ...prev, profilePhoto: null }));
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions";
    }

    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.otp || formData.otp.length !== 4) {
      newErrors.otp = "Please enter a valid 4-digit OTP";
    }

    return newErrors;
  };

  const validateStep3 = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    return newErrors;
  };

  const handleSubmitStep1 = async (e) => {
    e.preventDefault();
    const validationErrors = validateStep1();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStep(2);
      showNotification("OTP sent to your phone number", "success");
    } catch (error) {
      setErrors({ general: "Failed to send OTP. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitStep2 = async (e) => {
    e.preventDefault();
    const validationErrors = validateStep2();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (formData.otp !== "1234") {
      setErrors({ otp: "Invalid OTP. Try 1234 for testing." });
      return;
    }

    setStep(3);
  };

  const handleSubmitStep3 = async (e) => {
    e.preventDefault();
    const validationErrors = validateStep3();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      // Create profile photo URL if exists
      const profilePhotoUrl = formData.profilePhoto
        ? URL.createObjectURL(formData.profilePhoto)
        : null;

      // Use AuthContext signup function
      const result = await signup({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        countryCode: formData.countryCode,
        profilePhoto: profilePhotoUrl,
      });

      if (result.success) {
        showNotification("Account created successfully!", "success");

        // Redirect to rent dashboard (default dashboard)
        setTimeout(() => {
          navigate("/dashboard/rent");
        }, 1500);
      } else {
        setErrors({ general: result.error || "Account creation failed. Please try again." });
      }
    } catch (error) {
      setErrors({ general: "Account creation failed. Please try again." });
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type) => {
    const notification = document.createElement("div");
    notification.className = `fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 ${
      type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
    }`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const renderPasswordRequirements = () => (
    <div className="mt-3 space-y-2">
      <p className="text-sm font-medium text-gray-700">
        Password must contain:
      </p>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              passwordStrength.requirements.length
                ? "bg-green-500"
                : "bg-gray-300"
            }`}
          ></div>
          <span
            className={`text-xs ${
              passwordStrength.requirements.length
                ? "text-green-600"
                : "text-gray-500"
            }`}
          >
            At least 8 characters
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              passwordStrength.requirements.lowercase
                ? "bg-green-500"
                : "bg-gray-300"
            }`}
          ></div>
          <span
            className={`text-xs ${
              passwordStrength.requirements.lowercase
                ? "text-green-600"
                : "text-gray-500"
            }`}
          >
            Lowercase letter
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              passwordStrength.requirements.uppercase
                ? "bg-green-500"
                : "bg-gray-300"
            }`}
          ></div>
          <span
            className={`text-xs ${
              passwordStrength.requirements.uppercase
                ? "text-green-600"
                : "text-gray-500"
            }`}
          >
            Uppercase letter
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              passwordStrength.requirements.number
                ? "bg-green-500"
                : "bg-gray-300"
            }`}
          ></div>
          <span
            className={`text-xs ${
              passwordStrength.requirements.number
                ? "text-green-600"
                : "text-gray-500"
            }`}
          >
            Number
          </span>
        </div>
        <div className="flex items-center gap-2 col-span-2">
          <div
            className={`w-2 h-2 rounded-full ${
              passwordStrength.requirements.specialChar
                ? "bg-green-500"
                : "bg-gray-300"
            }`}
          ></div>
          <span
            className={`text-xs ${
              passwordStrength.requirements.specialChar
                ? "text-green-600"
                : "text-gray-500"
            }`}
          >
            Special character (!@#$%^&*)
          </span>
        </div>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <>
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
          <h2 className="text-2xl font-bold text-gray-900">
            Create Your Account
          </h2>
        </div>
        <p className="text-gray-600">
          Join DomiHive and start your property journey
        </p>
      </div>

      {errors.general && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{errors.general}</p>
        </div>
      )}

      <div className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-colors ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-colors ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Phone Number
          </label>
          <div className="flex gap-2">
            <div className="w-32">
              <select
                id="countryCode"
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent bg-white"
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
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="801 234 5678"
              />
            </div>
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-colors pr-12 ${
                errors.password ? "border-red-500" : "border-gray-300"
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

          {/* Password Strength Bar */}
          {formData.password && (
            <div className="mt-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium text-gray-600">
                  Password Strength
                </span>
                <span
                  className={`text-xs font-bold ${
                    passwordStrength.feedback === "Weak"
                      ? "text-red-600"
                      : passwordStrength.feedback === "Fair"
                      ? "text-yellow-600"
                      : passwordStrength.feedback === "Good"
                      ? "text-blue-600"
                      : passwordStrength.feedback === "Strong"
                      ? "text-green-600"
                      : "text-gray-600"
                  }`}
                >
                  {passwordStrength.feedback}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${passwordStrength.color}`}
                  style={{ width: passwordStrength.width }}
                ></div>
              </div>

              {renderPasswordRequirements()}
            </div>
          )}

          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-colors pr-12 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showConfirmPassword ? (
                <i className="fas fa-eye-slash text-lg"></i>
              ) : (
                <i className="fas fa-eye text-lg"></i>
              )}
            </button>
          </div>

          {/* Password Match Indicator - FIXED SYNTAX */}
          {formData.confirmPassword && (
            <div className="mt-1 flex items-center gap-2">
              {formData.password === formData.confirmPassword ? (
                <div className="flex items-center gap-2">
                  <i className="fas fa-check-circle text-green-500"></i>
                  <span className="text-xs text-green-600 font-medium">
                    Passwords match
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <i className="fas fa-times-circle text-red-500"></i>
                  <span className="text-xs text-red-600 font-medium">
                    Passwords don't match
                  </span>
                </div>
              )}
            </div>
          )}

          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="agreeTerms"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
            className="mt-1 h-4 w-4 text-[var(--primary)] rounded focus:ring-[var(--primary)] border-gray-300"
          />
          <label htmlFor="agreeTerms" className="text-sm text-gray-700">
            I agree to the{" "}
            <a
              href="#"
              className="text-[var(--primary)] hover:underline font-medium"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-[var(--primary)] hover:underline font-medium"
            >
              Privacy Policy
            </a>
          </label>
        </div>
        {errors.agreeTerms && (
          <p className="text-sm text-red-600">{errors.agreeTerms}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[var(--primary)] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#1a2d5f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
        >
          {loading ? "Sending OTP..." : "Continue with OTP Verification"}
        </button>

        <div className="text-center pt-4 border-t">
          <p className="text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={goToLogin}
              className="text-[var(--primary)] font-medium hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </>
  );

  const renderStep2 = () => (
    <>
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
          <h2 className="text-2xl font-bold text-gray-900">
            Verify Your Phone
          </h2>
        </div>
        <p className="text-gray-600">
          We've sent a 4-digit OTP to{" "}
          <span className="font-semibold">
            {formData.countryCode} {formData.phone}
          </span>
        </p>
        <p className="text-sm text-gray-500 mt-1">
          For testing, use OTP:{" "}
          <span className="font-mono bg-gray-100 px-2 py-1 rounded">1234</span>
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="otp"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Enter OTP
          </label>
          <input
            type="text"
            id="otp"
            name="otp"
            maxLength="4"
            value={formData.otp}
            onChange={handleChange}
            className={`w-full px-4 py-3 text-center text-2xl font-mono border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-colors ${
              errors.otp ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="1234"
          />
          {errors.otp && (
            <p className="mt-1 text-sm text-red-600">{errors.otp}</p>
          )}
        </div>

        <div className="space-y-3">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--primary)] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#1a2d5f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Back to Edit Details
          </button>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={() =>
              showNotification("OTP resent to your phone", "success")
            }
            className="text-sm text-[var(--primary)] hover:underline"
          >
            Resend OTP
          </button>
        </div>
      </div>
    </>
  );

  const renderStep3 = () => (
    <>
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
          <h2 className="text-2xl font-bold text-gray-900">
            Complete Your Profile
          </h2>
        </div>
        <p className="text-gray-600">
          Add a username and profile photo to personalize your account
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-colors ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="johndoe"
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-600">{errors.username}</p>
          )}
        </div>

        <div>
          <div className="flex flex-col items-center justify-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <i className="fas fa-user text-4xl text-gray-400"></i>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 flex gap-2">
                <button
                  type="button"
                  onClick={editProfilePhoto}
                  className="w-10 h-10 bg-[var(--accent)] rounded-full flex items-center justify-center hover:bg-[var(--accent-light)] transition-colors shadow-md"
                >
                  <i className="fas fa-pencil-alt text-white text-sm"></i>
                </button>
                {imagePreview && (
                  <button
                    type="button"
                    onClick={removeProfilePhoto}
                    className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-md"
                  >
                    <i className="fas fa-trash text-white text-sm"></i>
                  </button>
                )}
              </div>
            </div>
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-[var(--primary)] hover:underline font-medium"
              >
                {imagePreview ? "Change profile photo" : "Upload profile photo"}
              </button>
              <p className="text-sm text-gray-500 mt-1">
                JPG, PNG or GIF (max. 5MB)
              </p>
            </div>
          </div>
          {errors.profilePhoto && (
            <p className="mt-2 text-sm text-red-600 text-center">
              {errors.profilePhoto}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--primary)] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#1a2d5f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
          <button
            type="button"
            onClick={() => setStep(2)}
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Back
          </button>
        </div>
      </div>
    </>
  );

  const handleSubmit = (e) => {
    if (step === 1) handleSubmitStep1(e);
    else if (step === 2) handleSubmitStep2(e);
    else if (step === 3) handleSubmitStep3(e);
  };

  return (
    <>
      {/* File Input (hidden) */}
      <input
        type="file"
        id="profileUpload"
        name="profilePhoto"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
      />

      {/* Simple Crop/Edit Modal */}
      {showCropModal && imageToEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Edit Profile Photo
                </h3>
                <button
                  onClick={() => {
                    setShowCropModal(false);
                    setImageToEdit(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times text-2xl"></i>
                </button>
              </div>

              <div className="mb-6 text-center">
                <div className="mb-4">
                  <img
                    src={imageToEdit}
                    alt="Preview"
                    className="max-h-64 mx-auto rounded-lg"
                  />
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Photo will be cropped to a square. For best results, use a
                  square image.
                </p>

                <canvas ref={canvasRef} className="hidden" />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowCropModal(false);
                    setImageToEdit(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveCroppedImage}
                  className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[#1a2d5f]"
                >
                  Save Photo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                    Find Your Perfect Property
                  </h1>
                  <p className="text-xl text-gray-300 mb-10">
                    Join thousands of users finding their dream homes with
                    DomiHive's verified properties and professional management.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center">
                        <i className="fas fa-shield-alt text-white text-lg"></i>
                      </div>
                      <span className="text-lg text-white font-medium">
                        Verified Properties
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center">
                        <i className="fas fa-home text-white text-lg"></i>
                      </div>
                      <span className="text-lg text-white font-medium">
                        Professional Management
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center">
                        <i className="fas fa-search text-white text-lg"></i>
                      </div>
                      <span className="text-lg text-white font-medium">
                        Smart Search
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex flex-col">
          {/* Progress Steps at Top */}
          <div className="pt-8 px-4 lg:px-8">
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3].map((stepNum) => (
                <React.Fragment key={stepNum}>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                      step === stepNum
                        ? "bg-[var(--primary)] text-white"
                        : step > stepNum
                        ? "bg-[var(--accent)] text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {step > stepNum ? (
                      <i className="fas fa-check"></i>
                    ) : (
                      stepNum
                    )}
                  </div>
                  {stepNum < 3 && (
                    <div
                      className={`w-12 lg:w-16 h-1.5 rounded-full ${
                        step > stepNum ? "bg-[var(--accent)]" : "bg-gray-200"
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="flex justify-between mt-3 px-2">
              <span
                className={`text-sm font-medium ${
                  step >= 1 ? "text-[var(--primary)]" : "text-gray-400"
                }`}
              >
                Basic Info
              </span>
              <span
                className={`text-sm font-medium ${
                  step >= 2 ? "text-[var(--primary)]" : "text-gray-400"
                }`}
              >
                OTP Verification
              </span>
              <span
                className={`text-sm font-medium ${
                  step >= 3 ? "text-[var(--primary)]" : "text-gray-400"
                }`}
              >
                Profile Setup
              </span>
            </div>
          </div>

          {/* Scrollable Form Area */}
          <div className="form-scroll-area flex-1 px-4 lg:px-8 pb-8">
            <div className="max-w-md mx-auto pt-8">
              <form onSubmit={handleSubmit} className="w-full">
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
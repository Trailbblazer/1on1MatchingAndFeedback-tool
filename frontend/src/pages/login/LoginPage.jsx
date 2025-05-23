import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';



const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      // Simulate API login call
      setTimeout(() => {
        setIsLoading(false);
        // Optionally call onLogin handler
        if (onLogin) {
          onLogin({ email });
        }
        navigate('/dashboard');
      }, 1500);
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);

    console.log('Google Login Success:', decoded);
    const userData = {
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    };
    if (onLogin) onLogin(userData);
    navigate('/pages/Home');
  };

  const handleGoogleError = () => {
    console.log('Google Login Failed');
    setErrors({ google: 'Google login failed. Please try again.' });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-full max-w-5xl overflow-hidden bg-white shadow-lg rounded-xl">

        {/* Left Welcome Section */}
        <div className="flex flex-col justify-center w-1/2 p-12 text-white bg-gradient-to-br from-blue-600 to-purple-600">
          <h1 className="mb-6 text-4xl font-bold">Welcome to Platform</h1>
          <p className="mb-8 text-lg">
            Join our community and get access to exclusive features. Create your account and start your journey today.
          </p>
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 mr-4 bg-white rounded-full bg-opacity-20">
              <span className="text-2xl">A</span>
            </div>
            <div>
              <p className="font-medium">Admin Dashboard</p>
              <p className="text-sm opacity-80">Access all features</p>
            </div>
          </div>
        </div>

        {/* Right Login Form Section */}
        <div className="w-1/2 p-12">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-3xl font-bold text-gray-800">USER LOGIN</h2>
            <p className="text-gray-600">Enter your credentials to access your account</p>
          </div>

          {/* Google Login */}
          <div className="mb-6">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap
              text="continue_with"
              shape="rectangular"
              size="large"
              width="100%"
            />
            {errors.google && <p className="mt-2 text-sm text-red-500">{errors.google}</p>}
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-500 bg-white">Or login with email</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email Field */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`block w-full pl-10 pr-3 py-3 border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`block w-full pl-10 pr-10 py-3 border ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-blue-600"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-700">
                  Remember
                </label>
              </div>
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition duration-200 bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none"
              >
                {isLoading ? 'Logging in...' : <>LOGIN <FiArrowRight className="ml-2" /></>}
              </button>
            </div>
          </form>

          {/* Signup Link */}
          <div className="mt-6 text-sm text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import { RiAdminFill } from "react-icons/ri";
import { FaLock } from "react-icons/fa";
import { TfiDashboard } from "react-icons/tfi";

const SignupPage = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!username) newErrors.username = 'username is required';

    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 2) newErrors.password = 'Password must be at least 3 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if(username === "admin" && password === "admin" && confirmPassword === "admin" ) {
      onLogin();
      navigate('/');
    }
    else{
      alert("Invalid username or password");
    }
  };

  return (
    <>
      <style>{`
        @keyframes fadeInSlideUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        className="flex items-center justify-center min-h-screen bg-gray-100"
        style={{ animation: 'fadeInSlideUp 0.7s ease forwards' }}
      >
        <div className="flex flex-col w-full max-w-4xl mx-4 overflow-hidden bg-white shadow-lg rounded-xl md:flex-row">

          {/* Left Section */}
          <div
            className="flex flex-col justify-center p-10 text-white md:w-1/2 bg-gradient-to-br from-blue-600 to-purple-600"
            style={{ animation: 'fadeInSlideUp 0.8s ease forwards', animationDelay: '0.2s', opacity: 0 }}
          >
            <h1 className="mb-4 text-3xl font-bold">
              <TfiDashboard className="inline-block mr-2 text-4xl text-red-500" />
              Welcome to Admin Dashboard
            </h1>
            <p className="text-lg leading-relaxed">
              Please log in using your administrator credentials to access the Startup Hub management dashboard. If you don't have an account, contact the system administrator.
            </p>
          </div>

          {/* Right Section */}
          <div
            className="p-10 space-y-6 md:w-1/2"
            style={{ animation: 'fadeInSlideUp 0.8s ease forwards', animationDelay: '0.4s', opacity: 0 }}
          >
            <div className="text-center">
              <h2 className="flex items-center mb-2 text-3xl font-bold text-gray-800 gap-9">
                <FaLock className="flex text-blue-500" /> Login As Admin
              </h2>
              <p className="text-gray-600">Fill in your details to get started</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
                <div className="relative">
                  <FiUser className="absolute text-gray-400 top-3 left-3" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full pl-10 pr-3 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500`}
                    placeholder="Enter your name"
                  />
                </div>
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>

              {/* Username */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">UserName</label>
                <div className="relative">
                  <RiAdminFill className="absolute text-gray-400 top-3 left-3" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`w-full pl-10 pr-3 py-3 rounded-lg border ${errors.username ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500`}
                    placeholder="Enter your Admin UserName"
                  />
                </div>
                {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <FiLock className="absolute text-gray-400 top-3 left-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-10 pr-10 py-3 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute text-gray-400 top-3 right-3"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Confirm Password</label>
                <div className="relative">
                  <FiLock className="absolute text-gray-400 top-3 left-3" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full pl-10 pr-10 py-3 rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute text-gray-400 top-3 right-3"
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center w-full py-3 text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                {isLoading ? 'Creating account...' : <>LOGIN <FiArrowRight className="ml-2" /></>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;

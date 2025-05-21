import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, AlertCircle, Check, X } from 'lucide-react';

const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const { signup, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return;
    }
    await signup(name, email, password);
    if (!error) {
      navigate('/');
    }
  };

  // Password validation criteria
  const hasLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const passwordsMatch = password === confirmPassword && password !== '';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-2 text-gray-600">Sign up to start renting vehicles</p>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-start">
            <AlertCircle className="text-red-500 mr-3 flex-shrink-0 mt-0.5" size={20} />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="appearance-none relative block w-full px-3 py-3 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none relative block w-full px-3 py-3 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="Create a password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {(passwordFocused || password.length > 0) && (
            <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
              <p className="text-xs font-medium text-gray-700 mb-2">Password must:</p>
              <ul className="space-y-1">
                <li className="flex items-center text-xs">
                  {hasLength ? (
                    <Check size={14} className="text-green-500 mr-2" />
                  ) : (
                    <X size={14} className="text-gray-400 mr-2" />
                  )}
                  <span className={hasLength ? 'text-green-700' : 'text-gray-600'}>
                    Be at least 8 characters long
                  </span>
                </li>
                <li className="flex items-center text-xs">
                  {hasUpperCase ? (
                    <Check size={14} className="text-green-500 mr-2" />
                  ) : (
                    <X size={14} className="text-gray-400 mr-2" />
                  )}
                  <span className={hasUpperCase ? 'text-green-700' : 'text-gray-600'}>
                    Contain at least one uppercase letter
                  </span>
                </li>
                <li className="flex items-center text-xs">
                  {hasLowerCase ? (
                    <Check size={14} className="text-green-500 mr-2" />
                  ) : (
                    <X size={14} className="text-gray-400 mr-2" />
                  )}
                  <span className={hasLowerCase ? 'text-green-700' : 'text-gray-600'}>
                    Contain at least one lowercase letter
                  </span>
                </li>
                <li className="flex items-center text-xs">
                  {hasNumber ? (
                    <Check size={14} className="text-green-500 mr-2" />
                  ) : (
                    <X size={14} className="text-gray-400 mr-2" />
                  )}
                  <span className={hasNumber ? 'text-green-700' : 'text-gray-600'}>
                    Contain at least one number
                  </span>
                </li>
              </ul>
            </div>
          )}

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="Confirm your password"
              />
              {confirmPassword && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  {passwordsMatch ? (
                    <Check size={20} className="text-green-500" />
                  ) : (
                    <X size={20} className="text-red-500" />
                  )}
                </div>
              )}
            </div>
            {confirmPassword && !passwordsMatch && (
              <p className="mt-1 text-xs text-red-600">Passwords don't match</p>
            )}
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the{' '}
              <a href="#" className="text-orange-600 hover:text-orange-500">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-orange-600 hover:text-orange-500">
                Privacy Policy
              </a>
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || !passwordsMatch || !hasLength || !hasUpperCase || !hasLowerCase || !hasNumber}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Sign Up'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-orange-600 hover:text-orange-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
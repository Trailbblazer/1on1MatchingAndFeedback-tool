import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const [errors, setErrors] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  

  const handleGoogleError = (error) => {
  console.error('Google Login Error:', error);
  setErrors({ google: 'Google login failed. Please try again.' });
};

  const handleGoogleSuccess = (credentialResponse) => {
    setIsLoading(true);
    setErrors({});

    
    
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log('Google Login Success:', decoded);

      if (onLogin) {
        onLogin({
          name: decoded.name,
          email: decoded.email,
          picture: decoded.picture,
        });
      }

      navigate('/');
    } catch (error) {
      console.error('Google Login Error:', error);
      setErrors({ google: 'Failed to process Google login. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      
      <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div 
          className="w-full max-w-md"
          style={{
            animation: 'fadeIn 0.6s ease-out forwards'
          }}
        >
          {/* Logo and Header */}
          <div className="mb-8 text-center">
            <div
              className="inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl"
              style={{
                animation: 'scaleIn 0.5s ease-out 0.2s forwards',
                transform: 'scale(0.8)',
                opacity: '0'
              }}
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            
            <h1 
              className="mb-2 text-3xl font-bold text-gray-900"
              style={{
                animation: 'slideUp 0.5s ease-out 0.3s forwards',
                opacity: '0',
                transform: 'translateY(10px)'
              }}
            >
              Welcome to <span className="text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text">Sampo</span>
            </h1>
            
            <p 
              className="text-lg text-gray-600"
              style={{
                animation: 'slideUp 0.5s ease-out 0.4s forwards',
                opacity: '0',
                transform: 'translateY(10px)'
              }}
            >
              Accelerate your growth with expert coaching
            </p>
          </div>

          {/* Login Card */}
          <div 
            className="p-8 bg-white border border-gray-100 shadow-xl rounded-3xl"
            style={{
              animation: 'slideUp 0.6s ease-out 0.5s forwards',
              opacity: '0',
              transform: 'translateY(20px)'
            }}
          >
            <div className="mb-8 text-center">
              <h2 className="mb-2 text-2xl font-semibold text-gray-900">Sign in to your account</h2>
              <p className="text-gray-600">Get matched with your perfect coach today</p>
            </div>

            {/* Google Login Button - Now using the actual Google component */}
            <div className="mb-6" style={{transform: 'scale(1.2)', marginLeft: '30px', transformOrigin: 'top center', display: 'inline-block'}}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap
                text="continue_with"
                shape="pill"
                size="large"
                width= '300'
                height= '100'
                
              />
              
              {isLoading && (
                <div className="mt-4 text-center">
                  <div className="inline-block w-5 h-5 border-b-2 border-gray-600 rounded-full animate-spin"></div>
                </div>
              )}
              
              {errors.google && (
                <div className="p-3 mt-3 border border-red-200 rounded-lg bg-red-50">
                  <p className="flex items-center justify-center text-sm text-center text-red-600">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.google}
                  </p>
                </div>
              )}
            </div>

            {/* Features */}
            <div 
              className="mb-6 space-y-4"
              style={{
                animation: 'slideUp 0.5s ease-out 0.7s forwards',
                opacity: '0',
                transform: 'translateY(10px)'
              }}
            >
              <div className="flex items-center text-sm text-gray-600">
                <div className="flex items-center justify-center w-5 h-5 mr-3 bg-green-100 rounded-full">
                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                Expert matching algorithm
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <div className="flex items-center justify-center w-5 h-5 mr-3 bg-blue-100 rounded-full">
                  <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                Secure and private
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <div className="flex items-center justify-center w-5 h-5 mr-3 bg-purple-100 rounded-full">
                  <svg className="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                Get started in minutes
              </div>
            </div>
    



            {/* Footer */}
            <div 
              className="text-center"
              style={{
                animation: 'slideUp 0.5s ease-out 0.8s forwards',
                opacity: '0',
                transform: 'translateY(10px)'
              }}
            >
              <p className="text-xs leading-relaxed text-gray-500">
                By signing in, you agree to our{' '}
                <a href="#" className="font-medium text-indigo-600 transition-colors hover:text-indigo-700 hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="font-medium text-indigo-600 transition-colors hover:text-indigo-700 hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
          

          {/* Bottom CTA */}
          <div 
            className="mt-8 text-center"
            style={{
              animation: 'slideUp 0.5s ease-out 0.9s forwards',
              opacity: '0',
              transform: 'translateY(10px)'
            }}
          >
            <p className="text-gray-600">
              New to Sampo?{' '}
              <a href="#" className="font-semibold text-indigo-600 transition-colors hover:text-indigo-700 hover:underline">
                Learn more about our coaching platform
              </a>
            </p>
          </div>

         <div 
  className="mt-6 text-center"
  style={{
    animation: 'slideUp 0.5s ease-out 1s forwards',
    opacity: '0',
    transform: 'translateY(10px)'
  }}
>
  <p className="text-gray-600">
    Are you an admin?{' '}
    <button
      onClick={() => navigate('/SignupPage')}
      className="font-semibold text-purple-600 transition-colors hover:text-purple-700 hover:underline"
    >
      Go to Admin Login
    </button>
  </p>
</div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
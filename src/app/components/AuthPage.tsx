import { useState } from 'react';
import { X } from 'lucide-react';

interface AuthPageProps {
  onLogin: (email: string, password: string) => { success: boolean; message?: string };
  onSignUp: (email: string, password: string) => { success: boolean; message?: string };
}

export function AuthPage({ onLogin, onSignUp }: AuthPageProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const validatePassword = (pass: string): { valid: boolean; message: string } => {
    if (pass.length < 8) {
      return { valid: false, message: 'Password must be at least 8 characters long' };
    }
    if (!/[A-Z]/.test(pass)) {
      return { valid: false, message: 'Password must contain at least one uppercase letter' };
    }
    if (!/[a-z]/.test(pass)) {
      return { valid: false, message: 'Password must contain at least one lowercase letter' };
    }
    if (!/[0-9]/.test(pass)) {
      return { valid: false, message: 'Password must contain at least one number' };
    }
    if (!/[!@#$%^&*]/.test(pass)) {
      return { valid: false, message: 'Password must contain at least one special character (!@#$%^&*)' };
    }
    return { valid: true, message: '' };
  };

  const showError = (message: string) => {
    setPopupMessage(message);
    setShowPopup(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      showError('Please fill in all fields');
      return;
    }

    if (isSignUp) {
      // Sign Up validation
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.valid) {
        showError(passwordValidation.message);
        return;
      }

      if (password !== confirmPassword) {
        showError('Passwords do not match!');
        return;
      }

      setIsLoading(true);
      setTimeout(() => {
        const result = onSignUp(email, password);
        setIsLoading(false);

        if (result.success) {
          showError('Account created successfully! Please login.');
          setIsSignUp(false);
          setEmail('');
          setPassword('');
          setConfirmPassword('');
        } else {
          showError(result.message || 'Sign up failed');
        }
      }, 500);
    } else {
      // Login
      setIsLoading(true);
      setTimeout(() => {
        const result = onLogin(email, password);
        setIsLoading(false);

        if (!result.success) {
          showError(result.message || 'Login failed');
        }
      }, 500);
    }
  };

  return (
    <div className="size-full relative overflow-hidden bg-gradient-to-br from-[#5B9EFF] via-[#4A8AFF] to-[#2E5FFF]">
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-32 h-32 rounded-full border-4 border-white/20" />
      <div className="absolute top-10 left-20 w-24 h-24 rounded-full border-4 border-white/10" />
      <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full border-4 border-white/15" />
      <div className="absolute top-1/4 right-1/4 w-20 h-20 rounded-full border-4 border-white/20" />
      <div className="absolute bottom-1/3 right-10 w-16 h-16 rounded-full border-4 border-white/10" />

      {/* Main content */}
      <div className="size-full flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-6xl flex items-center justify-between gap-12">
          {/* Login Form */}
          <div className="w-full max-w-sm bg-gradient-to-br from-[#A5C8FF] to-[#8BB5FF] rounded-3xl p-8 shadow-2xl">
            <h1 className="text-white text-center mb-6">
              {isSignUp ? 'Sign Up Now' : 'Login Now'}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Email or Username"
                disabled={isLoading}
              />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Password"
                disabled={isLoading}
              />

              {isSignUp && (
                <>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="Confirm Password"
                    disabled={isLoading}
                  />
                  <div className="text-xs text-white/90 bg-white/10 rounded-lg p-3">
                    <p className="mb-1">Password must contain:</p>
                    <ul className="list-disc list-inside space-y-0.5">
                      <li>At least 8 characters</li>
                      <li>One uppercase & one lowercase letter</li>
                      <li>One number & one special character (!@#$%^&*)</li>
                    </ul>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#1E4DB7] text-white rounded-lg hover:bg-[#1a3f99] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'PLEASE WAIT...' : isSignUp ? 'SIGN UP' : 'LOGIN'}
              </button>
            </form>

            {!isSignUp && (
              <>
                <div className="mt-6">
                  <p className="text-center text-white text-sm mb-4">Or login with</p>
                  <div className="flex gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span className="text-sm text-gray-700">Facebook</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span className="text-sm text-gray-700">Google</span>
                    </button>
                  </div>
                </div>
              </>
            )}

            <div className="mt-6 text-center">
              <p className="text-white text-sm">
                {isSignUp ? 'Already a member?' : 'Not a member?'}{' '}
                <button
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                  }}
                  className="text-[#FFD700] hover:underline"
                >
                  {isSignUp ? 'Login now' : 'Sign up now'}
                </button>
              </p>
            </div>
          </div>

          {/* Illustration */}
          <div className="hidden lg:block flex-1 flex items-center justify-center">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/051/069/030/small/cute-ai-robot-chatbot-assistant-isolated-on-transparent-background-png.png"
              alt="AI Robot"
              className="w-full max-w-md mx-auto drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-gray-900 pr-8">{popupMessage.includes('successfully') ? 'Success' : 'Error'}</h3>
              <button
                onClick={() => setShowPopup(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <p className="text-gray-700 mb-6">{popupMessage}</p>
            <button
              onClick={() => setShowPopup(false)}
              className="w-full py-2.5 bg-[#4A8AFF] text-white rounded-lg hover:bg-[#3a7aef] transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

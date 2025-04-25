import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    const success = await login(email, password);
    if (success) {
      navigate(from);
    }
  };
  
  // Demo login for testing purpose
  const handleDemoLogin = async (e) => {
    e.preventDefault();
    setEmail('user@example.com');
    setPassword('password123');
    
    const success = await login('user@example.com', 'password123');
    if (success) {
      navigate(from);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Login to Your Account</h1>
                <p className="text-gray-600 mt-1">Welcome back! Please enter your details</p>
              </div>
              
              {error && (
                <div className="mb-6 bg-red-50 text-red-700 p-3 rounded-md flex items-start">
                  <AlertCircle className="mr-2 flex-shrink-0 mt-0.5" size={18} />
                  <span>{error}</span>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
                    <a href="#" className="text-sm text-blue-600 hover:text-blue-800">Forgot password?</a>
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition font-medium"
                    disabled={loading}
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                </div>
              </form>
              
              <div className="text-center">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                    Register
                  </Link>
                </p>
              </div>

              {/* Demo Login */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-gray-500 text-center mb-4">For demonstration purposes</p>
                <button
                  onClick={handleDemoLogin}
                  className="w-full bg-gray-800 text-white py-3 rounded-md hover:bg-gray-700 transition font-medium"
                >
                  Login with Demo Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
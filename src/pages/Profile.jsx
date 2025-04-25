import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Settings, ShoppingBag, Heart, LogOut } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">My Account</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="md:w-1/4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 bg-blue-600 text-white">
              <div className="w-16 h-16 rounded-full bg-white text-blue-600 flex items-center justify-center mx-auto mb-4">
                <User size={32} />
              </div>
              <h2 className="text-lg font-bold text-center">{user.name}</h2>
              <p className="text-blue-100 text-center">{user.email}</p>
            </div>

            <div className="divide-y divide-gray-200">
              <button
                className={`w-full text-left py-3 px-6 flex items-center ${
                  activeTab === 'profile' ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-gray-700'
                }`}
                onClick={() => setActiveTab('profile')}
              >
                <User size={20} className="mr-3" />
                <span>Profile Information</span>
              </button>

              <button
                className={`w-full text-left py-3 px-6 flex items-center ${
                  activeTab === 'orders' ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-gray-700'
                }`}
                onClick={() => setActiveTab('orders')}
              >
                <ShoppingBag size={20} className="mr-3" />
                <span>My Orders</span>
              </button>

              <button
                className={`w-full text-left py-3 px-6 flex items-center ${
                  activeTab === 'wishlist' ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-gray-700'
                }`}
                onClick={() => setActiveTab('wishlist')}
              >
                <Heart size={20} className="mr-3" />
                <span>My Wishlist</span>
              </button>

              <button
                className={`w-full text-left py-3 px-6 flex items-center ${
                  activeTab === 'settings' ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-gray-700'
                }`}
                onClick={() => setActiveTab('settings')}
              >
                <Settings size={20} className="mr-3" />
                <span>Account Settings</span>
              </button>

              <button
                className="w-full text-left py-3 px-6 flex items-center text-gray-700 hover:bg-gray-50"
                onClick={handleLogout}
              >
                <LogOut size={20} className="mr-3" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="md:w-3/4">
          <div className="bg-white rounded-lg shadow-md p-6">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-bold mb-6">Profile Information</h2>
                <div className="grid gap-6 mb-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Name</label>
                    <input
                      type="text"
                      value={user.name}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={user.email}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      readOnly
                    />
                  </div>
                </div>
                <p className="text-gray-500 italic">
                  This is a demo profile. In a real application, you would be able to edit your profile information.
                </p>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h2 className="text-xl font-bold mb-6">My Orders</h2>
                <div className="bg-gray-50 p-8 rounded-md text-center">
                  <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">No Orders Yet</h3>
                  <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
                  <button
                    onClick={() => navigate('/products')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    Start Shopping
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div>
                <h2 className="text-xl font-bold mb-6">My Wishlist</h2>
                <div className="bg-gray-50 p-8 rounded-md text-center">
                  <Heart size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Your Wishlist is Empty</h3>
                  <p className="text-gray-600 mb-6">Save items that you like in your wishlist.</p>
                  <button
                    onClick={() => navigate('/products')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    Explore Products
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h2 className="text-xl font-bold mb-6">Account Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-800 mb-3">Password</h3>
                    <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition">
                      Change Password
                    </button>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-800 mb-3">Email Notifications</h3>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="form-checkbox text-blue-600 h-5 w-5"
                          checked
                          readOnly
                        />
                        <span>Order updates</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="form-checkbox text-blue-600 h-5 w-5"
                          checked
                          readOnly
                        />
                        <span>Promotions and deals</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-800 mb-3">Delete Account</h3>
                    <p className="text-gray-600 mb-2">Once you delete your account, there is no going back. Please be certain.</p>
                    <button className="bg-red-100 text-red-700 px-4 py-2 rounded-md hover:bg-red-200 transition">
                      Delete Account
                    </button>
                  </div>
                </div>
                <p className="text-gray-500 italic mt-6">
                  This is a demo settings page. In a real application, these actions would be functional.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
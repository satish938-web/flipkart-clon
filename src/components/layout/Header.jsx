import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, User, Heart, Bell, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
      setSearchQuery('');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-blue-600'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className={`font-bold text-2xl ${isScrolled ? 'text-blue-600' : 'text-white'}`}>Flipkart</span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <form 
            onSubmit={handleSearch}
            className="hidden md:flex items-center flex-grow mx-8 max-w-3xl relative"
          >
            <input
              type="text"
              placeholder="Search for products, brands and more"
              className="w-full px-4 py-2 rounded-l-md focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit"
              className="bg-yellow-500 text-white p-2 rounded-r-md hover:bg-yellow-600 transition"
            >
              <Search size={20} />
            </button>
          </form>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <Link to="/profile" className={`flex items-center space-x-1 ${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-yellow-400 transition`}>
                  <User size={20} />
                  <span>{user.name}</span>
                </Link>
                <button 
                  onClick={logout}
                  className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-yellow-400 transition`}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition"
              >
                Login
              </Link>
            )}
            <Link to="/orders" className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-yellow-400 transition`}>
              Orders
            </Link>
            <Link to="/cart" className="relative flex items-center">
              <ShoppingCart className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-yellow-400 transition`} size={24} />
              {cart.items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.items.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className={`${isScrolled ? 'text-gray-700' : 'text-white'}`} size={24} />
            ) : (
              <Menu className={`${isScrolled ? 'text-gray-700' : 'text-white'}`} size={24} />
            )}
          </button>
        </div>

        {/* Mobile Search - Only visible on mobile */}
        <div className="md:hidden pb-4">
          <form 
            onSubmit={handleSearch}
            className="flex items-center"
          >
            <input
              type="text"
              placeholder="Search products"
              className="w-full px-4 py-2 rounded-l-md focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit"
              className="bg-yellow-500 text-white p-2 rounded-r-md hover:bg-yellow-600 transition"
            >
              <Search size={20} />
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              {user ? (
                <>
                  <Link to="/profile" className="flex items-center space-x-2 text-gray-700" onClick={toggleMenu}>
                    <User size={20} />
                    <span>{user.name}</span>
                  </Link>
                  <Link to="/orders" className="flex items-center space-x-2 text-gray-700" onClick={toggleMenu}>
                    <span>My Orders</span>
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      toggleMenu();
                    }}
                    className="flex items-center space-x-2 text-gray-700"
                  >
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="bg-blue-600 text-white px-4 py-2 rounded text-center"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
              )}
              <Link to="/cart" className="flex items-center justify-between text-gray-700" onClick={toggleMenu}>
                <span>Cart</span>
                <div className="flex items-center">
                  <ShoppingCart size={20} />
                  {cart.items.length > 0 && (
                    <span className="ml-2 bg-yellow-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cart.items.length}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Categories Navigation */}
      <div className={`${isScrolled ? 'bg-white border-b' : 'bg-blue-500'} py-2 hidden md:block`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-yellow-400 transition text-sm font-medium cursor-pointer`}>Electronics</div>
            <div className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-yellow-400 transition text-sm font-medium cursor-pointer`}>TVs & Appliances</div>
            <div className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-yellow-400 transition text-sm font-medium cursor-pointer`}>Men</div>
            <div className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-yellow-400 transition text-sm font-medium cursor-pointer`}>Women</div>
            <div className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-yellow-400 transition text-sm font-medium cursor-pointer`}>Baby & Kids</div>
            <div className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-yellow-400 transition text-sm font-medium cursor-pointer`}>Home & Furniture</div>
            <div className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-yellow-400 transition text-sm font-medium cursor-pointer`}>Sports & Books</div>
            <div className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-yellow-400 transition text-sm font-medium cursor-pointer`}>Offer Zone</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
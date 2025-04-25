import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';

// Mock data for products (would normally come from API)
const allProducts = [
  {
    id: 1,
    name: 'Apple iPhone 13 Pro (128GB) - Graphite',
    price: 999,
    originalPrice: 1099,
    discount: 9,
    image: 'https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.7,
    ratingCount: 13284,
    category: 'electronics',
    brand: 'Apple',
  },
  {
    id: 2,
    name: 'Samsung Galaxy S21 Ultra 5G (Phantom Black, 12GB RAM, 256GB Storage)',
    price: 899,
    originalPrice: 1199,
    discount: 25,
    image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.5,
    ratingCount: 8561,
    category: 'electronics',
    brand: 'Samsung',
  },
  {
    id: 3,
    name: 'Sony WH-1000XM4 Wireless Noise Cancelling Headphones',
    price: 299,
    originalPrice: 349,
    discount: 14,
    image: 'https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.8,
    ratingCount: 7825,
    category: 'electronics',
    brand: 'Sony',
  },
  {
    id: 4,
    name: 'Apple MacBook Pro 14-inch with M1 Pro chip',
    price: 1799,
    originalPrice: 1999,
    discount: 10,
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.9,
    ratingCount: 5236,
    category: 'electronics',
    brand: 'Apple',
  },
  {
    id: 5,
    name: 'Dell XPS 13 9310 Thin & Light Laptop',
    price: 1299,
    originalPrice: 1499,
    discount: 13,
    image: 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.6,
    ratingCount: 3845,
    category: 'electronics',
    brand: 'Dell',
  },
  {
    id: 6,
    name: 'LG OLED C1 Series 55" 4K Smart TV',
    price: 1299,
    originalPrice: 1799,
    discount: 28,
    image: 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.7,
    ratingCount: 4329,
    category: 'electronics',
    brand: 'LG',
  },
  {
    id: 7,
    name: 'Nike Air Zoom Pegasus 38 Running Shoes',
    price: 120,
    originalPrice: 150,
    discount: 20,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.5,
    ratingCount: 7621,
    category: 'fashion',
    brand: 'Nike',
  },
  {
    id: 8,
    name: 'Instant Pot Duo Plus 9-in-1 Electric Pressure Cooker',
    price: 119,
    originalPrice: 149,
    discount: 20,
    image: 'https://images.pexels.com/photos/4046719/pexels-photo-4046719.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.7,
    ratingCount: 12538,
    category: 'home',
    brand: 'Instant Pot',
  },
  {
    id: 9,
    name: 'boAt Rockerz 450 Bluetooth On-Ear Headphones',
    price: 49,
    originalPrice: 99,
    discount: 51,
    image: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.3,
    ratingCount: 8935,
    category: 'electronics',
    brand: 'boAt',
  },
  {
    id: 10,
    name: 'Xiaomi Mi Band 6 Fitness Tracker',
    price: 39,
    originalPrice: 59,
    discount: 34,
    image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.5,
    ratingCount: 6724,
    category: 'electronics',
    brand: 'Xiaomi',
  },
  {
    id: 11,
    name: 'JBL Flip 5 Waterproof Portable Bluetooth Speaker',
    price: 89,
    originalPrice: 119,
    discount: 25,
    image: 'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.6,
    ratingCount: 5284,
    category: 'electronics',
    brand: 'JBL',
  },
  {
    id: 12,
    name: 'Adidas Ultraboost 21 Running Shoes',
    price: 180,
    originalPrice: 200,
    discount: 10,
    image: 'https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.7,
    ratingCount: 6382,
    category: 'fashion',
    brand: 'Adidas',
  }
];

const ProductList = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');
  const searchParam = queryParams.get('search');

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: categoryParam || '',
    minPrice: '',
    maxPrice: '',
    brands: [],
    rating: 0,
    sort: 'popularity',
  });
  const [brands, setBrands] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    brand: true,
    rating: true,
  });

  // Fetch products (simulated)
  useEffect(() => {
    // This would be an API call in a real application
    // For now, we're using our mock data
    setProducts(allProducts);

    // Extract unique brands
    const uniqueBrands = [...new Set(allProducts.map(product => product.brand))];
    setBrands(uniqueBrands);
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...products];

    // Apply search filter
    if (searchParam) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchParam.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category) {
      result = result.filter(product => product.category === filters.category);
    }

    // Apply price range filter
    if (filters.minPrice) {
      result = result.filter(product => product.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter(product => product.price <= Number(filters.maxPrice));
    }

    // Apply brand filter
    if (filters.brands.length > 0) {
      result = result.filter(product => filters.brands.includes(product.brand));
    }

    // Apply rating filter
    if (filters.rating > 0) {
      result = result.filter(product => product.rating >= filters.rating);
    }

    // Apply sorting
    switch (filters.sort) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'discount':
        result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default: // popularity - we'll use rating count as a proxy for popularity
        result.sort((a, b) => b.ratingCount - a.ratingCount);
    }

    setFilteredProducts(result);
  }, [products, filters, searchParam]);

  const handleBrandChange = (brand) => {
    setFilters(prev => {
      const newBrands = prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand];
      
      return {
        ...prev,
        brands: newBrands
      };
    });
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      brands: [],
      rating: 0,
      sort: 'popularity'
    });
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <div className="text-sm breadcrumbs text-gray-600">
          <ul className="flex">
            <li><a href="/">Home</a></li>
            <li className="mx-2">/</li>
            {filters.category && (
              <>
                <li className="capitalize">{filters.category}</li>
                <li className="mx-2">/</li>
              </>
            )}
            <li>Products</li>
          </ul>
        </div>
      </div>

      {/* Title & Sorting - Mobile */}
      <div className="flex justify-between items-center mb-4 md:hidden">
        <h1 className="text-xl font-bold">
          {searchParam ? `Results for "${searchParam}"` : (filters.category ? `${filters.category.charAt(0).toUpperCase() + filters.category.slice(1)}` : 'All Products')}
        </h1>
        <button 
          onClick={() => setShowMobileFilters(true)} 
          className="flex items-center bg-blue-600 text-white px-3 py-2 rounded-md"
        >
          <Filter size={16} className="mr-1" />
          Filter
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters - Desktop */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Filters</h2>
              <button 
                onClick={clearFilters}
                className="text-blue-600 text-sm"
              >
                Clear All
              </button>
            </div>

            {/* Category Filter */}
            <div className="mb-4">
              <div 
                className="flex justify-between items-center cursor-pointer mb-2" 
                onClick={() => toggleSection('category')}
              >
                <h3 className="font-medium">Category</h3>
                {expandedSections.category ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
              
              {expandedSections.category && (
                <div className="pl-2 space-y-2">
                  <label className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      checked={filters.category === ''} 
                      onChange={() => setFilters({...filters, category: ''})}
                      className="form-radio text-blue-600"
                    />
                    <span>All Categories</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      checked={filters.category === 'electronics'} 
                      onChange={() => setFilters({...filters, category: 'electronics'})}
                      className="form-radio text-blue-600"
                    />
                    <span>Electronics</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      checked={filters.category === 'fashion'} 
                      onChange={() => setFilters({...filters, category: 'fashion'})}
                      className="form-radio text-blue-600"
                    />
                    <span>Fashion</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      checked={filters.category === 'home'} 
                      onChange={() => setFilters({...filters, category: 'home'})}
                      className="form-radio text-blue-600"
                    />
                    <span>Home</span>
                  </label>
                </div>
              )}
            </div>

            {/* Price Range Filter */}
            <div className="mb-4">
              <div 
                className="flex justify-between items-center cursor-pointer mb-2" 
                onClick={() => toggleSection('price')}
              >
                <h3 className="font-medium">Price Range</h3>
                {expandedSections.price ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
              
              {expandedSections.price && (
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-1/2 p-2 border rounded"
                      value={filters.minPrice}
                      onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-1/2 p-2 border rounded"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                    />
                  </div>
                  <button 
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-3 rounded"
                    onClick={() => {
                      if (filters.minPrice || filters.maxPrice) {
                        setFilters({...filters, minPrice: '', maxPrice: ''});
                      }
                    }}
                  >
                    Clear Price
                  </button>
                </div>
              )}
            </div>

            {/* Brand Filter */}
            <div className="mb-4">
              <div 
                className="flex justify-between items-center cursor-pointer mb-2" 
                onClick={() => toggleSection('brand')}
              >
                <h3 className="font-medium">Brand</h3>
                {expandedSections.brand ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
              
              {expandedSections.brand && (
                <div className="pl-2 space-y-2 max-h-40 overflow-y-auto">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        checked={filters.brands.includes(brand)} 
                        onChange={() => handleBrandChange(brand)}
                        className="form-checkbox text-blue-600"
                      />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Rating Filter */}
            <div className="mb-4">
              <div 
                className="flex justify-between items-center cursor-pointer mb-2" 
                onClick={() => toggleSection('rating')}
              >
                <h3 className="font-medium">Rating</h3>
                {expandedSections.rating ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
              
              {expandedSections.rating && (
                <div className="pl-2 space-y-2">
                  <label className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      checked={filters.rating === 4} 
                      onChange={() => setFilters({...filters, rating: 4})}
                      className="form-radio text-blue-600"
                    />
                    <span className="flex">4★ & above</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      checked={filters.rating === 3} 
                      onChange={() => setFilters({...filters, rating: 3})}
                      className="form-radio text-blue-600"
                    />
                    <span className="flex">3★ & above</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      checked={filters.rating === 0} 
                      onChange={() => setFilters({...filters, rating: 0})}
                      className="form-radio text-blue-600"
                    />
                    <span className="flex">All Ratings</span>
                  </label>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Products Section */}
        <div className="flex-grow">
          {/* Title & Sorting - Desktop */}
          <div className="hidden md:flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              {searchParam ? `Results for "${searchParam}"` : (filters.category ? `${filters.category.charAt(0).toUpperCase() + filters.category.slice(1)}` : 'All Products')}
            </h1>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Sort By:</span>
              <select 
                className="p-2 border rounded bg-white"
                value={filters.sort}
                onChange={(e) => setFilters({...filters, sort: e.target.value})}
              >
                <option value="popularity">Popularity</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="discount">Discount</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {/* Mobile Sorting Dropdown */}
          <div className="flex justify-between items-center mb-4 md:hidden">
            <span className="text-gray-600 text-sm">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </span>
            <select 
              className="p-2 border rounded bg-white text-sm"
              value={filters.sort}
              onChange={(e) => setFilters({...filters, sort: e.target.value})}
            >
              <option value="popularity">Sort by: Popularity</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="discount">Discount</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms</p>
              <button 
                onClick={clearFilters}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowMobileFilters(false)}></div>

            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
                  <div className="flex items-center justify-between px-4 py-3 border-b">
                    <h2 className="text-lg font-bold">Filters</h2>
                    <button 
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => setShowMobileFilters(false)}
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4">
                    {/* Mobile Filters Content - same as desktop but styled for mobile */}
                    {/* Category Filter */}
                    <div className="mb-6">
                      <div 
                        className="flex justify-between items-center cursor-pointer mb-2" 
                        onClick={() => toggleSection('category')}
                      >
                        <h3 className="font-medium">Category</h3>
                        {expandedSections.category ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                      
                      {expandedSections.category && (
                        <div className="pl-2 space-y-3">
                          <label className="flex items-center space-x-2">
                            <input 
                              type="radio" 
                              checked={filters.category === ''} 
                              onChange={() => setFilters({...filters, category: ''})}
                              className="form-radio text-blue-600"
                            />
                            <span>All Categories</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input 
                              type="radio" 
                              checked={filters.category === 'electronics'} 
                              onChange={() => setFilters({...filters, category: 'electronics'})}
                              className="form-radio text-blue-600"
                            />
                            <span>Electronics</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input 
                              type="radio" 
                              checked={filters.category === 'fashion'} 
                              onChange={() => setFilters({...filters, category: 'fashion'})}
                              className="form-radio text-blue-600"
                            />
                            <span>Fashion</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input 
                              type="radio" 
                              checked={filters.category === 'home'} 
                              onChange={() => setFilters({...filters, category: 'home'})}
                              className="form-radio text-blue-600"
                            />
                            <span>Home</span>
                          </label>
                        </div>
                      )}
                    </div>

                    {/* Price Range Filter */}
                    <div className="mb-6">
                      <div 
                        className="flex justify-between items-center cursor-pointer mb-2" 
                        onClick={() => toggleSection('price')}
                      >
                        <h3 className="font-medium">Price Range</h3>
                        {expandedSections.price ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                      
                      {expandedSections.price && (
                        <div className="space-y-3">
                          <div className="flex space-x-2">
                            <input
                              type="number"
                              placeholder="Min"
                              className="w-1/2 p-2 border rounded"
                              value={filters.minPrice}
                              onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                            />
                            <input
                              type="number"
                              placeholder="Max"
                              className="w-1/2 p-2 border rounded"
                              value={filters.maxPrice}
                              onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                            />
                          </div>
                          <button 
                            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-3 rounded"
                            onClick={() => {
                              if (filters.minPrice || filters.maxPrice) {
                                setFilters({...filters, minPrice: '', maxPrice: ''});
                              }
                            }}
                          >
                            Clear Price
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Brand Filter */}
                    <div className="mb-6">
                      <div 
                        className="flex justify-between items-center cursor-pointer mb-2" 
                        onClick={() => toggleSection('brand')}
                      >
                        <h3 className="font-medium">Brand</h3>
                        {expandedSections.brand ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                      
                      {expandedSections.brand && (
                        <div className="pl-2 space-y-3 max-h-40 overflow-y-auto">
                          {brands.map((brand) => (
                            <label key={brand} className="flex items-center space-x-2">
                              <input 
                                type="checkbox" 
                                checked={filters.brands.includes(brand)} 
                                onChange={() => handleBrandChange(brand)}
                                className="form-checkbox text-blue-600"
                              />
                              <span>{brand}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Rating Filter */}
                    <div className="mb-6">
                      <div 
                        className="flex justify-between items-center cursor-pointer mb-2" 
                        onClick={() => toggleSection('rating')}
                      >
                        <h3 className="font-medium">Rating</h3>
                        {expandedSections.rating ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                      
                      {expandedSections.rating && (
                        <div className="pl-2 space-y-3">
                          <label className="flex items-center space-x-2">
                            <input 
                              type="radio" 
                              checked={filters.rating === 4} 
                              onChange={() => setFilters({...filters, rating: 4})}
                              className="form-radio text-blue-600"
                            />
                            <span className="flex">4★ & above</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input 
                              type="radio" 
                              checked={filters.rating === 3} 
                              onChange={() => setFilters({...filters, rating: 3})}
                              className="form-radio text-blue-600"
                            />
                            <span className="flex">3★ & above</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input 
                              type="radio" 
                              checked={filters.rating === 0} 
                              onChange={() => setFilters({...filters, rating: 0})}
                              className="form-radio text-blue-600"
                            />
                            <span className="flex">All Ratings</span>
                          </label>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 p-4 flex space-x-4">
                    <button
                      className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-md font-medium"
                      onClick={clearFilters}
                    >
                      Clear All
                    </button>
                    <button
                      className="flex-1 bg-blue-600 text-white py-3 rounded-md font-medium"
                      onClick={() => setShowMobileFilters(false)}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
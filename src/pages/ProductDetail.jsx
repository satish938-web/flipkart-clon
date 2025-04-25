import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Share2, Shield, Truck, RotateCcw, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

// Mock data for a single product (would normally come from API)
const productData = {
  id: 1,
  name: 'Apple iPhone 13 Pro (128GB) - Graphite',
  description: 'The iPhone 13 Pro features a 6.1-inch Super Retina XDR display with ProMotion technology for a faster, more responsive feel. It has a pro camera system with new 12MP Telephoto, Wide, and Ultra Wide cameras that capture stunning photos and video, powered by the A15 Bionic for lightning-fast performance.',
  price: 999,
  originalPrice: 1099,
  discount: 9,
  images: [
    'https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1042143/pexels-photo-1042143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  ],
  rating: 4.7,
  ratingCount: 13284,
  inStock: true,
  category: 'electronics',
  brand: 'Apple',
  specifications: [
    { name: 'Display', value: '6.1" Super Retina XDR display with ProMotion' },
    { name: 'Processor', value: 'A15 Bionic chip' },
    { name: 'Storage', value: '128GB' },
    { name: 'Camera', value: 'Pro 12MP camera system: Telephoto, Wide, and Ultra Wide' },
    { name: 'Battery', value: 'Up to 22 hours video playback' },
    { name: 'Operating System', value: 'iOS 15' },
    { name: 'Water Resistance', value: 'IP68 (maximum depth of 6 meters up to 30 minutes)' },
    { name: 'Dimensions', value: '146.7 x 71.5 x 7.65 mm' },
    { name: 'Weight', value: '204 grams' }
  ],
  reviews: [
    {
      id: 1,
      user: 'John D.',
      rating: 5,
      date: '2023-05-15',
      title: 'Best iPhone yet!',
      comment: 'The camera quality is outstanding and the battery life is much improved. ProMotion display is buttery smooth.',
      helpful: 128
    },
    {
      id: 2,
      user: 'Sarah M.',
      rating: 4,
      date: '2023-04-20',
      title: 'Great phone but expensive',
      comment: 'Love everything about this phone but it is quite expensive. The camera is exceptional and the display is gorgeous.',
      helpful: 75
    },
    {
      id: 3,
      user: 'Michael T.',
      rating: 5,
      date: '2023-03-10',
      title: 'Worth every penny',
      comment: 'Upgraded from an iPhone X and the difference is night and day. Incredible speed, amazing cameras, and the battery lasts all day easily.',
      helpful: 92
    }
  ],
  similarProducts: [
    {
      id: 2,
      name: 'Samsung Galaxy S21 Ultra',
      price: 899,
      originalPrice: 1199,
      discount: 25,
      image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      rating: 4.5
    },
    {
      id: 4,
      name: 'Apple MacBook Pro 14-inch',
      price: 1799,
      originalPrice: 1999,
      discount: 10,
      image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      rating: 4.9
    },
    {
      id: 10,
      name: 'Xiaomi Mi Band 6',
      price: 39,
      originalPrice: 59,
      discount: 34,
      image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      rating: 4.5
    },
    {
      id: 9,
      name: 'boAt Rockerz 450',
      price: 49,
      originalPrice: 99,
      discount: 51,
      image: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      rating: 4.3
    }
  ]
};

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const { addToCart } = useCart();

  useEffect(() => {
    // This would be an API call in a real application
    // For now, we're using our mock data
    setProduct(productData);
    setLoading(false);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/products" 
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition inline-block"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <div className="text-sm breadcrumbs text-gray-600">
          <ul className="flex">
            <li><a href="/">Home</a></li>
            <li className="mx-2">/</li>
            <li><a href={`/products?category=${product.category}`} className="capitalize">{product.category}</a></li>
            <li className="mx-2">/</li>
            <li>{product.name}</li>
          </ul>
        </div>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <div className="aspect-square overflow-hidden rounded-md">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div 
                key={index}
                className={`cursor-pointer border-2 rounded p-1 ${selectedImage === index ? 'border-blue-600' : 'border-gray-200'}`}
                onClick={() => setSelectedImage(index)}
              >
                <img 
                  src={image} 
                  alt={`${product.name} - image ${index + 1}`}
                  className="w-full h-auto aspect-square object-cover"
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <button 
              className="flex items-center justify-center space-x-2 py-3 rounded border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
            >
              <Heart size={20} />
              <span>Add to Wishlist</span>
            </button>
            <button 
              className="flex items-center justify-center space-x-2 py-3 rounded border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
            >
              <Share2 size={20} />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="bg-green-600 text-white px-2 py-1 rounded flex items-center">
              <span className="font-bold">{product.rating}</span>
              <Star size={16} className="ml-1 fill-current" />
            </div>
            <span className="text-gray-500 ml-2">{product.ratingCount.toLocaleString()} ratings</span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-center">
              <span className="text-3xl font-bold text-gray-800">₹{product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="ml-3 text-gray-500 text-lg line-through">₹{product.originalPrice}</span>
                  <span className="ml-3 text-green-600 font-medium">{product.discount}% off</span>
                </>
              )}
            </div>
          </div>

          {/* Stock Status */}
          <div className="mb-6">
            {product.inStock ? (
              <span className="text-green-600 font-medium">In Stock</span>
            ) : (
              <span className="text-red-600 font-medium">Out of Stock</span>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <span className="text-gray-700 mb-2 block">Quantity:</span>
            <div className="flex items-center">
              <button 
                onClick={decrementQuantity}
                className="p-2 border rounded-l border-gray-300 bg-gray-100 hover:bg-gray-200 transition"
                disabled={quantity <= 1}
              >
                <Minus size={16} className={quantity <= 1 ? 'text-gray-400' : 'text-gray-700'} />
              </button>
              <input 
                type="number" 
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 p-2 text-center border-t border-b border-gray-300"
              />
              <button 
                onClick={incrementQuantity}
                className="p-2 border rounded-r border-gray-300 bg-gray-100 hover:bg-gray-200 transition"
              >
                <Plus size={16} className="text-gray-700" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button 
              onClick={handleAddToCart}
              className="flex items-center justify-center space-x-2 py-3 px-4 rounded bg-yellow-500 hover:bg-yellow-600 text-white transition-colors text-lg font-medium"
            >
              <ShoppingCart size={20} />
              <span>Add to Cart</span>
            </button>
            <button 
              className="flex items-center justify-center space-x-2 py-3 px-4 rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors text-lg font-medium"
            >
              Buy Now
            </button>
          </div>

          {/* Delivery & Service Info */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="text-gray-700 mb-2">Delivery to: <span className="font-medium">Enter Pincode</span></div>
            <div className="flex flex-col space-y-3 mt-4">
              <div className="flex items-start">
                <Truck className="text-blue-600 mr-2 flex-shrink-0 mt-1" size={18} />
                <span>Free delivery for orders above ₹499</span>
              </div>
              <div className="flex items-start">
                <RotateCcw className="text-blue-600 mr-2 flex-shrink-0 mt-1" size={18} />
                <span>10 days return policy</span>
              </div>
              <div className="flex items-start">
                <Shield className="text-blue-600 mr-2 flex-shrink-0 mt-1" size={18} />
                <span>1 year warranty</span>
              </div>
            </div>
          </div>

          {/* Seller Info */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-gray-500">Sold by</div>
                <div className="font-medium">RetailNet</div>
              </div>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded">
                4.8 ★
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            <button 
              className={`py-3 px-6 font-medium ${activeTab === 'description' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={`py-3 px-6 font-medium ${activeTab === 'specifications' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('specifications')}
            >
              Specifications
            </button>
            <button 
              className={`py-3 px-6 font-medium ${activeTab === 'reviews' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </div>
        </div>

        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          {activeTab === 'description' && (
            <div>
              <h3 className="text-lg font-bold mb-4">Product Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div>
              <h3 className="text-lg font-bold mb-4">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.specifications.map((spec, index) => (
                  <div key={index} className="py-3 border-b border-gray-100">
                    <span className="text-gray-500">{spec.name}:</span>
                    <span className="ml-2 font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">Customer Reviews</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                  Write a Review
                </button>
              </div>

              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="text-4xl font-bold text-gray-800 mr-4">{product.rating}</div>
                  <div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={20} 
                          className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
                        />
                      ))}
                    </div>
                    <div className="text-gray-500 text-sm">{product.ratingCount.toLocaleString()} reviews</div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {product.reviews.map(review => (
                  <div key={review.id} className="border-b border-gray-100 pb-6">
                    <div className="flex items-center mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
                          />
                        ))}
                      </div>
                      <span className="ml-2 font-medium">{review.title}</span>
                    </div>
                    <div className="text-sm text-gray-500 mb-2">
                      By {review.user} on {review.date}
                    </div>
                    <p className="text-gray-700 mb-2">{review.comment}</p>
                    <div className="flex items-center text-sm">
                      <button className="text-gray-500 hover:text-blue-600">
                        {review.helpful} people found this helpful
                      </button>
                      <span className="mx-2">•</span>
                      <button className="text-gray-500 hover:text-blue-600">
                        Report
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Similar Products */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {product.similarProducts.map(product => (
            <Link 
              key={product.id} 
              to={`/product/${product.id}`}
              className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-800 mb-1 line-clamp-2">{product.name}</h3>
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    <span>{product.rating}</span>
                    <Star size={16} className="ml-1 text-yellow-400 fill-current" />
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="font-bold text-gray-800">₹{product.price}</span>
                  {product.originalPrice && (
                    <>
                      <span className="ml-2 text-gray-500 text-sm line-through">₹{product.originalPrice}</span>
                      <span className="ml-2 text-green-600 text-sm">{product.discount}% off</span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
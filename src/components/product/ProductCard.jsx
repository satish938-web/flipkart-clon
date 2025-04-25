import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  const { id, name, price, originalPrice, image, rating, ratingCount, discount } = product;
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };
  
  return (
    <Link to={`/product/${id}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
          {discount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {discount}% OFF
            </div>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Add to wishlist functionality would go here
            }}
            className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Heart size={18} className="text-gray-500 hover:text-red-500 transition-colors" />
          </button>
        </div>
        
        {/* Product Info */}
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="font-medium text-gray-800 mb-1 line-clamp-2">{name}</h3>
          
          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="bg-green-600 text-white text-xs px-1.5 py-0.5 rounded flex items-center">
              {rating} ★
            </div>
            <span className="text-gray-500 text-xs ml-2">({ratingCount})</span>
          </div>
          
          {/* Price */}
          <div className="mt-auto">
            <div className="flex items-center">
              <span className="font-bold text-gray-800">₹{price}</span>
              {originalPrice && (
                <span className="ml-2 text-gray-500 text-sm line-through">₹{originalPrice}</span>
              )}
            </div>
            
            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center transition-colors"
            >
              <ShoppingCart size={18} className="mr-1" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
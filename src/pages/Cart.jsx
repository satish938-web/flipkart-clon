import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [discount, setDiscount] = useState(0);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handlePromoCodeApply = () => {
    if (promoCode.toUpperCase() === 'DISCOUNT20') {
      const discountAmount = Math.round(cart.total * 0.2);
      setDiscount(discountAmount);
      setPromoError('');
    } else {
      setDiscount(0);
      setPromoError('Invalid promo code');
    }
  };

  const handleCheckout = () => {
    if (user) {
      navigate('/checkout');
    } else {
      navigate('/login', { state: { from: '/checkout' } });
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <svg 
            className="w-24 h-24 mx-auto text-gray-400 mb-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link 
            to="/products" 
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // Calculate totals
  const subtotal = cart.total;
  const deliveryFee = subtotal > 499 ? 0 : 40;
  const tax = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + deliveryFee + tax - discount;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart ({cart.items.length} {cart.items.length === 1 ? 'item' : 'items'})</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-8/12">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Cart Item Headers - Desktop */}
            <div className="hidden md:grid grid-cols-12 bg-gray-50 px-6 py-3 text-gray-500 font-medium">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Total</div>
            </div>
            
            {/* Cart Items */}
            <div className="divide-y divide-gray-200">
              {cart.items.map((item) => (
                <div key={item.id} className="p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Product Info */}
                  <div className="md:col-span-6 flex items-center">
                    <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-gray-800 font-medium line-clamp-2">{item.name}</h3>
                      
                      {/* Only show on mobile */}
                      <div className="flex justify-between items-center mt-2 md:hidden">
                        <span className="text-gray-600">₹{item.price}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Price - Desktop */}
                  <div className="hidden md:block md:col-span-2 text-center">
                    <span className="text-gray-800">₹{item.price}</span>
                  </div>
                  
                  {/* Quantity */}
                  <div className="md:col-span-2 md:text-center flex justify-between items-center">
                    <span className="md:hidden">Quantity:</span>
                    <div className="flex items-center">
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="p-1 border rounded-l border-gray-300 bg-gray-100 hover:bg-gray-200 transition"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} className={item.quantity <= 1 ? 'text-gray-400' : 'text-gray-700'} />
                      </button>
                      <input 
                        type="number" 
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                        className="w-12 p-1 text-center border-t border-b border-gray-300"
                      />
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="p-1 border rounded-r border-gray-300 bg-gray-100 hover:bg-gray-200 transition"
                      >
                        <Plus size={16} className="text-gray-700" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Total */}
                  <div className="md:col-span-2 flex justify-between items-center md:justify-center">
                    <span className="md:hidden">Total:</span>
                    <span className="font-medium text-gray-800">₹{item.price * item.quantity}</span>
                  </div>
                  
                  {/* Remove Button */}
                  <div className="flex justify-end items-center col-span-1 md:hidden">
                    <button 
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-gray-500 hover:text-red-500 transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  
                  {/* Remove Button - Desktop */}
                  <div className="hidden md:flex justify-end">
                    <button 
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-gray-500 hover:text-red-500 transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Cart Actions */}
            <div className="px-6 py-4 bg-gray-50 flex flex-wrap justify-between items-center">
              <Link 
                to="/products" 
                className="text-blue-600 hover:text-blue-800 transition flex items-center"
              >
                <ChevronRight size={16} className="transform rotate-180 mr-1" />
                Continue Shopping
              </Link>
              <button 
                onClick={clearCart}
                className="mt-2 sm:mt-0 text-red-600 hover:text-red-800 transition"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-4/12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-800">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className={deliveryFee === 0 ? 'text-green-600' : 'text-gray-800'}>
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (18%)</span>
                <span className="text-gray-800">₹{tax}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              
              <div className="border-t pt-3 mt-3 border-gray-200">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{grandTotal}</span>
                </div>
                <div className="text-gray-500 text-sm mt-1">
                  Including ₹{tax} in taxes
                </div>
              </div>
            </div>
            
            {/* Promo Code */}
            <div className="mb-6">
              <label htmlFor="promo" className="block text-gray-700 mb-2">Promo Code</label>
              <div className="flex">
                <input
                  type="text"
                  id="promo"
                  className="flex-1 border rounded-l-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button
                  onClick={handlePromoCodeApply}
                  className="bg-gray-800 text-white px-4 py-2 rounded-r-md hover:bg-gray-700 transition"
                >
                  Apply
                </button>
              </div>
              {promoError && <p className="text-red-500 text-sm mt-1">{promoError}</p>}
              <p className="text-gray-500 text-sm mt-2">Try code: DISCOUNT20 for 20% off</p>
            </div>
            
            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition font-medium"
            >
              Proceed to Checkout
            </button>
            
            {/* Payment Icons */}
            <div className="mt-6">
              <p className="text-gray-600 text-sm mb-2">We accept:</p>
              <div className="flex space-x-2">
                <div className="w-10 h-6 bg-gray-200 rounded"></div>
                <div className="w-10 h-6 bg-gray-200 rounded"></div>
                <div className="w-10 h-6 bg-gray-200 rounded"></div>
                <div className="w-10 h-6 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
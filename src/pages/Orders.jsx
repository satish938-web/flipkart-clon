import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

const Orders = () => {
  // In a real app, we would fetch the user's orders from the API
  const orders = [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      
      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">No Orders Yet</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't placed any orders yet.</p>
          <Link 
            to="/products" 
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition inline-block"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Order list would be here if there were orders */}
        </div>
      )}
      
      {/* This is a demo page showing a placeholder for the order history */}
      <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-bold mb-4">Demo Orders</h2>
        <p className="text-gray-600 mb-4">
          In a real application, this page would display your order history with:
        </p>
        <ul className="list-disc pl-5 text-gray-600 mb-4 space-y-2">
          <li>Order numbers and dates</li>
          <li>Order status (processing, shipped, delivered)</li>
          <li>Items purchased with images and details</li>
          <li>Shipping information</li>
          <li>Payment method used</li>
          <li>Options to track, cancel, or return orders</li>
        </ul>
        <p className="text-gray-600">
          Start shopping and place an order to see it appear here!
        </p>
      </div>
    </div>
  );
};

export default Orders;
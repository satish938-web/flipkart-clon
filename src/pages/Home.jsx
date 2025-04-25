import Banner from '../components/home/Banner';
import CategorySection from '../components/home/CategorySection';
import ProductCard from '../components/product/ProductCard';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Featured products (would normally come from API)
const featuredProducts = [
  {
    id: 1,
    name: 'Apple iPhone 13 Pro (128GB) - Graphite',
    price: 999,
    originalPrice: 1099,
    discount: 9,
    image: 'https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.7,
    ratingCount: 13284,
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
  }
];

// Deal products (would normally come from API)
const dealProducts = [
  {
    id: 9,
    name: 'boAt Rockerz 450 Bluetooth On-Ear Headphones',
    price: 49,
    originalPrice: 99,
    discount: 51,
    image: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.3,
    ratingCount: 8935,
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
  },
  {
    id: 12,
    name: 'Fire TV Stick 4K streaming device',
    price: 34,
    originalPrice: 49,
    discount: 31,
    image: 'https://images.pexels.com/photos/105259/pexels-photo-105259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.7,
    ratingCount: 14752,
  }
];

const Home = () => {
  return (
    <div>
      <Banner />
      <CategorySection />
      
      {/* Featured Products Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Deals of the Day */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Deals of the Day</h2>
            <span className="text-blue-600 font-medium">View All</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {dealProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Banner for Promotions */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg overflow-hidden shadow-lg">
            <div className="flex flex-col md:flex-row items-center">
              <div className="p-8 md:w-1/2">
                <h2 className="text-3xl font-bold text-white mb-4">Diwali Sale is LIVE!</h2>
                <p className="text-blue-100 mb-6">Get up to 80% off on electronics, fashion, home appliances and more!</p>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-md transition">
                  Shop Now
                </button>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.pexels.com/photos/5709656/pexels-photo-5709656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Diwali Sale" 
                  className="w-full h-48 md:h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
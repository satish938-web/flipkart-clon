import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h2 className="text-xl font-bold mb-4">ABOUT</h2>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition">Contact Us</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-300 hover:text-white transition">Careers</Link></li>
              <li><Link to="/press" className="text-gray-300 hover:text-white transition">Press</Link></li>
              <li><Link to="/corporate-information" className="text-gray-300 hover:text-white transition">Corporate Information</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h2 className="text-xl font-bold mb-4">HELP</h2>
            <ul className="space-y-2">
              <li><Link to="/payments" className="text-gray-300 hover:text-white transition">Payments</Link></li>
              <li><Link to="/shipping" className="text-gray-300 hover:text-white transition">Shipping</Link></li>
              <li><Link to="/cancellation" className="text-gray-300 hover:text-white transition">Cancellation & Returns</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-white transition">FAQ</Link></li>
              <li><Link to="/report" className="text-gray-300 hover:text-white transition">Report Infringement</Link></li>
            </ul>
          </div>

          {/* Policy */}
          <div>
            <h2 className="text-xl font-bold mb-4">POLICY</h2>
            <ul className="space-y-2">
              <li><Link to="/return-policy" className="text-gray-300 hover:text-white transition">Return Policy</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white transition">Terms Of Use</Link></li>
              <li><Link to="/security" className="text-gray-300 hover:text-white transition">Security</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white transition">Privacy</Link></li>
              <li><Link to="/sitemap" className="text-gray-300 hover:text-white transition">Sitemap</Link></li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h2 className="text-xl font-bold mb-4">CONNECT WITH US</h2>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-gray-300 hover:text-white transition"><Facebook size={20} /></a>
              <a href="#" className="text-gray-300 hover:text-white transition"><Twitter size={20} /></a>
              <a href="#" className="text-gray-300 hover:text-white transition"><Instagram size={20} /></a>
              <a href="#" className="text-gray-300 hover:text-white transition"><Youtube size={20} /></a>
            </div>
            
            <h2 className="text-xl font-bold mb-4">CONTACT US</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                <span className="text-gray-300">support@flipkartclone.com</span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                <span className="text-gray-300">+1 (123) 456-7890</span>
              </li>
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1" />
                <span className="text-gray-300">123 E-Commerce Street, Bangalore, India</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-bold mb-2">Popular Categories</h3>
            <p className="text-gray-400 text-sm">
              Mobile Phones, Laptops, Clothing, Shoes, Watches, Televisions, Refrigerators, Accessories, Books
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Popular Brands</h3>
            <p className="text-gray-400 text-sm">
              Samsung, Apple, Nike, Adidas, Sony, LG, Lenovo, HP, Dell, Asus
            </p>
          </div>
        </div>

        <div className="text-center text-gray-400 text-sm mt-8">
          <p>© 2025 Flipkart Clone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
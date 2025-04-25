import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: 'Electronics',
    image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    link: '/products?category=electronics'
  },
  {
    id: 2,
    name: 'Fashion',
    image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    link: '/products?category=fashion'
  },
  {
    id: 3,
    name: 'Home',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    link: '/products?category=home'
  },
  {
    id: 4,
    name: 'Beauty',
    image: 'https://images.pexels.com/photos/2693644/pexels-photo-2693644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    link: '/products?category=beauty'
  },
  {
    id: 5,
    name: 'Toys',
    image: 'https://images.pexels.com/photos/981588/pexels-photo-981588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    link: '/products?category=toys'
  },
  {
    id: 6,
    name: 'Sports',
    image: 'https://images.pexels.com/photos/4753978/pexels-photo-4753978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    link: '/products?category=sports'
  }
];

const CategorySection = () => {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={category.link}
              className="flex flex-col items-center group"
            >
              <div className="w-full aspect-square rounded-lg overflow-hidden mb-2 shadow-md transition-transform duration-300 group-hover:scale-105">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-medium text-gray-800 text-center group-hover:text-blue-600 transition">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
import { Link } from 'react-router-dom';
import { Zap, Home, Tv, Book, Sparkles, Percent, Star } from 'lucide-react';

// Department bar focused on home application store (like Amazon departments)
const DepartmentBar = () => {
  const departments = [
    { name: 'Appliances', icon: Zap, link: '/electronics' },
    { name: 'Home & Kitchen', icon: Home, link: '/home-garden' },
    { name: 'TV & Audio', icon: Tv, link: '/electronics' },
    { name: 'Books', icon: Book, link: '/books' },
    { name: 'Beauty', icon: Sparkles, link: '/beauty' },
    { name: 'Deals', icon: Percent, link: '/products' },
    { name: 'New Arrivals', icon: Star, link: '/products' },
  ];

  return (
    <div className="w-full bg-white border-b sticky top-[72px] z-40">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 py-4">
          {departments.map((dept, index) => (
            <Link
              key={index}
              to={dept.link}
              className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <dept.icon className="h-6 w-6 mb-2 text-gray-600 group-hover:text-souq-gold transition-colors" />
              <span className="text-xs font-medium text-center text-gray-700 group-hover:text-souq-gold transition-colors">
                {dept.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepartmentBar;




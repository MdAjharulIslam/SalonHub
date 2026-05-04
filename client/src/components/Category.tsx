// Category.tsx - Remove gradientStyle prop
import React, { useState } from 'react';
import { serviceCategories } from '../assets/assets';
import Title from './Title';
import { Link } from 'react-router-dom';

const Category: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-24 py-16 bg-gradient-to-b from-white via-purple-50/30 to-white">
      <Title 
        title="Find Service By Category" 
        subTitle="Discover your perfect beauty experience" 
        gradient={true}
       
      />

     
      <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-6 xl:mx-10">
        {serviceCategories.map((service) => (
          <Link 
            to={`/category/${service.firstName}`}
            key={service.id}
            className="group relative flex flex-col items-center bg-white rounded-2xl shadow-md p-5 hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden"
            onMouseEnter={() => setHoveredId(service.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
           
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
           
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

           
            <div className="relative">
              <div className="relative bg-gradient-to-br from-primary/20 via-purple-200/50 to-purple-300/30 p-3 rounded-full group-hover:scale-110 transition-transform duration-500">
                <div className="bg-gradient-to-tr from-primary/10 via-purple-100 to-purple-200/50 p-2 rounded-full">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="h-24 w-24 object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

           
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-primary to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100 flex items-center justify-center">
                <span className="text-white text-xs">→</span>
              </div>
            </div>

           
            <p className="text-center font-semibold mt-4 text-gray-700 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
              {service.name}
            </p>

            <div className="w-0 h-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-full group-hover:w-8 transition-all duration-500 mt-1" />
          </Link>
        ))}
      </div>

      
      <div className="flex justify-center mt-16">
        <Link 
          to="/service"
          className="group relative overflow-hidden bg-gradient-to-r from-primary to-purple-600 px-8 py-3 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <span className="relative z-10 flex items-center gap-2">
            View All Services
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
      </div>
    </div>
  );
};

export default Category;
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
        gradientStyle="primary"
      />

      {/* Categories Grid */}
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
              
              <div className={`absolute -inset-2 rounded-full bg-gradient-to-r from-primary via-purple-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-all duration-500 ${hoveredId === service.id ? 'animate-spin-slow' : ''}`} />
              
              
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
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

        
            <p className="text-center font-semibold mt-4 text-gray-700 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
              {service.name}
            </p>

            
            <div className="w-0 h-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-full group-hover:w-8 transition-all duration-500 mt-1" />
          </Link>
        ))}
      </div>

      

      <style>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Category;
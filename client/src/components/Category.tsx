import React from 'react';
import { serviceCategories } from '../assets/assets';
import Title from './Title';
import { Link } from 'react-router-dom';

const Category: React.FC = () => {
  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-24 py-16">
      <Title 
        title="Find Service By Category" 
        subTitle="Our services are 100% guaranteed" 
      />

      
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  xl:grid-cols-8 gap-6 xl:mx-10">
        {serviceCategories.map((service) => (
          <Link to={`/category/${service.firstName}`}
            key={service.id}
            className="flex flex-col items-center bg-white rounded-2xl shadow-md p-4 hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            <div className="bg-gradient-to-tr from-pink-200 via-purple-200 to-blue-200 p-2 rounded-full">
              <img
                src={service.image}
                alt={service.name}
                className="h-24 w-24 object-cover rounded-full"
              />
            </div>
            <p className="text-center font-semibold mt-3 text-gray-700">{service.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;

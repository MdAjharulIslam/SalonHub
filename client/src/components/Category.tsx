import React, { useState } from "react";
import { serviceCategories } from "../assets/assets";
import Title from "./Title";
import { Link } from "react-router-dom";

const Category: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-24 py-16 bg-white">

      {/* Title */}
      <Title
        title="Find Service By Category"
        subTitle="Discover your perfect beauty experience"
        centered={true}
      />

      {/* Categories */}
      <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-6">

        {serviceCategories.map((service) => (
          <Link
            to={`/category/${service.firstName}`}
            key={service.id}
            className="group flex flex-col items-center bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition-all duration-300"
            onMouseEnter={() => setHoveredId(service.id)}
            onMouseLeave={() => setHoveredId(null)}
          >

            {/* image */}
            <img
              src={service.image}
              alt={service.name}
              className="h-24 w-24 object-cover rounded-full transition-transform duration-300 group-hover:scale-105"
            />

            {/* name */}
            <p className="text-center font-semibold mt-4 text-gray-700">
              {service.name}
            </p>

          </Link>
        ))}
      </div>

      {/* button */}
      <div className="flex justify-center mt-16">
        <Link
          to="/service"
          className="bg-gray-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-black transition"
        >
          View All Services →
        </Link>
      </div>

    </div>
  );
};

export default Category;
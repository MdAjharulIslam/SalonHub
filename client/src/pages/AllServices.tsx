import React from "react";
import Title from "../components/Title";
import ServiceCard from "../components/ServiceCard";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const AllServices: React.FC = () => {
  const { allService, loading } = useAppContext();

  if (loading) {
    return <p className="text-center py-10">Loading services...</p>;
  }

  if (allService.length === 0) {
    return <p className="text-center py-10">No services available</p>;
  }

  return (
    <div className="max-w-full px-6 py-5 md:px-24 md:pb-20 ">
      <Title title="All Services" subTitle="Your favorite services" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {allService.map(service => (
          <Link key={service._id} to={`/service/${service._id}`}>
            <ServiceCard {...service} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllServices;

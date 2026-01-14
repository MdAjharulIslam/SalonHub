import React from "react";
import { Link } from "react-router-dom";
import Title from "./Title";
import ServiceCard from "./ServiceCard";
import { useAppContext } from "../context/AppContext";

const TopRatedServices: React.FC = () => {
  console.log("TopRatedServices rendered");

  const { allService, loading } = useAppContext();

  if (loading) {
    return <div className="py-10 text-center">Loading top services...</div>;
  }

  const topServices = allService
    .filter((service) => service.isAvailable)
    .slice(0, 4);

  if (topServices.length === 0) return null;

  return (
    <div className="max-w-full mx-auto px-6 py-10 md:px-24">
      <Title title="Top Rated Services" subTitle="Most popular services" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {topServices.map((service) => (
          <Link key={service._id} to={`/service/${service._id}`}>
            <ServiceCard {...service} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopRatedServices;

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppContext,  } from '../context/AppContext';
import ServiceCard from '../components/ServiceCard';
import Title from '../components/Title';

const CategoryPage: React.FC = () => {

  const { firstName } = useParams<{ firstName: string }>();

  const { allService, loading } = useAppContext();

  if (loading) {
    return <div className="py-10 text-center">Loading services...</div>;
  }

  
  const filteredServices = allService.filter(
    (service) => service.category?.toLowerCase() === firstName?.toLowerCase()
  );

  if (filteredServices.length === 0) {
    return (
      <div className="py-10 text-center">
        <Title title={`No services found for "${firstName}"`} subTitle="" />
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto px-6 py-10 md:px-24">
      <Title title={`Services for "${firstName}"`} subTitle="Our best services for you" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredServices.map((service) => (
          <Link key={service._id} to={`/service/${service._id}`}>
            <ServiceCard {...service} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;

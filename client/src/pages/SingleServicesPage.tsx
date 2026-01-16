import axios from 'axios';
import { Link } from 'react-router-dom';
import  { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

interface SingleServiceType {
  _id: string;
  name: string;
  price: number;
  category: string;
  duration: string;
  image: string;
  isAvailable: boolean;
  description: string;
}

const SingleServicesPage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [service, setService] = useState<SingleServiceType | null>(null);

  const fetchSingleService = async () => {
    try {
      const { data } = await axios.get(`/api/service/${serviceId}`);
      if (data.success) {
        setService(data.singleService);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchSingleService();
  }, [serviceId]);

  if (!service) return <p className="text-center mt-20 text-gray-500 text-lg">Loading...</p>;

  return (
    <div className="w-full bg-gray-100 py-12 px-6">
      <div className=" rounded-3xl overflow-hidden md:flex w-full max-w-[1200px] mx-auto">
        
        
        <div className="md:w-1/2">
          <img 
            src={service.image} 
            alt={service.name} 
            className="w-full rounded-3xl h-96 md:h-full object-cover"
          />
        </div>

        <div className="md:w-1/2 p-10 flex flex-col justify-between">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">{service.name}</h1>
            <p className="text-md text-gray-500 bg-primary rounded-2xl w-fit px-5 py-1 mb-6 uppercase tracking-wide font-semibold">{service.category}</p>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">{service.description}</p>
          </div>

          <div className="mt-6">
            <p className="text-3xl font-bold text-gray-900 mb-3">
              Price: <span className="text-primary">৳ {service.price}</span>
            </p>
            <p className="text-gray-700 mb-3">Duration: <span className="font-medium">{service.duration} hr</span></p>
            <p className={`font-semibold mb-6 ${service.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
              {service.isAvailable ? 'Available' : 'Not Available'}
            </p>

            {service.isAvailable && (
                <Link  to={`/service/${serviceId}/booking`}>
                
              <button  className="w-full bg-gradient-to-r from-primary to-purple-600 hover:bg-primary-dull text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl text-lg">
                Book Now
              </button></Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleServicesPage;

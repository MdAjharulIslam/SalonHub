import  { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const AllServicesAdmin = () => {
  const { allService, loading, setAllService } = useAppContext();
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const toggleAvailability = async (id: string) => {
    try {
      setTogglingId(id);

      const { data } = await axios.post(
        `/api/service/toggle/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      if (data.success) {
        setAllService((prev) =>
          prev.map((service) =>
            service._id === id
              ? { ...service, isAvailable: data.service.isAvailable }
              : service
          )
        );

        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Toggle failed"
      );
    } finally {
      setTogglingId(null);
    }
  };

  if (loading) return <p>Loading services...</p>;

  return (
    <div>
      {allService.map((service) => (
        <div
          key={service._id}
          className="w-2/3 border border-primary rounded-2xl p-5 md:p-10 mb-5"
        >
          <p>
            <span className="text-primary font-semibold">ID: </span>
            {service._id}
          </p>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <img src={service.image} alt="" className="h-12 w-12" />

            <p>
              <span className="text-primary font-semibold">Name: </span>
              {service.name}
            </p>

            <p>
              <span className="text-primary font-semibold">Category: </span>
              {service.category}
            </p>

            <p>
              <span className="text-primary font-semibold">Duration: </span>
              {service.duration}
            </p>

            <div className="flex items-center gap-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  service.isAvailable
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {service.isAvailable ? "Available" : "Unavailable"}
              </span>

              <button
                disabled={togglingId === service._id}
                onClick={() => toggleAvailability(service._id)}
                className={`px-4 py-2 rounded-lg text-white transition disabled:opacity-50 disabled:cursor-not-allowed ${
                  service.isAvailable
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {togglingId === service._id
                  ? "Processing..."
                  : service.isAvailable
                  ? "Disable"
                  : "Enable"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllServicesAdmin;

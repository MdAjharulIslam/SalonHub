import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Title from "../components/Title";

interface BookingType {
  _id: string;
  phone: string;
  bookingDate: string;
  bookingTime: string;
  status: string;
  service: {
    _id: string;
    name: string;
    image: string;
  };
  createdAt: string;
}

const MyBooking: React.FC = () => {
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const token = localStorage.getItem("token");

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get("/api/booking/myBooking", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setBookings(data.booking);
      } else {
        toast.error(data.message || "Failed to fetch bookings");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

 
  const handleCancel = async (bookingId: string) => {
    try {
      const { data } = await axios.post(
        `/api/booking/${bookingId}/cancel`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        
        setBookings((prev) =>
          prev.map((b) =>
            b._id === bookingId ? { ...b, status: "Cancelled" } : b
          )
        );
      } else {
        toast.error(data.message || "Failed to cancel booking");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  if (!bookings || bookings.length === 0) {
    return <p className="text-center mt-10 text-gray-500">No bookings found.</p>;
  }

  return (
    <div className="flex flex-col items-center gap-6 mt-8 px-10 pb-20">
      <Title title="My Bookings" subTitle="" />

      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl border border-primary rounded-2xl p-4 bg-white shadow-md"
        >
         
          <div className="w-24 h-24 flex-shrink-0 mb-2 md:mb-0">
            <img
              src={booking.service?.image || "/placeholder.png"}
              alt={booking.service?.name || "Service Image"}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

       
          <div className="flex-1 flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-8 px-4 w-full">
            <p className="text-gray-800 font-semibold flex-1">
              <span className="text-primary font-semibold">Name: </span>
              {booking.service?.name}
            </p>
            <p className="text-gray-600 flex-1 text-center">
              <span className="text-primary font-semibold">Date: </span>
              {booking.bookingDate}
            </p>
            <p className="text-gray-600 flex-1 text-center">
              <span className="text-primary font-semibold">Time: </span>
              {booking.bookingTime}
            </p>
            <p
              className={`font-medium flex-1 text-center ${
                booking.status === "Cancelled"
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              <span className="text-primary font-semibold">Status: </span>
              {booking.status}
            </p>
          </div>

          
          <div className="mt-2 md:mt-0">
            {booking.status === "Pending" && (
              <button
                onClick={() => handleCancel(booking._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Cancel Booking
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBooking;

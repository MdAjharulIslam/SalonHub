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
    price?: number;
    duration?: string;
  };
  createdAt: string;
}

const MyBooking: React.FC = () => {
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const token = localStorage.getItem("token");

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (bookingId: string) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) {
      return;
    }

    try {
      setCancellingId(bookingId);
      const { data } = await axios.post(
        `/api/booking/${bookingId}/cancel`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message || "Booking cancelled successfully");
        setBookings((prev) =>
          prev.map((b) =>
            b._id === bookingId ? { ...b, status: "Cancelled" } : b
          )
        );
      } else {
        toast.error(data.message || "Failed to cancel booking");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message || "Something went wrong");
    } finally {
      setCancellingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Confirmed":
        return "bg-green-100 text-green-700 border-green-200";
      case "Completed":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return "⏳";
      case "Confirmed":
        return "✅";
      case "Completed":
        return "🎉";
      case "Cancelled":
        return "❌";
      default:
        return "📋";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-500">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Bookings Found</h3>
          <p className="text-gray-500 mb-6">You haven't made any bookings yet.</p>
          <button
            onClick={() => window.location.href = "/service"}
            className="bg-gradient-to-r from-primary to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300"
          >
            Browse Services
          </button>
        </div>
      </div>
    );
  }

 return (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 px-4 py-10">
    <div className="max-w-5xl mx-auto">
      
      <Title 
        title="My Bookings" 
        subTitle="Track and manage your appointments" 
      />

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 mb-10">
        {[
          { label: "Total", value: bookings.length },
          { label: "Pending", value: bookings.filter(b => b.status === "Pending").length },
          { label: "Confirmed", value: bookings.filter(b => b.status === "Confirmed").length },
          { label: "Completed", value: bookings.filter(b => b.status === "Completed").length },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-xl p-4 text-center shadow-sm"
          >
            <p className="text-xl font-bold text-primary">{item.value}</p>
            <p className="text-xs text-gray-500">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Booking Cards */}
      <div className="space-y-5">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">

              {/* Image */}
              <div className="md:w-36 h-36">
                <img
                  src={booking.service?.image || "/placeholder.png"}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 p-5 flex flex-col justify-between">
                
                {/* Top */}
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {booking.service?.name}
                  </h3>

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium border ${getStatusColor(booking.status)}`}
                  >
                    {getStatusIcon(booking.status)} {booking.status}
                  </span>
                </div>

                {/* Middle */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-gray-600 mt-3">
                  <p>📅 {booking.bookingDate}</p>
                  <p>⏰ {booking.bookingTime}</p>
                  <p>📞 {booking.phone}</p>
                </div>

                {/* Bottom */}
                <div className="flex items-center justify-between mt-4">
                  
                  <p className="font-semibold text-primary text-lg">
                    ৳ {booking.service?.price?.toLocaleString()}
                  </p>

                  {/* Actions */}
                  {booking.status === "Pending" && (
                    <button
                      onClick={() => handleCancel(booking._id)}
                      disabled={cancellingId === booking._id}
                      className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      {cancellingId === booking._id
                        ? "Cancelling..."
                        : "Cancel"}
                    </button>
                  )}
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  </div>
);
};

export default MyBooking;
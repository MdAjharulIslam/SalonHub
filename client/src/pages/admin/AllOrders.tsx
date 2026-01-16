import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface Booking {
  _id: string;
  customer: {
    name: string;
    email: string;
  };
  service: {
    name: string;
    duration: string;
  };
  phone: string;
  bookingDate: string;
  bookingTime: string;
  status: "Pending" | "Confirmed" | "Cancelled";
}

const AllOrders: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/booking/getAllBooking", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      if (data.success) setBookings(data.allBooking);
      else toast.error(data.message);
    } catch (error) {
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      setUpdatingId(bookingId);
      const { data } = await axios.post(
        `/api/booking/status/${bookingId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (data.success) {
        setBookings((prev) =>
          prev.map((b) =>
            b._id === bookingId ? { ...b, status: data.changeStatus.status } : b
          )
        );
        toast.success("Booking status updated!");
      } else toast.error(data.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading bookings...</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-8 text-primary">All Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">No bookings found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition cursor-pointer"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  {booking.customer.name}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    booking.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : booking.status === "Confirmed"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {booking.status}
                </span>
              </div>

              <p className="text-gray-500 mb-1">
                <span className="font-semibold">Email: </span>
                {booking.customer.email}
              </p>
              <p className="text-gray-500 mb-1">
                <span className="font-semibold">Service: </span>
                {booking.service?.name || "Service deleted"}
              </p>
              <p className="text-gray-500 mb-1">
                <span className="font-semibold">Duration: </span>
                {booking.service?.duration || "-"}
              </p>

              <p className="text-gray-500 mb-1">
                <span className="font-semibold">Phone: </span>
                {booking.phone}
              </p>
              <p className="text-gray-500 mb-3">
                <span className="font-semibold">Date & Time: </span>
                {booking.bookingDate} at {booking.bookingTime}
              </p>

              <select
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition"
                value={booking.status}
                disabled={updatingId === booking._id}
                onChange={(e) =>
                  handleStatusChange(booking._id, e.target.value)
                }
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllOrders;

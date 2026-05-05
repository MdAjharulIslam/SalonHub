import React, { useState,  } from "react";
import type {  ChangeEvent, FormEvent } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { serviceCategories } from "../../assets/assets"; 

interface ServiceForm {
  name: string;
  category: string;
  price: number | "";
  duration: string;
  description: string;
  image: File | null;
}

const AddService: React.FC = () => {
  const [form, setForm] = useState<ServiceForm>({
    name: "",
    category: "",
    price: "",
    duration: "",
    description: "",
    image: null,
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };
const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return; 

  setForm((prev) => ({
    ...prev,
    image: file,
  }));
};


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.image) {
      toast.error("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("category", form.category);
    formData.append("price", form.price.toString());
    formData.append("duration", form.duration);
    formData.append("description", form.description);
    formData.append("image", form.image);

    try {
      setLoading(true);
      const { data } = await axios.post("/api/service/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      if (data.success) {
        toast.success("Service added successfully!");
        setForm({
          name: "",
          category: "",
          price: "",
          duration: "",
          description: "",
          image: null,
        });
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to add service");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-gray-50 py-10 px-4">
    <div className="max-w-3xl mx-auto">

      
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
        
      
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Add New Service
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the details to create a new service
          </p>
        </div>

      
        <form onSubmit={handleSubmit} className="space-y-6">

       
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
              placeholder="Enter service name"
              required
            />
          </div>

         
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
              required
            >
              <option value="">Select category</option>
              {serviceCategories.map((cat) => (
                <option key={cat.id} value={cat.firstName}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

        
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                placeholder="e.g. 500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration
              </label>
              <input
                type="text"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                placeholder="e.g. 30 minutes"
                required
              />
            </div>

          </div>

         
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition resize-none"
              placeholder="Write service details..."
              required
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Image
            </label>

            <div className="flex items-center justify-center w-full">
              <label className="w-full flex flex-col items-center justify-center px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition">
                <span className="text-sm text-gray-500">
                  Click to upload or drag and drop
                </span>
                <span className="text-xs text-gray-400 mt-1">
                  PNG, JPG up to 5MB
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  required
                />
              </label>
            </div>

            {form.image && (
              <p className="text-xs text-gray-500 mt-2">
                Selected: {form.image.name}
              </p>
            )}
          </div>

          
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Service"}
            </button>
          </div>

        </form>
      </div>
    </div>
  </div>
);
};

export default AddService;

import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaTag,
  FaAlignLeft,
  FaDollarSign,
  FaClock,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Booking = () => {
  const [formData, setFormData] = useState({
    location: "",
    spaceName: "",
    description: "",
    price: "",
  });

  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrencePattern, setRecurrencePattern] = useState("WEEKLY");
  const [selectedDays, setSelectedDays] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.location) newErrors.location = "Location is required";
    if (!startDate) newErrors.startDate = "Start time is required";
    if (!endDate) newErrors.endDate = "End time is required";
    if (
      isRecurring &&
      recurrencePattern === "WEEKLY" &&
      selectedDays.length === 0
    ) {
      newErrors.selectedDays = "Select at least one day";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const bookingData = {
      ...formData,
      isRecurring,
      recurrencePattern,
      selectedDays,
      startTime: startDate.toISOString(),
      endTime: endDate.toISOString(),
      paymentMethod,
    };

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error("Booking failed");
      }

      const result = await response.json();
      setBookingSuccess(result);
    } catch (error) {
      console.error("Booking error:", error);
    }
  };

  return (
    <div className="p-8 ml-64 max-w-3xl">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6">Book a Parking Space</h2>

        {/* Location */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <FaMapMarkerAlt className="inline-block mr-1" />
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter address or name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location}</p>
          )}
        </div>

        {/* Space Name */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <FaTag className="inline-block mr-1" />
            Space Name
          </label>
          <input
            type="text"
            name="spaceName"
            value={formData.spaceName}
            onChange={handleChange}
            placeholder="Give it a name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <FaAlignLeft className="inline-block mr-1" />
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your space (e.g. covered, near center)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Price */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <FaDollarSign className="inline-block mr-1" />
            Price (KM/hr)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Date/Time Pickers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaClock className="inline-block mr-1" />
              Start Time
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.startDate && (
              <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaClock className="inline-block mr-1" />
              End Time
            </label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.endDate && (
              <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>
            )}
          </div>
        </div>

        {/* Recurring Booking Toggle */}
<div className="mb-6">
  <label className="flex items-center space-x-2">
    <input
      type="checkbox"
      checked={isRecurring}
      onChange={() => setIsRecurring((prev) => !prev)}
      className="w-4 h-4"
    />
    <span className="text-sm text-gray-700">Recurring Booking</span>
  </label>
</div>

{isRecurring && (
  <div className="mb-6">
    {/* Recurrence Pattern */}
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Recurrence Pattern
      </label>
      <select
        value={recurrencePattern}
        onChange={(e) => setRecurrencePattern(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      >
        <option value="WEEKLY">Weekly</option>
        <option value="DAILY">Daily</option>
      </select>
    </div>

    {/* Weekly Day Selection */}
    {recurrencePattern === "WEEKLY" && (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Days
        </label>
        <div className="grid grid-cols-4 gap-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <label key={day} className="inline-flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedDays.includes(day)}
                onChange={() =>
                  setSelectedDays((prev) =>
                    prev.includes(day)
                      ? prev.filter((d) => d !== day)
                      : [...prev, day]
                  )
                }
              />
              <span className="text-sm">{day}</span>
            </label>
          ))}
        </div>
        {errors.selectedDays && (
          <p className="mt-1 text-sm text-red-600">{errors.selectedDays}</p>
        )}
      </div>
    )}
  </div>
)}


        {/* Payment Method (Simple) */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payment Method
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="credit">Credit Card</option>
            <option value="cash">Cash</option>
          </select>
        </div>

        {/* Success Message */}
        {bookingSuccess && (
          <div className="mb-6 p-4 bg-green-50 rounded-md text-center">
            <h3 className="text-lg font-medium text-green-800 mb-2">
              Booking Confirmed!
            </h3>
            
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
        >
          {bookingSuccess ? "Book Another Spot" : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
};

export default Booking;

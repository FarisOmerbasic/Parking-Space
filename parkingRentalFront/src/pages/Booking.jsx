import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaTag,
  FaAlignLeft,
  FaDollarSign,
  FaClock,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import QRCode from "qrcode.react";

const Booking = () => {
  const [formData, setFormData] = useState({
    location: "",
    spaceName: "",
    description: "",
    price: "",
  });

  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrencePattern, setRecurrencePattern] = useState('WEEKLY');
  const [selectedDays, setSelectedDays] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [paymentMethod, setPaymentMethod] = useState('credit');
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
    if (!formData.location) newErrors.location = 'Location is required';
    if (!startDate) newErrors.startDate = 'Start time is required';
    if (!endDate) newErrors.endDate = 'End time is required';
    if (isRecurring && recurrencePattern === 'WEEKLY' && selectedDays.length === 0) {
      newErrors.selectedDays = 'Select at least one day';
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
      paymentMethod
    };

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error('Booking failed');
      }

      const result = await response.json();
      setBookingSuccess(result);
    } catch (error) {
      console.error('Booking error:', error);
      // Show error message to user
    }
  };

  return (
    <div className="p-8 ml-64 max-w-3xl">
      {/* Navigation Tabs and Header remain the same */}
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        {/* Existing form fields (Location, Space Name, Description, Price) */}

        {/* Date/Time Pickers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
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
            {errors.startDate && <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
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
            {errors.endDate && <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>}
          </div>
        </div>

        {/* Recurring Booking Options */}
        <div className="mb-6">
          {/* ... Recurring booking UI from above ... */}
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          {/* ... Payment method UI from above ... */}
        </div>

        {/* Success Message */}
        {bookingSuccess && (
          <div className="mb-6 p-4 bg-green-50 rounded-md">
            <h3 className="text-lg font-medium text-green-800 mb-2">Booking Confirmed!</h3>
            <div className="flex justify-center">
              <QRCode 
                value={`booking:${bookingSuccess.id}`}
                size={128}
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
        >
          {bookingSuccess ? 'Book Another Spot' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
};

export default Booking;
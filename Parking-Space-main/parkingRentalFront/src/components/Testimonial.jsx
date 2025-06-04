import React from "react";

const Testimonial = () => (
  <div className="bg-white rounded-xl shadow p-8 max-w-2xl mx-auto flex flex-col items-center">
    <blockquote className="italic text-lg text-center mb-4">
      “Using ParkingRental has made finding and booking parking spots so much easier for me. The platform is user-friendly, reliable, and the whole process is smooth from start to finish. I highly recommend it to anyone looking for a hassle-free parking experience!”
    </blockquote>
    <div className="flex items-center gap-3">
      <img
        src="data:image/jpeg;base64,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"
        alt="Testimonial"
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <div className="font-bold">Someone</div>
        <div className="text-sm text-gray-500">Software Engineer</div>
      </div>
    </div>
  </div>
);

export default Testimonial;
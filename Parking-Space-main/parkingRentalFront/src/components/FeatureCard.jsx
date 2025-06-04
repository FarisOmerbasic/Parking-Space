import React from "react";

const FeatureCard = ({ icon, title, description }) => (
  <div className="flex flex-col items-center bg-white rounded-xl shadow p-8 w-80">
    <div className="text-5xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2 text-green-600">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </div>
);

export default FeatureCard;
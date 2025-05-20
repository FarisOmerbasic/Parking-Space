import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../services/AuthContext";

const MySpaces = () => {
  const { user } = useAuth();
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const res = await axios.get("http://localhost:5164/api/parkingspaces", {
          withCredentials: true,
        });
        // Filter spaces by ownerId (current user)
        const mySpaces = res.data.filter(
          (space) => space.ownerId === user?.id
        );
        setSpaces(mySpaces);
      } catch (err) {
        setSpaces([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSpaces();
  }, [user]);

  if (loading) return <div className="p-8 ml-64">Loading...</div>;

  return (
    <div className="p-8 ml-64">
      <h1 className="text-2xl font-bold mb-6">My Listed Spaces</h1>
      {spaces.length === 0 ? (
        <p>You have not listed any spaces yet.</p>
      ) : (
        <div className="space-y-4">
          {spaces.map((space) => (
            <div key={space.id} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{space.address}</h2>
              <p className="text-gray-600">{space.spaceName}</p>
              <p>{space.description}</p>
              <p className="text-gray-600">
                {space.pricePerHour} KM/hr
              </p>
              <p className="text-gray-600">
                Available: {space.availableTimes}
              </p>
              <p className="text-gray-600">
                Status: {space.isAvailable ? "Available" : "Unavailable"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MySpaces;
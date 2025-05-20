import React, { useEffect, useState } from "react";
import axios from "axios";

const MySpaces = () => {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const res = await axios.get("http://localhost:5164/api/parkingspaces/mine", {
          withCredentials: true,
        });
        setSpaces(res.data);
      } catch (err) {
        setSpaces([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSpaces();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this parking space?")) return;
    setDeletingId(id);
    try {
      await axios.delete(`http://localhost:5164/api/parkingspaces/${id}`, {
        withCredentials: true,
      });
      setSpaces((prev) => prev.filter((space) => space.id !== id));
    } catch (err) {
      alert("Failed to delete parking space.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <div className="p-8 ml-64">Loading...</div>;

  return (
    <div className="p-8 ml-64 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">My Listed Spaces</h1>
        <p className="text-gray-600">
          Here are all the parking spaces you have listed.
        </p>
      </div>
      {spaces.length === 0 ? (
        <p className="text-gray-600">You have not listed any spaces yet.</p>
      ) : (
        <div className="space-y-6">
          {spaces.map((space) => (
            <div
              key={space.id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-blue-700 mb-1">
                  {space.location}
                </h2>
                <p className="text-gray-500 mb-2">{space.spaceName}</p>
                <p className="text-gray-700 mb-2">{space.description}</p>
              </div>
              <div className="flex flex-col md:flex-row md:space-x-8 space-y-2 md:space-y-0 mb-2">
                <div>
                  <span className="block text-sm text-gray-500">Price per Hour</span>
                  <span className="font-medium">{space.price} KM</span>
                </div>
                <div>
                  <span className="block text-sm text-gray-500">Available Times</span>
                  <span className="font-medium">{space.availableTimes}</span>
                </div>
                <div>
                  <span className="block text-sm text-gray-500">Status</span>
                  <span className="font-medium">
                    {space.isAvailable ? (
                      <span className="text-green-600">Available</span>
                    ) : (
                      <span className="text-red-600">Unavailable</span>
                    )}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(space.id)}
                disabled={deletingId === space.id}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition disabled:opacity-50"
              >
                {deletingId === space.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MySpaces;
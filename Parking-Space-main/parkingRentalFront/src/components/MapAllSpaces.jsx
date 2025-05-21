import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Set default Leaflet icon
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = defaultIcon;

function MapAllSpaces() {
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch parking spaces from your API
        const response = await fetch('http://localhost:5164/api/ParkingSpaces');
        if (!response.ok) throw new Error('Failed to fetch parking spaces');
        
        const parkingSpaces = await response.json();
        console.log('Fetched parking spaces:', parkingSpaces);

        if (!parkingSpaces || parkingSpaces.length === 0) {
          setLoading(false);
          return;
        }

        // 2. Geocode locations to coordinates
        const geocodedMarkers = await Promise.all(
          parkingSpaces.map(async (space) => {
            if (!space.location) return null;
            
            try {
              const geoResponse = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(space.location)}&countrycodes=ba`
              );
              const geoData = await geoResponse.json();
              
              return geoData.length > 0 ? {
                id: space.id,
                location: space.location,
                lat: parseFloat(geoData[0].lat),
                lng: parseFloat(geoData[0].lon),
                spaceData: space
              } : null;
            } catch (err) {
              console.error(`Geocoding failed for: ${space.location}`, err);
              return null;
            }
          })
        );

        const validMarkers = geocodedMarkers.filter(m => m !== null);
        console.log('Geocoded markers:', validMarkers);
        
        setMarkers(validMarkers);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate center point from all markers
  const calculateCenter = () => {
    if (markers.length === 0) return [43.8563, 18.4131]; // Default to Sarajevo
    
    const sum = markers.reduce(
      (acc, marker) => ({
        lat: acc.lat + marker.lat,
        lng: acc.lng + marker.lng
      }),
      { lat: 0, lng: 0 }
    );

    return [sum.lat / markers.length, sum.lng / markers.length];
  };

  if (loading) return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
      <div className="text-center p-6 bg-white rounded-lg shadow-xl">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-lg font-medium">Loading parking spaces...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
      <div className="text-center p-6 bg-white rounded-lg shadow-xl">
        <p className="text-lg font-medium text-red-600">Error: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    </div>
  );

  if (markers.length === 0) return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
      <div className="text-center p-6 bg-white rounded-lg shadow-xl">
        <p className="text-lg font-medium">No geocodable parking spaces found</p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 w-full h-full z-0">
      <MapContainer 
        center={calculateCenter()} 
        zoom={14} 
        className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {markers.map((marker) => (
          <Marker key={marker.id} position={[marker.lat, marker.lng]}>
            <Popup className="min-w-[250px]">
              <div className="space-y-2">
                <h3 className="font-bold text-lg">{marker.spaceData.spaceName}</h3>
                <p><strong className="font-semibold">Location:</strong> {marker.location}</p>
                <p><strong className="font-semibold">Price:</strong> {marker.spaceData.price} KM/hour</p>
                <p><strong className="font-semibold">Available:</strong> {marker.spaceData.availableTimes}</p>
                <p className="text-gray-700">{marker.spaceData.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapAllSpaces;
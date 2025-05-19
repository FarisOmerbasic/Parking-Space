import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = defaultIcon;

function MapAllSpaces({ parkingSpaces }) {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchCoords = async () => {
      const coordsArray = [];

      for (const space of parkingSpaces) {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            space.address
          )}`
        );
        const data = await res.json();
        if (data.length > 0) {
          coordsArray.push({
            id: space.id,
            address: space.address,
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon),
          });
        }
      }

      setMarkers(coordsArray);
    };

    fetchCoords();
  }, [parkingSpaces]);

  if (markers.length === 0) return <p>Loading map...</p>;

  // Center map roughly on first location
  const center = {
    lat: markers[0].lat,
    lng: markers[0].lng,
  };

  return (
    <MapContainer center={center} zoom={13} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker) => (
        <Marker key={marker.id} position={[marker.lat, marker.lng]}>
          <Popup>{marker.address}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapAllSpaces;

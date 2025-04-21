import React from 'react';

const Home = () => {
    const listings = [
        { type: 'Office', name: 'Downtown Plaza', spots: 2, price: 8, details: '24/7 access' },
        { type: 'Residential', name: 'Maple Residences', spots: 1, price: 6, details: 'Gated entry' },
        { type: 'EV Charging', name: 'Green Garage', spots: 3, price: 10, details: 'EV charging' },
    ];

    return (
        <div className="p-8 flex-1 bg-white">
            <h2 className="text-2xl font-semibold mb-6">Available Spaces</h2>

            {/* Filters */}
            <div className="flex space-x-4 mb-6 text-sm font-medium">
                {['All', 'Office', 'Residential', 'Covered', 'EV Charging'].map(cat => (
                    <button key={cat} className="text-gray-700 hover:text-purple-700">
                        {cat}
                    </button>
                ))}
            </div>

            {/* Listings */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {listings.map((space, index) => (
                    <div key={index} className="bg-purple-50 p-4 rounded-xl shadow-sm">
                        <div className="text-sm text-purple-700">{space.type}</div>
                        <div className="text-lg font-semibold">{space.name}</div>
                        <div className="text-sm text-gray-600">{space.spots} spots • ${space.price}/hr • {space.details}</div>
                        <div className="flex gap-2 mt-4">
                            <button className="bg-purple-600 text-white px-3 py-1 rounded-md text-sm">Book Now</button>
                            <button className="border border-purple-600 text-purple-600 px-3 py-1 rounded-md text-sm">Details</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Map */}
            <h2 className="text-2xl font-semibold mb-4">Map Search</h2>
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Europe_Map_1851.jpg" alt="Map" className="w-full h-96 object-cover rounded-lg mb-8" />

            {/* How it works */}
            <h2 className="text-2xl font-semibold mb-6">How it works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-purple-50 p-6 rounded-xl">
                    <div className="text-purple-700 font-bold mb-2">Step 1</div>
                    <h3 className="text-lg font-semibold mb-1">List Your Space</h3>
                    <p className="text-sm text-gray-600">Share your unused spot and set your price.</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-xl">
                    <div className="text-purple-700 font-bold mb-2">Step 2</div>
                    <h3 className="text-lg font-semibold mb-1">Find & Book</h3>
                    <p className="text-sm text-gray-600">Browse, filter, and reserve a spot instantly.</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-xl">
                    <div className="text-purple-700 font-bold mb-2">Step 3</div>
                    <h3 className="text-lg font-semibold mb-1">Check In</h3>
                    <p className="text-sm text-gray-600">Scan the QR code to confirm your reservation.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;

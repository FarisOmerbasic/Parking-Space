import React from 'react';

const Sidebar = () => {
    return (
        <div>
            <nav className="bg-smash-gray h-screen w-64 shadow-md">
                <div className="flex items-center justify-center h-16 bg-smash-blue text-white font-bold text-lg">
                    Parking Space
                </div>
                <ul className="mt-4">
                    <li className="px-4 py-2 hover:bg-smash-blue hover:text-white cursor-pointer">Dashboard</li>
                    <li className="px-4 py-2 hover:bg-smash-blue hover:text-white cursor-pointer">Manage Spaces</li>
                    <li className="px-4 py-2 hover:bg-smash-blue hover:text-white cursor-pointer">Settings</li>
                    <li className="px-4 py-2 hover:bg-smash-blue hover:text-white cursor-pointer">Logout</li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
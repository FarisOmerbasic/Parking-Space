import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Spin, message } from 'antd';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Ensure this matches your backend API URL
        const { data } = await axios.get('http://localhost:5164/api/admin/users', { withCredentials: true });
        setUsers(data);
      } catch (err) {
        console.error('Failed to fetch users:', err); // Log the error for debugging
        message.error('Failed to fetch users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const columns = [
    {
      title: 'Username',
      dataIndex: 'name',  // Matches AdminUserDto.Name
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email', // Matches AdminUserDto.Email
      key: 'email',
    },
    {
      title: 'Balance',
      dataIndex: 'balance', // Matches AdminUserDto.Balance
      key: 'balance',
      render: (balance) => `${parseFloat(balance).toFixed(2)} KM`, // Format to 2 decimal places
    },
    {
      title: 'Parking Spaces',
      dataIndex: 'parkingSpacesCount', // Matches AdminUserDto.ParkingSpacesCount
      key: 'parkingSpacesCount',
    },
    {
      title: 'Bookings',
      dataIndex: 'bookingsCount', 
      key: 'bookingsCount',
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Users Management</h1>
      <Spin spinning={loading}>
        <Table
          dataSource={users}
          columns={columns}
          rowKey="id" 
          pagination={{ pageSize: 10 }}
        />
      </Spin>
    </div>
  );
};

export default UsersManagement;
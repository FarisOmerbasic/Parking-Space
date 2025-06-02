import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Spin, message, Tag } from 'antd'; // Ensure Tag is imported

const PaymentsManagement = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        // Ensure this matches your backend API URL
        const { data } = await axios.get('http://localhost:5164/api/admin/payments', { withCredentials: true });
        setPayments(data);
      } catch (error) {
        console.error('Failed to fetch payments:', error); // Log the error for debugging
        message.error('Failed to fetch payments');
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const columns = [
    {
      title: 'User Email',
      dataIndex: 'userEmail', // Matches PaymentRecordDto.UserEmail
      key: 'userEmail',
    },
    {
      title: 'Amount',
      dataIndex: 'amount', // Matches PaymentRecordDto.Amount
      key: 'amount',
      render: (amount) => `${parseFloat(amount).toFixed(2)} KM`, // Format to 2 decimal places
    },
    {
      title: 'Date',
      dataIndex: 'paymentDate', // Matches PaymentRecordDto.PaymentDate
      key: 'paymentDate',
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: 'Description',
      dataIndex: 'description', // Matches PaymentRecordDto.Description
      key: 'description',
    },
    {
      title: 'Status',
      dataIndex: 'status', // Matches PaymentRecordDto.Status
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Completed' ? 'green' : 'orange'}>
          {status}
        </Tag>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Payments Management</h1>
      <Spin spinning={loading}>
        <Table
          dataSource={payments}
          columns={columns}
          rowKey="id" 
          pagination={{ pageSize: 10 }}
        />
      </Spin>
    </div>
  );
};

export default PaymentsManagement;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Spin, message, Tag } from 'antd'; 

const PaymentsManagement = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const { data } = await axios.get('http://localhost:5164/api/admin/payments', { withCredentials: true });
        setPayments(data);
      } catch (error) {
        console.error('Failed to fetch payments:', error); 
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
      dataIndex: 'userEmail',
      key: 'userEmail',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `${parseFloat(amount).toFixed(2)} KM`, 
    },
    {
      title: 'Date',
      dataIndex: 'paymentDate', 
      key: 'paymentDate',
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: 'Description',
      dataIndex: 'description', 
      key: 'description',
    },
    {
      title: 'Status',
      dataIndex: 'status', 
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
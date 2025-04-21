import React, { useEffect, useState } from "react";
import { Typography,Table, message, Spin } from "antd";
import axios from "axios";
import "./Bookings.css";

const { Title } = Typography;

export const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Mock API request
        // const response = await axios.get("https://your-api.com/bookings");
        // setBookings(response.data);
        
        // Mock data
        setBookings([
          {
            key: "1",
            pickup: "123 Main St, NY",
            dropoff: "456 Elm St, NY",
            vehicle: "Medium",
            cost: "$100",
            status: "Confirmed",
          },
          {
            key: "2",
            pickup: "789 Pine St, CA",
            dropoff: "321 Oak St, CA",
            vehicle: "Large",
            cost: "$150",
            status: "Pending",
          },
        ]);
      } catch (error) {
        message.error("Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const columns = [
    {
      title: "Pickup Location",
      dataIndex: "pickup",
      key: "pickup",
    },
    {
      title: "Dropoff Location",
      dataIndex: "dropoff",
      key: "dropoff",
    },
    {
      title: "Vehicle Type",
      dataIndex: "vehicle",
      key: "vehicle",
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <div className="bookings-container">
       <Title level={2} className="bookings-title">Your Bookings</Title>
      {loading ? <Spin size="large" className="loading-spinner" /> :   <div className="bookings-table-wrapper"><Table columns={columns} dataSource={bookings} className="bookings-table" />     </div>
    }
    </div>
  );
};

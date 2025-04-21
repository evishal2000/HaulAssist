import React, { useEffect, useState } from "react";
import { Typography, Table, message, Spin } from "antd";
import { useAxios } from "../../Utils/axiosInstance";
import moment from "moment";
import "./Bookings.css";

const { Title } = Typography;

export const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const axios=useAxios();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        
        const response = await axios.get("http://localhost:8080/v1/cargo/bookings");
        const data = response.data;


        const transformed = data.map((item) => ({
          key: item.id,
          pickup: `Lat: ${item.pickup.latitude.toFixed(4)}, Lng: ${item.pickup.longitude.toFixed(4)}`,
          dropoff: `Lat: ${item.dropoff.latitude.toFixed(4)}, Lng: ${item.dropoff.longitude.toFixed(4)}`,
          vehicle: item.vehicle_type.charAt(0).toUpperCase() + item.vehicle_type.slice(1),
          cost: "$100", // Placeholder, replace if you have real cost data
          status: "Confirmed", // Placeholder, replace if backend provides this
        }));

        setBookings(transformed);
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
      <Title level={2} className="bookings-title">
        Your Bookings
      </Title>
      {loading ? (
        <Spin size="large" className="loading-spinner" />
      ) : (
        <div className="bookings-table-wrapper">
          <Table columns={columns} dataSource={bookings} className="bookings-table" />
        </div>
      )}
    </div>
  );
};

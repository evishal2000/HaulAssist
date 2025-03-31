import React, { useState } from "react";
import { Form, Input, Select, DatePicker, message, Button, Modal } from "antd";
import axios from "axios";
import { usStates } from "./Utility/states";
import { useNavigate } from "react-router-dom";

export const BookingForm = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cost, setCost] = useState(null);
  const navigate= useNavigate();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("Form Data:", values);

      // Mock API request
    //  const response = await axios.post("https://your-api.com/calculate-cost", values);
    //  setCost(response.data.cost); // Assuming API returns { cost: 100 }
      setCost(100);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Validation Failed:", error);
      message.error("Please fill all required fields.");
    }
  };

  const handleConfirmBooking = async () => {
    try {
      const values = form.getFieldsValue();
      // await axios.post("https://your-api.com/book-ride", values);
      message.success("Booking confirmed!");
      setIsModalOpen(false);
      navigate("/dashboard");
    } catch (error) {
      message.error("Booking failed. Try again.");
    }
  };

  return (
    <div style={{ padding: "20px", width: "60%" }}>
      <Form form={form} layout="vertical">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "48%" }}>
            <h3>Pickup Address</h3>
            <Form.Item name="pickupStreet" label="Street" rules={[{ required: true }]}>
              <Input placeholder="Enter street" />
            </Form.Item>
            <Form.Item name="pickupCity" label="City" rules={[{ required: true }]}>
              <Input placeholder="Enter city" />
            </Form.Item>
            <Form.Item name="pickupState" label="State" rules={[{ required: true }]}>
              <Select placeholder="Select state" options={usStates} />
            </Form.Item>
            <Form.Item name="pickupZip" label="Zip Code" rules={[{ required: true }]}>
              <Input placeholder="Enter zip code" />
            </Form.Item>
          </div>
          <div style={{ width: "48%" }}>
            <h3>Dropoff Address</h3>
            <Form.Item name="dropoffStreet" label="Street" rules={[{ required: true }]}>
              <Input placeholder="Enter street" />
            </Form.Item>
            <Form.Item name="dropoffCity" label="City" rules={[{ required: true }]}>
              <Input placeholder="Enter city" />
            </Form.Item>
            <Form.Item name="dropoffState" label="State" rules={[{ required: true }]}>
              <Select placeholder="Select state" options={usStates} />
            </Form.Item>
            <Form.Item name="dropoffZip" label="Zip Code" rules={[{ required: true }]}>
              <Input placeholder="Enter zip code" />
            </Form.Item>
          </div>
        </div>
        <Form.Item name="cargoType" label="Cargo Type" rules={[{ required: true }]}>
          <Input placeholder="Enter cargo type" />
        </Form.Item>
        <Form.Item name="vehicleType" label="Vehicle Type" rules={[{ required: true }]}>
          <Select placeholder="Select vehicle type">
            <Select.Option value="small">Small</Select.Option>
            <Select.Option value="medium">Medium</Select.Option>
            <Select.Option value="large">Large</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="pickupTime" label="Pickup Time" rules={[{ required: true }]}>
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>

      {/* Cost Modal */}
      <Modal
        title="Booking Cost"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="confirm" type="primary" onClick={handleConfirmBooking}>
            Confirm Booking
          </Button>,
        ]}
      >
        <p>Your estimated cost is: <strong>${cost}</strong></p>
      </Modal>
    </div>
  );
};

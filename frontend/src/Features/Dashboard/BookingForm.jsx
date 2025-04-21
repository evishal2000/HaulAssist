import React, { useState } from "react";
import { Form, Input, Select, DatePicker, message, Button, Modal } from "antd";
import { useAuth } from "../Auth/useAuth";
import { usStates } from "./Utility/states";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../Utils/axiosInstance";

export const BookingForm = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cost, setCost] = useState(null);
  const navigate= useNavigate();
  const axios=useAxios();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("Form Data:", values);

      const pickupPlace=values.pickupStreet+ " "+values.pickupCity+" "+values.pickupZip;
      console.log(pickupPlace);
      //getting co ordinates of pickup address
      const pickup = await axios.get(`http://localhost:8080/v1/location`, {
        params: { place :pickupPlace}
      });
      //coordinates of drop off address
      const dropoffPlace=values.dropoffStreet+ " "+values.dropoffCity+" "+values.dropoffZip;
     //fetching estimated cost 
      const dropoff = await axios.get(`http://localhost:8080/v1/location`, {
        params: { place :dropoffPlace}
      });
      const response =await axios.post("http://localhost:8080/v1/cargo/cost",
       {
        "name" : values.cargoType,
        "vehicle_type" :values.vehicleType,
        "pickup":pickup.data,
        "dropoff":dropoff.data,
        "pickup_time":"2025-03-31T15:04:05Z"
      });
      setCost(response.data);
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
        <div style={{ display: "flex", justifyContent: "space-between" }} className="form-address">
          <div className="form-side">
            <h3>Pickup Address</h3>
            <Form.Item 
              name="pickupStreet" 
              label="Street" 
              rules={[{ required: true }]} 
              data-testid="pickupStreet"
            >
              <Input placeholder="Enter street" data-testid="pickupStreet-input" />
            </Form.Item>
            <Form.Item 
              name="pickupCity" 
              label="City" 
              rules={[{ required: true }]} 
              data-testid="pickupCity"
            >
              <Input placeholder="Enter city" data-testid="pickupCity-input" />
            </Form.Item>
            <Form.Item 
              name="pickupState" 
              label="State" 
              rules={[{ required: true }]} 
              data-testid="pickupState"
            >
              <Select placeholder="Select state" options={usStates} data-testid="pickupState-select" />
            </Form.Item>
            <Form.Item 
              name="pickupZip" 
              label="Zip Code" 
              rules={[{ required: true }]} 
              data-testid="pickupZip"
            >
              <Input placeholder="Enter zip code" data-testid="pickupZip-input" />
            </Form.Item>
          </div>
          <div className="form-side">
            <h3>Dropoff Address</h3>
            <Form.Item 
              name="dropoffStreet" 
              label="Street" 
              rules={[{ required: true }]} 
              data-testid="dropoffStreet"
            >
              <Input placeholder="Enter street" data-testid="dropoffStreet-input" />
            </Form.Item>
            <Form.Item 
              name="dropoffCity" 
              label="City" 
              rules={[{ required: true }]} 
              data-testid="dropoffCity"
            >
              <Input placeholder="Enter city" data-testid="dropoffCity-input" />
            </Form.Item>
            <Form.Item 
              name="dropoffState" 
              label="State" 
              rules={[{ required: true }]} 
              data-testid="dropoffState"
            >
              <Select placeholder="Select state" options={usStates} data-testid="dropoffState-select" />
            </Form.Item>
            <Form.Item 
              name="dropoffZip" 
              label="Zip Code" 
              rules={[{ required: true }]} 
              data-testid="dropoffZip"
            >
              <Input placeholder="Enter zip code" data-testid="dropoffZip-input" />
            </Form.Item>
          </div>
        </div>
        <Form.Item 
          name="cargoType" 
          label="Cargo Type" 
          rules={[{ required: true }]} 
          data-testid="cargoType"
        >
          <Input placeholder="Enter cargo type" data-testid="cargoType-input" />
        </Form.Item>
        <Form.Item 
          name="vehicleType" 
          label="Vehicle Type" 
          rules={[{ required: true }]} 
          data-testid="vehicleType"
        >
          <Select placeholder="Select vehicle type" data-testid="vehicleType-select">
            <Select.Option value="small">Small</Select.Option>
            <Select.Option value="medium">Medium</Select.Option>
            <Select.Option value="large">Large</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item 
          name="pickupTime" 
          label="Pickup Time" 
          rules={[{ required: true }]} 
          data-testid="pickupTime"
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" data-testid="pickupTime-datepicker" />
        </Form.Item>
        <Form.Item data-testid="submitButton">
          <Button 
            type="primary" 
            htmlType="submit" 
            onClick={handleSubmit} 
            data-testid="submitButton1"
          >
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
          <Button key="cancel" onClick={() => setIsModalOpen(false)} data-testid="cancelButton">
            Cancel
          </Button>,
          <Button key="confirm" type="primary" onClick={handleConfirmBooking} data-testid="confirmButton">
            Confirm Booking
          </Button>,
        ]}
      >
        <p>Your estimated cost is: <strong>${cost}</strong></p>
      </Modal>
    </div>
  );
};

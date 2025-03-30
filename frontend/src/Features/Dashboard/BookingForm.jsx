import React, { useState } from 'react';
import { Form, Input, Select, DatePicker, message,Button } from 'antd';
import { usStates } from './Utility/states';


export const BookingForm = () => {
  const [form] = Form.useForm();
  const [pickupLocation, setPickupLocation] = useState({ lat: 0, lng: 0 });
  const [dropoffLocation, setDropoffLocation] = useState({ lat: 0, lng: 0 });
  console.log(process.env.GOOGLEMAPS_API);
  const geocode = async (address, type) => {
    try {
      console.log(process.env.GOOGLEMAPS_API);
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.GOOGLEMAPS_API}`);
      const data = await response.json();
      if (data.status === 'OK') {
        const location = data.results[0].geometry.location;
        if (type === 'pickup') {
          setPickupLocation({ lat: location.lat, lng: location.lng });
        } else {
          setDropoffLocation({ lat: location.lat, lng: location.lng });
        }
      } else {
        message.error('Location not found. Please check the address.');
      }
    } catch (error) {
      message.error('Error fetching location data.');
    }
  };

  const handleValuesChange = (changedValues, allValues) => {
    if (changedValues.pickupAddress) {
      geocode(allValues.pickupAddress, 'pickup');
    }
    if (changedValues.dropoffAddress) {
      geocode(allValues.dropoffAddress, 'dropoff');
    }
  };
  return (
    <div style={{ padding: '20px', width: "60%" }}>
      <Form form={form} layout="vertical" onValuesChange={handleValuesChange}>
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
              <Input placeholder="Enter state" />
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
              <Input placeholder="Enter state" />
            </Form.Item>
            <Form.Item name="dropoffZip" label="Zip Code" rules={[{ required: true }]}> 
              <Input placeholder="Enter zip code" />
            </Form.Item>
          </div>
        </div>
        <Form.Item name="name" label="Cargo Name" rules={[{ required: true }]}> 
          <Input placeholder="Enter cargo name" />
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
          <Button type="primary" htmlType="submit" onClick="handleValuesChange">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
}  
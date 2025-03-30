import React, { useState } from 'react';
import { Form, Input, Select, DatePicker, message,Button } from 'antd';

const usStates = [
  { value: 'Alabama', label: 'Alabama' },
  { value: 'Alaska', label: 'Alaska' },
  { value: 'Arizona', label: 'Arizona' },
  { value: 'Arkansas', label: 'Arkansas' },
  { value: 'California', label: 'California' },
  { value: 'Colorado', label: 'Colorado' },
  { value: 'Connecticut', label: 'Connecticut' },
  { value: 'Delaware', label: 'Delaware' },
  { value: 'Florida', label: 'Florida' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Hawaii', label: 'Hawaii' },
  { value: 'Idaho', label: 'Idaho' },
  { value: 'Illinois', label: 'Illinois' },
  { value: 'Indiana', label: 'Indiana' },
  { value: 'Iowa', label: 'Iowa' },
  { value: 'Kansas', label: 'Kansas' },
  { value: 'Kentucky', label: 'Kentucky' },
  { value: 'Louisiana', label: 'Louisiana' },
  { value: 'Maine', label: 'Maine' },
  { value: 'Maryland', label: 'Maryland' },
  { value: 'Massachusetts', label: 'Massachusetts' },
  { value: 'Michigan', label: 'Michigan' },
  { value: 'Minnesota', label: 'Minnesota' },
  { value: 'Mississippi', label: 'Mississippi' },
  { value: 'Missouri', label: 'Missouri' },
  { value: 'Montana', label: 'Montana' },
  { value: 'Nebraska', label: 'Nebraska' },
  { value: 'Nevada', label: 'Nevada' },
  { value: 'New Hampshire', label: 'New Hampshire' },
  { value: 'New Jersey', label: 'New Jersey' },
  { value: 'New Mexico', label: 'New Mexico' },
  { value: 'New York', label: 'New York' },
  { value: 'North Carolina', label: 'North Carolina' },
  { value: 'North Dakota', label: 'North Dakota' },
  { value: 'Ohio', label: 'Ohio' },
  { value: 'Oklahoma', label: 'Oklahoma' },
  { value: 'Oregon', label: 'Oregon' },
  { value: 'Pennsylvania', label: 'Pennsylvania' },
  { value: 'Rhode Island', label: 'Rhode Island' },
  { value: 'South Carolina', label: 'South Carolina' },
  { value: 'South Dakota', label: 'South Dakota' },
  { value: 'Tennessee', label: 'Tennessee' },
  { value: 'Texas', label: 'Texas' },
  { value: 'Utah', label: 'Utah' },
  { value: 'Vermont', label: 'Vermont' },
  { value: 'Virginia', label: 'Virginia' },
  { value: 'Washington', label: 'Washington' },
  { value: 'West Virginia', label: 'West Virginia' },
  { value: 'Wisconsin', label: 'Wisconsin' },
  { value: 'Wyoming', label: 'Wyoming' },
  { value: 'District of Columbia', label: 'District of Columbia' },
];

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
import { authState } from "../Auth/authState";
import { useRecoilValue } from "recoil";
import { Card, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const { Title, Text } = Typography;

export const Dashboard = () => {
  const auth = useRecoilValue(authState);
  const navigate = useNavigate();
  console.log("Auth State Debug:", auth);

  return (
    <div className="dashboard-container">
      {/* <Title level={2} className="dashboard-title">Welcome, {auth?.user?.name || "User"}!</Title> */}
      <Title level={2} className="dashboard-title">Welcome </Title>
      <Text className="dashboard-subtitle">Manage your bookings and plan new hauls easily.</Text>
      <Card className="dashboard-card">
        <div className="dashboard-content">
          <div><Text className="dashboard-text">Ready to book a new haul?</Text></div> 
          <Button type="primary" className="dashboard-button" onClick={() => navigate("/booking-form")}>
            Book a Haul
          </Button>
        </div>
      </Card>
    </div>
  );
};

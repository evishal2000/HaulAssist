import { authState } from "../Auth/authState";
import { useRecoilValue } from "recoil";
import { Card, Button, Typography, Row, Col, Statistic } from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowRightOutlined, RocketFilled } from "@ant-design/icons";
import "./Dashboard.css";

const { Title, Text } = Typography;

export const Dashboard = () => {
  const auth = useRecoilValue(authState);
  const navigate = useNavigate();

  // Temporary stats - replace with real data from your API
  const stats = [
    { title: "Upcoming Bookings", value: 2 },
    { title: "Completed Hauls", value: 15 },
    { title: "Total Spent", value: "$1,240" },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <Title level={2} className="dashboard-title">
          Welcome back, {auth?.user?.name || "User"}! <span className="wave">👋</span>
        </Title>
        <Text className="dashboard-subtitle">
          Here's what's happening with your hauls today
        </Text>
      </div>

      <Row gutter={[24, 24]} className="stats-row">
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card className="stat-card">
              <Statistic
                title={stat.title}
                value={stat.value}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Card className="action-card">
        <div className="action-content">
          <div className="action-text">
            <RocketFilled className="action-icon" />
            <Title level={4} className="action-title">
              Ready for your next haul?
            </Title>
            <Text className="action-subtitle">
              Book now and experience seamless logistics delivery
            </Text>
          </div>
          <Button
            type="primary"
            size="large"
            className="action-button"
            onClick={() => navigate("/booking-form")}
          >
            Schedule New Haul <ArrowRightOutlined />
          </Button>
        </div>
      </Card>

      <Card className="recent-activity">
        <Title level={4} className="section-title">Recent Activity</Title>
        <div className="activity-list">
          {/* Add dynamic activity items here */}
          <div className="activity-item">
            <Text className="activity-text">Haul #1234 completed successfully</Text>
            <Text type="secondary" className="activity-time">2 hours ago</Text>
          </div>
          <div className="activity-item">
            <Text className="activity-text">Payment received for Haul #1233</Text>
            <Text type="secondary" className="activity-time">5 hours ago</Text>
          </div>
        </div>
      </Card>
    </div>
  );
};

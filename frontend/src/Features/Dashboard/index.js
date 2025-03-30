import { authState } from "../Auth/authState";
import { useRecoilValue } from "recoil";
import {Button} from "antd";

export const Dashboard = () => {
  const auth = useRecoilValue(authState);
  console.log("Auth State Debug:", auth);
  return (
    <div>
      <h1>In Dashboard</h1>
      <Button type="primary" href="/booking-form">Book a Haul</Button>
    </div>
  );
};
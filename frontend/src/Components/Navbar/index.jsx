import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import logo from "../../Images/HaulAssist.png";
 import { authState } from "../../Features/Auth/authState";
import { useRecoilValue, useSetRecoilState } from "recoil";

export const Navbar = () => {
  const { Header } = Layout;
  const navigate = useNavigate();
  const user = useRecoilValue(authState); 
  const setAuthState = useSetRecoilState(authState);  

const PageLinks = [
  { key: "1", label: user?.token ? "Dashboard" : "Home", target: user?.token ? "/dashboard" : "/" },
  { key: "2", label: "About", target: "/about" },
  { key: "3", label: "Features", target: "/features" },
  ...(user?.token
    ? [
        { key: "4", label: "Bookings", target: "/bookings" },
        { key: "5", label: "Logout", target: "/logout" },
      ]
    : [{ key: "6", label: "Login", target: "/login" }]),
];

  const handleMenuClick = (e) => {
    const { target } = PageLinks.find((item) => item.key === e.key) || {};
    // if (target) navigate(target);
    if (target) {
      if (target === "/logout") {
        // Handle logout by clearing authState
        setAuthState({ user: null, token: null });  // Clear authState
        navigate("/");  // Redirect to home after logout
      } else {
        navigate(target);
      }
    }
  };
  return (
    <Header className="navbar">
      <div className="navbar-logo-container">
        <img className="navbar-logo" src={logo} alt={"HaulAssist"} />
      </div>
      <Menu
        mode="horizontal"
        items={PageLinks.map((link) => ({
          key: link.key,
          label: link.label,
        }))}
        theme="light"
        className="navbar-menu"
        onClick={handleMenuClick}
      />
    </Header>
  );
};

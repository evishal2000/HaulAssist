import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import logo from "../../Images/HaulAssist.png";
 import { authState } from "../../Features/Auth/authState";
import { useRecoilValue } from "recoil";

export const PageLinks = [
  {
    key: "1",
    label: "Home",
    target:"/",
  },
  {
    key: "2",
    label:  "About",
    target:"/about",
  },
  {
    key: "3",
    label:  "Features",
    target:"/features",
  },
  {
    key: "4",
    label: "Login",
    target:"/login",
  },
];

export const Navbar = () => {
  const { Header } = Layout;
  const navigate = useNavigate();
  // const user=authState();
  // console.log(user);
  const handleMenuClick = (e) => {
    const { target } = PageLinks.find((item) => item.key === e.key) || {};
    if (target) navigate(target);
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

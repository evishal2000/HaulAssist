import { Layout, Menu } from "antd";
import "./styles.css";
import logo from "../../Images/HaulAssist.png"

export const PageLinks = [
  {
    key: "1",
    label: <a href="/">Home</a>,
  },
  {
    key: "2",
    label:  <a href="/about">About</a>,
  },
  {
    key: "3",
    label:  <a href="/features">Features</a>,
  },
  {
    key: "4",
    label:  <a href="/login">Login</a>,
  },
];

export const Navbar = () => {
  const { Header } = Layout;
  return (
    <Header className="navbar">
      <div className="navbar-logo-container">
        <img className="navbar-logo" src={logo} alt={"HaulAssist"} />
      </div>
      <Menu
        mode="horizontal"
        items={PageLinks}
        theme="light"
        className="navbar-menu"
      />
    </Header>
  );
};

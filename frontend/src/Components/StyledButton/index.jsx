import { Button } from "antd";
import clsx from "clsx";
import "./styles.css";
import "antd/dist/reset.css";

export const StyledButton = ({
  children,
  disabled= false,
  onClick,
  className = "styled-button",
  ...props
}) => {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      type="primary"
      className={clsx("styled-button", className)}
      {...props}
    >
      <span className="styled-button-text"> {children}</span>
    </Button>
  );
};

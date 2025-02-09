import { Input } from "antd";
import "./styles.css";
import { useMemo } from "react";

export const InputBox = ({
  placeholder,
  value,
  onChange,
  required = true,
  widthSize = "medium",
  heightSize= "medium",
  ...props
}) => {
  const calculatedWidth = useMemo(() => {
    switch (widthSize) {
      case "small":
        return "30%";
      case "medium":
        return "50%";
      case "large":
        return "90%";
      default:
        return "50%";
    }
  }, [widthSize]);

  const calculatedHeight = useMemo(() => {
    switch (heightSize) {
      case "small":
        return "36px";
      case "medium":
        return "48px";
      case "large":
        return "60px";
      default:
        return "48px";
    }
  }, [heightSize]);

  return (
    <Input
      className="input-box-text"
      placeholder={placeholder}
      value={value}
      onChange={(event) => {
        event.preventDefault();
        onChange(event.target.value);
      }}
      required={required}
      style={{
        width: calculatedWidth,
        height: calculatedHeight,
        ...props.style
      }}
      {...props}
    />
  );
};

import { Flex, Form, Input, Typography } from "antd";
import { StyledButton } from "../../Components/StyledButton";
import { InputBox } from "../../Components/TextInputBox";
import { useEffect, useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export const Login = () => {
  const [form] = Form.useForm();
  const { Title } = Typography;
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    await login(userDetails.email, userDetails.password);
    navigate("/dashboard");
  };


 const onValuesChange = (changedValues, allValues) => {
  console.log("Form values changed:", allValues);
  setUserDetails(allValues);
};

  return (
    <Flex style={{ width: "100%", marginTop: "10%" }} justify="center" align="center" vertical>
      <Title level={2}>Login</Title>
      <Form form={form} autoComplete="off" style={{ width: "100%" }} className="login-form" onValuesChange={onValuesChange}>
        <InputBox
          placeholder="Email"
          onChange={(value) => setUserDetails((prev) => ({ ...prev, email: value }))}
          value={userDetails.email}

          widthSize="small"
        />
  
        <Input.Password
          placeholder="Password"
          className="login-form-password"
          value={userDetails.password}
          onChange={(event) => setUserDetails((prev) => ({ ...prev, password: event.target.value }))}
        />
        <StyledButton disabled={!userDetails.email || !userDetails.password} onClick={handleLogin}>
          Login
        </StyledButton>
      </Form>
      <Typography.Text>
        New user? <span className="register-link" onClick={() => navigate("/register")} style={{ color: "#1890ff", cursor: "pointer" }}>Register</span>
      </Typography.Text>
    </Flex>
  );
};

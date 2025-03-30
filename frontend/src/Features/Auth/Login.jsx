import { Flex, Form, Input, Typography,notification } from "antd";
import { StyledButton } from "../../Components/StyledButton";
import { InputBox } from "../../Components/TextInputBox";
import { useEffect, useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { useSetRecoilState } from 'recoil';
import { authState } from "./authState";
import { useAxios } from "../../Utils/axiosInstance";

export const Login = () => {
  const [form] = Form.useForm();
  const { Title } = Typography;
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  

  const axios = useAxios();
  const setAuthState = useSetRecoilState(authState);
  
  const handleLogin = async () => {
    try {
      const response = await axios.post('/v1/login', {
        email: userDetails.email,
        password: userDetails.password,
      });
       console.log(response);

      const { token, user } = response.data; 
     console.log(token);
      // Update Recoil state
      setAuthState({ user, token });
      api.success({
        message: 'Login Successful',
        description: 'You have successfully logged in.',
      });
      //naviagtion here
    } catch (error) {
      api.error({
        message: 'Login Failed',
        description: error.response?.data?.message || 'An error occurred during login.',
      });
    }
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
         data-testid="email-input"
          placeholder="Email"
          onChange={(value) => setUserDetails((prev) => ({ ...prev, email: value }))}
          value={userDetails.email}

          widthSize="small"
        />
  
        <Input.Password
          data-testid="password-input"
          placeholder="Password"
          className="login-form-password"
          value={userDetails.password}
          onChange={(event) => setUserDetails((prev) => ({ ...prev, password: event.target.value }))}
        />
        <StyledButton data-testid="login-button" disabled={!userDetails.email || !userDetails.password} onClick={handleLogin}>
          Login
        </StyledButton>
      </Form>
      <Typography.Text>
        New user? <span className="register-link" onClick={() => navigate("/register")} style={{ color: "#1890ff", cursor: "pointer" }}>Register</span>
      </Typography.Text>
    </Flex>
  );
};

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
      if(response.status!==200){
        api.error({
          message: 'Login Failed',
          description: 'Invalid response from the server.',
        });
        }
        else {
           console.log(response.status);
           const { token, message } = response.data;
           // Update Recoil state
          const user=userDetails.email;
          setAuthState({ user, token });
  
          // Show success notification with backend message if available
          api.success({
          message: 'Login Successful',
          description: message || 'You have successfully logged in.',
           });
  
        navigate("/dashboard");
        }}
      catch (error) {
        console.log("In catch block");
        console.error('Login error:', error);
        const errorMessage = error.response?.data?.message || 'Invalid email or password.';
        api.error({
          message: 'Login Failed',
          description: errorMessage,
        });
      }}; 
  

 const onValuesChange = (changedValues, allValues) => {
  console.log("Form values changed:", allValues);
  setUserDetails(allValues);
};

  return (
    <>
    {contextHolder}
    <Flex style={{ width: "100%", marginTop: "10%" }} justify="center" align="center" vertical>
      <Title level={2}>Login</Title>
      <Form form={form} autoComplete="off" style={{ width: "100%" }} className="login-form" onValuesChange={onValuesChange}>
        <InputBox
         data-testid="email-input"
          placeholder="Email"
          onChange={(value) => setUserDetails((prev) => ({ ...prev, email: value }))}
          value={userDetails.email}
          className="login-form-email"
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
        New user? <span className="register-link" onClick={() => navigate("/register")} style={{ color: "rgb(79, 163, 232);", cursor: "pointer" }}>Register</span>
      </Typography.Text>
    </Flex>
    </>
  );
};

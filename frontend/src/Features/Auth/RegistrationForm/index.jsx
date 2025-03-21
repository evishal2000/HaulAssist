import { Flex, Form, Input, Typography, notification } from "antd";
import { StyledButton } from "../../../Components/StyledButton";
import "./styles.css";
import { InputBox } from "../../../Components/TextInputBox";
import { useState } from "react";
import { useSetRecoilState } from 'recoil';
import { authState } from "../authState";
import { useAxios } from "../../../Utils/axiosInstance";

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};


export const RegistrationForm = () => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const setAuthState = useSetRecoilState(authState);
  const axios = useAxios();
  
  const [userDetails, setUserDetails] = useState({
    name: form.getFieldValue("name"),
    email: form.getFieldValue("email"),
    password: form.getFieldValue("password"),
  });
 
  const handleRegister = async () => {
    try {
      const response = await axios.post('/v1/register', {
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
    } catch (error) {
      api.error({
        message: 'Login Failed',
        description: error.response?.data?.message || 'An error occurred during login.',
      });
    }
  };


  return (
    <Flex
      style={{
        width: "100%",
        marginTop: "10%",
      }}
      justify="center"
      align="center"
      vertical
    >
      {contextHolder}
      <Form
        initialValues={{
          remember: true,
        }}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{
          width: "100%",
        }}
        className="registration-form"
      >
        <InputBox
          placeholder={"Name"}
          onChange={(value) => {
            setUserDetails((prev) => ({ ...prev, name: value }));
            form.setFieldsValue({ name: value });
          }}
          value={userDetails.name}
          widthSize="small"
        />
        <InputBox
          placeholder={"Email"}
          onChange={(value) => {
            setUserDetails((prev) => ({ ...prev, email: value }));
            form.setFieldsValue({ email: value });
          }}
          value={userDetails.email}
          widthSize="small"
        />
        <Input.Password
          placeholder="password"
          className="registration-form-password"
          value={userDetails?.password}
          onChange={(event) => {
            event.preventDefault()
            setUserDetails((prev) => ({ ...prev, password: event.target.value }));
            form.setFieldsValue({ password: event.target.value });
          }}
        />
        <StyledButton
          disabled={
            !userDetails?.name?.length ||
            !userDetails?.email?.length ||
            !userDetails?.password?.length
          }
          onClick={handleRegister} >
          Register
        </StyledButton>
      </Form>
    </Flex>
  );
};

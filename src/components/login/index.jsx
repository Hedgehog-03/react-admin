import React, { useState, useEffect, useRef, createRef } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './style.less';

function Login(props) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  
  const onFinish = (values) => {
    console.log(values);
  };
  const onFormChange = (values) => {
    form.setFieldsValue(values);
  }
  const handleSubmit = () => {
    setLoading(true);

    props.history.push("/home");
  }
  return (
    <div>
      <Form
        form={form}
        onValuesChange={onFormChange}
        wrapperCol={{ span: 8, offset: 8 }}
        style={{ margin: "200px auto" }}
        name="normal_login"
        initialValues={{
          username: "admin",
          password: "123456"
        }}
        onFinish={onFinish}
      >
        <div className="login-header">
          <img className="login-header-icon" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2030278735,2628483606&fm=26&gp=0.jpg"></img>
          <span className="login-header-title">React-Admin</span>
        </div>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username"/>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            name="password"
            type="password"
            placeholder="Password"
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" size="large" htmlType="submit" className="login-form-button" onClick={handleSubmit}>
            {loading ? "登录中..." : "登录"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;

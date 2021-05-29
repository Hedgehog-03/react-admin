import style from './style.module.css';
import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  EyeInvisibleOutlined, 
  EyeTwoTone 
} from '@ant-design/icons';

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

    props.history.push("/home/index");
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
        <div className={style.loginHeader}>
          <img className={style.loginHeaderIcon} alt="react-admin" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2030278735,2628483606&fm=26&gp=0.jpg"></img>
          <span className={style.loginHeaderTitle}>React-Admin</span>
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
          <Input prefix={<UserOutlined/>} placeholder="Username"/>
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
            prefix={<LockOutlined/>}
            name="password"
            type="password"
            placeholder="Password"
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" size="large" htmlType="submit" onClick={handleSubmit}>
            {loading ? "登录中..." : "登录"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;

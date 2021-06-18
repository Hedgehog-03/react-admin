// 主页面
import React, { useState } from 'react';
import { Link, withRouter, Switch, Route } from 'react-router-dom';
import { Layout, Menu, Avatar, Button } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  BarsOutlined,
} from '@ant-design/icons';
// import { renderRoutes } from 'react-router-config';
import AuthRoute from '@/router/AuthRoute'
import User from '../User';
import noAuth from '@/components/Error/403';
import notFound from '@/components/Error/404';
import style from './style.module.css';

function HomeMain(props) {
  const [collapsed, setCollapsed] = useState(false);
  const logOut = () => {
    window.sessionStorage.clear();
    props.history.push("/login");
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Sider collapsible collapsed={collapsed} onCollapse={e => setCollapsed(!collapsed)}>
        <div className={style.logo}>
          {collapsed || "React Admin"}
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[props.history.location.pathname]} >
          <Menu.Item key="/home/information" icon={<HomeOutlined />}>
            <Link exact to="/home/information">员工信息</Link>
          </Menu.Item>
          <Menu.Item key="/home/train" icon={<BarsOutlined />}>
            <Link exact to="/home/train">员工培训</Link>
          </Menu.Item>
          <Menu.Item key="/home/performance" icon={<BarsOutlined />}>
            <Link exact to="/home/performance">员工绩效</Link>
          </Menu.Item>
          <Menu.Item key="/home/interview" icon={<BarsOutlined />}>
            <Link exact to="/home/interview">员工面试</Link>
          </Menu.Item>
          {
            window.sessionStorage.getItem("role") === "root" ? 
            (<Menu.Item key="/home/user" icon={<BarsOutlined />}>
              <Link exact to="/home/user">系统用户</Link>
            </Menu.Item>) : null
          }
        </Menu>
      </Layout.Sider>
      <Layout>
        <Layout.Header className={style.siteLayoutBackground} style={{ padding: 0 }}>
          <div className={style.profile}>
            <a href="/#" >
              <Avatar size="small" icon={<UserOutlined />} className={style.avatar} />
              Hedgehog
            </a>
            <Button style={{marginLeft: "10px"}} size="middle" danger onClick={logOut}>退出</Button>
          </div>
        </Layout.Header>
        <Layout.Content style={{ margin: '0 16px' }}>
          {/* 第一种方法实现登录鉴权 */}
          {/* {
            sessionStorage.getItem("token") ? renderRoutes(props.route.routes) : <Redirect to="/login" />
          } */}
          {/* 第二种方法实现登录鉴权 */}
          <Switch>
            {
              props.route.routes.map(({path, component, ...routes}) => 
              <AuthRoute exact key={path} path={path} component={component} {...routes}/>)
            }
            {/* root根用户的权限 */}
            {
              window.sessionStorage.getItem("role") === "root" ? <Route to="/home/user" component={User}/> : <Route exact to="/home/user" component={noAuth}/>
            }
            <Route component={notFound}/>
          </Switch>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Layout.Footer>
      </Layout>
    </Layout>
  );
}

export default withRouter(HomeMain);

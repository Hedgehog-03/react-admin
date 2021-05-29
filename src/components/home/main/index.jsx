// 主页面

import style from './style.module.css';
import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Avatar } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  BarsOutlined,
  DollarCircleOutlined
} from '@ant-design/icons';
import { renderRoutes } from 'react-router-config';
const { Header, Content, Footer, Sider } = Layout;

function HomeMain(props) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={e => setCollapsed(!collapsed)}>
        <div className={style.logo}>
          {collapsed || "React Admin"}
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link exact to="/home/index">员工信息</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<BarsOutlined />}>
            <Link exact to="/home/train">员工培训</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<BarsOutlined />}>
            <Link exact to="/home/index">员工绩效</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<BarsOutlined />}>
            <Link exact to="/home/index">员工面试</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<BarsOutlined />}>
            <Link exact to="/home/index">请假记录</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<BarsOutlined />}>
            <Link exact to="/home/index">员工考勤</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<BarsOutlined />}>
            <Link exact to="/home/index">员工工资单</Link>
          </Menu.Item>
          <Menu.Item key="8" icon={<BarsOutlined />}>
            <Link exact to="/home/index">系统用户</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className={style.siteLayoutBackground} style={{ padding: 0 }}>
          <a href="#" className={style.profile}>
            <Avatar size="small" icon={<UserOutlined />} className={style.avatar} />
              Hedgehog
            </a>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          {renderRoutes(props.route.routes)}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>

  );
}

export default withRouter(HomeMain);

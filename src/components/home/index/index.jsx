// 仪表板

import React from 'react';
import {Breadcrumb} from 'antd';

function HomeIndex() {
  return (
    <div>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>员工管理</Breadcrumb.Item>
        <Breadcrumb.Item>仪表板</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        Bill is a cat.
      </div>
    </div>
  );
}

export default HomeIndex;

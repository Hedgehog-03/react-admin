import React from "react";
import ReactDOM from "react-dom";
import { ConfigProvider } from "antd";
import reportWebVitals from "./reportWebVitals";
// 设置语言
import zhCN from "antd/lib/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";

import App from "./App.jsx";
import "antd/dist/antd.less";

moment.locale("zh-cn");

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

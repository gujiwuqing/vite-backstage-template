import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import './index.css';
import App from './App';
import 'antd/dist/antd.less';
import {ConfigProvider} from 'antd';
import 'antd/dist/antd.variable.min.css';

ReactDOM.render(
  <BrowserRouter>
    <ConfigProvider>
      <App/>
    </ConfigProvider>
  </BrowserRouter>,
  document.getElementById('root')
)

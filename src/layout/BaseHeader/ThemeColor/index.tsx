import React, {useState, useEffect} from 'react';
import {BgColorsOutlined, CheckOutlined} from '@ant-design/icons';
import {Dropdown, Card,ConfigProvider} from 'antd';
// import {changeAntdTheme} from 'dynamic-antd-theme';
import './index.less';

export default function ThemeColor() {

  useEffect(() => {
    let themeColor = localStorage.getItem('themeColor')
    if (themeColor) {
      setColor(themeColor)
      // changeAntdTheme(themeColor)
    }
  }, [])
  const [color, setColor] = useState('#2593ff');
  const [co, setCo] = useState({
    primaryColor: '#1890ff',
    errorColor: '#ff4d4f',
    warningColor: '#faad14',
    successColor: '#52c41a',
    infoColor: '#1890ff',
  });
  function onColorChange(nextColor:any) {
    const mergedNextColor = {
      ...co,
      ...nextColor,
    };
    setCo(mergedNextColor);
    console.log(mergedNextColor);
    ConfigProvider.config({
      theme: mergedNextColor,
    });
  }

  const colorsTop = [
    {name: '简洁蓝', color: '#2593ff'},
    {name: '科技蓝', color: '#2593fc'},
    {name: '极客蓝', color: '#206fee'},
    {name: '希望青', color: '#2cc5bd'},
    {name: '清新绿', color: '#31af70'},
  ];

  const colorsBottom = [
    {name: '优质紫', color: '#5150a4'},
    {name: '阳光黄', color: '#fa8c16'},
    {name: '活力橙', color: '#fa541c'},
    {name: '中国红', color: '#c60918'},
    {name: '酷炫黑', color: '#2c343f'},
  ];
  const card = (
    <Card className="io-theme-color-card" title="主题色">
      <div className="io-prev--colors">
        <div className="row">
          {colorsTop.map((c, index) => {
            return (
              <div
                key={c.color}
                className={`item ${index === 0 ? 'white' : ''}`}
                onClick={() => {
                  setColor(c.color)
                  // changeAntdTheme(c.color);
                  onColorChange({
                    primaryColor: c.color,
                  });
                  localStorage.setItem('themeColor', c.color)
                }}
              >
                <div style={{background: c.color}}>
                  {color === c.color && (
                    <CheckOutlined style={{color: '#fff'}}/>
                  )}
                </div>
                <p>{c.name}</p>
              </div>
            );
          })}
        </div>
        <div className="row">
          {colorsBottom.map((c) => {
            return (
              <div
                key={c.color}
                className="item"
                onClick={() => {
                  setColor(c.color)
                  // changeAntdTheme(c.color);
                  onColorChange({
                    primaryColor: c.color,
                  });
                  localStorage.setItem('themeColor', c.color)
                }}
              >
                <div style={{background: c.color}}>
                  {color === c.color && (
                    <CheckOutlined style={{color: '#fff'}}/>
                  )}
                </div>
                <p>{c.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
  return (
    <>
      <Dropdown overlay={card} trigger={['click']}>
        <BgColorsOutlined
          className="header-icon"
        />
      </Dropdown>
    </>
  );
}

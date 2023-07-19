import state from "@/store/store";
import { BgColorsOutlined, CheckOutlined } from "@ant-design/icons";
import { Button, Card, Dropdown } from "antd";
import React from "react";
import styled from "styled-components";
import { useSnapshot } from "valtio";

const StyledIcon = styled(BgColorsOutlined)`
  /* 在这里添加所需的样式 */
  font-size: 24px;
  cursor: pointer;
`;

const StyledCard = styled(Card)`
  /* 在这里添加所需的样式 */
  width: 368px;
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.15);
  border-radius: 16px;
  :where(.css-dev-only-do-not-override-ckjwgd).ant-card .ant-card-body {
    padding: 0 !important;
  }
  .ant-dropdown-menu-head {
    border-bottom: 1px solid #d9d9d9;
    .ant-dropdown-menu-head-title {
      width: 50px;
      height: 14px;
      font-size: 14px;

      font-weight: 500;
      color: #000000;
      line-height: 30px;
      margin-left: 15px;
      margin-bottom: 13px;
    }
  }
  .io-prev--colors {
    display: flex;
    flex-direction: column;
    margin: 16px 26px;
    .row {
      display: flex;
      justify-content: space-around;
      width: 100%;
      .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        & > div {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 32px;
          height: 32px;
          cursor: pointer;
        }
        & > p {
          font-size: 14px;
          color: #000000;
          line-height: 30px;
          cursor: pointer;
        }
      }
    }
  }
  .icon-select {
    color: #ffffff;
  }
`;

const colorsTop = [
  { name: "简洁蓝", color: "#1890ff" },
  { name: "科技蓝", color: "#2593fc" },
  { name: "极客蓝", color: "#206fee" },
  { name: "希望青", color: "#2cc5bd" },
  { name: "清新绿", color: "#31af70" },
];

const colorsBottom = [
  { name: "优质紫", color: "#5150a4" },
  { name: "阳光黄", color: "#fa8c16" },
  { name: "活力橙", color: "#fa541c" },
  { name: "中国红", color: "#c60918" },
  { name: "酷炫黑", color: "#2c343f" },
];

export default function ThemeColor() {
  const { themeColor, changeThemeColor } = useSnapshot(state);

  const ThemeColorCard = () => (
    <StyledCard title="主题色">
      <div className="io-prev--colors">
        <div className="row">
          {colorsTop.map((c, index) => {
            return (
              <div
                key={c.color}
                className={`item ${index === 0 ? "white" : ""}`}
                onClick={() => {
                  changeThemeColor(c.color);
                }}
              >
                <div style={{ background: c.color }}>
                  {themeColor === c.color && (
                    <CheckOutlined style={{ color: "#fff" }} />
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
                  changeThemeColor(c.color);
                }}
              >
                <div style={{ background: c.color }}>
                  {themeColor === c.color && (
                    <CheckOutlined style={{ color: "#fff" }} />
                  )}
                </div>
                <p>{c.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </StyledCard>
  );
  return (
    <Dropdown
      dropdownRender={() => {
        return <ThemeColorCard />;
      }}
    >
      <StyledIcon />
    </Dropdown>
  );
}

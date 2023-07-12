import state from "@/store/store";
import { TranslationOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, message } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSnapshot } from "valtio";

export default function Language() {
  const { i18n } = useTranslation();
  const { language, changeLanguage } = useSnapshot(state);
  const onClick = (key: string) => {
    i18n.changeLanguage(key);
    changeLanguage(key);
    key == "zh_CN"
      ? message.success("切换语言成功")
      : message.success("Switch Language Success");
  };

  const items: MenuProps["items"] = [
    {
      key: "zh_CN",
      label: <span onClick={() => onClick("zh_CN")}>中文(CN)</span>,
    },
    {
      key: "en_US",
      label: <span onClick={() => onClick("en_US")}>English(US)</span>,
    },
  ];
  return (
    <>
      <Dropdown
        menu={{ items, selectable: true, defaultSelectedKeys: [language] }}
        trigger={["click"]}
      >
        <TranslationOutlined style={{ fontSize: 24, margin: "0 24px" }} />
      </Dropdown>
    </>
  );
}

import { updateRolePermission } from "@/service/role";
import { MenuItemDTO } from "@/service/menu/menuDTO";
import { Modal, TreeSelect } from "antd";
import React, { useState } from "react";

interface MenuModalProps {
  roleId: string;
  visible: boolean;
  onCancel: () => void;
  treeData: MenuItemDTO[];
}

// 获取菜单树
const getTree = (menus: MenuItemDTO[]) => {
  const resultArray: any[] = [];
  menus.forEach((item: MenuItemDTO) => {
    if (item.level === "1") {
      resultArray.push({
        title: item.title,
        value: item.id,
      });
    } else if (item.level === "2") {
      const parentItem = resultArray.find(
        (parent) => parent.value === item.parentMenuId
      );
      if (parentItem) {
        if (!parentItem.children) {
          parentItem.children = [];
        }
        parentItem.children.push({
          title: item.title,
          value: item.id,
        });
      }
    }
  });
  return resultArray;
};
export default function MenuModal({
  roleId = "",
  visible = false,
  onCancel,
  treeData,
}: MenuModalProps) {
  const [value, setValue] = useState<string>();

  const onChange = (newValue: string) => {
    console.log(newValue);
    setValue(newValue);
  };

  const onOk = async () => {
    const { data } = await updateRolePermission({ id: roleId, menus: value });
    console.log(value);
  };
  return (
    <Modal open={visible} title="菜单配置" onCancel={onCancel} onOk={onOk}>
      <TreeSelect
        showSearch
        style={{ width: "100%" }}
        value={value}
        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
        placeholder="Please select"
        allowClear
        multiple
        treeDefaultExpandAll
        onChange={onChange}
        treeData={getTree(treeData)}
      />
    </Modal>
  );
}

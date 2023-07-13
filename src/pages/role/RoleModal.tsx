import { getMenuList } from '@/service/menu';
import { MenuItemDTO } from '@/service/menu/menuDTO';
import { getMenuTree } from '@/utils/util';
import { Modal, TreeSelect } from 'antd';
import React, { useState, useEffect } from 'react';

interface RoleModalProps {
  visible: boolean;
  onCancel: () => void;
  treeData: MenuItemDTO[];
}
export default function RoleModal({
  visible = false,
  onCancel,
  treeData,
}: RoleModalProps) {
  const [value, setValue] = useState<string>();

  const onChange = (newValue: string) => {
    console.log(newValue);
    setValue(newValue);
  };
  console.log('treeData', getMenuTree(treeData));
  return (
    <Modal open={visible} title="菜单配置" onCancel={onCancel}>
      <TreeSelect
        showSearch
        style={{ width: '100%' }}
        value={value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select"
        allowClear
        multiple
        treeDefaultExpandAll
        onChange={onChange}
        treeData={getMenuTree(treeData)}
      />
    </Modal>
  );
}

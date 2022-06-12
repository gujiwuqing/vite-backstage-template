import React from 'react';
import {ProFormText, ProForm, ProFormSelect, ProFormTreeSelect} from '@ant-design/pro-components';
import {createMenu} from '@/service/menu';
import {message} from 'antd';
import {useNavigate} from 'react-router-dom';
import {getMenuList} from '@/service/menu';

const RoleCreate = () => {
  const navigate = useNavigate();
  return (
    <div>
      <ProForm onFinish={async (values) => {
        await createMenu({...values});
        message.success('提交成功');
        navigate('/menu/list', {replace: true});
      }}>
        <ProFormText name="title" label="菜单名称" placeholder="请输入菜单名称" rules={[{required: true}]}/>
        <ProFormText name="sort" label="菜单排序" placeholder="请输入菜单排序"/>
        <ProFormText name="level" label="菜单层级" placeholder="请输入菜单层级"/>
        <ProFormText name="code" label="菜单编码" placeholder="请输入菜单编码"/>
        <ProFormSelect
          name="type"
          label="菜单类型"
          valueEnum={{
            menu: '菜单',
            button: '按钮',
          }}
          placeholder="请选择菜单类型"
          rules={[{required: true, message: '请选择菜单类型'}]}
        />
        <ProFormText name="path" label="路由地址" placeholder="请输入路由地址"/>
        <ProFormTreeSelect
          name="parentMenu"
          label="父级菜单"
          placeholder="请选择父级菜单"
          allowClear
          secondary
          request={async () => {
            const {data} = await getMenuList();
            return data;
          }}
          // tree-select args
          fieldProps={{
            showArrow: false,
            filterTreeNode: true,
            showSearch: true,
            dropdownMatchSelectWidth: false,
            labelInValue: false,
            autoClearSearchValue: true,
            multiple: false,
            treeNodeFilterProp: 'title',
            fieldNames: {
              label: 'title',
              value: 'id',
              children: 'childMenus'
            },
          }}
        />
      </ProForm>
    </div>
  );
};

export default RoleCreate;

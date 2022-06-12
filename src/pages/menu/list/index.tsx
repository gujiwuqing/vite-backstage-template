import type {ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import {Button} from 'antd';
import React from 'react';
import {getMenuPage} from '@/service/menu';
import {MenuItemDTO} from '@/service/menu/menuDTO';
import {useNavigate} from 'react-router-dom';


const columns: ProColumns<MenuItemDTO>[] = [
  {
    title: '菜单名称',
    dataIndex: 'title',
  },{
    title: '路由地址',
    dataIndex: 'path',
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueEnum: {
      0: {text: '关闭',},
      1: {text: '启用',},
    },
  }, {
    title: '类型',
    dataIndex: 'type',
    valueEnum: {
      menu: {text: '菜单',},
      button: {text: '按钮',},
    },
  },
  {
    title: '编码',
    dataIndex: 'code',
  },
  {
    title: '创建时间',
    key: 'createdAt',
    dataIndex: 'createdAt',
    valueType: 'dateTime',
    hideInSearch: true,
    sorter: true
  },
  {
    title: '操作',
    width: 180,
    key: 'option',
    valueType: 'option',
    render: () => [
      <a key="link">查看</a>,
      <a key="link2">编辑</a>,
    ],
  },
];

export default () => {
  const navigate = useNavigate();
  return (
    <ProTable<MenuItemDTO>
      columns={columns}
      request={async (params, sorter, filter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        console.log(params, sorter, filter);
        const {data: {list, total}} = await getMenuPage({
          ...params,
          pageNo: params.current
        });
        return {
          data: list,
          total,
          success: true,
        };
      }}
      rowKey="id"
      pagination={{
        showQuickJumper: true,
        pageSize: 10
      }}
      search={{
        labelWidth: 'auto',
      }}
      dateFormatter="string"
      headerTitle={false}
      toolBarRender={() => [
        <Button type="primary" key="primary" onClick={() => {
          navigate('/menu/create');
        }}>
          创建菜单
        </Button>,
      ]}
    />
  );
};

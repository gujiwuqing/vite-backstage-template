import type {ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import {Button} from 'antd';
import React from 'react';
import {getRolePage} from '@/service/role';
import {RoleItemDTO} from '@/service/role/roleDTO';
import {useNavigate} from 'react-router-dom';


export default () => {
  const navigate = useNavigate();
  const handleUpdate = (row: RoleItemDTO) => {
    console.log(row);
    navigate(`/role/create/?id=${row.id}`, {replace: true});
  };
  const columns: ProColumns<RoleItemDTO>[] = [
    {
      title: '角色名称',
      dataIndex: 'name',
    },
    {
      title: '角色类型',
      dataIndex: 'type',
      valueEnum: {
        visitor: {text: '访客', status: 'Default'},
        admin: {text: '管理员', status: 'Default'},
        root: {text: '超级管理员', status: 'Processing'},
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
      hideInSearch: true
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
      render: (_, row) => [
        <a key="link">查看</a>,
        <a key="link2" onClick={() => {
          handleUpdate(row);
        }}>编辑</a>,
      ],
    },
  ];
  return (
    <ProTable<RoleItemDTO>
      columns={columns}
      request={async (params, sorter, filter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        console.log(params, sorter, filter);
        const {data: {list, total}} = await getRolePage({
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
          navigate('/role/create');
        }}>
          创建角色
        </Button>,
      ]}
    />
  );
};

import type {ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import {Button} from 'antd';
import React from 'react';
import {userPage} from '@/service/user';
import {UserItemDTO} from '@/service/user/userDTO';
import {useNavigate} from 'react-router-dom';


export default () => {
  const navigate = useNavigate();
  const handleUpdate = (row: UserItemDTO) => {
    navigate(`/user/create/?id=${row.id}`, {replace: true});
  };
  const columns: ProColumns<UserItemDTO>[] = [
    {
      title: '用户名称',
      dataIndex: 'username',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
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
        }}>编辑</a>
      ],
    },
  ];
  return (
    <ProTable<UserItemDTO>
      columns={columns}
      request={async (params, sorter, filter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        console.log(params, sorter, filter);
        const {data: {list, total}} = await userPage({
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
          navigate('/user/create');
        }}>
          创建用户
        </Button>,
      ]}
    />
  );
};

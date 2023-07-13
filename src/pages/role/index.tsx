import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row, Table, Select } from 'antd';
import { useAntdTable } from 'ahooks';
import { getRolePage } from '@/service/role';
import { useTranslation } from 'react-i18next';
import RoleModal from './RoleModal';
import { getMenuList } from '@/service/menu';

interface Item {
  name: {
    last: string;
  };
  email: string;
  phone: string;
  gender: 'male' | 'female';
}

interface Result {
  total: number;
  list: Item[];
}

const getTableData = async (
  { current = 1, pageSize = 10 },
  formData: Object,
): Promise<Result> => {
  const { data } = await getRolePage({
    pageNo: current,
    pageSize,
    ...formData,
  });

  console.log('data', data);

  return {
    total: data.total,
    list: data.list,
  };
};

export default () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  const [treeData, setTreeData] = useState<any[]>([]);

  const handleGetMenuList = async () => {
    const {
      data: { data },
    } = await getMenuList();
    setTreeData(data);
  };
  useEffect(() => {
    handleGetMenuList();
  }, []);
  const { tableProps, search, params } = useAntdTable(getTableData, {
    defaultPageSize: 10,
    form,
  });

  const { submit, reset } = search;

  const columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '角色描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '角色类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: () => (
        <div>
          <Button type="link">编辑</Button>
          <Button type="link">删除</Button>
          <Button
            type="link"
            onClick={() => {
              setVisible(true);
            }}
          >
            配置菜单
          </Button>
        </div>
      ),
    },
  ];

  const advanceSearchForm = (
    <div>
      <Form form={form}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="角色名称" name="name">
              <Input placeholder="角色名称" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="角色类型" name="type">
              <Select placeholder="角色类型">
                <Select.Option value="root">管理员</Select.Option>
                <Select.Option value="admin">普通用户</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24} justify="end" style={{ marginBottom: 24 }}>
          <Button type="primary" onClick={submit}>
            {t('search')}
          </Button>
          <Button onClick={reset} style={{ marginLeft: 16 }}>
            {t('reset')}
          </Button>
        </Row>
      </Form>
    </div>
  );

  return (
    <div>
      {advanceSearchForm}
      <Table columns={columns} rowKey="email" {...tableProps} />
      <RoleModal
        visible={visible}
        treeData={treeData}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

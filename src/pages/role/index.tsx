import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row, Table, Select, message } from 'antd';
import { useAntdTable } from 'ahooks';
import { deleteRole, getRolePage } from '@/service/role';
import { useTranslation } from 'react-i18next';
import MenuModal from './MenuModal';
import { getMenuList } from '@/service/menu';
import RoleModal from './RoleModal';
import { ProFormSelect, ProFormText } from '@ant-design/pro-components';

interface Item {
  id: string;
  name: string;
  description: string;
  type: 'root' | 'admin' | 'visitor';
}

interface Result {
  total: number;
  list: Item[];
}

//获取表格数据
const getTableData = async (
  { current = 1, pageSize = 10 },
  formData: Object,
): Promise<Result> => {
  const { data } = await getRolePage({
    pageNo: current,
    pageSize,
    ...formData,
  });

  return {
    total: data.total,
    list: data.list,
  };
};

const RolePage = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [roleVisible, setRoleVisible] = useState(false);
  const [currentId, setCurrenId] = useState('');
  const [type, setType] = useState<'create' | 'update'>('create');

  const [treeData, setTreeData] = useState<any[]>([]);

  //获取菜单列表
  const handleGetMenuList = async () => {
    const {
      data: { data },
    } = await getMenuList();
    setTreeData(data);
  };

  //新增角色
  const handleCreateRole = () => {
    setType('create');
    setRoleVisible(true);
  };

  //删除角色
  const handleDeleteRole = async (id: string) => {
    const { status } = await deleteRole({ id });
    if (status === 200) {
      message.success('删除成功');
      submit();
    }
  };

  useEffect(() => {
    handleGetMenuList();
  }, []);

  const { tableProps, search, params } = useAntdTable(getTableData, {
    defaultPageSize: 10,
    form,
  });

  const { submit, reset } = search;

  //表格列
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
      width: 120,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 300,
      render: (text: any, record: { id: string }) => (
        <div>
          <Button
            type="link"
            onClick={() => {
              setType('update');
              setCurrenId(record.id);
              setRoleVisible(true);
            }}
          >
            编辑
          </Button>
          <Button
            type="link"
            onClick={() => {
              handleDeleteRole(record.id);
            }}
          >
            删除
          </Button>
          <Button
            type="link"
            onClick={() => {
              setVisible(true);
              setCurrenId(record.id);
              console.log(record, 'record');
            }}
          >
            配置菜单
          </Button>
        </div>
      ),
    },
  ];

  //高级搜索
  const advanceSearchForm = (
    <div>
      <Form form={form}>
        <Row gutter={24}>
          <Col span={8}>
            <ProFormText
              name="name"
              label="角色名称"
              placeholder="请输入角色名称"
            />
          </Col>
          <Col span={8}>
            <ProFormSelect
              name="type"
              label="角色类型"
              valueEnum={{
                '': '全部',
                root: '超级管理员',
                admin: '管理员',
                visitor: '访客',
              }}
              placeholder="请选择角色类型"
            />
          </Col>
        </Row>
        <Row justify="space-between" style={{ marginBottom: 24 }}>
          <Button type="primary" onClick={handleCreateRole}>
            新增角色
          </Button>
          <div>
            <Button type="primary" onClick={submit}>
              {t('search')}
            </Button>
            <Button onClick={reset} style={{ marginLeft: 16 }}>
              {t('reset')}
            </Button>
          </div>
        </Row>
      </Form>
    </div>
  );

  return (
    <div>
      {advanceSearchForm}
      <Table columns={columns} rowKey="id" {...tableProps} />
      <MenuModal
        roleId={currentId}
        visible={visible}
        treeData={treeData}
        onCancel={() => {
          setVisible(false);
        }}
      />

      <RoleModal
        visible={roleVisible}
        type={type}
        currentId={currentId}
        onCancel={() => {
          setRoleVisible(false);
        }}
        onOk={() => {
          setRoleVisible(false);
          submit();
        }}
      />
    </div>
  );
};

export default RolePage;

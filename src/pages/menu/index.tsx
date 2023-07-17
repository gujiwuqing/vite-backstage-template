import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, Table, Select, message } from 'antd';
import { useAntdTable } from 'ahooks';
import { deleteMenu, getMenuPage } from '@/service/menu';
import { useTranslation } from 'react-i18next';
import { MenuItemDTO } from '@/service/menu/menuDTO';
import MenuModal from './create';
import { ProFormText, ProFormSelect } from '@ant-design/pro-components';

interface Result {
  total: number;
  list: MenuItemDTO[];
}

const getTableData = async (
  { current = 1, pageSize = 10 },
  formData: Object,
): Promise<Result> => {
  const { data } = await getMenuPage({
    pageNo: current,
    pageSize,
    ...formData,
  });

  return {
    total: data.total,
    list: data.list,
  };
};

const MenuPage = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [currentId, setCurrenId] = useState('');
  const [type, setType] = useState<'create' | 'update'>('create');

  //新增菜单
  const handleCreateMenu = () => {
    setType('create');
    setVisible(true);
  };

  //删除菜单
  const handleDeleteMenu = async (id: string) => {
    const { status } = await deleteMenu({ id });
    if (status === 200) {
      message.success('删除成功');
      submit();
    }
  };

  const { tableProps, search, params } = useAntdTable(getTableData, {
    defaultPageSize: 10,
    form,
  });

  const { submit, reset } = search;

  const columns = [
    {
      title: '菜单标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '路由地址',
      dataIndex: 'path',
      key: 'path',
    },
    {
      title: '菜单编码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '菜单层级',
      dataIndex: 'level',
      key: 'level',
    },
    // {
    //   title: '菜单状态',
    //   dataIndex: 'status',
    //   key: 'status',
    // },
    {
      title: '菜单类型',
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => {
        return text === 'menu' ? '菜单' : '按钮';
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 200,
      render: (text: any, record: { id: string }) => (
        <div>
          <Button
            type="link"
            onClick={() => {
              setCurrenId(record.id);
              setVisible(true);
              setType('update');
            }}
          >
            编辑
          </Button>
          <Button
            type="link"
            onClick={() => {
              handleDeleteMenu(record.id);
            }}
          >
            删除
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
            <ProFormText
              name="title"
              label="菜单标题"
              placeholder="请输入菜单标题"
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name="path"
              label="路由地址"
              placeholder="请输入路由地址"
            />
          </Col>
          <Col span={8}>
            <ProFormSelect
              name="type"
              label="菜单类型"
              valueEnum={{
                '': '全部',
                menu: '菜单',
                button: '按钮',
              }}
              placeholder="请选择菜单类型"
            />
          </Col>
        </Row>
        <Row justify="space-between" style={{ marginBottom: 24 }}>
          <Button type="primary" onClick={handleCreateMenu}>
            新增菜单
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
        type={type}
        currentId={currentId}
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
        onOk={() => {
          submit();
          setVisible(false);
        }}
      />
    </div>
  );
};

export default MenuPage;

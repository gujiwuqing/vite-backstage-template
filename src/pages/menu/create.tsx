import { MenusItemDTO } from '@/service/base';
import { createMenu, getMenuList } from '@/service/menu';
import { ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { Button, Form, message } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const MenuCreate: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const { status } = await createMenu(values);
    if (status == 200) {
      message.success('创建成功');
      navigate('/menu/list');
    }
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <ProFormText
        name="title"
        label="菜单标题"
        placeholder="请输入菜单标题"
        rules={[{ required: true, message: 'Please input your username!' }]}
      />

      <ProFormText
        name="path"
        label="路由地址"
        placeholder="请输入路由地址"
        rules={[{ required: true, message: 'Please input your password!' }]}
      />

      <ProFormText
        name="code"
        label="菜单编码"
        placeholder="请输入菜单编码"
        rules={[{ required: true, message: 'Please input your password!' }]}
      />
      <ProFormText
        name="level"
        label="菜单层级"
        placeholder="请输入菜单层级"
        rules={[{ required: true, message: '请输入菜单层级' }]}
      />

      <ProFormSelect
        name="type"
        label="菜单类型"
        valueEnum={{
          menu: '菜单',
          button: '按钮',
        }}
        placeholder="请选择菜单类型"
        rules={[{ required: true, message: '请选择菜单类型' }]}
      />

      <ProFormSelect
        name="parentMenuId"
        label="父级菜单"
        request={async () => {
          const {
            data: { data },
          } = await getMenuList();
          console.log('data', data);
          return data.map((item: MenusItemDTO) => ({
            label: item.title,
            value: item.id,
          }));
        }}
        placeholder="请选择父级菜单"
      />
      <ProFormText
        name="sort"
        label="菜单排序"
        placeholder="请输入菜单排序"
        rules={[{ required: true, message: '请输入菜单排序' }]}
      />
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {t('submit')}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MenuCreate;

import React from 'react';
import { Button, Checkbox, Form, Input, message, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { createMenu } from '@/service/menu';
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
      <Form.Item
        label="菜单标题"
        name="title"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder="请输入菜单标题" />
      </Form.Item>

      <Form.Item
        label="路由地址"
        name="path"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input placeholder="请输入路由地址" />
      </Form.Item>
      <Form.Item
        label="菜单编码"
        name="code"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input placeholder="请输入菜单编码" />
      </Form.Item>
      <Form.Item
        label="菜单层级"
        name="level"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input placeholder="请输入菜单层级" />
      </Form.Item>
      <Form.Item
        label="菜单类型"
        name="type"
        rules={[{ required: true, message: '请选择菜单类型' }]}
      >
        <Select placeholder="请选择菜单类型">
          <Select.Option value="menu">菜单</Select.Option>
          <Select.Option value="button">按钮</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="排序"
        name="sort"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input placeholder="请输入排序" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {t('submit')}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MenuCreate;

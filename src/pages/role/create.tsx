import { createRole } from '@/service/role';
import { ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { Button, Form, message } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const MenuCreate: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const { status } = await createRole(values);
    if (status == 200) {
      message.success('创建成功');
      navigate('/role/list');
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
        name="name"
        label="角色名称"
        placeholder="请输入角色名称"
        rules={[{ required: true, message: '请输入角色名称' }]}
      />
      <ProFormSelect
        name="type"
        label="角色类型"
        valueEnum={{
          root: '超级管理员',
          admin: '管理员',
          visitor: '访客',
        }}
        placeholder="请选择角色类型"
        rules={[{ required: true, message: '请选择角色类型' }]}
      />
      <ProFormText
        name="description"
        label="角色描述"
        placeholder="请输入角色描述"
        rules={[{ required: true, message: '请输入角色描述' }]}
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

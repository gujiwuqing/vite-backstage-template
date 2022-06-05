import {PlusOutlined} from '@ant-design/icons';
import {
  ModalForm,
  ProForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import {Button, message} from 'antd';
import React from 'react';
import {createMenu} from '@/service/menu';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title="新建表单"
      trigger={
        <Button type="primary">
          新建菜单
        </Button>
      }
      autoFocusFirstInput
      modalProps={{
        onCancel: () => console.log('run'),
      }}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
        await createMenu({...values});
        message.success('提交成功');
        return true;
      }}
    >
      <ProFormText name="title" label="菜单名称" placeholder="请输入菜单名称" rules={[{required: true}]}/>
      <ProFormText name="sort" label="菜单排序" placeholder="请输入菜单排序"/>
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
      {/*<Form.Item label="菜单类型">*/}
      {/*  <Form.Select name="type" options={[{ label: '菜单', value: 'menu' }, { label: '按钮', value: 'button' }]} />*/}
      {/*</Form.Item>*/}
      {/*<Form.Item label="菜单图标">*/}
      {/*  <Form.Input name="icon" />*/}
      {/*</Form.Item>*/}
      {/*<Form.Item label="菜单链接">*/}
      {/*  <Form.Input name="link" />*/}
      {/*</Form.Item>*/}
      {/*<Form.Item label="菜单排序">*/}
      {/*  <Form.Input name="sort" />*/}
      {/*</Form.Item>*/}
      {/*<Form.Item label="菜单状态">*/}
      {/*  <Form.Select name="status" options={[{ label: '启用', value: '1' }, { label: '禁用', value: '0' }]} />*/}
      {/*</Form.Item>*/}
    </ModalForm>
  );
};

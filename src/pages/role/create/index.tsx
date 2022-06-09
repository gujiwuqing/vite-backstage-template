import React from 'react';
import {ProFormText, ProForm, ProFormTextArea, ProFormSelect} from '@ant-design/pro-components';
import {createRole} from '@/service/role';
import {message} from 'antd';
import {useNavigate} from 'react-router-dom';

const RoleCreate = () => {
  const navigate = useNavigate();
  return (
    <div>
      <ProForm onFinish={async (values) => {
        await createRole({...values});
        message.success('提交成功');
        navigate('/role/list', {replace: true});
      }}>
        <ProFormText name="name" label="角色名称" rules={[{required: true}]}/>
        <ProFormSelect
          name="type"
          label="类型"
          valueEnum={{
            visitor: '访客',
            admin: '管理员',
            root: '超级管理员',
          }}
          placeholder="请选择类型"
          rules={[{required: true}]}
        />
        <ProFormTextArea name="description" label="角色描述"/>
      </ProForm>
    </div>
  );
};

export default RoleCreate;

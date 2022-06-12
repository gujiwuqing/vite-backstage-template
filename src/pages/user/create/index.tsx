import React from 'react';
import {ProFormText, ProForm, ProFormTextArea, ProFormSelect} from '@ant-design/pro-components';
import {saveUser} from '@/service/user';
import {getRoleList} from '@/service/role';
import {message} from 'antd';
import {useNavigate} from 'react-router-dom';

const RoleCreate = () => {
  const navigate = useNavigate();
  const request = async () => {
    const data = await getRoleList();
    return data.data || [];
  };
  return (
    <div>
      <ProForm onFinish={async (values) => {
        await saveUser({email: '', password: '', role: '', username: '', ...values});
        message.success('提交成功');
        navigate('/role/list', {replace: true});
      }}>
        <ProFormText name="username" label="用户名" rules={[{required: true}]}/>
        <ProFormText name="password" label="密码" rules={[{required: true}]}/>
        <ProFormText name="email" label="邮箱" rules={[{required: true}]}/>
        <ProFormText name="phone" label="手机号" rules={[{required: true}]}/>
        <ProFormSelect
          name="status"
          label="状态"
          initialValue={'1'}
          valueEnum={{
            0: '禁用',
            1: '启用',
          }}
          placeholder="请选择状态"
          rules={[{required: true}]}
        />
        <ProFormSelect
          name="role"
          label="角色"
          request={request}
          placeholder="请选择角色"
          rules={[{required: true}]}
          fieldProps={{
            fieldNames: {
              label: 'name',
              value: 'id',
            },
          }}
        />
      </ProForm>
    </div>
  );
};

export default RoleCreate;

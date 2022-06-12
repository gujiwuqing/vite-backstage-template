import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import {UserLogin} from '@/service/user';
import React from 'react';
import {useState} from 'react';
import {tokenAtom, menusAtom} from '@/store';
import {useAtom} from 'jotai';
import {useNavigate} from 'react-router-dom';

export default () => {
  const [token, setToken] = useAtom(tokenAtom);
  const [menus, setMenus] = useAtom(menusAtom);
  const navigate = useNavigate();
  return (
    <div style={{backgroundColor: 'white'}}>
      <LoginForm
        logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
        title="Github"
        subTitle="全球最大同性交友网站"
        onFinish={async (values) => {
          const {data} = await UserLogin({password: '', username: '', ...values});
          console.log(data.role);
          if (data.token) {
            setToken(data.token);
            console.log(data.role.menus);
            setMenus(JSON.stringify([...data.role.menus]));
            navigate('/', {replace: true});
          }
        }}
        actions={
          false
        }
      >
        <>
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={'prefixIcon'}/>,
            }}
            placeholder={'用户名: admin'}
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'}/>,
            }}
            placeholder={'密码: 123456'}
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
        </>
      </LoginForm>
    </div>
  );
};

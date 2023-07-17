import { Button } from 'antd';
import { ButtonType } from 'antd/es/button';
import React from 'react';

type AuthButtonProps = {
  code: string;
  type: ButtonType;
};
export default function AuthButton({ code, type }: AuthButtonProps) {
  const buttonList: string | string[] = [];
  return buttonList.includes(code) ? <Button type={type}>按钮</Button> : null;
}

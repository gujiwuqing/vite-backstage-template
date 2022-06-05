import {PlusOutlined} from '@ant-design/icons';
import {
  ModalForm,
  ModalFormProps
} from '@ant-design/pro-components';
import {Button, message} from 'antd';
import React, {ReactElement, ReactNode} from 'react';
// import { SubmitterProps } from '@ant-design/pro-components/lib/components/Submitter';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const DefaultTrigger = (
  <Button type="primary" icon={<PlusOutlined/>}>
    新建表单
  </Button>
);

interface SubmitterRenderParams {
  props: any;
  doms: JSX.Element[];
}

interface BaseModalFormProps extends ModalFormProps {
  title?: string;
  width?: number;
  children?: ReactNode;
  triggerRender?: ReactElement;
  submitterRender?: (params: SubmitterRenderParams) => ReactNode;
  clearForm?: () => void;
}

export default ({title = '新建表单', children, triggerRender,...reset}: BaseModalFormProps) => {
  return (
    <ModalForm
      title={title}
      trigger={
        triggerRender ? triggerRender : DefaultTrigger
      }
      autoFocusFirstInput
      modalProps={{
        onCancel: () => console.log('run'),
      }}
      {...reset}
    >
      {children}
    </ModalForm>
  );
};

import { saveUser, getUserInfo, updateUser } from "@/service/user";
import { ProFormSelect, ProFormText } from "@ant-design/pro-components";
import { Form, message, Modal } from "antd";
import React, { useEffect } from "react";

type UserModalProps = {
  visible: boolean;
  type: "create" | "update";
  currentId: string | undefined;
  onCancel: () => void;
  onOk: () => void;
};
const UserModal = ({
  visible = false,
  type = "create",
  currentId = "",
  onCancel,
  onOk,
}: UserModalProps) => {
  const [form] = Form.useForm();

  const reset = () => {
    message.success(type == "create" ? "新增成功" : "更新成功");
    form.resetFields();
    onOk();
  };

  const onFinish = async (values: any) => {
    if (type == "update") {
      const { status } = await updateUser({ ...values, id: currentId });
      if (status == 200) {
        reset();
      }
    } else {
      const { status } = await saveUser(values);
      if (status == 200) {
        reset();
      }
    }
  };

  // 通过id获取用户信息
  useEffect(() => {
    if (type == "update") {
      getUserInfo(currentId).then((res) => {
        form.setFieldsValue(res.data);
      });
    } else {
      form.resetFields();
    }
  }, [currentId, type]);

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      title={type == "create" ? "新增用户" : "编辑用户"}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        form={form}
      >
        <ProFormText
          name="name"
          label="用户名称"
          placeholder="请输入用户名称"
          rules={[{ required: true, message: "请输入用户名称" }]}
        />

        <ProFormText
          name="email"
          label="用户邮箱"
          placeholder="请输入用户邮箱"
          rules={[{ required: true, message: "请输入用户邮箱" }]}
        />
        <ProFormText
          name="phone"
          label="用户手机号"
          placeholder="请输入用户手机号"
          rules={[{ required: true, message: "请输入用户手机号" }]}
        />
      </Form>
    </Modal>
  );
};

export default UserModal;

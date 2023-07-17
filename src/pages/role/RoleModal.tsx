import { createRole, getRoleInfo, updateRole } from "@/service/role";
import { ProFormSelect, ProFormText } from "@ant-design/pro-components";
import { Form, message, Modal } from "antd";
import React, { useEffect } from "react";

type RoleModalProps = {
  visible: boolean;
  type: "create" | "update";
  currentId: string | undefined;
  onCancel: () => void;
  onOk: () => void;
};
const RoleModal = ({
  visible = false,
  type = "create",
  currentId = "",
  onCancel,
  onOk,
}: RoleModalProps) => {
  const [form] = Form.useForm();

  const reset = () => {
    message.success(type == "create" ? "新增成功" : "更新成功");
    form.resetFields();
    onOk();
  };

  const onFinish = async (values: any) => {
    if (type == "update") {
      const { status } = await updateRole({ ...values, id: currentId });
      if (status == 200) {
        reset();
      }
    } else {
      const { status } = await createRole(values);
      if (status == 200) {
        reset();
      }
    }
  };

  // 通过id获取角色信息
  useEffect(() => {
    if (type == "update") {
      getRoleInfo(currentId).then((res) => {
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
      title={type == "create" ? "新增角色" : "编辑角色"}
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
          label="角色名称"
          placeholder="请输入角色名称"
          rules={[{ required: true, message: "请输入角色名称" }]}
        />
        <ProFormSelect
          name="type"
          label="角色类型"
          valueEnum={{
            root: "超级管理员",
            admin: "管理员",
            visitor: "访客",
          }}
          placeholder="请选择角色类型"
          rules={[{ required: true, message: "请选择角色类型" }]}
        />
        <ProFormText
          name="description"
          label="角色描述"
          placeholder="请输入角色描述"
          rules={[{ required: true, message: "请输入角色描述" }]}
        />
      </Form>
    </Modal>
  );
};

export default RoleModal;

import { MenuItemDTO } from "@/service/menu/menuDTO";
import {
  createMenu,
  getMenuInfo,
  getMenuList,
  updateMenu,
} from "@/service/menu";
import { ProFormSelect, ProFormText } from "@ant-design/pro-components";
import { Form, message, Modal } from "antd";
import React, { useEffect } from "react";

interface MenuModalProps {
  type: "create" | "update";
  currentId: string | undefined;
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
}
const MenuCreate = ({
  type = "create",
  currentId = "",
  visible = false,
  onCancel,
  onOk,
}: MenuModalProps) => {
  const [form] = Form.useForm();
  const menuType = Form.useWatch("type", form);
  const reset = () => {
    message.success(type == "create" ? "新增成功" : "更新成功");
    form.resetFields();
    onOk();
  };

  const onFinish = async (values: any) => {
    if (type == "update") {
      const { status } = await updateMenu({ ...values, id: currentId });
      if (status == 200) {
        reset();
      }
    } else {
      const { status } = await createMenu(values);
      if (status == 200) {
        reset();
      }
    }
  };

  useEffect(() => {
    if (type == "update") {
      getMenuInfo(currentId).then((res) => {
        form.setFieldsValue(res.data);
      });
    } else {
      form.resetFields();
    }
  }, [currentId, type]);

  return (
    <Modal
      title={type == "create" ? "新增菜单" : "编辑菜单"}
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
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
          name="title"
          label="菜单标题"
          placeholder="请输入菜单标题"
          rules={[{ required: true, message: "Please input your username!" }]}
        />

        <ProFormText
          name="code"
          label="菜单编码"
          placeholder="请输入菜单编码"
          rules={[{ required: true, message: "Please input your password!" }]}
        />

        {menuType == "menu" && (
          <>
            <ProFormText
              name="path"
              label="路由地址"
              placeholder="请输入路由地址"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            />
            <ProFormText
              name="level"
              label="菜单层级"
              placeholder="请输入菜单层级"
              rules={[{ required: true, message: "请输入菜单层级" }]}
            />
          </>
        )}

        <ProFormSelect
          name="type"
          label="菜单类型"
          initialValue="menu"
          valueEnum={{
            menu: "菜单",
            button: "按钮",
          }}
          placeholder="请选择菜单类型"
          rules={[{ required: true, message: "请选择菜单类型" }]}
        />

        {menuType == "menu" && (
          <>
            <ProFormSelect
              name="parentMenuId"
              label="父级菜单"
              request={async () => {
                const {
                  data: { data },
                } = await getMenuList();
                console.log("data", data);
                return data.map((item: MenuItemDTO) => ({
                  label: item.title,
                  value: item.id,
                }));
              }}
              placeholder="请选择父级菜单"
            />
            <ProFormText
              name="sort"
              label="菜单排序"
              placeholder="请输入菜单排序"
              rules={[{ required: true, message: "请输入菜单排序" }]}
            />
          </>
        )}
      </Form>
    </Modal>
  );
};

export default MenuCreate;

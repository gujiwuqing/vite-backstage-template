import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Table, Select, message } from "antd";
import { useAntdTable } from "ahooks";
import { getUserPage, deleteUser } from "@/service/user";
import { useTranslation } from "react-i18next";
import UserModal from "./create";
import AuthButton from "@/components/AuthButton";

interface Item {
  name: string;
  email: string;
  phone: string;
  gender: "male" | "female";
  id: string;
}

interface Result {
  total: number;
  list: Item[];
}

const getTableData = async (
  { current = 1, pageSize = 10 },
  formData: Object
): Promise<Result> => {
  const { data } = await getUserPage({
    pageNo: current,
    pageSize,
    ...formData,
  });

  return {
    total: data.total,
    list: data.list,
  };
};

const UserPage = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [currentId, setCurrenId] = useState("");
  const [type, setType] = useState<"create" | "update">("create");
  const { tableProps, search, params } = useAntdTable(getTableData, {
    defaultPageSize: 10,
    form,
  });

  const { submit, reset } = search;

  //新增用户
  const handleCreateUser = () => {
    setType("create");
    setVisible(true);
  };

  //删除用户
  const handleDeleteUser = async (id: string) => {
    const { status } = await deleteUser({ id });
    if (status === 200) {
      message.success("删除成功");
      submit();
    }
  };

  const columns = [
    {
      title: "用户名称",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "用户邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "用户手机号",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      width: 300,
      render: (text: any, record: { id: string }) => (
        <div>
          <AuthButton code="user_edit">
            <Button
              type="link"
              onClick={() => {
                setType("update");
                setCurrenId(record.id);
                setVisible(true);
              }}
            >
              编辑
            </Button>
          </AuthButton>
          <AuthButton code="user_delete">
            <Button
              type="link"
              onClick={() => {
                handleDeleteUser(record.id);
              }}
            >
              删除
            </Button>
          </AuthButton>
        </div>
      ),
    },
  ];

  const advanceSearchForm = (
    <div>
      <Form form={form}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="用户名称" name="username">
              <Input placeholder="用户名称" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="用户邮箱" name="email">
              <Input placeholder="用户邮箱" />
            </Form.Item>
          </Col>{" "}
          <Col span={8}>
            <Form.Item label="用户手机号" name="phone">
              <Input placeholder="用户手机号" />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="space-between" style={{ marginBottom: 24 }}>
          <AuthButton code="user_create">
            <Button type="primary" onClick={handleCreateUser}>
              新增用户
            </Button>
          </AuthButton>
          <div>
            <Button type="primary" onClick={submit}>
              {t("search")}
            </Button>
            <Button onClick={reset} style={{ marginLeft: 16 }}>
              {t("reset")}
            </Button>
          </div>
        </Row>
      </Form>
    </div>
  );

  return (
    <div>
      {advanceSearchForm}
      <Table columns={columns} rowKey="id" {...tableProps} />
      <UserModal
        visible={visible}
        type={type}
        currentId={currentId}
        onCancel={function (): void {
          setVisible(false);
          setCurrenId("");
        }}
        onOk={function (): void {
          setVisible(false);
          setCurrenId("");
          submit();
        }}
      />
    </div>
  );
};

export default UserPage;

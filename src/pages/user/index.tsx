import React from "react";
import { Button, Col, Form, Input, Row, Table, Select } from "antd";
import { useAntdTable } from "ahooks";
import { getUserPage } from "@/service/user";
import { useTranslation } from "react-i18next";

interface Item {
  name: {
    last: string;
  };
  email: string;
  phone: string;
  gender: "male" | "female";
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

export default () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { tableProps, search, params } = useAntdTable(getTableData, {
    defaultPageSize: 10,
    form,
  });

  const { submit, reset } = search;

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
        <Row gutter={24} justify="end" style={{ marginBottom: 24 }}>
          <Button type="primary" onClick={submit}>
            {t("search")}
          </Button>
          <Button onClick={reset} style={{ marginLeft: 16 }}>
            {t("reset")}
          </Button>
        </Row>
      </Form>
    </div>
  );

  return (
    <div>
      {advanceSearchForm}
      <Table columns={columns} rowKey="email" {...tableProps} />
    </div>
  );
};

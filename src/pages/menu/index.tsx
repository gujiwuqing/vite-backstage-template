import React from "react";
import { Button, Col, Form, Input, Row, Table, Select } from "antd";
import { useAntdTable } from "ahooks";
import { getMenuPage } from "@/service/menu";
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
  const { data } = await getMenuPage({
    pageNo: current,
    pageSize,
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
      title: "菜单标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "路由地址",
      dataIndex: "path",
      key: "path",
    },
    {
      title: "菜单编码",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "菜单层级",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "菜单状态",
      dataIndex: "status",
      key: "status",
    },
  ];

  const advanceSearchForm = (
    <div>
      <Form form={form}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="菜单标题" name="title">
              <Input placeholder="菜单标题" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="路由地址" name="path">
              <Input placeholder="email" />
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

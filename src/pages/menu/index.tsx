import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Table, Select, message } from "antd";
import { useAntdTable } from "ahooks";
import { deleteMenu, getMenuPage } from "@/service/menu";
import { useTranslation } from "react-i18next";
import { MenuItemDTO } from "@/service/menu/menuDTO";

interface Result {
  total: number;
  list: MenuItemDTO[];
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
  const [visible, setVisible] = useState(false);
  const [currentId, setCurrenId] = useState("");

  const handleDeleteMenu = async (id: string) => {
    const { status } = await deleteMenu({ id });
    if (status === 200) {
      message.success("删除成功");
      submit();
    }
  };

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
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      width: 200,
      render: (text: any, record: { id: string }) => (
        <div>
          <Button type="link">编辑</Button>
          <Button
            type="link"
            onClick={() => {
              handleDeleteMenu(record.id);
            }}
          >
            删除
          </Button>
        </div>
      ),
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
      <Table columns={columns} rowKey="id" {...tableProps} />
    </div>
  );
};

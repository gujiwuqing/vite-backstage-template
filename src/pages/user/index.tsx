import React from "react";
import BaseTable from "@/components/BaseTable";
import { userPage } from "@/service/user";
export default function UserListPage() {
  const columns = [
    {
      title: "用户名",
      dataIndex: "username",
      search: true,
    },
    {
      title: "邮箱",
      dataIndex: "email",
      search: false,
    },
    {
      title: "手机号",
      dataIndex: "phone",
      search: false,
    },
    {
      title: "状态",
      dataIndex: "status",
      search: false,
      valueType: "switch",
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      search: false,
      valueType: "dateTime",
    },
  ];
  return (
    <div>
      <BaseTable columns={columns} queryList={userPage} />
    </div>
  );
}

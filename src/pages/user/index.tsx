import React from "react";
import BaseTable from "@/components/BaseTable";
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
    },
  ];
  return (
    <div>
      <BaseTable columns={columns} />
    </div>
  );
}

import React, {useState, useEffect} from 'react';
import {Button, Table} from 'antd';
import {useRequest} from 'ahooks';
import {getMenuPage} from '@/service/menu';
import {MenuItemDTO} from '@/service/menu/menuDTO';

const columns = [
  {
    title: '菜单名称',
    dataIndex: 'title',
  }, {
    title: '菜单编码',
    dataIndex: 'code',
  },
  {
    title: '状态',
    dataIndex: 'status',
    // filters: [
    //   {
    //     text: '关闭',
    //     value: '0',
    //   },
    //   {
    //     text: '启用',
    //     value: '1',
    //   },
    // ],
  },
];


const MenuList = () => {
  const [params, setParams] = useState({
    pageNo: 1,
    pageSize: 10
  });

  const [data, setData] = useState<MenuItemDTO[]>();

  const {loading, run} = useRequest(() => getMenuPage({...params}), {
    manual: true,
    onSuccess: (res) => {
      console.log(res);
      const {data: {list}} = res;
      setData([...list]);
    }
  });

  useEffect(() => {
    run();
  }, []);

  const handleTableChange = (newPagination, filters, sorter) => {
    // fetchData({
    //   sortField: sorter.field,
    //   sortOrder: sorter.order,
    //   pagination: newPagination,
    //   ...filters,
    // });
  };

  return (
    <>
      <Button>新增菜单</Button>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={params}
        loading={loading}
        onChange={handleTableChange}
      />
    </>
  );
};

export default MenuList;

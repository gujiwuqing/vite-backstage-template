import React, {useState, useEffect} from 'react';
import {Button, Table, Input} from 'antd';
import {useRequest} from 'ahooks';
import {getRolePage} from '@/service/role';
import {RoleItemDTO} from '@/service/role/roleDTO';
import {formatDate} from '@/utils/util';
import styles from './index.module.less';
import {useNavigate} from 'react-router-dom';

const columns = [
  {
    title: '角色名称',
    dataIndex: 'name',
  }, {
    title: '角色类型',
    dataIndex: 'type',
  }, {
    title: '角色描述',
    dataIndex: 'description',
  }, {
    title: '创建时间',
    dataIndex: 'createdAt',
    render: (_: string) => formatDate(_),
  },
];


const RoleList = () => {
  const [params, setParams] = useState({
    pageNo: 1,
    pageSize: 10
  });

  const navigate = useNavigate();

  const [data, setData] = useState<RoleItemDTO[]>();
  const [total, setTotal] = useState<number>(0);

  const {loading, run} = useRequest((params) => getRolePage({...params}), {
    manual: true,
    onSuccess: (res) => {
      const {data: {list, total}} = res;
      setData([...list]);
      setTotal(total);
    }
  });

  useEffect(() => {
    run({...params});
  }, []);

  const handleTableChange = (newPagination: { current: number; pageSize: number; }, filters: any, sorter: any) => {
    console.log(sorter);
    run({...params, pageNo: newPagination.current, pageSize: newPagination.pageSize});
    // fetchData({
    //   sortField: sorter.field,
    //   sortOrder: sorter.order,
    //   pagination: newPagination,
    //   ...filters,
    // });
  };

  const handleCrate = () => {
    navigate('/role/create', {replace: true});
  };

  return (
    <>
      <div className={styles.header}>
        <Button type="primary" onClick={handleCrate}>新增</Button>
        <div className={styles.header_right}>
          <Input/>
          <Button type="primary">查询</Button>
        </div>
      </div>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={{
          pageSize: params.pageSize,
          total: total
        }}
        loading={loading}
        onChange={handleTableChange}
      />
    </>
  );
};

export default RoleList;

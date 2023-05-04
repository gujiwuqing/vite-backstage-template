import React, {useState, useEffect} from 'react';
import {Table} from 'antd';
import {useRequest} from 'ahooks';
import {getMenuList, getMenuPage} from '@/service/menu';

const MenuPage = () => {
    const {run,data,loading} = useRequest(getMenuPage, {
        manual: true,
        onSuccess: (result, params) => {
            console.log(result);
        }
    }
    );

    useEffect(() => {
        run({
            pageSize: 1,
            pageSize: 10
        });
    }
    , []);


    const columns = [
        {
            title: '路由标题',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '路由地址',
            dataIndex: 'path',
            key: 'path',
        },
        {
            title: '菜单编码',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: '菜单层级',
            dataIndex: 'level',
            key: 'level',
        },
        {
            title: '菜单状态',
            dataIndex: 'status',
            key: 'status',
        },
    ];
    return (
        <div><Table dataSource={data?.data?.list||[]} columns={columns} loading={loading}/></div>
    );
};

export default MenuPage;

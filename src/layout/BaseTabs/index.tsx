import React from 'react';
import {Tabs} from 'antd';
import {getTabList} from '@/utils/util';
import {useSnapshot} from 'valtio';
import state from '@/store/store';
import defaultMenus from '@/router/menu';
import {useNavigate} from 'react-router-dom';

const BaseTabs: React.FC = () => {
    const {tabs, changeActiveKey} = useSnapshot(state);
    const items = getTabList(tabs, defaultMenus);
    const navigate = useNavigate();

    const onChange = (key: string) => {
        console.log(key);
        navigate(key);
        changeActiveKey(key);
    };
    return (
        <Tabs defaultActiveKey="1" items={items} onChange={onChange}/>
    );
};

export default BaseTabs;

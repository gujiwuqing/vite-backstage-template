import React from 'react';
import style from './index.module.less';
import {GithubOutlined, MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import ThemeColor from './ThemeColor';
import UserInfo from './UserInfo';
import FullScreen from './Fullscreen';
import Language from './Language';
import {useSnapshot} from 'valtio';
import state from '@/store/store';
import './index.less';

const BaseHeader = () => {
    // const [collapsed, setCollapsed] = useAtom(collapsedAtom);
    const {collapsed, changeCollapsed} = useSnapshot(state);
    const onClick = () => {
        changeCollapsed(!collapsed);
    };
    return (
        <header className={style.header}>
            <div className="flex items-center">
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick,
                })}
            </div>
            <div className={style.header_right}>
                <ThemeColor/>
                <Language/>
                <FullScreen/>
                <UserInfo/>
                <GithubOutlined
                    className={style.icon}
                    onClick={() => {
                        window.location.href = 'https://github.com/gujiwuqing/vite-backstage-template';
                    }}
                />
            </div>
        </header>
    );
};

export default BaseHeader;

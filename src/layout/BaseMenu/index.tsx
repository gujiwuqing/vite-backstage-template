import defaultMenus from '@/router/menu';
import {collapsedAtom, menusAtom} from '@/store';
import {Layout, Menu} from 'antd';
import {useAtom} from 'jotai';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

const Title = styled.div`
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`

const BaseMenu: React.FC = () => {
    const {Sider} = Layout;
    const [collapsed] = useAtom(collapsedAtom);
    const [menus] = useAtom(menusAtom);
    const navigate = useNavigate();
    const {t, i18n} = useTranslation();

    interface MenuInfo {
        key: string;
        keyPath: string[];
        /** @deprecated This will not support in future. You should avoid to use this */
        item: React.ReactInstance;
        domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
    }

    const handleClick = (info: MenuInfo) => {
        navigate(info.key);
    };
    return (
        <Sider width={200}  collapsed={collapsed}>
            <Title onClick={() => {
                i18n.changeLanguage('zh');
            }}>{t('title')}</Title>
            <Menu
                theme="dark"
                mode="inline"
                style={{height: '100%', borderRight: 0}}
                items={menus ? JSON.parse(menus) : defaultMenus}
                onClick={handleClick}
            />
        </Sider>
    );
};

export default BaseMenu;

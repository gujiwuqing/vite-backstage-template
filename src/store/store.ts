import {proxy} from 'valtio';
import {subscribeKey} from 'valtio/utils';

const state = proxy({
    themeColor: '#1890ff',
    collapsed: false,
    activeKey: localStorage.getItem('activeKey')||'/',
    token: '',
    menus: '',
    changeThemeColor: (value: string) => {
        state.themeColor = value;
    },
    changeCollapsed: (value: boolean) => {
        state.collapsed = value;
    },
    changeActiveKey: (value: string) => {
        state.activeKey = value;
    }
});
subscribeKey(state, 'themeColor', (v) => {
    localStorage.setItem('themeColor', v);
});
subscribeKey(state, 'collapsed', (v) => {
    localStorage.setItem('collapsed', String(v));
});
subscribeKey(state, 'activeKey', (v) => {
    localStorage.setItem('activeKey', v);
});
export default state;

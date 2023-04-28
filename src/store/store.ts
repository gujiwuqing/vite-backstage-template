import {proxy} from 'valtio';
import {subscribeKey} from 'valtio/utils';

const state = proxy({
    themeColor: '#1890ff',
    collapsed: false,
    activeKey: '/',
    token: '',
    menus: '',
    changeThemeColor: (value: string) => {
        state.themeColor = value;
    },
    changeCollapsed: (value: boolean) => {
        state.collapsed = value;
    }
});
subscribeKey(state, 'themeColor', (v) => {
    localStorage.setItem('themeColor', v);
});
subscribeKey(state, 'collapsed', (v) => {
    localStorage.setItem('collapsed', String(v));
});
export default state;

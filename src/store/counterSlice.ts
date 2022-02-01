import { createSlice } from '@reduxjs/toolkit';

export interface CounterState {
  token: string;
  collapsed: boolean;
  tabList: any[];
  activeKey: string;
  role?: string;
  language: string;
}

const initialState: CounterState = {
  token: localStorage.getItem('token') || '',
  collapsed: false,
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  tabList: JSON.parse(<string>localStorage.getItem('tabList')) || [
    { title: '首页', path: '/', name: 'home' },
  ],
  activeKey: localStorage.getItem('activeKey') || '/',
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  role: 'admin',
  language: localStorage.getItem('language') || 'zh_CN',
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    replaceToken: (state, action) => {
      state.token = action.payload.token;
    },
    toggleCollapsed: (state) => {
      state.collapsed = !state.collapsed;
    },
    changeTabList: (state, action) => {
      state.tabList = action.payload.tabList;
    },
    replaceActiveKey: (state, action) => {
      state.activeKey = action.payload.activeKey;
      localStorage.setItem('activeKey', action.payload.activeKey);
    },
    setLanguage: (state, action) => {
      console.log('action', action.payload);
      state.language = action.payload.language;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  replaceToken,
  toggleCollapsed,
  changeTabList,
  replaceActiveKey,
  setLanguage,
} = counterSlice.actions;

// @ts-ignore
export default counterSlice.reducer;

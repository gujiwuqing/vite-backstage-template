import {atomWithStorage} from 'jotai/utils'
import {atom} from 'jotai'

export const collapsedAtom = atom(false)
export const themeColorAtom = atomWithStorage('themeColor', localStorage.getItem('themeColor') || '#1890ff')
export const activeKeyAtom = atomWithStorage('activeKey', localStorage.getItem('activeKey') || '/',)

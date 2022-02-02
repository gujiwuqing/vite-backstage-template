import React,{useState} from 'react';
import { Editor } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import gemoji from '@bytemd/plugin-gemoji'
import highlight from '@bytemd/plugin-highlight'
import mermaid from '@bytemd/plugin-mermaid'
import 'bytemd/dist/index.min.css';
import zh_Hans from 'bytemd/lib/locales/zh_Hans.json'
import './index.less';

const plugins = [
  gfm(),
  gemoji(),
  highlight(),
  mermaid()
  // Add more plugins here
]

const EditorPage = () => {
  const [value, setValue] = useState('')

  return (
    <Editor
      value={value}
      plugins={plugins}
      locale={zh_Hans}
      placeholder='请输入你的内容'
      onChange={(v) => {
        setValue(v)
      }}
    />
  )
}
export default EditorPage;

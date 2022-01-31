import {useState} from 'react'
import { Editor } from '@bytemd/react'
import gfm from '@bytemd/plugin-gfm'
import 'bytemd/dist/index.min.css'
const plugins = [
  gfm(),
  // Add more plugins here
]

const EditorPage = () => {
  const [value, setValue] = useState('')

  return (
    <Editor
      value={value}
      plugins={plugins}
      onChange={(v) => {
        setValue(v)
      }}
    />
  )
}
export default EditorPage;

import { EditorContent, useEditor } from "@tiptap/react"
import Placeholder from "@tiptap/extension-placeholder"
import StarterKit from "@tiptap/starter-kit"
import ToolBar from "./ToolBar"

type Props = {
  placeholder?: string
  content?: string
  onChange: (content: string) => void
}

export default function TipTap({placeholder, onChange, content=''}: Props) {
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: placeholder,
      })
    ],
    content: content,
    editorProps: {
      
      attributes: {
        class: 'p-2 h-72 overflow-y-auto rounded-xl bg-slate-800 text-white outline-none border focus:border-blue-600 border-slate-600'
      }
    },
    onUpdate ({ editor }) {
      onChange(editor.getHTML())
    }
  })

  if(!editor) return null
  
  return (
    <div className="h-full">
      <ToolBar editor={editor} />
      <EditorContent editor={editor} placeholder={placeholder} />
    </div>
  )
}
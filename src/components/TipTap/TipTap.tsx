import { EditorContent, useEditor } from "@tiptap/react"
import Placeholder from "@tiptap/extension-placeholder"
import StarterKit from "@tiptap/starter-kit"
import ToolBar from "./ToolBar"

type Props = {
  placeholder?: string
  onChange: (content: string) => void
}

export default function TipTap({placeholder, onChange}: Props) {
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: placeholder,
      })
    ],
    content: '',
    editorProps: {
      
      attributes: {
        class: 'p-2 sm:min-h-1/2 h-64 overflow-y-auto rounded-xl bg-slate-800 text-white outline-none border focus:shadow focus:shadow-slate-600 border-slate-600'
      }
    },
    onUpdate ({ editor }) {
      onChange(editor.getHTML())
      console.log(editor.getHTML())
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
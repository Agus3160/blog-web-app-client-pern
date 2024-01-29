import { EditorContent, useEditor } from "@tiptap/react"
import Placeholder from "@tiptap/extension-placeholder"
import StarterKit from "@tiptap/starter-kit"
import ToolBar from "./ToolBar"
import { useState } from "react"
import removeHTMLTags from "../../libs/removeHTMLTags"

type Props = {
  placeholder?: string
  content?: string
  onChange: (content: string) => void
}

export default function TipTap({ placeholder, onChange, content = '' }: Props) {

  const [error, setError] = useState('')

  const validateContent = (content: string) => {
    const stringContent = removeHTMLTags(content)
    if (stringContent.length !== 0 && stringContent.trim().length === 0) return 'Ony blank space is not a valid content'
    if (stringContent.length !== 0 && (stringContent.length < 100 || stringContent.length > 900)) return 'Content must be between 100 and 500 characters'
    return ''
  }

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
    onUpdate({ editor }) {
      const content = editor.getHTML()
      setError(validateContent(content))
      onChange(content)
    }
  })

  if (!editor) return null

  return (
    <div className="h-full ">
      <ToolBar editor={editor} />
      <EditorContent editor={editor} placeholder={placeholder} />
      {error.length > 0 && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
    </div>
  )
}
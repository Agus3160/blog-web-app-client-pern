import { type Editor } from "@tiptap/react"
import { Heading2, Pilcrow, Italic, List, Bold, ListOrdered } from "lucide-react"

type Props = {
  editor: Editor
}

export default function ToolBar({ editor }: Props) {
  return (
    <div className="flex items-center justify-around mb-4">
      <button
        type="button"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'tiptapButtonActive' : 'tiptapButtonDesactive'}
      ><Pilcrow /></button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'tiptapButtonActive' : 'tiptapButtonDesactive'}
      ><Bold /></button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'tiptapButtonActive' : 'tiptapButtonDesactive'}
      ><Heading2 /></button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'tiptapButtonActive' : 'tiptapButtonDesactive'}
      ><Italic /></button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'tiptapButtonActive' : 'tiptapButtonDesactive'}
      ><List /></button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'tiptapButtonActive' : 'tiptapButtonDesactive'}
      ><ListOrdered /></button>
    </div>
  )
}
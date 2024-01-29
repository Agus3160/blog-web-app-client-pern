import { useRef, useState } from "react"
import { FileImage, CheckCircle2, Loader2 } from "lucide-react"

type Props = {
  setImage: (d: string) => void
  message: string
  advice?: string
}

export default function UploadImage({ setImage, message, advice }: Props) {

  const WIDTH = 600
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    setDone(false)
    const fileList = e.target.files
    if (!fileList) {
      setError('Error Uploading your image')
      setLoading(false)
      return
    } else if (fileList[0].type !== 'image/png' && fileList[0].type !== 'image/jpeg' && fileList[0].type !== 'image/jpg ' && fileList[0].type !== 'image/webp') {
      setError('Only images are allowed')
      setLoading(false)
      return
    } else if (fileList[0].size > 1 * 1024 * 1024) {
      setError('Max image size is 1MB')
      setLoading(false)
      return
    }
    else {
      const reader = new FileReader()

      reader.readAsDataURL(fileList[0])

      reader.onload = () => {
        const img = new Image()
        const url = reader.result

        img.src = url as string

        img.onload = () => {
          const canvas = document.createElement('canvas')

          if (img.width > WIDTH) {
            canvas.width = WIDTH
            canvas.height = WIDTH / img.width * img.height
          }
          const ctx = canvas.getContext('2d')
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)
          const compressedDataURL = canvas.toDataURL('image/webp', 0.7)
          const fileName = fileList[0].name
          setFileName(fileName)
          setImage(compressedDataURL)
          setError('')
          setLoading(false)
          setDone(true)
        }
      }
    }
  }


  return (
    <div className="flex flex-col items-center gap-2">
      <div onClick={handleClick} className="overflow-hidden hover:bg-slate-700 hover:cursor-pointer flex w-full text-white border-4 p-3 rounded-md border-slate-400 border-dashed flex-col items-center justify-center gap-2 ">
        <div className="flex gap-2 items-center w-full">
          <FileImage />
          <p className="flex-1 truncate">{fileName || message}</p>
          {loading && <Loader2 className="animate-spin" />}
          {done && <CheckCircle2 className="text-green-500" />}
        </div>
        <input maxLength={1} onChange={handleImageChange} ref={inputRef} className="hidden" type="file" accept="image/*" />
        {error && <span className="text-red-500">{error}</span>}
      </div>
      {advice && <span className="text-slate-400 text-sm text-center">{advice}</span>}
    </div>
  )
}
import { useRef, useState, useEffect } from "react"
import { FileImage, XCircle, Loader2 } from "lucide-react"

type Props = {
  setImage: (d: string) => void
  message: string
  advice?: string
  preloadImage?: string|null
}

export default function UploadImage({ setImage, message, advice, preloadImage }: Props) {

  const WIDTH = 600
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (preloadImage) {
      setLoading(true)
      const img = new Image()
      img.onload = () => {
        setFileName(getFileNameFromUrl(preloadImage))
        setLoading(false)
        setDone(true)
      }
      img.src = preloadImage
    }
  }, [preloadImage])

  const getFileNameFromUrl = (url: string): string => {
    const segments = url.split("/")
    return segments[segments.length - 1]
  }

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleDeleteImage = () => {
    setFileName(null)
    setDone(false)
    setLoading(false)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

      setLoading(true)
      setDone(false)

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
      <div className="flex items-center w-full gap-2">
        <div onClick={handleClick} className="overflow-hidden hover:bg-slate-700 hover:cursor-pointer flex w-full text-white border-4 p-3 rounded-md border-slate-400 border-dashed flex-col items-center justify-center gap-2 ">
          <div className="flex gap-2 items-center w-full">
            <FileImage />
            <p className="flex-1 truncate">{fileName || message}</p>
            {loading && <Loader2 className="animate-spin" />}
          </div>
          <input maxLength={1} onChange={handleImageChange} ref={inputRef} className="hidden" type="file" accept="image/*" />
        </div>
        {done && <XCircle className="text-red-500 hover:cursor-pointer" onClick={handleDeleteImage} />}
      </div>
      {error && <span className="text-red-500">{error}</span>}
      {advice && <span className="text-slate-400 text-sm text-center">{advice}</span>}
    </div>
  )
}
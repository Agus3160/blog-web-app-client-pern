import { AlertCircle } from "lucide-react"

type Props = {
  onActionFn: () => void 
  actionButtonText: string
  closeButtonText?: string
  showModal: boolean
  setShowModal: (showModal: boolean) => void
  message: string
  title:string
  advice?: string
}

export default function Modal({ onActionFn, showModal, setShowModal, message, title, advice, actionButtonText, closeButtonText }: Props) {
  
  if(!showModal) return null

  return (
      <div className="absolute bg-slate-900/75 top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center">
        <div className="flex flex-col bg-slate-700 p-5 w-11/12 md:w-1/3 h-72 justify-around rounded-lg text-white">
        
        <div className="flex flex-col items-center gap-2">
          <AlertCircle className="text-yellow-300" size={72} />
          <h2 className="text-center text-3xl">{title}</h2>
        </div>
        
        <p className="text-center">{message}</p>
        
        <div className="flex flex-col">
          {advice && <p className="text-center text-slate-400 text-sm">{advice}</p>}
          <div className="flex gap-2 items-center justify-between">
            <button className="bg-red-500 p-2 min-w-16 rounded-md" onClick={onActionFn}>{actionButtonText}</button>
            <button className="bg-blue-500  p-2 min-w-16 rounded-md" onClick={() => setShowModal(false)}>{closeButtonText || "Cancel"}</button>
          </div>  
        </div>
        </div>
      </div>
  )
}
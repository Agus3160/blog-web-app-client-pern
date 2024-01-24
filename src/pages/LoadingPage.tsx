import { Loader2 } from "lucide-react"

export default function LoadingPage() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Loader2 
        size={64}
        color="white"
        className="animate-spin"
      />
    </div>
  )
}
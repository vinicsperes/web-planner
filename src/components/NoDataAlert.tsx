import { FC } from "react"
import { AlertCircle, LucideIcon } from "lucide-react"

interface NoDataAlertProps {
  icon: LucideIcon
  text: string
}

const NoDataAlert: FC<NoDataAlertProps> = ({ icon: Icon, text }) => {
  return (
    <div className="flex flex-col items-center justify-center text-gray-500 space-y-4">
      <Icon className="h-32 w-32 text-gray-400" />
      <div className="flex items-center justify-center text-gray-500 space-x-2">
        <AlertCircle className="h-6 w-6 text-yellow-500" />
        <p className="text-sm">{text}</p>
      </div>
    </div>
  )
}

export default NoDataAlert

import { AlertTriangle } from 'lucide-react'

export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex justify-end mr-12">
      <div className="absolute flex items-center w-[480px] mt-3 rounded-lg border px-4 py-3 text-sm [&>svg~*]:pl-2 border-red-500 dark:border-yellow-300 [&>svg]:text-red-500">
        <AlertTriangle className="h-4 w-4 dark:text-yellow-300 " />
        <p className="text-xs text-red-500 dark:text-yellow-300">{message}</p>
      </div>
    </div>
  )
}

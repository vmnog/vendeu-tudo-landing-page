import { CircleAlert } from "lucide-react";

export function ErrorMessage({ message }: { message?: string }) {
  if (!message) return

  return <div className='text-sm font-medium text-destructive flex gap-2'>
    <CircleAlert size={18} />
    <span className="break-words w-52">{message}</span>
  </div>
}

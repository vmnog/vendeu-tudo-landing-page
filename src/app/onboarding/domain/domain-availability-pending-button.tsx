import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

interface Props extends PropsWithChildren {
  isPending: boolean
}

export function PendingSubmitButton({ children, isPending }: Props) {
  return (
    <>
      <Button className="flex items-center justify-center gap-2 relative" type='submit' variant="secondary" disabled={isPending}>
        {isPending && (
          <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
            <LoaderCircle className='text-foreground animate-spin' />
          </div>
        )}
        <span className={cn(
          isPending && 'invisible'
        )}>{children}</span>
      </Button>
    </>
  )
}

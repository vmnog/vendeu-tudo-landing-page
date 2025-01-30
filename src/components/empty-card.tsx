import { ImageIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"

interface EmptyCardProps extends React.ComponentPropsWithoutRef<typeof Card> {
  title: string
  description?: string
  action?: React.ReactNode
  icon?: React.ComponentType<{ className?: string }>
}

export function EmptyCard({
  title,
  description,
  icon: Icon = ImageIcon,
  action,
  className,
  ...props
}: EmptyCardProps) {
  return (
    <Card
      className={cn(
        "flex w-full h-full flex-col items-center justify-center",
        "group relative h-52 rounded-lg border-2 border-muted-foreground/25 px-5 py-2.5 text-center transition bg-transparent",
        "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      <Icon className="size-8 text-muted-foreground" aria-hidden="true" />
      <div className="text-muted-foreground flex flex-col items-center gap-1.5 text-center">
        <CardTitle className="text-muted-foreground/70 text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </div>
      {action}
    </Card>
  )
}

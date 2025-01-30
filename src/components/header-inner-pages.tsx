interface HeaderInnerPagesProps {
  title: string
  description: string
}

export function HeaderInnerPages({ title, description }: HeaderInnerPagesProps) {
  return (
    <header>
      <div className="mx-auto">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground">{title}</h1>
            <p className="mt-1 text-base text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>
    </header>
  )
}

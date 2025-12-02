interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 bg-background border-b border-border px-4 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-foreground">{title}</h1>
      <button className="p-2 hover:bg-muted rounded-full transition-colors">
        <span className="text-xl">👤</span>
      </button>
    </header>
  )
}

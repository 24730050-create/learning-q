interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 bg-white border-b border-[#E5E7EB] px-4 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🎓</span>
        <h1 className="text-xl font-bold text-[#0EA5E9]">{title}</h1>
      </div>
      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
        <span className="text-xl">👤</span>
      </button>
    </header>
  )
}

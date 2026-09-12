import { useEffect, useState } from 'react'
import { Moon, ShieldCheck } from 'lucide-react'

export function Header({ onToggle }: { onToggle: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'border-b border-[#dfe8dc]/80 bg-[#f5f8f3]/75 shadow-[0_8px_24px_rgba(35,75,53,0.08)] backdrop-blur-xl dark:border-[#35504a]/80 dark:bg-[#102b27]/75' : 'border-b border-transparent bg-transparent'}`}>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
        <a href="#top" className="flex items-center gap-2.5 text-[15px] font-bold tracking-tight text-[#17332e] dark:text-[#eaf5e9]">
          <span className="grid size-9 place-items-center rounded-xl bg-[#17332e] text-[#d4f56d] shadow-sm"><ShieldCheck size={18} strokeWidth={2.5} /></span>
          TempNumber
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-[#71817c] md:flex" aria-label="Main navigation">
          <a className="text-[#17332e]" href="#generator">Generator</a>
          <a className="transition-colors hover:text-[#17332e]" href="#history">History</a>
          <a className="transition-colors hover:text-[#17332e]" href="#about">About</a>
        </nav>
        <button type="button" onClick={onToggle} aria-label="Toggle theme" className="grid size-10 place-items-center rounded-full border border-[#dfe8dc] bg-white text-[#71817c] transition hover:border-[#bed09f] hover:text-[#17332e] dark:border-[#35504a] dark:bg-[#1b3832] dark:text-[#d4f56d]">
          <Moon size={17} />
        </button>
      </div>
    </header>
  )
}

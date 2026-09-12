import { Smartphone } from 'lucide-react'

export function EmptyState() {
  return <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#d7e4d2] bg-[#fbfdf9] px-5 py-10 text-center dark:border-[#35504a] dark:bg-[#1b3832]"><span className="mb-3 grid size-12 place-items-center rounded-2xl bg-[#edf5e8] text-[#789e35] dark:bg-[#294d42]"><Smartphone size={22} /></span><p className="text-sm font-semibold text-[#49635b] dark:text-[#d7e9d5]">No temporary number generated</p><p className="mt-1 max-w-xs text-xs leading-5 text-[#8a9b95]">Choose a country and generate a number to get started.</p></div>
}

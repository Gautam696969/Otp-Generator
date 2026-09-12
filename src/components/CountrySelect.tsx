import { ChevronDown, MapPin } from 'lucide-react'
import type { Country } from '../types'

export function CountrySelect({ countries, selected, onChange }: { countries: Country[]; selected: Country; onChange: (country: Country) => void }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.13em] text-[#789089]">Select country</span>
      <span className="relative block">
        <MapPin className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#83948d]" size={17} />
        <select value={selected.code} onChange={(event) => onChange(countries.find((country) => country.code === event.target.value) ?? selected)} className="w-full appearance-none rounded-xl border border-[#dfe8dc] bg-[#fbfdf9] py-3.5 pl-11 pr-11 text-sm font-semibold text-[#17332e] outline-none transition focus:border-[#789e35] focus:ring-4 focus:ring-[#d4f56d]/35 dark:border-[#35504a] dark:bg-[#1b3832] dark:text-[#eaf5e9]">
          {countries.map((country) => <option key={country.code} value={country.code}>{country.flag} {country.name} ({country.dialCode})</option>)}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#83948d]" size={18} />
      </span>
    </label>
  )
}

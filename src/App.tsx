import { useEffect, useState } from 'react'
import { ArrowRight, Check, LoaderCircle, Phone, Sparkles } from 'lucide-react'
import { CountrySelect } from './components/CountrySelect'
import { EmptyState } from './components/EmptyState'
import { Header } from './components/Header'
import { OtpCard } from './components/OtpCard'
import { OtpInput } from './components/OtpInput'
import { PhoneNumberCard } from './components/PhoneNumberCard'
import type { Country, OTP, TemporaryPhone } from './types'

const countries: Country[] = [
  { code: 'us', name: 'United States', dialCode: '+1', flag: '🇺🇸' },
  { code: 'gb', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' },
  { code: 'in', name: 'India', dialCode: '+91', flag: '🇮🇳' },
  { code: 'ca', name: 'Canada', dialCode: '+1', flag: '🇨🇦' },
  { code: 'au', name: 'Australia', dialCode: '+61', flag: '🇦🇺' },
  { code: 'de', name: 'Germany', dialCode: '+49', flag: '🇩🇪' },
]

function App() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0])
  const [phone, setPhone] = useState<TemporaryPhone | null>(null)
  const [otp, setOtp] = useState<OTP | null>(null)
  const [loading, setLoading] = useState(false)
  const [otpLoading, setOtpLoading] = useState(false)
  const [copied, setCopied] = useState<'phone' | 'otp' | null>(null)
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', ''])
  const [verifyStatus, setVerifyStatus] = useState<'idle' | 'valid' | 'invalid' | 'expired'>('idle')
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => { if (phone?.expiresIn && phone.expiresIn > 0) { const timer = window.setInterval(() => setPhone((current) => current ? { ...current, expiresIn: current.expiresIn - 1 } : current), 1000); return () => window.clearInterval(timer) } }, [phone?.expiresIn])
  useEffect(() => { if (otp?.expiresIn && otp.expiresIn > 0) { const timer = window.setInterval(() => setOtp((current) => current ? { ...current, expiresIn: current.expiresIn - 1, status: current.expiresIn <= 1 ? 'expired' : 'active' } : current), 1000); return () => window.clearInterval(timer) } }, [otp?.expiresIn])

  const generateNumber = () => {
    setLoading(true)
    window.setTimeout(() => { const local = selectedCountry.code === 'us' || selectedCountry.code === 'ca' ? '202 555 0123' : '20 7946 0958'; setPhone({ number: `${selectedCountry.dialCode} ${local}`, country: selectedCountry, expiresIn: 1782, status: 'active' }); setOtp({ code: '482913', expiresIn: 59, status: 'active' }); setOtpValues(['', '', '', '', '', '']); setVerifyStatus('idle'); setLoading(false) }, 700)
  }
  const copyText = (value: string, type: 'phone' | 'otp') => { void navigator.clipboard?.writeText(value); setCopied(type); window.setTimeout(() => setCopied(null), 1600) }
  const generateOtp = () => { setOtpLoading(true); window.setTimeout(() => { setOtp({ code: String(Math.floor(100000 + Math.random() * 900000)), expiresIn: 59, status: 'active' }); setVerifyStatus('idle'); setOtpValues(['', '', '', '', '', '']); setOtpLoading(false) }, 600) }
  const verifyOtp = () => { if (!otp || otp.status === 'expired') setVerifyStatus('expired'); else setVerifyStatus(otpValues.join('') === otp.code ? 'valid' : 'invalid') }

  return <div className={darkMode ? 'dark' : ''}><div id="top" className="min-h-screen bg-[#f5f8f3] text-[#17332e] transition-colors dark:bg-[#102b27] dark:text-[#eaf5e9]"><Header isDark={darkMode} onToggle={() => setDarkMode((value) => !value)} /><main id="generator" className="mx-auto w-full max-w-6xl px-5 pb-14 pt-8 sm:px-8 sm:pt-14 lg:px-10"><div className="mx-auto max-w-2xl text-center"><div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-[#dbe8d5] bg-white/70 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#789e35] dark:border-[#35504a] dark:bg-[#1b3832]"><Sparkles size={13} /> Private by design</div><h1 className="font-['Space_Grotesk'] text-4xl font-bold tracking-[-0.04em] text-[#17332e] dark:text-[#eaf5e9] sm:text-5xl">Temporary Phone Number</h1><p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#71817c] dark:text-[#a9beb3] sm:text-base">Generate a temporary phone number and view its demo OTP securely in one place.</p></div><div className="mx-auto mt-10 grid max-w-4xl gap-5 lg:grid-cols-[0.92fr_1.08fr]"><section className="rounded-2xl border border-[#dfe8dc] bg-white p-6 shadow-[0_10px_28px_rgba(35,75,53,0.06)] dark:border-[#35504a] dark:bg-[#1b3832] sm:p-7"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.13em] text-[#789089]">Generator</p><h2 className="mt-1 font-['Space_Grotesk'] text-xl font-bold text-[#17332e] dark:text-[#edf8ea]">Create a fresh number</h2></div><span className="grid size-10 place-items-center rounded-xl bg-[#f1f8e8] text-[#789e35] dark:bg-[#294d42]"><Phone size={19} /></span></div><div className="mt-7"><CountrySelect countries={countries} selected={selectedCountry} onChange={setSelectedCountry} /><button type="button" onClick={generateNumber} disabled={loading} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#17332e] py-3.5 text-sm font-bold text-white shadow-[0_7px_18px_rgba(23,51,46,0.16)] transition hover:-translate-y-0.5 hover:bg-[#275349] focus:outline-none focus:ring-4 focus:ring-[#d4f56d]/35 disabled:cursor-wait disabled:opacity-70">{loading ? <><LoaderCircle className="animate-spin" size={17} /> Generating...</> : <>Generate Number <ArrowRight size={17} /></>}</button></div><p className="mt-5 text-center text-[11px] leading-4 text-[#8a9b95]">Numbers are simulated for demonstration only.</p></section>{phone ? <PhoneNumberCard phone={phone} copied={copied === 'phone'} onCopy={() => copyText(phone.number, 'phone')} onRegenerate={generateNumber} /> : <EmptyState />}</div>{phone && otp && <div className="mx-auto mt-5 grid max-w-4xl gap-5 lg:grid-cols-2"><OtpCard otp={otp} copied={copied === 'otp'} loading={otpLoading} onCopy={() => copyText(otp.code, 'otp')} onGenerate={generateOtp} /><OtpInput values={otpValues} status={verifyStatus} onChange={(index, value) => { setOtpValues((current) => current.map((item, itemIndex) => itemIndex === index ? value.replace(/\D/g, '') : item)); setVerifyStatus('idle') }} onVerify={verifyOtp} /></div>}<p className="mx-auto mt-10 flex max-w-4xl items-center justify-center gap-2 text-center text-xs text-[#8a9b95]"><Check size={14} className="text-[#789e35]" /> No real messages are sent. This is a frontend demonstration.</p></main></div></div>
}

export default App

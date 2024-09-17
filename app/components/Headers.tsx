"use client"

import { useEffect,useState } from 'react'
import Image from 'next/image'
import { ConnectKitButton } from 'connectkit'

export const Header = () => {
  const [hasMounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!hasMounted) return null

  return (
    <header className="fixed top-0 left-0 right-0 p-4 flex items-center justify-between">
     
     <Image
        src="/favicon.ico"
        alt="QRareMint"
        width={35} // You can adjust this as needed
        height={35} // You can adjust this as needed
        className="object-contain border-slate-400 border rounded-full" // Ensures the image scales correctly within its container
      />

      {/* <ConnectKitButton accountStatus="avatar" chainStatus="icon" showBalance={false} /> */}
      <ConnectKitButton />
    </header>
  )
}

'use client'

import { ThemeProvider } from '@/components/theme-provider'
import { Provider } from 'jotai'
import { useEffect } from 'react'
import { initFacebookSdk } from '@/services/facebook-sdk'
import Script from 'next/script'
import { Toaster } from './ui/toaster'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    initFacebookSdk().then(() => {
      console.log('init facebook sdk ok')
    })
  }, []);

  return (
    <Provider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
      >
        <div id="fb-root"></div>
        <Script
          src="https://connect.facebook.net/en_US/all.js"
          strategy="afterInteractive"
          async
          defer
          crossOrigin="anonymous"
        />
        {children}

        <Toaster />
      </ThemeProvider>
    </Provider>
  )
}

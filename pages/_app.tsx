import { AuthProvider, CartProvider, UiProvider } from '@/context'
import '@/styles/globals.css'
import { lightTheme } from '@/themes'
import { ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { SessionProvider } from "next-auth/react"
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID  || '' }}>
      <SessionProvider session={session} basePath='/api/auth'>
        <SWRConfig value={{
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}>
          <AuthProvider>
            <CartProvider>
              <UiProvider>
                <ThemeProvider theme={lightTheme}>
                  <Component {...pageProps} />
                </ThemeProvider>
              </UiProvider>
            </CartProvider>
          </AuthProvider>
        </SWRConfig>
      </SessionProvider>
    </PayPalScriptProvider>
  )
}

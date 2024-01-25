import type { AppProps } from "next/app"

import Layout from "@/components/layout"

import "@/styles/globals.css"

import { Inter as FontSans, Playfair_Display } from "next/font/google"
import Head from "next/head"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontSerif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>CV</title>
      </Head>
      <style jsx global>{`
        :root {
          --font-sans: ${fontSans.style.fontFamily};
          --font-serif: ${fontSerif.style.fontFamily};
        }
      `}</style>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </>
  )
}

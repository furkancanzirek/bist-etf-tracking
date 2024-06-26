import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata = {
  metadataBase: new URL('https://fon.zirek.dev'),
  robots: {
    index: true,
    follow: true
  },
  title: 'Tefas Fon Fiyat Takibi',
  description: 'Tefas fon fiyatlarını takip edebileceğiniz web uygulaması',
  applicationName: 'Tefas Fon Fiyat Takibi',
  keywords: ['tefas', 'fon', 'fiyat', 'takip', 'etf', 'bist', 'borsa','borsa istanbul'],
  category: 'Finance',
}

export const viewport = {
  width: 'device-width',
  height: 'device-height',
  initialScale: 1.0,
  minimumScale: 1.0,
  maximumScale: 1.0,
  userScalable: 'no'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`
         ${GeistSans.className}
         min-h-screen
         grid 
         place-items-center
      `}
      >
        {children}
      </body>
    </html>
  );
}

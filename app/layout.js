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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"></meta>
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

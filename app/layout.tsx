// import './globals.css'
import MainContainer from '@/components/mainContainer'
import { Providers } from './providers'
import '@/styles/main.css'
import Header from '@/components/header'
import Footer from '@/components/footer'

export const metadata = {
  title: 'ozzyonfire - portfolio',
  description: 'Personal portfolio for Matt Oskamp',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <MainContainer>
            <Header />
            {children}
            <div style={{ flexGrow: 1 }}></div>
            <Footer />
          </MainContainer>
        </Providers>
      </body>
    </html>
  )
}

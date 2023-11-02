import { AuthProvider } from "./firebase";
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
      <AuthProvider>
      {children}
      </AuthProvider>
        
      </body>
    </html>
  )
}

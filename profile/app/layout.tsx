import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { NotificationProvider } from "@/components/notification-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SecureProfile - Advanced Profile Management",
  description: "Secure data entry and profile management system with real-time analytics",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <NotificationProvider>
            <SidebarProvider>
              <div className="flex h-screen">
                <AppSidebar />
                <div className="flex-1 overflow-auto hexagon-bg">
                  {children}
                  <Toaster />
                </div>
              </div>
            </SidebarProvider>
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'
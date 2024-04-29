import { ThemeProvider } from '@components/theme/ThemeProvider'
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import '@css/globals.css'

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'KanbanApp - Home',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body className={`${jakarta.className} text-black dark:text-white`}>
                <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}

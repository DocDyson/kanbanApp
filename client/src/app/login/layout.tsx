import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'KanbanApp - Login',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='min-h-screen bg-gray-light dark:bg-gray-very-dark flex flex-col items-center justify-center'>
            {children}
        </div>
    )
}

import Header from '@components/header/Header'
import Sidebar from '@components/sidebar/Sidebar'
import SidebarTransition from '../../components/common/SidebarTransition'

export const metadata = {
    title: 'KanbanApp - Board',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='min-h-screen flex flex-col'>
            <Header />
            <div className='relative grow h-1 bg-gray-light dark:bg-gray-very-dark'>
                <Sidebar />
                <SidebarTransition>
                    {children}
                </SidebarTransition>
            </div>
        </div>
    )
}

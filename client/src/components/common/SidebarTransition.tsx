'use client'

import { cn } from '@lib/utils'
import { useSidebarStore } from '@stores/sidebarStore'

function SidebarTransition({ children }: ChildrenProps) {
    const isOpen = useSidebarStore((state) => state.isOpen)

    return (
        <div
            className={cn('p-6 z-10 relative flex overflow-x-scroll h-full transition-[left]', {
                'lg:left-[18rem]': isOpen,
                'lg:max-w-[calc(100%-18rem)]': isOpen,
                'lg:left-0': !isOpen,
                'lg:max-w-full': !isOpen,
            })}
        >
            {children}
        </div>
    )
}

export default SidebarTransition

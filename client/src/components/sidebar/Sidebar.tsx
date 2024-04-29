'use client'

import { Transition } from '@headlessui/react'
import { cn } from '@lib/utils'
import { useSidebarActions, useSidebarStore } from '@stores/sidebarStore'
import { ComponentPropsWithRef } from 'react'
import CustomThemeSwitcher from '@components/CustomThemeSwitcher'
import SidebarBoardSwitcher from './SidebarBoardSwitcher'
import SidebarButton from './SidebarButton'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";

type Props = ComponentPropsWithRef<'div'>

function SidebarComp({ className, ...rest }: Props) {
    const isOpen = useSidebarStore((state) => state.isOpen)
    const { open, close } = useSidebarActions()


    return (
        <>
            <div
                className={cn(
                    'left-0 min-w-[18rem] h-full py-8 pb-24 z-20 transition-transform fixed flex flex-col justify-between border-r-2 border-lines-light dark:border-lines-dark bg-white dark:bg-gray-dark',
                    {
                        '-translate-x-full': !isOpen,
                        'translate-x-0': isOpen,
                    },
                    className
                )}
                {...rest}
            >
                <SidebarBoardSwitcher />
                <div className='flex flex-col gap-4'>
                    <div className='px-8'>
                        <CustomThemeSwitcher />
                    </div>
                    <SidebarButton isActive={false} onClick={close} className='mb-5 py-2'>
                        <div className='text-gray-medium font-bold text-sm flex gap-5 items-center'>
                            <FaRegEyeSlash className='w-5 h-5' />
                            <span>Hide sidebar</span>
                        </div>
                    </SidebarButton>
                </div>
            </div>
            <Transition
                show={!isOpen}
                as='div'
                className={cn('z-30 absolute bottom-6 left-0')}
                enter='ease-out duration-150 delay-75'
                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                enterTo='opacity-100 translate-y-0 sm:scale-100'
                leave='ease-in duration-75'
                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
                <SidebarButton isActive={false} className="p-2 mb-5" onClick={open}>
                    <FaRegEye className='w-5 h-5 dark:text-white text-black' />
                </SidebarButton>
            </Transition>
        </>
    )
}

export default SidebarComp

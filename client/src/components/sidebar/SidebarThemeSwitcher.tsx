'use client'

import { ThemeSwitcher } from '@components/theme/ThemeSwitcher'
import { cn } from '@lib/utils'
import Image from 'next/image'
import { ComponentPropsWithoutRef } from 'react'
import moon from '/public/icon/icon-dark-theme.svg'
import sun from '/public/icon/icon-light-theme.svg'

type Props = ComponentPropsWithoutRef<'div'>

function SidebarThemeSwitcher({ className, ...rest }: Props) {
    return (
        <div
            {...rest}
            className={cn(
                'w-full flex justify-center items-center bg-gray-light dark:bg-gray-very-dark p-4 rounded-lg',
                className
            )}
        >
            <div className='flex gap-4 items-center'>
                <Image src={sun} alt='' />
                <ThemeSwitcher />
                <Image src={moon} alt='' />
            </div>
        </div>
    )
}

export default SidebarThemeSwitcher

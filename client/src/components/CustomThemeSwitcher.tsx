'use client'

import { ThemeSwitcher } from '@components/theme/ThemeSwitcher'
import Image from 'next/image'
import sun from '/public/icon/icon-light-theme.svg'
import moon from '/public/icon/icon-dark-theme.svg'
import { ComponentPropsWithoutRef } from 'react'
import { cn } from '@lib/utils'

type Props = ComponentPropsWithoutRef<'div'>

function CustomThemeSwitcher({ className, ...rest }: Props) {
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

export default CustomThemeSwitcher

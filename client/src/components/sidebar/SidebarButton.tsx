import { cn } from '@lib/utils'
import { CustomFlowbiteTheme } from 'flowbite-react'
import { ComponentProps } from 'react'
import { Button } from 'flowbite-react'

type Props = ComponentProps<typeof Button> & {
    isActive: boolean,
    className?: string,
    children,
}

function SidebarButton({ isActive, className, children, ...rest }: Props) {
    const ButtonTheme: CustomFlowbiteTheme['button'] = {
        inner: {
            base: "flex flex-1 items-stretch items-center transition-all duration-200",
        }
    };

    return (
        <Button
            theme={ButtonTheme} color='purple' size="xs"
            className={cn('mr-8 pl-3 rounded-l-none rounded-r-full hover:bg-purple-400', className, {
                '!bg-purple-500/20': !isActive,
                'hover:!bg-purple-500/30': !isActive,
            })}
            {...rest}
        >
            {children}
        </Button>
    )
}

export default SidebarButton;

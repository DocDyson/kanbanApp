import { ComponentPropsWithRef, forwardRef } from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

const buttonVariants = cva(['rounded-full', 'text-center', 'font-bold', 'transition-colors', 'cursor-pointer'], {
  variants: {
    variant: {
      primary: 'bg-purple-default hover:bg-purple-light text-white',
      secondary:
        'bg-purple-default/10 hover:bg-purple-default/25 text-purple-default dark:bg-white dark:hover:bg-white',
      destructive: 'bg-red-default hover:bg-red-light text-white',
      unstyled: '',
    },
    size: {
      default: 'text-sm px-3 py-2.5',
      large: 'px-4 py-3',
    },
    disabled: {
      true: 'opacity-25',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
})

type Props = VariantProps<typeof buttonVariants> & ComponentPropsWithRef<'button'>

const Button = forwardRef<HTMLButtonElement, Props>(({ className, size, variant, disabled, ...props }, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(buttonVariants({ variant, size, disabled, className }))}
      {...props}
    />
  )
})

Button.displayName = 'Button'

export default Button

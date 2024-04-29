import { VariantProps, cva } from 'class-variance-authority'
import React, { Fragment, ComponentPropsWithoutRef } from 'react'
import { Switch as HeadlessSwitch } from '@headlessui/react'
import { cn } from '@lib/utils'

type Props = ComponentPropsWithoutRef<typeof HeadlessSwitch>

function Switch(props: Props) {
  return (
    <HeadlessSwitch
      {...props}
      className={`bg-purple-default hover:bg-purple-light transition-colors px-1 h-6 w-12 shrink-0 cursor-pointer rounded-full`}
    >
      <span className='sr-only'>Use setting</span>
      <div
        className={cn('w-full h-full flex items-center justify-start transition-all duration-150', {
          'justify-end': props.checked,
        })}
      >
        <span
          aria-hidden='true'
          className={cn('pointer-events-none block h-[1.1rem] aspect-square rounded-full bg-white')}
        />
      </div>
    </HeadlessSwitch>
  )
}

export default Switch

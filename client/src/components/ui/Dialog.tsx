import { Dialog as HeadlessDialog, Transition } from '@headlessui/react'
import { cn } from '@lib/utils'
import React, { ComponentProps, Fragment } from 'react'

type Props = {
  open: boolean
} & ComponentProps<typeof HeadlessDialog>

function Dialog({ onClose, open, children, className, ...rest }: Props) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <HeadlessDialog as='div' className='relative' onClose={onClose} {...rest}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 z-30 bg-black/40 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 w-screen overflow-y-auto z-40'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <HeadlessDialog.Panel
                className={cn(
                  'bg-white dark:bg-gray-dark relative overflow-hidden rounded-lg shadow-xl min-w-[180px] max-w-[450px] w-[75vw]',
                  className
                )}
              >
                {children}
              </HeadlessDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessDialog>
    </Transition.Root>
  )
}

function CustomDialogTitle(props: ComponentProps<typeof HeadlessDialog.Title>) {
  return (
    <HeadlessDialog.Title
      as='h3'
      className='text-left uppercase text-gray-medium py-4 px-8 text-sm font-bold tracking-widest'
      {...props}
    />
  )
}

Dialog.Title = CustomDialogTitle

export default Dialog

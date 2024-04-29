'use client';
import Image from 'next/image'
import Button from '@components/ui/Button'
import { Dropdown } from "flowbite-react";
import { useUserActions } from '@stores/userStore';
import { UserModel } from '@models/User';
import { useRouter } from 'next/navigation';
import { HiDotsVertical } from "react-icons/hi";


function Header() {
    const router = useRouter();

    const { setUser, setisLogged } = useUserActions();

    const handleSingOutClick = (): void => {
        setUser(new UserModel())
        setisLogged(false);
    }

    return (
        <header className='p-4 z-30 bg-white dark:bg-gray-dark border-b-2 border-lines-light dark:border-lines-dark flex justify-between items-center'>
            <div>
                <Image data-hide-on-theme='dark' src='/brand/logo-dark.svg' alt='kanban logo' width={153} height={26} />
                <Image data-hide-on-theme='light' src='/brand/logo-light.svg' alt='kanban logo' width={153} height={26} />
            </div>
            <div>
                <Dropdown label='' renderTrigger={() => <Button variant={'unstyled'}><HiDotsVertical className='w-5 h-5' /></Button>}>
                    <Dropdown.Item onClick={() => router.push('/profile/')}>Profile</Dropdown.Item>
                    <Dropdown.Item onClick={() => router.push('/board/')}>Board</Dropdown.Item>
                    <Dropdown.Item onClick={handleSingOutClick} className='!text-red-600'>Sign out</Dropdown.Item>
                </Dropdown>
            </div>

        </header>
    )
}

export default Header

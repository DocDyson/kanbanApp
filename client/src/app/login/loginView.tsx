'use client'
import React, { memo, useEffect, useState } from 'react'
import { Label, TextInput, Card, Button } from 'flowbite-react';
import { LoginService } from '@components/services/loginService';
import { ApiUrls } from '@components/consts/apiURLs';
import { useUserStore } from '@stores/userStore';
import { useUserActions } from '@stores/userStore';
import { redirect } from 'next/navigation';

function LoginView() {
    const { isLogged } = useUserStore();
    const { setUser, setisLogged } = useUserActions();

    const loginService = new LoginService(ApiUrls.login);

    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (isLogged) redirect('/board/');
    })

    const handleEmailChanged = (e): void => {
        setUserEmail(e.target.value);
    }

    const handlePasswordChanged = (e): void => {
        setUserPassword(e.target.value);
    }

    const handleLoginClick = async (): Promise<any> => {
        const data = {
            email: userEmail,
            password: userPassword,
        }

        await loginService.post(data)
        if (loginService.isSuccess) {
            setUser(loginService.parsedData);
            setisLogged(true);
            setIsError(false);
        } else {
            setIsError(true);
        }
    }

    return (
        <Card className='mx-auto w-1/3 min-w-fit'>
            <h2 className='mb-3'>Login</h2>
            <Label htmlFor="email" value="Your email" className="-mb-2" />
            <TextInput value={userEmail} onChange={handleEmailChanged} id="email" type="email" placeholder="name@flowbite.com" required />
            <Label htmlFor="password" value="Your password" className="-mb-2" />
            <TextInput value={userPassword} onChange={handlePasswordChanged} id="password" type="password" />
            {isError && (
                <span className='text-center text-red-400 text-sm'>
                    Login failed.<br />Verify your credentials and try again.
                </span>
            )}
            <Button className={isError ? '' : 'mt-4'} onClick={handleLoginClick} color="purple">Login</Button>
            <div className='mx-auto text-sm text-center'>
                Don&apos;t have account yet? <a className='font-bold text-purple-400' href='/register/'>Register now</a>
            </div>
        </Card>
    )
}

export default memo(LoginView)

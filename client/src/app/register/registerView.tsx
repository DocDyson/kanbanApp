'use client'
import React, { memo, useEffect, useState } from 'react'
import { Label, TextInput, Card, Button } from 'flowbite-react';
import { ApiUrls } from '@components/consts/apiURLs';
import { useUserStore } from '@stores/userStore';
import { redirect } from 'next/navigation';
import { RegisterService } from '@components/services/registerService';
import { IoArrowBack } from "react-icons/io5";

function RegisterView() {
    const apiService = new RegisterService(ApiUrls.register);
    const { isLogged } = useUserStore()

    const [showSuccess, setShowSuccess] = useState(false);

    const [userEmail, setUserEmail] = useState('');
    const [userPassword1, setUserPassword1] = useState('');
    const [userPassword2, setUserPassword2] = useState('');

    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (isLogged) redirect('/board/');
    }, [])

    const handleEmailChanged = (e): void => {
        setUserEmail(e.target.value);
    }

    const handlePassword1Changed = (e): void => {
        setUserPassword1(e.target.value);
    }

    const handlePassword2Changed = (e): void => {
        setUserPassword2(e.target.value);
    }

    const handleRegisterClick = async (e) => {
        const data = {
            'email': userEmail,
            'password1': userPassword1,
            'password2': userPassword2,
        }

        await apiService.post(data)

        if (apiService.isSuccess) setShowSuccess(true);
        else setIsError(true);
    }

    return (
        <Card className='mx-auto w-1/3 min-w-fit'>
            <h2 className="mb-3 flex items-center gap-3">
                <a href="/login/">
                    <IoArrowBack className='w-8 h-8' />
                </a>
                Register
            </h2>
            <Label className="-mb-2" htmlFor="email1" value="Email" />
            <TextInput value={userEmail} onChange={handleEmailChanged} id="email1" type="email" placeholder="name@email.com" required />
            <Label className="-mb-2" htmlFor="password1" value="Password" />
            <TextInput value={userPassword1} onChange={handlePassword1Changed} id="password1" type="password" />
            <Label className="-mb-2" htmlFor="password2" value="Repeat password" />
            <TextInput value={userPassword2} onChange={handlePassword2Changed} id="password2" type="password" />
            { isError && (
                <span className='text-center text-red-400 text-sm'>
                Registration failed.<br />Please review your information and try again.
            </span>
            )}
            <Button className={isError ? '' : 'mt-4'} onClick={handleRegisterClick} color="purple">Create account</Button>
            { showSuccess &&
                <div className='mt-3 mx-auto text-sm text-center text-green-400'>Registration successfull! <a className='font-bold' href='/login/'>Go to login page</a></div>
            }
        </Card>
    )
}

export default memo(RegisterView)

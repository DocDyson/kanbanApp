'use client'
import React, { memo, useEffect, useRef, useState } from 'react'
import { Label, TextInput, Card, Button, Avatar, Textarea, Progress, CustomFlowbiteTheme } from 'flowbite-react';
import { ApiUrls } from '@components/consts/apiURLs';
import { useUserStore } from '@stores/userStore';
import { useUserActions } from '@stores/userStore';
import { redirect } from 'next/navigation';

import { LuPencilLine, LuSave } from "react-icons/lu";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { UserService } from '@components/services/userService';
import { useBoardActions } from '@stores/boardStore';
import { ChangePasswordService } from '@components/services/changePasswordService';


function ProfileView() {
    const { user, isLogged } = useUserStore();
    const { setUser } = useUserActions();
    const { setSelectedBoard } = useBoardActions();

    const userService = new UserService(ApiUrls.user, user.key);
    const changePasswordService = new ChangePasswordService(ApiUrls.changePassword, user.key);

    const [userName, setUserName] = useState(user.name);
    const [userSurname, setUserSurname] = useState(user.surname);
    const [userBio, setUserBio] = useState(user.description);
    const [userPassword1, setUserPassword1] = useState('');
    const [userPassword2, setUserPassword2] = useState('');

    const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
    const [isEditingBio, setIsEditingBio] = useState(false);
    const [isEditingAuth, setIsEditingAuth] = useState(false);

    const [isChangePassError, setIsChangePassError] = useState(false);
    const [isChangePassSuccess, setIsChangePassSuccess] = useState(false);

    const userAvatarRef = useRef(null);

    const AvatarTheme: CustomFlowbiteTheme['avatar'] = {
        root: { size: { '2xl': 'w-56 h-56', } }
    };

    useEffect(() => {
        if (!isLogged) redirect('/login/');
        setSelectedBoard(null);
    })

    // utils
    const getProgess = (): number => {
        let progress: number = 0;
        const fieldsCount = 3;
        const oneFieldPercentage = 100 / fieldsCount;

        if (userName !== '') progress += oneFieldPercentage
        if (userSurname !== '') progress += oneFieldPercentage
        if (userBio !== '') progress += oneFieldPercentage

        return Math.round(progress * 10) / 10;
    }

    // api utils
    const handleUserDetailsApiResponse = (): void => {
        if (userService.isSuccess) {
            const responseUser = userService.parsedData;
            responseUser.key = user.key;

            setUser(responseUser);
        }
    }

    // other utils
    const getUserAvatarUrl = (): string => {
        return user.avatar ? user.avatar : 'https://picsum.photos/200/200';
    }

    // save click handlers
    const handleSavePersonalInfoClick = async (): Promise<any> => {
        const data = {
            first_name: userName,
            last_name: userSurname,
        }

        await userService.put(data);
        if (userService.isSuccess) setIsEditingPersonalInfo(false);
        handleUserDetailsApiResponse()
    }

    const handleSaveBioClick = async (): Promise<any> => {
        const data = {
            description: userBio,
        }

        await userService.put(data);
        if (userService.isSuccess) setIsEditingBio(false);
        handleUserDetailsApiResponse()
    }

    const handleChangePasswordClick = async (): Promise<any> => {
        const data = {
            new_password1: userPassword1,
            new_password2: userPassword2,
        }

        await changePasswordService.post(data);
        if (changePasswordService.isSuccess) {
            setIsChangePassError(false);
            setIsChangePassSuccess(true);
        } else {
            setIsChangePassError(true);
            setIsChangePassSuccess(false);
        }
    }

    const handleAvatarChanged = async (e): Promise<any> => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('avatar', file);

        await userService.put(formData);
        handleUserDetailsApiResponse()
    }

    // cancel click handlers
    const handleCancelPersonalInfoClick = async (): Promise<any> => {
        setUserName(user.name);
        setUserSurname(user.surname);
        setIsEditingPersonalInfo(false);
    }

    const handleCancelBioClick = async (): Promise<any> => {
        setUserBio(user.description);
        setIsEditingBio(false);
    }

    // editing handlers
    const handleUserBioChanged = (e): void => {
        setUserBio(e.target.value);
    }

    const handleUserNameChanged = (e): void => {
        setUserName(e.target.value);
    }

    const handleUserSurnameChanged = (e): void => {
        setUserSurname(e.target.value);
    }

    const handlePassword1Changed = (e): void => {
        setUserPassword1(e.target.value);
    }

    const handlePassword2Changed = (e): void => {
        setUserPassword2(e.target.value);
    }

    const handleAvatarClick = (): void => {
        userAvatarRef.current.click();
    }

    return (
        <div className="flex flex-col gap-5">
            <h2>Edit profile</h2>
            <div className="flex flex-row gap-6">
                <Card className="min-w-fit">
                    <div className="flex flex-col gap-8">
                        <div className="flex gap-6">
                            <Avatar theme={AvatarTheme} img={getUserAvatarUrl()} size='2xl' bordered color="purple" rounded />
                            <div className="flex flex-col justify-center">
                                <Button color="light" className="mb-4" onClick={handleAvatarClick}>Upload new photo</Button>
                                <span>At least 200 x 200 px recommended</span>
                                <span>JPG or PNG is allowed</span>
                                <input type='file' id='file' ref={userAvatarRef} style={{display: 'none'}} onChange={handleAvatarChanged} />
                            </div>
                        </div>
                        <Card>
                            <div className="flex justify-between">
                                <span className="font-bold text-lg">Personal info</span>
                                {isEditingPersonalInfo ?
                                    (
                                        <div className='flex gap-4'>
                                            <Button color="purple" size="sm" className="px-2" onClick={handleSavePersonalInfoClick}>
                                                <LuSave className="mr-2 h-4 w-4" />
                                                Save
                                            </Button>
                                            <Button color="gray" size="sm" className="px-2" onClick={handleCancelPersonalInfoClick}>
                                                Cancel
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button color="light" size="sm" className="px-2" onClick={() => setIsEditingPersonalInfo(true)}>
                                            <LuPencilLine className="mr-2 h-4 w-4" />
                                            Edit
                                        </Button>
                                    )
                                }

                            </div>
                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <Label value="First name" />
                                    <TextInput value={userName} onChange={handleUserNameChanged} disabled={!isEditingPersonalInfo} />
                                </div>
                                <div className="flex-1">
                                    <Label value="Last name" />
                                    <TextInput value={userSurname} onChange={handleUserSurnameChanged} disabled={!isEditingPersonalInfo} />
                                </div>
                            </div>
                        </Card>
                        <Card>
                            <div className="flex justify-between">
                                <span className="font-bold text-lg">Bio</span>
                                {isEditingBio ?
                                    (
                                        <div className='flex gap-4'>
                                            <Button onClick={handleSaveBioClick} color="purple" size="sm" className="px-2">
                                                <LuSave className="mr-2 h-4 w-4" />
                                                Save
                                            </Button>
                                            <Button color="gray" size="sm" className="px-2" onClick={handleCancelBioClick}>
                                                Cancel
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button color="light" size="sm" className="px-2" onClick={() => setIsEditingBio(true)}>
                                            <LuPencilLine className="mr-2 h-4 w-4" />
                                            Edit
                                        </Button>
                                    )
                                }
                            </div>
                            <Textarea value={userBio} onChange={handleUserBioChanged} disabled={!isEditingBio} />
                        </Card>
                        <Card>
                            <div className="flex justify-between">
                                <span className="font-bold text-lg">Authorization</span>
                                {isEditingAuth ?
                                    (
                                        <div className='flex gap-4'>
                                            <Button color="purple" size="sm" className="px-2" onClick={handleChangePasswordClick}>
                                                <LuSave className="mr-2 h-4 w-4" />
                                                Save
                                            </Button>
                                            <Button color="gray" size="sm" className="px-2" onClick={() => setIsEditingAuth(false)}>
                                                Cancel
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button color="light" size="sm" className="px-2" onClick={() => setIsEditingAuth(true)}>
                                            <LuPencilLine className="mr-2 h-4 w-4" />
                                            Edit
                                        </Button>
                                    )
                                }
                            </div>
                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <Label value="Password" />
                                    <TextInput value={userPassword1} onChange={handlePassword1Changed} type="password" disabled={!isEditingAuth} />
                                </div>
                                <div className="flex-1">
                                    <Label value="Repeat password" />
                                    <TextInput value={userPassword2} onChange={handlePassword2Changed} type="password" disabled={!isEditingAuth} />
                                </div>
                            </div>
                            {isChangePassError && (
                                <span className='text-red-500 text-sm'>Error</span>
                            )}
                            {isChangePassSuccess && (
                                <span className='text-green-500 text-sm'>Password changed.</span>
                            )}
                        </Card>
                    </div>
                </Card>
                <Card className="min-w-fit h-64">
                    <div className='w-48 flex flex-col gap-2'>
                        <p className='text-center'>Complete your profile</p>
                        <Progress progress={getProgess()} size="lg" color="purple" labelProgress />
                        <div className='flex items-center gap-2 mt-5'>
                            {userName !== '' ? <FaCheck className='text-green-400' /> : <FaXmark color="red" />}
                            <span>Name</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            {userSurname !== '' ? <FaCheck className='text-green-400' /> : <FaXmark color="red" />}
                            <span>Surname</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            {userBio !== '' ? <FaCheck className='text-green-400' /> : <FaXmark color="red" />}
                            <span>Bio</span>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default memo(ProfileView)

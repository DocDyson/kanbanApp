'use client';
import { useUserStore } from "@stores/userStore";
import { useEffect } from "react";
import { redirect } from "../../node_modules/next/navigation";

export function HomeView() {
    const { isLogged } = useUserStore();

    useEffect(() => {
        if (!isLogged) redirect('/login/');
        else redirect('/board/');
    })

    return null;
}
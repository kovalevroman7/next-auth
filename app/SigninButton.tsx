"use client";
import {signIn, signOut} from "next-auth/react";

export const SigninButton = () => {
    return (
        <>
            <button onClick={() => signIn('customCasdoorProvider')} >Войти</button>
            <button onClick={() => signOut()} >Выйти</button>
        </>
    )
}
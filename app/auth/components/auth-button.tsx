'use client';
import React from 'react';
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useRouter} from "next/navigation";
import type {Session} from "@supabase/supabase-js";
import GithubButton from "@/app/login/github-button";

export type AuthButtonProps = {
    session: Session | null
}

export default function AuthButton({ session }: AuthButtonProps) {
    const supabase = createClientComponentClient<Database>();
    const router = useRouter();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
    }

    return (
        <>
            {!session ? (
                <GithubButton />
            ) : (
                <button className="text-xs text-gray-400" onClick={handleSignOut}>Logout</button>
            )}
        </>
    );
}

'use client';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";

export default function GithubButton() {
    const supabase = createClientComponentClient<Database>();
    const handleSignIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: 'http://localhost:3000/auth/callback'
            }
        });
    }
    return (
        <button onClick={handleSignIn} className="hover:bg-gray-800 p-8 rounded-xl">
            <Image src="/github-mark-white.svg" alt="Github Logo" height={100} width={100} />
        </button>
    )
}
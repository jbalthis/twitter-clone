import React from 'react';
import {createServerActionClient} from "@supabase/auth-helpers-nextjs";
import { cookies} from "next/headers";
import Image from 'next/image';
import {User} from '@supabase/auth-helpers-nextjs';

export type NewTweetProps = {
    user: User
}

export default function NewTweet({ user }: NewTweetProps) {
    const addTweet = async (formData: any) => {
        'use server'
        const title = formData.get('title')
        const supabase = createServerActionClient<Database>({ cookies })
        const { data: { user }} = await supabase.auth.getUser();
        if(user){
            await supabase.from("tweets").insert({ title, user_id: user.id })
        }
    }
    return (
        <form action={addTweet} className="border border-t-0 border-gray-800">
            <div className="flex py-8 px-4">
                <Image src={user.user_metadata.avatar_url} width={48} height={48} alt="user avatar" className="bg-red-200 h-12 w-12 rounded-full" />
                <input name='title' className="bg-inherit flex-1 ml-2 text-2xl px-2 leading-loose placeholder-gray-500" placeholder="What is happening?!" />
            </div>
        </form>
    );
}

'use client';
import Likes from "@/app/likes";
import {experimental_useOptimistic as useOptimistic, useEffect} from 'react';
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useRouter} from 'next/navigation';
import Image from "next/image";

type TweetsProps = {
    tweets: TweetWithAuthor[]
}

export default function Tweets({ tweets }: TweetsProps){
    const [optimisticTweets, addOptimisticTweet] = useOptimistic<TweetWithAuthor[], TweetWithAuthor>(
        tweets,
        (currentOptimisticTweets, newTweet) => {
            const newOptimisticTweets = [
                ...currentOptimisticTweets
            ]
            const index = newOptimisticTweets.findIndex(tweet => tweet.id === newTweet.id)
            newOptimisticTweets[index] = newTweet;
            return newOptimisticTweets;
        }
    )
    const router = useRouter();
    const supabase = createClientComponentClient<Database>()
    useEffect(() => {
        const channel = supabase.channel('realtime tweets').on('postgres_changes', {
            event: '*',
            schema: 'public',
            table: 'tweets'
        }, (payload) => {
            router.refresh();
        }).subscribe();

        return () => {
            supabase.removeChannel(channel)
        }
    }, []);

    return optimisticTweets.map((tweet) => (
        <div key={tweet.id} className="border border-gray-800 border-t-0 px-4 py-8 flex">
            <div className="h-12 w-12">
                <Image src={tweet.author.avatar_url} alt="user avatar" width={48} height={48} className="rounded-full" />
            </div>
            <div className="ml-4">
                <p>
                    <span className="font-bold">{tweet.author.name}</span>
                    <span className="text-sm ml-2 text-gray-400">{tweet.author.username}</span>
                </p>
                <p>{tweet.title}</p>
                <Likes tweet={tweet} addOptimisticTweet={addOptimisticTweet} />
            </div>
        </div>
    ))
}
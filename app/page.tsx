
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import AuthButton from "@/app/auth/components/auth-button";
import {redirect} from "next/navigation";
import NewTweet from "@/app/new-tweet";
import Likes from "@/app/likes";
import Tweets from "@/app/tweets";


export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: { session }} = await supabase.auth.getSession();

  if(!session){
      redirect('/login')
  }

  const { data } = await supabase.from("tweets").select("*, author: profile(*), likes(user_id)").order('created_at', {ascending: false});

  const tweets = data?.map((tweet) => ({
      ...tweet,
      author: Array.isArray(tweet.author) ? tweet.author[0] : tweet.author,
      user_has_liked_tweet: !!tweet.likes.find(like => like.user_id === session.user.id),
      likes: tweet.likes.length
  })) ?? [];

  return (
      <div className="w-full max-w-xl mx-auto">
        <div className="flex justify-between px-4 py-6 border border-t-0 border-gray-800">
            <h1 className="text-xl font-bold">Home</h1>
            <AuthButton session={session} />
        </div>
        <NewTweet user={session.user} />
          <Tweets tweets={tweets}/>
      </div>

  )
}

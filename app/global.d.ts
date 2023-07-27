import {Database as DB} from "@/lib/db.types";

declare global {
    type Database = DB
    type Tweet = DB['public']['Tables']['tweets']['Row'];
    type Profile = DB['public']['Tables']['profile']['Row'];
    type TweetWithAuthor = Tweet & {
        author: Profile;
        likes: number;
        user_has_liked_tweet: boolean
    }
}
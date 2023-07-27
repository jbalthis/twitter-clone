import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import AuthButton from "@/app/auth/components/auth-button";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import GithubButton from "@/app/login/github-button";

export default async function Login() {
    const supabase = createServerComponentClient<Database>({ cookies });
    const { data: { session }} = await supabase.auth.getSession();

    if (session) {
        redirect("/");
    }

    return (<div className="flex flex-1 justify-center items-center">
        <GithubButton/>
    </div>)

}
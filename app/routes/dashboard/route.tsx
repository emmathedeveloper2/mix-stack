import {safeTry} from "~/utils";
import {getCurrentUser} from "~/.server";
import { redirect } from "react-router";
import {authCookie} from "~/.server/config/cookies.config";
import { Link, useLoaderData } from "react-router";
import { Route } from "./+types/route";

export async function loader({ request } : Route.LoaderArgs){

    const [ success , user ] = await safeTry(getCurrentUser(request.headers))

    if(!success) return redirect('/signup' , {
        headers: {
            'Set-Cookie': await authCookie.serialize('' , { maxAge: 1 })
        }
    })

    if(!user.verified) return redirect('/choose-verification-method')

    return { user }
}

export default function DashboardPage({ loaderData } : Route.ComponentProps){

    const { user } = loaderData

    return (
        <div className={"size-full flex flex-col items-center justify-center p-2"}>
            <div className={"w-full md:w-[400px] flex flex-col gap-8 items-center"}>
                <h1 className={"text-xl md:text-5xl font-black"}>MixStack 🧃</h1>

                <p>Welcome {user?.email}</p>

                <Link to={'/logout'} className={"bg-black text-white dark:bg-white dark:text-black p-2 w-full text-center"}>
                    LOGOUT
                </Link>
            </div>
        </div>
    )
}
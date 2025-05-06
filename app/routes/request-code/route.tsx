import { LoaderFunctionArgs, redirect } from "react-router";
import {getCurrentSession, getCurrentUser, sendCode} from "~/.server";
import {safeTry} from "~/utils";
import {authCookie} from "~/.server/config/cookies.config";


export const loader = async ({ request } : LoaderFunctionArgs) => {

    const [ sessionSuccess , session ] = await safeTry(getCurrentSession(request.headers))

    const [ userSuccess , user ] = await safeTry(getCurrentUser(request.headers))

    if(!userSuccess || !sessionSuccess || !session || !user) return redirect('/signup' , {
        headers: {
            'Set-Cookie': await authCookie.serialize('' , { maxAge: 1 })
        }
    })

    const [ success , updatedSession ] = await safeTry(sendCode(session , user.email))

    if(!success) return redirect('/error')

    return redirect('/enter-code' , {
        headers: { 'Set-Cookie': await authCookie.serialize(updatedSession)}
    })
}
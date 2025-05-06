import { redirect } from "react-router";
import {authCookie} from "~/.server/config/cookies.config";


export const loader = async () => {

    return redirect('/' , {
        headers: {
            'Set-Cookie': await authCookie.serialize('' , { maxAge: 1 })
        }
    })
}
import {createCookie} from "@remix-run/node";
import {COOKIE_SECRET} from "~/.server/config/env.config";


export const authCookie = createCookie('user' , {
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
    secure: true,
    path: '/',
    secrets: [COOKIE_SECRET!]
})
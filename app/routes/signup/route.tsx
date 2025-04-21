import { ActionFunctionArgs } from "@remix-run/node";
import {Form, Link, useActionData, useNavigation} from "@remix-run/react";
import {LoaderIcon} from "lucide-react";
import {signUpWithEmailAndPassword} from "~/.server";
import {redirect} from "@remix-run/router";
import {authCookie} from "~/.server/config/cookies.config";
import {safeTry} from "~/utils";

export async function action({ request } : ActionFunctionArgs){

    //Parse data from request
    const { username , email, password }: any = Object.fromEntries(await request.formData())

    const [ success , data , message ] = await safeTry(signUpWithEmailAndPassword(username , email, password))

    if(!success) return {
        success,
        message
    }

    return redirect('/request-code' , {
        headers: {
            'Set-Cookie': await authCookie.serialize(data)
        }
    })
}

export default function SignUpPage(){

    const { state } = useNavigation()

    const isBusy = state == 'loading' || state == 'submitting'

    const actionData = useActionData<typeof action>()

    return (
        <div className={"size-full flex flex-col items-center justify-center p-2"}>
            <Form method={"POST"} className={"w-full md:w-[400px] flex flex-col gap-8 items-center"}>
                {
                    actionData && !actionData.success &&
                    <p className={"text-center"}>{actionData.message}</p>
                }

                <input
                    required
                    type="text"
                    name="username"
                    placeholder={"Your Username"}
                    className={"w-full p-2"}
                />

                <input
                    required
                    type="email"
                    name="email"
                    placeholder={"Your Email"}
                    className={"w-full p-2"}
                />

                <input
                    required
                    type="password"
                    name="password"
                    placeholder={"Your Password"}
                    className={"w-full p-2"}
                />
                <button
                    disabled={isBusy}
                    className={"bg-black text-white dark:bg-white dark:text-black p-2 w-full flex items-center justify-center"}
                >
                    {isBusy ? <LoaderIcon className={"animate-spin"}/> : "SIGN UP"}
                </button>

                <span className={"flex gap-1"}>
                    Already have an account?
                    <Link to={'/signin'} className={"underline"}>
                        Sign In
                    </Link>
                </span>
            </Form>
        </div>
    )
}
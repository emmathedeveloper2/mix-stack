import {Form, Link, useNavigation} from "react-router";
import {LoaderIcon} from "lucide-react";
import {redirect} from "react-router";
import {getCurrentUser, verifyCode} from "~/.server";
import {authCookie} from "~/.server/config/cookies.config";
import {safeTry} from "~/utils";
import {Route} from "./+types/route";

export async function loader({request}: Route.LoaderArgs) {

    const [success, user] = await safeTry(getCurrentUser(request.headers))

    if (!success) return redirect('/signup', {
        headers: {
            'Set-Cookie': await authCookie.serialize('', {maxAge: 1})
        }
    })

    return {
        email: user.email
    }
}

export async function action({request}: Route.ActionArgs) {

    const [userFound, _, message] = await safeTry(getCurrentUser(request.headers))

    if (!userFound) return {
        success: false,
        message,
    }

    const {code} = Object.fromEntries(await request.formData())

    const [success, newSession, msg] = await safeTry(verifyCode(request.headers, code as any))

    if (!success) return {
        success,
        message: msg.replace("jwt", "code")
    }

    return redirect('/dashboard', {
        headers: {
            'Set-Cookie': await authCookie.serialize(newSession)
        }
    })
}

export default function CodePage({actionData , loaderData}: Route.ComponentProps) {

    const {email} = loaderData

    const {state} = useNavigation()

    const isBusy = state == 'loading' || state == 'submitting'

    const formatEmail = (text: string) => text.split("").reduce((prev: string, char, idx) => {
        prev += idx > 0 && idx < text.indexOf("@") ? '*' : char

        return prev
    }, "")

    return (
        <div className={"size-full flex flex-col items-center justify-center p-2"}>
            <Form method={"POST"} className={"w-full md:w-[400px] flex flex-col gap-8 items-center"}>
                {
                    actionData && !actionData.success &&
                    <p className={"text-center"}>{actionData.message}</p>
                }

                <p className={"text-center"}>A 6 digit code was sent to {formatEmail(email)}</p>

                <input
                    required
                    type="number"
                    name="code"
                    placeholder={"6 digit code"}
                    className={"w-full p-2"}
                />

                <button
                    disabled={isBusy}
                    className={"bg-black text-white dark:bg-white dark:text-black p-2 w-full flex items-center justify-center"}
                >
                    {isBusy ? <LoaderIcon className={"animate-spin"}/> : "VERIFY ACCOUNT"}
                </button>


                {!isBusy &&
                    <span className={"flex gap-1"}>
                        Didn't receive code?
                        <Link to={'/request-code'} className={"underline"}>
                            Resend Code
                        </Link>
                    </span>
                }
            </Form>
        </div>
    )
}
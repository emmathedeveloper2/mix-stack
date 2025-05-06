import { Link, useNavigation } from "react-router";
import {AsteriskSquareIcon, ChevronRightIcon, Link2Icon, LoaderIcon} from "lucide-react";
import {safeTry} from "~/utils";
import {getCurrentSession, getCurrentUser} from "~/.server";
import { LoaderFunctionArgs, redirect } from "react-router";
import {authCookie} from "~/.server/config/cookies.config";

export async function loader({request}: LoaderFunctionArgs) {
    const [sessionSuccess, session] = await safeTry(getCurrentSession(request.headers))

    const [userSuccess, user] = await safeTry(getCurrentUser(request.headers))

    if (!userSuccess || !sessionSuccess || !session || !user) return redirect('/signup', {
        headers: {
            'Set-Cookie': await authCookie.serialize('', {maxAge: 1})
        }
    })

    return null
}

export default function ChooseVerificationMethodPage() {

    const {state} = useNavigation()

    const isBusy = state == "loading" || state == "submitting"

    return (
        <div className={"size-full flex flex-col items-center justify-center p-2"}>
            {
                isBusy ?
                    <LoaderIcon className={"animate-spin"}/>
                    :
                    <div className={"w-full md:w-[400px] flex flex-col gap-8 items-center"}>
                        <h1 className={"text-3xl"}>Choose Verification Method</h1>

                        <Link to={'/request-code'}
                              className={"bg-black text-white dark:bg-white dark:text-black p-2 w-full flex items-center justify-between"}>
                            <div className={"flex items-center gap-4"}>
                                <AsteriskSquareIcon/>
                                Send 6 digit code
                            </div>

                            <ChevronRightIcon/>
                        </Link>

                        <Link to={'/signup'} className={"underline"}>
                            Go to Sign Up
                        </Link>
                    </div>
            }
        </div>
    )
}
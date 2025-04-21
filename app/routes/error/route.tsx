import {Link} from "@remix-run/react";


export default function ErrorPage(){

    return (
        <div className={"size-full flex flex-col items-center justify-center gap-4"}>
            <h1>Oops, Something went wrong</h1>

            <Link to={'/'} className={"md:w-[300px] bg-black text-white dark:bg-white dark:text-black p-2 w-full text-center"}>
                GO HOME
            </Link>
        </div>
    )
}
import type { MetaFunction } from "@remix-run/node";
import {Link, useLoaderData} from "@remix-run/react";
import {LoaderFunctionArgs} from "@remix-run/router";
import {getCurrentUser} from "~/.server";
import {safeTry} from "~/utils";

export const meta: MetaFunction = () => {
  return [
    { title: "MixStack" },
    { name: "description", content: "Welcome to MixStack" },
  ];
};

export async function loader({ request } : LoaderFunctionArgs){

  const [success , user] = await safeTry(getCurrentUser(request.headers))

  if(!success) return {}

  return {
    user
  }
}

export default function Index() {

  const { user } = useLoaderData<typeof loader>()

  return (
    <div className={"size-full flex flex-col items-center justify-center p-2"}>
        <div className={"w-full md:w-[400px] flex flex-col gap-8 items-center"}>

          <h1 className={"text-xl md:text-5xl font-black"}>MixStack 🧃</h1>

          <Link to={user ? '/dashboard' : '/signup'} className={"bg-black text-white dark:bg-white dark:text-black p-2 w-full text-center"}>
            {user ? "DASHBOARD" : "GET STARTED"}
          </Link>
        </div>
    </div>
  );
}

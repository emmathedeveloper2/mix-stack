import { Link } from "react-router";
import {getCurrentUser} from "~/.server";
import {safeTry} from "~/utils";
import { Route } from "./+types/_index";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "MixStack" },
    { name: "description", content: "Welcome to MixStack" },
  ];
};

export async function loader({ request } : Route.LoaderArgs){

  const [success , user] = await safeTry(getCurrentUser(request.headers))

  if(!success) return {}

  return {
    user
  }
}

export default function Index({ loaderData } : Route.ComponentProps) {

  const { user } = loaderData

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

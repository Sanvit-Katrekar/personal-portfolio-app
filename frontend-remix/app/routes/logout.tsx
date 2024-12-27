import { LoaderFunction, redirect } from "@remix-run/node";
import { getSession, commitSession } from "~/sessions.server"; // Adjust the import if necessary
import { BACKEND_BASE_URL } from "~/config/constants";
import axios from "axios";

export let loader: LoaderFunction = async ({ request }) => {
  try {

    await axios.get(`${BACKEND_BASE_URL}/logout`, { withCredentials: true });
  } catch (error) {
    console.error("Error logging out:", error);
  }

  let session = await getSession(request.headers.get("Cookie"));
  
  session.unset("auth");

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

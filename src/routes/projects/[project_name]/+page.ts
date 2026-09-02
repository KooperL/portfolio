import type { PageLoad } from "./$types";
import { currentUser, pb } from "$lib/pocketbase";
import { projectContent } from "$lib/config";
import { goto } from "$app/navigation";

export const prerender = true;
export const entries = () =>
  Object.keys(projectContent).map((key) => ({
    project_name: key,
  }));

export const load = (async ({ params }) => {
  if (!Object.keys(projectContent).includes(params["project_name"])) {
    goto("/");
  }
  return {
    project_name: params["project_name"],
  };
}) satisfies PageLoad;

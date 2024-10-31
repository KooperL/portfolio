import type { PageLoad } from "./$types";
import { currentUser, pb } from "$lib/pocketbase";
import { projects } from "$lib/config";
import { goto } from "$app/navigation";

export const load = (async ({ params }) => {
  if (!Object.keys(projects).includes(params["project_name"])) {
    goto("/");
  }
  return {
    project_name: params["project_name"],
  };
}) satisfies PageLoad;

<script lang="ts">
  import { pb } from "$lib/pocketbase";
  import { onMount } from "svelte";
  import { Card } from "flowbite-svelte";
  import { logger } from "$lib/logger";
  import Parser from "$lib/utils/CMS/parser.svelte";
  import type { PageData } from "../$types";
  import { projectContent } from "$lib/config";
  import type { CmsDocumentObject } from "$lib/utils/CMS";

  export let data: PageData;

  onMount(async () => {});

  const jsonContent =
    projectContent[data.project_name as keyof typeof projectContent] as CmsDocumentObject;
</script>

<div class="box-border p-8 w-full h-full">
  <Card class="w-full max-w-full h-full max-h-full bg-white overflow-y-scroll">
    <Parser doc={jsonContent} />
  </Card>
</div>

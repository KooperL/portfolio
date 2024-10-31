<script lang="ts">
  import { pb } from "$lib/pocketbase";
  import { onMount } from "svelte";
  import { Card, Button, Skeleton } from "flowbite-svelte";
  import { site, generateProjectContent } from "$lib/config";
  import { logger } from "$lib/logger";
  import Parser from "$lib/utils/CMS/parser.svelte";
  import type { PageData } from "../$types";

  export let data: PageData;

  onMount(async () => {});

  let functions = {
    logInfo: logger.info,
  };

  const jsonContent = generateProjectContent(data.project_name);
</script>

<div class="box-border p-8 w-full h-full">
  <Card class="w-full max-w-full h-full max-h-full bg-white overflow-y-scroll">
    <Parser content={jsonContent} {functions} />
  </Card>
</div>

<script lang="ts">
  import Parser from "$lib/utils/CMS/parser.svelte";
  import homeDoc from "$lib/assets/cms/home.json";
  import type { CmsDocumentObject } from "$lib/utils/CMS";

  const doc: CmsDocumentObject = homeDoc as CmsDocumentObject;
</script>

<div class="box-border p-0 sm:p-8 w-full h-full">
  <div class="w-full max-w-full h-full max-h-full bg-white overflow-y-scroll p-4">
    <Parser {doc} />
  </div>
</div>

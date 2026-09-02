<script lang="ts">
  import Parser from "$lib/utils/CMS/parser.svelte";
  import aboutDoc from "$lib/assets/cms/about.json";
  import type { CmsDocumentObject } from "$lib/utils/CMS";

  const doc: CmsDocumentObject = aboutDoc as CmsDocumentObject;
</script>

<div class="box-border p-8 w-full h-full">
  <div class="w-full max-w-full h-full max-h-full bg-white overflow-y-scroll p-4">
    <Parser {doc} />
  </div>
</div>

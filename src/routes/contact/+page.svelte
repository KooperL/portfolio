<script lang="ts">
  import { logger } from "$lib/logger";
  import { pb } from "$lib/pocketbase";
  import Parser from "$lib/utils/CMS/parser.svelte";
  import contactDoc from "$lib/assets/cms/contact.json";
  import type { CmsDocumentObject, FunctionRegistry } from "$lib/utils/CMS";
  import { Card } from "flowbite-svelte";

  const doc: CmsDocumentObject = contactDoc as CmsDocumentObject;

  let submitted = false;
  let submittedSuccessfully = false;
  let contactNameInputValue = "";
  let contactEmailInputValue = "";
  let contactContentTextareaValue = "";

  const functions: FunctionRegistry = {
    logInfo: (params) => logger.info("contact-page", JSON.stringify(params)),
    updateNameOnTextChange: (params) => {
      contactNameInputValue = params.newValue ?? "";
    },
    updateEmailOnTextChange: (params) => {
      contactEmailInputValue = params.newValue ?? "";
    },
    updateContentOnTextChange: (params) => {
      contactContentTextareaValue = params.newValue ?? "";
    },
    submitContactContent: async (params) => {
      logger.debug("contact-page", "Submit contact form");
      try {
        const { name, content, email } = params;

        if (!name || !name.length) {
          throw new Error("Name is required");
        }
        if (!content || !content.length) {
          throw new Error("Message is required");
        }

        const payload = {
          name,
          email: email || "",
          message: content,
          source: "portfolio",
          type: "contact",
        };

        submitted = true;
        submittedSuccessfully = false;

        await pb.collection("messages").create(payload, { autocancel: false });

        submittedSuccessfully = true;
        submitted = false;
        logger.trace("contact-page", "Contact form submitted successfully");
      } catch (e: any) {
        const error = "Failed to submit contact form";
        logger.error("contact-page", error + ": " + e.message);
      }
    },
  };

  const variables = {
    contactNameInputValue,
    contactEmailInputValue,
    contactContentTextareaValue,
    name: contactNameInputValue,
    email: contactEmailInputValue,
    content: contactContentTextareaValue,
  };
</script>

<div class="box-border p-8 w-full h-full">
  <Card class="w-full max-w-full h-full max-h-full bg-white overflow-y-scroll">
    {#if submittedSuccessfully}
      <p>Alright, this one's sitting with me now</p>
    {:else}
      <Parser {doc} {functions} {variables} />
    {/if}
  </Card>
</div>

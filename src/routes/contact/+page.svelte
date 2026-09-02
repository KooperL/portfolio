<script lang="ts">
  import { logger } from "$lib/logger";
  import { pb } from "$lib/pocketbase";
  import Parser from "$lib/utils/CMS/parser.svelte";
  import { Card } from "flowbite-svelte";
  import type { CMSDocument } from "$lib/utils/CMS/types";

  let submitted = false;
  let submittedSuccessfully = false;

  let functions = {
    logInfo: logger.info,
    submit: handleSubmit,
  };

  async function handleSubmit(params: any) {
    logger.debug("contact-page", "Submit contact form");
    try {
      const { name, message, email } = params;
      
      if (!name || !name.length) {
        throw new Error("Name is required");
      }
      if (!message || !message.length) {
        throw new Error("Message is required");
      }
      
      const payload = {
        name,
        email: email || "",
        message,
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
  }

  const jsonContent: CMSDocument = {
    _meta: {
      id: "contact-page",
      author: "cms team",
      description: "Contact page with form",
      revisions: { major: 2, minor: 0 },
    },
    _definitions: {
      tokens: {},
      i18n: {
        "contact.title": "Contact me",
        "contact.description":
          "This form will automatically forward the message to me, if you're expecting a reply though, include an email!",
        "contact.name.label": "Name",
        "contact.email.label": "Email",
        "contact.message.label": "Message",
        "contact.submit": "Send",
      },
      media: {},
      styleClasses: {},
    },
    layout: "page",
    page: {
      slug: "contact",
      title: "Contact me",
      description: "Get in touch with Kooper",
    },
    children: [
      {
        id: "contact-intro",
        type: "container",
        props: {
          title: "@i18n:contact.title",
          subtitle: "@i18n:contact.description",
        },
        children: [],
      },
      {
        id: "contact-form",
        type: "form",
        props: {
          fields: [
            {
              id: "contact-form-name",
              label: "@i18n:contact.name.label",
              type: "text",
              required: true,
            },
            {
              id: "contact-form-email",
              label: "@i18n:contact.email.label",
              type: "email",
              required: false,
            },
            {
              id: "contact-form-message",
              label: "@i18n:contact.message.label",
              type: "textarea",
              required: true,
            },
          ],
          submitButton: {
            id: "contact-form-submit",
            label: "@i18n:contact.submit",
          },
        },
        events: [
          {
            type: "onPress",
            action: "function",
            name: "submit",
            params: {
              name: "{{contact-form-name}}",
              message: "{{contact-form-message}}",
              email: "{{contact-form-email}}",
            },
          },
        ],
        children: [],
      },
    ],
  };
</script>

<div class="box-border p-8 w-full h-full">
  <Card class="w-full max-w-full h-full max-h-full bg-white overflow-y-scroll">
    {#if submittedSuccessfully}
      <p>Alright, this one's sitting with me now</p>
    {:else}
      <Parser content={jsonContent} {functions} />
    {/if}
  </Card>
</div>

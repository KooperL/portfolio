<script lang="ts">
  import { logger } from "$lib/logger";
  import { pb } from "$lib/pocketbase";
  import Parser from "$lib/utils/CMS/parser.svelte";
  import {
    AccordionItem,
    Accordion,
    Card,
    Label,
    Input,
    Textarea,
    Button,
  } from "flowbite-svelte";

  let bindings = {
    "contact-form-name": { bind: "" },
    "contact-form-email": { bind: "" },
    "contact-form-message": { bind: "" },
  };

  let submitted = false;
  let submittedSuccessfully = false;

  let buttonActions = {
    logInfo: logger.info,
    submit: handleSubmit,
  };

  async function handleSubmit(name, email, message) {
    logger.debug("contact-page", "Submit contact form");
    try {
      if (!name.bind.length) {
        return;
      }
      if (!message.bind.length) {
        return;
      }
      const payload = {
        name: name.bind,
        email: email.bind,
        message: message.bind,
      };
      submitted = true;
      submittedSuccessfully = false;
      pb.collection("messages").create(payload, { autocancel: false });
      submittedSuccessfully = true;
      submitted = false;
      logger.trace("contact-page", "Contact form submitted successfully");
    } catch (e) {
      logger.error(
        "contact-page",
        "Failed to submit contact form: " + e.message,
      );
    }
  }

  const jsonContent = {
    pageContent: {
      order: 2,
      elements: [
        {
          type: "textBody",
          content: {
            order: 1,
            title: "Contact me",
            body: [
              "This form will automatically forward the message to me, if you're expecting a reply though, include an email!",
            ],
          },
        },

        {
          type: "form",
          content: {
            order: 3,
            id: "contact-form",
            bindings: bindings,
            fields: [
              {
                id: "contact-form-name",
                label: "Name",
                type: "text",
                required: true,
              },
              {
                id: "contact-form-email",
                label: "Email",
                type: "email",
                required: false,
              },
              {
                id: "contact-form-message",
                label: "Message",
                type: "textarea",
                required: true,
              },
            ],
            submitButton: {
              label: "Send",
              id: "contact-form-submit",
              events: [
                {
                  name: "submit",
                  payload: [
                    bindings["contact-form-name"],
                    bindings["contact-form-email"],
                    bindings["contact-form-message"],
                  ],
                },
              ],
            },
          },
        },
      ],
    },
  };
</script>

<div class="box-border p-8 w-full h-full">
  <Card class="w-full max-w-full h-full max-h-full bg-white overflow-y-scroll">
    <Parser content={jsonContent} functions={buttonActions} />
  </Card>
</div>

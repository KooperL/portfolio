<script lang="ts">
  import { pb } from "$lib/pocketbase";
  import { onMount } from "svelte";
  import { Card, Button, Skeleton } from "flowbite-svelte";
  import { site } from "$lib/config";
  import { logger } from "$lib/logger";
  import Parser from "$lib/utils/CMS/parser.svelte";
  import pocketbaseLoggingScreenshot from "$lib/assets/pocketbase-logging-screenshot.png";

  onMount(async () => {});

  let buttonActions = {
    logInfo: logger.info,
  };

  const projectName = "pocketbase-logging";
  const projectDescription = [
    "This project aims to empower developers by instantly standing up a fullstack logging application",
    "Logging applications can capture actions, behaviours, application state and more. In no time, you can have a fullstack logging application up and running, ready to capture and store logs from your applications.",
    "Under the hood, this project uses Pocketbase, a backend service that provides a simple and secure way to store and retrieve data in addition to serving a frontend UI.",
  ];
  const projectPathVar = "pocketbase-logging";
  const websiteUrl = "https://logger.pockethost.io/realtime";
  const githubUrl = "https://github.com/KooperL/pocketbase-logging";
  const iframeUrl = null && "https://logger.pockethost.io/realtime";

  const jsonContent = {
    pageContent: {
      order: 2,
      elements: [
        {
          type: "textBody",
          content: {
            order: 1,
            title: projectName,
            body: projectDescription,
          },
        },
        {
          type: "textBody",
          content: {
            order: 3,
            images: {
              id: `${projectPathVar}-images`,
              order: 1,
              images: [
                {
                  id: `${projectPathVar}-image-1`,
                  url: pocketbaseLoggingScreenshot,
                  alt: "Realtime logging",
                },
              ],
            },
            buttons: {
              order: 2,
              id: `${projectPathVar}-action-buttons`,
              buttons: [
                {
                  id: `${projectPathVar}-back-button`,
                  label: "Back",
                  href: "/",
                  testId: `${projectPathVar}-back-button-testId`,
                  events: [
                    {
                      name: "logInfo",
                      payload: [projectPathVar, "Press on 'back' button"],
                    },
                  ],
                },

                {
                  id: `${projectPathVar}-visit-button`,
                  label: "Visit",
                  href: websiteUrl,
                  testId: `${projectPathVar}-visit-button-testId`,
                  icon: "ArrowRightToBracketOutline",
                  events: [
                    {
                      name: "logInfo",
                      payload: [projectPathVar, "Press on 'visit' button"],
                    },
                  ],
                },
              ],
            },
          },
        },
      ],
    },
  };

  if (iframeUrl) {
    jsonContent.pageContent.elements.push({
      type: "embeddedFrame",
      content: {
        order: 2,
        url: iframeUrl,
      },
    });
  }

  if (githubUrl) {
    const buttonList = jsonContent.pageContent.elements.find(
      (i) => !!i.content?.buttons?.buttons,
    );
    if (buttonList) {
      buttonList!.content!.buttons!.buttons!.push({
        id: `${projectPathVar}-code-button`,
        label: "View code",
        href: githubUrl,
        testId: `${projectPathVar}-code-button-testId`,
        icon: "ArrowRightToBracketOutline",
        events: [
          {
            name: "logInfo",
            payload: [projectPathVar, "Press on 'code' button"],
          },
        ],
      });
    }
  }
</script>

<div class="box-border p-8 w-full h-full">
  <Card class="w-full max-w-full h-full max-h-full bg-white overflow-y-scroll">
    <Parser content={jsonContent} functions={buttonActions} />
  </Card>
</div>

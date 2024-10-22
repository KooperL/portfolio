<script lang="ts">
  import { pb } from "$lib/pocketbase";
  import { onMount } from "svelte";
  import { Card, Button, Skeleton } from "flowbite-svelte";
  import { site } from "$lib/config";
  import { logger } from "$lib/logger";
  import Parser from "$lib/utils/CMS/parser.svelte";

  onMount(async () => {});

  let buttonActions = {
    logInfo: logger.info,
  };

  const projectName = "tailwind-color-generator";
  const projectDescription = [
    "This handy tool helps you generate a custom color spectrum for your Tailwind CSS configuration. It solves the problem of creating consistent and visually appealing color palettes for your web projects. Simply choose three key colors or randomize them, and the tool will generate a full spectrum with corresponding Tailwind configuration.",
    "Tailwind is a framework that simultaneously fixes CSS as well as streamlining the process of standardising style formats.",
    " The colours generated here can be plugged straight into a tailwind configuration file to instantly use a beatiful colour palatte across a project using tailwind.",
  ];
  const projectPathVar = "tailwind-color-generator";
  const websiteUrl = "https://kooperl.github.io/tailwind-color-generator/";
  const githubUrl = "https://github.com/KooperL/tailwind-color-generator";
  const iframeUrl = "https://kooperl.github.io/tailwind-color-generator/";

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
            buttons: {
              order: 1,
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

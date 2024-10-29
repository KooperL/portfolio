<script lang="ts">
  import { pb } from "$lib/pocketbase";
  import { onMount } from "svelte";
  import { Card, Button, Skeleton } from "flowbite-svelte";
  import { site } from "$lib/config";
  import { logger } from "$lib/logger";
  import Parser from "$lib/utils/CMS/parser.svelte";
  import vitalityScreenshot2 from "$lib/assets/vitality-screenshot-1.jpeg";
  import vitalityScreenshot1 from "$lib/assets/vitality-screenshot-2.jpeg";

  onMount(async () => {});

  let buttonActions = {
    logInfo: logger.info,
  };

  const projectName = "Vitality";
  const projectDescription = ["Vitality is a personalised, science backed health and wellbeing program that supports you in making healthier choices every day."
  ];
  const projectPathVar = "vitality";
  const websiteUrl = "https://apps.apple.com/au/app/aia-vitality-australia/id1584775072";
  const githubUrl = null
  const iframeUrl = null

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
                  url: vitalityScreenshot1,
                },
                {
                  id: `${projectPathVar}-image-2`,
                  url: vitalityScreenshot2,
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

<style>
  img {
    max-width: 200px;
    height: auto;
  }
</style>
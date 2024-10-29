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
  const jsonContent1 = {
    pageContent: {
      order: 2,
      elements: [
        {
          type: "textBody",
          content: {
            order: 1,
            title: "About me",
            body: [
              "I'm Kooper. We might have met already but I can't remember - I didn't want to annoy you with cookies.",
            ],
          },
        },
      ],
    },
  };

  const jsonContent2 = {
    pageContent: {
      order: 2,
      elements: [
        {
          type: "textBody",
          content: {
            order: 1,
            title: "",
            body: [
              "I'm a software developer and I like to make things. I wear the hat of web developer most often but I've also dabbled in other areas of software development.",
              "Continuous growth is important to me and I'm always looking for new things to learn. From new frameworks and different programming languages, to biology and physiology.",
              "There's a reason why I'm a fan of the web. I get inspired by other websites who try to be different and love that anyone can contribute their ideas to the internet via weird websites, awesome toolkits/libraries and open source.",
            ],
            buttons: {
              order: 1,
              id: `about-action-buttons`,
            buttons: [
                {
                  id: `about-back-button`,
                  label: "Back",
                  href: "/",
                  testId: `about-back-button-testId`,
                  events: [
                    {
                      name: "logInfo",
                      payload: ['about', "Press on 'back' button"],
                    },
                  ],
                },
              ],
            }
          },
        },
      ],
    },
  };
</script>

<div class="box-border p-8 w-full h-full">
  <Card class="w-full max-w-full h-full max-h-full bg-white overflow-y-scroll">
    <Parser content={jsonContent1} functions={buttonActions} />
    <div class="w-full flex justify-center">
    <div class="github-card" data-github="kooperl" data-width="400" data-height="152" data-theme="default"></div>
<script src="//cdn.jsdelivr.net/github-cards/latest/widget.js"></script>
    </div>
<Parser content={jsonContent2} functions={buttonActions} />

  </Card>
</div>

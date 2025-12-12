<script lang="ts">
  import { pb } from "$lib/pocketbase";
  import { onMount } from "svelte";
  import { Card, Button, Skeleton } from "flowbite-svelte";
  import { site } from "$lib/config";
  import { logger } from "$lib/logger";
  import Parser from "$lib/utils/CMS/parser.svelte";

  onMount(async () => {});

  let functions = {
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
              "I'm a software developer who likes to make things. I most often wear the hat of a front-end web developer, but I've also dabbled in other areas of software development. I've played around with game modding, microcontrollers and hardware, 12 volt automotive modifications, local AI edge compute apps, and backend services that support front-end projects.",
              "One of the most special aspects of software development is that so many of the tools we rely on are open source. I'm genuinely crushed that this isn't more widely appreciated. I have profound respect for industry heroes like Linus Torvalds and Ken Thompson, as well as the content creators who encourage newbies to enter the space.",
              "There's a reason I'm a fan of the web. I get inspired by websites that try to be different, and I love that anyone can contribute ideas to the internet through weird websites, awesome toolkits and libraries, and open source projects.",
              "Continuous growth is important to me, and I'm always looking for new things to learn—from new frameworks and programming languages to biology and physiology."
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
                      payload: ["about", "Press on 'back' button"],
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
</script>

<div class="box-border p-8 w-full h-full">
  <Card class="w-full max-w-full h-full max-h-full bg-white overflow-y-scroll">
    <Parser content={jsonContent1} {functions} />
    <div class="w-full flex justify-center">
      <div
        class="github-card"
        data-github="kooperl"
        data-width="400"
        data-height="152"
        data-theme="default"
      ></div>
      <script src="//cdn.jsdelivr.net/github-cards/latest/widget.js"></script>
    </div>
    <Parser content={jsonContent2} {functions} />
  </Card>
</div>

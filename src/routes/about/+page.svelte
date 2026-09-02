<script lang="ts">
  import { logger } from "$lib/logger";
  import Parser from "$lib/utils/CMS/parser.svelte";
  import { Card } from "flowbite-svelte";
  import type { CMSDocument } from "$lib/utils/CMS/types";

  let functions = {
    logInfo: logger.info,
  };

  const jsonContent: CMSDocument = {
    _meta: {
      id: "about-page",
      author: "cms team",
      description: "About page",
      revisions: { major: 2, minor: 0 },
    },
    _definitions: {
      tokens: {},
      i18n: {
        "about.intro.title": "About me",
        "about.intro.body1":
          "I'm Kooper. We might have met already but I can't remember - I didn't want to annoy you with cookies.",
        "about.body1":
          "I'm a software developer who likes to make things. I most often wear the hat of a front-end web developer, but I've also dabbled in other areas of software development. I've played around with game modding, microcontrollers and hardware, 12 volt automotive modifications, local AI edge compute apps, and backend services that support front-end projects.",
        "about.body2":
          "One of the most special aspects of software development is that so many of the tools we rely on are open source. I'm genuinely crushed that this isn't more widely appreciated. I have profound respect for industry heroes like Linus Torvalds and Ken Thompson, as well as the content creators who encourage newbies to enter the space.",
        "about.body3":
          "There's a reason I'm a fan of the web. I get inspired by websites that try to be different, and I love that anyone can contribute ideas to the internet through weird websites, awesome toolkits and libraries, and open source projects.",
        "about.body4":
          "Continuous growth is important to me, and I'm always looking for new things to learn—from new frameworks and programming languages to biology and physiology.",
        "about.back": "Back",
      },
      media: {},
      styleClasses: {},
    },
    layout: "page",
    page: {
      slug: "about",
      title: "About me",
      description: "About Kooper",
    },
    children: [
      {
        id: "about-intro",
        type: "container",
        props: {
          title: "@i18n:about.intro.title",
          subtitle: "@i18n:about.intro.body1",
        },
        children: [],
      },
      {
        id: "about-body",
        type: "container",
        props: {
          title: "",
          body: [
            "@i18n:about.body1",
            "@i18n:about.body2",
            "@i18n:about.body3",
            "@i18n:about.body4",
          ],
        },
        children: [
          {
            id: "about-back-button",
            type: "button",
            props: {
              testID: "about-back-button-testId",
              title: "@i18n:about.back",
              href: "/",
            },
            events: [
              {
                type: "onPress",
                action: "function",
                name: "logInfo",
                params: {
                  context: "about",
                  action: "Press on 'back' button",
                },
              },
            ],
          },
        ],
      },
    ],
  };
</script>

<div class="box-border p-8 w-full h-full">
  <Card class="w-full max-w-full h-full max-h-full bg-white overflow-y-scroll">
    <Parser content={jsonContent} {functions} />
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
  </Card>
</div>

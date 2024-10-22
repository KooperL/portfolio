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

  const jsonContent = {
    heroText: {
      order: 1,
      title: "Welcome to my portfolio",
      subtitle:
        "I'm Kooper. Have a poke around and enjoy your visit. Let me know if you like what you see!",

      buttons: {
        order: 1,
        id: "home-nav-buttons",
        buttons: [
          {
            id: "about",
            label: "about",
            href: "/about",
            testId: "home-link-to-about",
            events: [
              {
                name: "logInfo",
                payload: ["home", "Press on 'about' button"],
              },
            ],
          },
          {
            id: "contact",
            label: "contact",
            href: "/contact",
            testId: "home-link-to-contact",
            events: [
              {
                name: "logInfo",
                payload: ["home", "Press on 'contact' button"],
              },
            ],
          },
        ],
      },
    },
    pageContent: {
      order: 2,
      elements: [
        {
          type: "textBody",
          content: {
            order: 1,
            title: "Past work projects",
            body: [
              "Featured websites that I'm proud to have been involved with in the past!",
            ],
            cards: {
              order: 1,
              id: "test-cards",
              cards: [
                {
                  title: "Logridge",
                  body: "HTTP based log aggregator + stats.",
                  image: {
                    url: "https://placehold.co/600x400/EEE/31343C",
                    alt: "Screenshot of project",
                  },
                  buttonGroup: {
                    order: 1,
                    id: "logridge-card-actions",
                    buttons: [
                      {
                        id: "logridge-view-project",
                        label: "Read more",
                        href: "/projects/logridge",
                        testId: "logridge-card-primary-action",
                      },
                    ],
                  },
                },
                {
                  title: "Pento",
                  body: "Online note archive",
                  image: {
                    url: "https://placehold.co/600x400/EEE/31343C",
                    alt: "Screenshot of project",
                  },
                  buttonGroup: {
                    order: 1,
                    id: "pento-card-actions",
                    buttons: [
                      {
                        id: "pento-view-project",
                        label: "Read more",
                        href: "/projects/pento",
                        testId: "pento-card-primary-action",
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
        {
          type: "textBody",
          content: {
            order: 2,
            title: "Code projects",
            body: [
              "Fun projects that I spent a weekend or two on. These are low stakes guys that don't necessarily need to be found on the web.",
            ],
            buttons: {
              order: 1,
              id: "code-projects-buttons",
              buttons: [
                {
                  id: "tailwind-color-generator",
                  label: "tailwind-color-generator",
                  href: "/projects/tailwind-color-generator",
                  events: [
                    {
                      name: "logInfo",
                      payload: [
                        "home",
                        "Press on 'tailwind-color-generator' button",
                      ],
                    },
                  ],
                },
                {
                  id: "dropzones",
                  label: "dropzones",
                  href: "/projects/bingo-app",
                  testId: "projects-link-to-bingo",
                  events: [
                    {
                      name: "logInfo",
                      payload: ["home", "Press on 'dropzones' button"],
                    },
                  ],
                },
                {
                  id: "portfolio",
                  label: "portfolio",
                  href: "/projects/portfolio",
                  events: [
                    {
                      name: "logInfo",
                      payload: ["home", "Press on 'portfolio' button"],
                    },
                  ],
                },
                {
                  id: "svelte-pocketbase-quickstart",
                  label: "svelte-pocketbase-quickstart",
                  href: "/projects/svelte-pocketbase-quickstart",
                  events: [
                    {
                      name: "logInfo",
                      payload: [
                        "home",
                        "Press on 'svelte-pocketbase-quickstart' button",
                      ],
                    },
                  ],
                },
                {
                  id: "text-processor",
                  label: "text processor",
                  href: "/projects/md-app",
                  events: [
                    {
                      name: "logInfo",
                      payload: ["home", "Press on 'text-processor' button"],
                    },
                  ],
                },
                {
                  id: "pocketbase-logging",
                  label: "pocketbase-logging",
                  href: "/projects/pocketbase-logging",
                  events: [
                    {
                      name: "logInfo",
                      payload: ["home", "Press on 'pocketbase-logging' button"],
                    },
                  ],
                },
              ],
            },
          },
        },
        {
          type: "textBody",
          content: {
            order: 3,
            title: "External links",
            body: [],
            buttons: {
              order: 1,
              id: "external-links-buttons",
              buttons: [
                {
                  id: "github",
                  label: "GitHub",
                  href: "https://github.com/KooperL",
                  testId: "home-link-to-github",
                  icon: "ArrowRightToBracketOutline",
                  events: [
                    {
                      name: "logInfo",
                      payload: ["home", "Press on 'github' button"],
                    },
                  ],
                },
                {
                  id: "linkedin",
                  label: "LinkedIn",
                  href: "https://linkedin.com/in/kooper",
                  testId: "home-link-to-linkedin",
                  icon: "ArrowRightToBracketOutline",
                  events: [
                    {
                      name: "logInfo",
                      payload: ["home", "Press on 'linkedin' button"],
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
    <Parser content={jsonContent} functions={buttonActions} />
  </Card>
</div>

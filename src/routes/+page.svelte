<script lang="ts">
  import { pb } from "$lib/pocketbase";
  import { onMount } from "svelte";
  import { Card, Button, Skeleton } from "flowbite-svelte";
  import { site } from "$lib/config";
  import { logger } from "$lib/logger";
  import Parser from "$lib/utils/CMS/parser.svelte";
  import pentoScreenshot from "$lib/assets/pento-screenshot.png";
  import logridgeScreenshot from "$lib/assets/logridge-screenshot.png";
  import redirectedScreenshot from "$lib/assets/redirected-screenshot.png";
  import vitalityScreenshot3 from "$lib/assets/vitality-screenshot-3.jpeg";
  import pocketbaseLoggingScreenshot from "$lib/assets/pocketbase-logging-screenshot-2.png";
  import mdAppScreenshot from "$lib/assets/md-app-screenshot.png";
  import bingoAppScreenshot from "$lib/assets/bingo-app-screenshot.png";
  import tailwindColorGeneratorScreenshot from "$lib/assets/tailwind-color-generator-screenshot.png";
  import sveltePocketbaseQuickstartScreenshot from "$lib/assets/svelte-pocketbase-quickstart-screenshot.png";
  import portfolioScreenshot from "$lib/assets/portfolio-screenshot.png";
  import { isMobile } from "$lib/utils/responsive";
  // https://placehold.co/600x400/EEE/31343C

  onMount(async () => {});

  let functions = {
    logInfo: logger.info,
  };

  const jsonContent = {
    pageMetadata: {
      title: "",
      headline:
        "I'm Kooper. Have a poke around and enjoy your visit. Let me know if you like what you see!",
      description:
        "I'm Kooper. Have a poke around and enjoy your visit. Let me know if you like what you see!",
    },
    pageContent: {
      elements: [
        {
          type: "heroSection",
          content: {
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
        },
        {
          type: "textBody",
          content: {
            order: 1,
            title: "Featured projects",
            body: [
              "Featured applications that I'm proud to have been involved with in the past! These applications are the result of hard work and aim to empower their users.",
            ],
            cards: {
              order: 1,
              id: "test-cards",
              columns: 3,
              horizontal: !isMobile(),

              cards: [
                {
                  title: "Vitality",
                  body: "Vitality is a personalised, science backed health and wellbeing program that supports you in making healthier choices every day.",
                  image: {
                    url: vitalityScreenshot3,
                    alt: "Screenshot of project",
                  },
                  buttonGroup: {
                    order: 1,
                    id: "vitality-card-actions",
                    buttons: [
                      {
                        id: "vitality-view-project",
                        label: "Read more",
                        href: "/projects/vitality",
                        testId: "vitality-card-primary-action",
                      },
                    ],
                  },
                },
                {
                  title: "Logridge",
                  body: "Logridge is an efficient HTTP-based log aggregator designed for seamless log storage and management.",
                  image: {
                    url: logridgeScreenshot,
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
                  title: "Redirected.dev",
                  body: "Redirected is a powerful tracking pixel generator designed to help you capture and analyze traffic in real time.",
                  image: {
                    url: redirectedScreenshot,
                    alt: "Screenshot of project",
                  },
                  buttonGroup: {
                    order: 1,
                    id: "redirected-card-actions",
                    buttons: [
                      {
                        id: "redirected-view-project",
                        label: "Read more",
                        href: "/projects/redirected",
                        testId: "redirected-card-primary-action",
                      },
                    ],
                  },
                },
                {
                  title: "Pento",
                  body: "Pento is a user-friendly platform for sharing and storing text based content built with built from the ground up with privacy in mind.",
                  image: {
                    url: pentoScreenshot,
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
            order: 1,
            title: "Code projects",
            body: [
              "Fun projects that I spent a weekend or two on. These guys are low stakes and small scope hobby projects that don't necessarily need to be found on the web.",
            ],
            cards: {
              order: 1,
              id: "test-cards",
              columns: 3,
              cards: [
                {
                  title: "tailwind-color-generator",
                  body: "Random color generator for the tailwindcss tool",
                  image: {
                    url: tailwindColorGeneratorScreenshot,
                    alt: "Screenshot of project",
                  },
                  buttonGroup: {
                    order: 1,
                    id: "tailwind-color-generator-card-actions",
                    buttons: [
                      {
                        id: "tailwind-color-generator-view-project",
                        label: "Read more",
                        href: "/projects/tailwind-color-generator",
                        testId: "tailwind-color-generator-card-primary-action",
                      },
                    ],
                  },
                },
                {
                  title: "dropzones",
                  body: "Drag and drop bingo card generator",
                  image: {
                    url: bingoAppScreenshot,
                    alt: "Screenshot of project",
                  },
                  buttonGroup: {
                    order: 1,
                    id: "dropzones-card-actions",
                    buttons: [
                      {
                        id: "dropzones-view-project",
                        label: "Read more",
                        href: "/projects/bingo_app",
                        testId: "dropzones-card-primary-action",
                      },
                    ],
                  },
                },
                {
                  title: "portfolio",
                  body: "Recursion joke here",
                  image: {
                    url: portfolioScreenshot,
                    alt: "Screenshot of project",
                  },
                  buttonGroup: {
                    order: 1,
                    id: "portfolio-card-actions",
                    buttons: [
                      {
                        id: "portfolio-view-project",
                        label: "Read more",
                        href: "/projects/portfolio",
                        testId: "portfolio-card-primary-action",
                      },
                    ],
                  },
                },
                {
                  title: "svelte-pocketbase-quickstart",
                  body: "Quickstart for svelte-pocketbase",
                  image: {
                    url: sveltePocketbaseQuickstartScreenshot,
                    alt: "Screenshot of project",
                  },
                  buttonGroup: {
                    order: 1,
                    id: "svelte-pocketbase-quickstart-card-actions",
                    buttons: [
                      {
                        id: "svelte-pocketbase-quickstart-view-project",
                        label: "Read more",
                        href: "/projects/svelte_pocketbase_quickstart",
                        testId:
                          "svelte-pocketbase-quickstart-card-primary-action",
                      },
                    ],
                  },
                },
                {
                  title: "text-processor",
                  body: "Markdown editor",
                  image: {
                    url: mdAppScreenshot,
                    alt: "Screenshot of project",
                  },
                  buttonGroup: {
                    order: 1,
                    id: "text-processor-card-actions",
                    buttons: [
                      {
                        id: "text-processor-view-project",
                        label: "Read more",
                        href: "/projects/md_app",
                        testId: "text-processor-card-primary-action",
                      },
                    ],
                  },
                },
                {
                  title: "pocketbase-logging",
                  body: "Logging for pocketbase",
                  image: {
                    url: pocketbaseLoggingScreenshot,
                    alt: "Screenshot of project",
                  },
                  buttonGroup: {
                    order: 1,
                    id: "pocketbase-logging-card-actions",
                    buttons: [
                      {
                        id: "pocketbase-logging-view-project",
                        label: "Read more",
                        href: "/projects/pocketbase_logging",
                        testId: "pocketbase-logging-card-primary-action",
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

<div class="box-border p-0 sm:p-8 w-full h-full">
  <Card class="w-full max-w-full h-full max-h-full bg-white overflow-y-scroll">
    <Parser content={jsonContent} {functions} />
  </Card>
</div>

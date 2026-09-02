<script lang="ts">
  import { onMount } from "svelte";
  import { Card } from "flowbite-svelte";
  import { logger } from "$lib/logger";
  import Parser from "$lib/utils/CMS/parser.svelte";
  import pentoScreenshot from "$lib/assets/pento-screenshot.png";
  import logridgeScreenshot from "$lib/assets/logridge-screenshot.png";
  import redirectedScreenshot from "$lib/assets/redirected-screenshot.png";
  import vitalityScreenshot3 from "$lib/assets/vitality-screenshot-3.jpeg";
  import pocketbaseLoggingScreenshot from "$lib/assets/pocketbase-logging-screenshot-2.png";
  import simpleSteganographyScreenshot from "$lib/assets/simple-steganography-screenshot.png";
  import gatorGangScreenshot from "$lib/assets/gatorGang-screenshot.png";
  import perfGerberScreenshot from "$lib/assets/perf-gerber-screenshot-2.png";
  import cloverPitThumbnail from "$lib/assets/clover-pit-jumpstart-thumbnail.png";
  import qrEncoderScreenshot from "$lib/assets/qr-encoder-screenshot.png";
  import audioSnifferScreenshot from "$lib/assets/audio-sniffer-screenshot.png";
  import mailCatcherScreenshot from "$lib/assets/mailCatcher-app-screenshot.png";
  import mdAppScreenshot from "$lib/assets/md-app-screenshot.png";
  import radoGpsDemo from "$lib/assets/radogps-demo.gif";
  import bingoAppScreenshot from "$lib/assets/bingo-app-screenshot.png";
  import tailwindColorGeneratorScreenshot from "$lib/assets/tailwind-color-generator-screenshot.png";
  import sveltePocketbaseQuickstartScreenshot from "$lib/assets/svelte-pocketbase-quickstart-screenshot.png";
  import portfolioScreenshot from "$lib/assets/portfolio-screenshot.png";
  import { isMobile } from "$lib/utils/responsive";
  import { writable } from "svelte/store";
  import type { CMSDocument } from "$lib/utils/CMS/types";

  let shouldShowHorizontalCard = writable(true);

  onMount(async () => {
    if (isMobile()) {
      shouldShowHorizontalCard.set(false);
    }
  });

  let functions = {
    logInfo: logger.info,
  };

  const jsonContent: CMSDocument = {
    _meta: {
      id: "home-page",
      author: "cms team",
      description: "Portfolio home page",
      revisions: { major: 2, minor: 0 },
    },
    _definitions: {
      tokens: {},
      i18n: {
        "home.hero.title": "Welcome to my portfolio",
        "home.hero.subtitle":
          "I'm Kooper, I work professionally in front end app development. Have a poke around and enjoy your visit. Let me know if you like what you see!",
        "home.featured.title": "Featured projects",
        "home.featured.subtitle":
          "Featured applications that I'm proud to have been involved with in the past! These applications are the result of hard work and aim to empower their users.",
        "home.code.title": "Code projects",
        "home.code.subtitle":
          "Fun projects that I spent a few weeks each on. These guys are low stakes and small scope hobby projects that were made for my own benefit more than anyone else's.",
        "home.external.title": "External links",
        "common.readMore": "Read more",
        "common.back": "Back",
        "common.visit": "Visit",
        "common.viewCode": "View code",
      },
      media: {},
      styleClasses: {},
    },
    layout: "page",
    page: {
      slug: "home",
      title: "Kooper's Portfolio",
      description:
        "I'm Kooper, I work professionally in front end app development. Have a poke around and enjoy your visit.",
    },
    children: [
      {
        id: "hero-section",
        type: "hero",
        props: {
          testID: "home-hero",
          title: "@i18n:home.hero.title",
          subtitle: "@i18n:home.hero.subtitle",
        },
        children: [
          {
            id: "about-button",
            type: "button",
            props: {
              testID: "home-link-to-about",
              title: "about",
              href: "/about",
            },
            events: [
              {
                type: "onPress",
                action: "function",
                name: "logInfo",
                params: {
                  context: "home",
                  action: "Press on 'about' button",
                },
              },
            ],
          },
          {
            id: "contact-button",
            type: "button",
            props: {
              testID: "home-link-to-contact",
              title: "contact",
              href: "/contact",
            },
            events: [
              {
                type: "onPress",
                action: "function",
                name: "logInfo",
                params: {
                  context: "home",
                  action: "Press on 'contact' button",
                },
              },
            ],
          },
        ],
      },
      {
        id: "featured-projects",
        type: "container",
        props: {
          title: "@i18n:home.featured.title",
          subtitle: "@i18n:home.featured.subtitle",
        },
        children: [
          {
            id: "featured-grid",
            type: "grid",
            props: {
              testID: "featured-projects-grid",
            },
            repeat: {
              dataSource: "{{featuredProjects}}",
              itemKey: "id",
              template: {
                id: "featured-{{item.id}}",
                type: "card",
                props: {
                  title: "{{item.title}}",
                  subtitle: "{{item.body}}",
                },
                events: [
                  {
                    type: "onPress",
                    action: "function",
                    name: "logInfo",
                    params: {
                      context: "home",
                      action: "Press on featured project {{item.id}}",
                    },
                  },
                ],
              },
            },
          },
        ],
      },
      {
        id: "code-projects",
        type: "container",
        props: {
          title: "@i18n:home.code.title",
          subtitle: "@i18n:home.code.subtitle",
        },
        children: [
          {
            id: "code-grid",
            type: "grid",
            props: {
              testID: "code-projects-grid",
            },
            repeat: {
              dataSource: "{{codeProjects}}",
              itemKey: "id",
              template: {
                id: "code-{{item.id}}",
                type: "card",
                props: {
                  title: "{{item.title}}",
                  subtitle: "{{item.body}}",
                },
                events: [
                  {
                    type: "onPress",
                    action: "function",
                    name: "logInfo",
                    params: {
                      context: "home",
                      action: "Press on code project {{item.id}}",
                    },
                  },
                ],
              },
            },
          },
        ],
      },
      {
        id: "external-links",
        type: "container",
        props: {
          title: "@i18n:home.external.title",
        },
        children: [
          {
            id: "github-button",
            type: "button",
            props: {
              testID: "home-link-to-github",
              title: "GitHub",
              href: "https://github.com/KooperL",
              icon: "ArrowRightToBracketOutline",
            },
            events: [
              {
                type: "onPress",
                action: "function",
                name: "logInfo",
                params: {
                  context: "home",
                  action: "Press on 'github' button",
                },
              },
            ],
          },
          {
            id: "linkedin-button",
            type: "button",
            props: {
              testID: "home-link-to-linkedin",
              title: "LinkedIn",
              href: "https://linkedin.com/in/kooper",
              icon: "ArrowRightToBracketOutline",
            },
            events: [
              {
                type: "onPress",
                action: "function",
                name: "logInfo",
                params: {
                  context: "home",
                  action: "Press on 'linkedin' button",
                },
              },
            ],
          },
          {
            id: "roadmap-button",
            type: "button",
            props: {
              testID: "home-link-to-roadmap",
              title: "Roadmap",
              href: "https://roadmap.kooperlingohr.com",
              icon: "ArrowRightToBracketOutline",
            },
            events: [
              {
                type: "onPress",
                action: "function",
                name: "logInfo",
                params: {
                  context: "home",
                  action: "Press on 'roadmap' button",
                },
              },
            ],
          },
        ],
      },
    ],
  };

  const featuredProjects = [
    {
      id: "vitality",
      title: "Vitality",
      body: "Vitality is a personalised, science backed health and wellbeing program that supports you in making healthier choices every day.",
      image: vitalityScreenshot3,
      href: "/projects/vitality",
    },
    {
      id: "logridge",
      title: "Logridge",
      body: "Logridge is an efficient HTTP-based log aggregator designed for seamless log storage and management.",
      image: logridgeScreenshot,
      href: "/projects/logridge",
    },
  ];

  const codeProjects = [
    {
      id: "geo-vic",
      title: "Victorian POIs",
      body: "(Port Phillip Bay in the gif) 3D modeled and printed places of interest in Victoria",
      image:
        "https://raw.githubusercontent.com/KooperL/geo-vic/main/images/bay.gif",
      href: "https://github.com/KooperL/geo-vic",
    },
    {
      id: "perf-gerber",
      title: "Circuit board modeler",
      body: "Browser-based tool for designing perfboard-style PCBs quickly",
      image: perfGerberScreenshot,
      href: "/projects/perf_gerber",
    },
    {
      id: "esp32-person-counter",
      title: "person detector",
      body: "Scans for nearby WiFi and Bluetooth Low Energy devices using an ESP32",
      image:
        "https://raw.githubusercontent.com/KooperL/esp32-person-counter/refs/heads/main/demo.png",
      href: "https://github.com/KooperL/esp32-person-counter",
    },
    {
      id: "audio-sniffer",
      title: "Audio data logger",
      body: "ESP32 that constantly records audio and saves it as WAV files to an SD card",
      image: audioSnifferScreenshot,
      href: "https://github.com/KooperL/audio-sniffer",
    },
    {
      id: "prado-head-unit-plate",
      title: "Car mods",
      body: "A collection of modifications and accessories to my car",
      image: radoGpsDemo,
      href: "https://github.com/KooperL/prado-head-unit-plate",
    },
    {
      id: "clover-pit-jumpstart",
      title: "clover-pit jumpstart",
      body: "A mod for clover pit that provides a subtle early-game jumpstart to early game progression",
      image: cloverPitThumbnail,
      href: "https://github.com/KooperL/clover-pit-jumpstart",
    },
    {
      id: "mail-catcher",
      title: "mail-catcher (SaaS)",
      body: "Catch-all + disposable email service with API support",
      image: mailCatcherScreenshot,
      href: "/projects/mail_catcher",
    },
    {
      id: "gator-gang",
      title: "Gator gang",
      body: "A co-presence multiplayer mod for lil gator game, adding multiplayer to a single player game",
      image:
        "https://github.com/KooperL/lil-gator-game-mp/blob/Assets/animated1.gif?raw=true",
      href: "https://github.com/KooperL/lil-gator-game-mp",
    },
    {
      id: "redirected",
      title: "Redirected.dev (SaaS)",
      body: "Tracking pixel generator to count web page visits in real time.",
      image: redirectedScreenshot,
      href: "/projects/redirected",
    },
    {
      id: "pento",
      title: "Pento (SaaS)",
      body: "Text storage and distribution (pastebin-like) platform built with user supplied encryption keys",
      image: pentoScreenshot,
      href: "/projects/pento",
    },
    {
      id: "tailwind-color-generator",
      title: "tailwind-color-generator",
      body: "Random color generator for the tailwindcss tool",
      image: tailwindColorGeneratorScreenshot,
      href: "/projects/tailwind_color_generator",
    },
    {
      id: "text-processor",
      title: "text-processor",
      body: "A XML based text formatting back end for input forms",
      image: mdAppScreenshot,
      href: "/projects/md_app",
    },
    {
      id: "simple-steganography",
      title: "Steganographic encoder",
      body: 'Secretly encode data into bodies of text by hiding it in spaces (" ")',
      image: simpleSteganographyScreenshot,
      href: "/projects/simple_steganography",
    },
    {
      id: "qr-encoder",
      title: "QR File Encoder",
      body: "Tranfer files between devices by encoding it into a GIF of QR codes",
      image: qrEncoderScreenshot,
      href: "/projects/qr_encoder",
    },
  ];

  const runtime = {
    featuredProjects,
    codeProjects,
  };
</script>

<div class="box-border p-0 sm:p-8 w-full h-full">
  <Card class="w-full max-w-full h-full max-h-full bg-white overflow-y-scroll">
    <Parser content={jsonContent} {functions} {runtime} />
  </Card>
</div>

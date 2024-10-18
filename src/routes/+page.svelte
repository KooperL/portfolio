<script lang="ts">
  import { pb } from "$lib/pocketbase";
  import { onMount } from "svelte";
  import { Card, Button, Skeleton } from "flowbite-svelte";
  import { site } from "$lib/config";
  import { ArrowRightToBracketOutline } from "flowbite-svelte-icons";
  import { logger } from "$lib/logger";
    import Parser from "$lib/utils/CMS/parser.svelte";

  onMount(async () => {});

  let buttonActions = {
    logInfo: logger.info
  }

  const jsonContent = {
  "heroText": {
    "order": 1,
    "title": "Welcome to my portfolio",
    "subtitle": "I'm Kooper. Have a poke around and enjoy your visit. Let me know if you like what you see!",
    "buttons": {
      "order": 1,
      "id": "home-nav-buttons",
      "buttons": [
        {
          "id": "about",
          "label": "about",
          "href": "/about",
          "testId": "home-link-to-about",
          "events": [
            {
              "name": "logInfo",
              "payload": ["home", "Press on 'about' button"]
            }
          ]
        },
        {
          "id": "contact",
          "label": "contact",
          "href": "/contact",
          "testId": "home-link-to-contact"
        }
      ]
    }
  },
  "pageContent": {
    "order": 2,
    "elements": [
      {
        "type": "textBody",
        "content": {
          "order": 1,
          "title": "Published sites",
          "body": ["Projects available right now, hosted on the public internet"],
          "buttons": {
            "order": 1,
            "id": "published-sites-buttons",
            "buttons": [
              {
                "id": "logridge",
                "label": "logridge",
                "href": "/projects/logridge",
                "testId": "projects-link-to-logridge"
              },
              {
                "id": "dropzones",
                "label": "dropzones",
                "href": "/projects/bingo-app",
                "testId": "projects-link-to-bingo"
              },
              {
                "id": "pento",
                "label": "pento",
                "href": "/projects/pento",
                "testId": "projects-link-to-pento"
              }
            ]
          }
        }
      },
      {
        "type": "textBody",
        "content": {
          "order": 2,
          "title": "Code projects",
          "body": ["Other projects that don't necessarily need to be found on the web (they have demos)"],
          "buttons": {
            "order": 1,
            "id": "code-projects-buttons",
            "buttons": [
              {
                "id": "tailwind-color-generator",
                "label": "tailwind-color-generator",
                "href": "/projects/tailwind-color-generator"
              },
              {
                "id": "portfolio",
                "label": "portfolio",
                "href": "/projects/portfolio"
              },
              {
                "id": "svelte-pocketbase-quickstart",
                "label": "svelte-pocketbase-quickstart",
                "href": "/projects/svelte-pocketbase-quickstart"
              },
              {
                "id": "text-processor",
                "label": "text processor",
                "href": "/projects/md-app"
              },
              {
                "id": "pocketbase-logging",
                "label": "pocketbase-logging",
                "href": "/projects/pocketbase-logging"
              }
            ]
          }
        }
      },
      {
        "type": "textBody",
        "content": {
          "order": 3,
          "title": "External links",
          "body": [],
          "buttons": {
            "order": 1,
            "id": "external-links-buttons",
            "buttons": [
              {
                "id": "github",
                "label": "GitHub",
                "href": "https://github.com/KooperL",
                "testId": "home-link-to-github",
                "icon": "ArrowRightToBracketOutline"
              },
              {
                "id": "linkedin",
                "label": "LinkedIn",
                "href": "https://linkedin.com/in/kooper",
                "testId": "home-link-to-linkedin",
                "icon": "ArrowRightToBracketOutline"
              }
            ]
          }
        }
      }
    ]
  }
}
</script>

<div class="box-border p-8 w-full">
  <Card class="w-full max-w-full h-full max-h-full bg-white overflow-scroll">
    <Parser content={jsonContent} functions={buttonActions}/>
  </Card>
</div>

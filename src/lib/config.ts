export const site = {
  name: "Kooper's portfolio",
  description:
    "My own corner of the internet to play around with tech that's too fun for a production environment",
};

export const projects = {
  gator_gang: {
    projectName: "Gator gang",
    projectDescription: [
      "Gator gang is a co-presence multiplayer mod for lil gator game, allowing players to enjoy the game in a more social way. Each player retains their own progression, inventory, and story state. The goal is to enjoy the atmosphere together, explore side-by-side, and share moments.",
      "It's composed of two projects, a local client (and their friends) must install a modified `.dll` file that was taken from a compiled Unity Engine project. That file is then decompiled into c# code, to which custom classes can be added before recompilation. The file then gets loaded like it normally would to result in a modded player experience. There's also a server component who must orchestrate the multiplayer environment and Go (golang) was chosen for this due to how performat it is compared to the complexity.",
      "The client installs a modified `.dll` file which contains all the logic for ripping the local players stats from memory during runtime and sending it to the server. It's also reponsible for getting a list of that player data from the server and creating player clones from those stats.",
      "The server organises that data from all of the clients and then broadcasts it out through a websockets connection. Games typically use custom serialisation over the UDP protocol and the reason for this became clear while load testing the server. The server receives a packet from each client on each of the clients frame updates (60 frames per second * 1 packet per frame * 5 clients = LOTS of data). The server also distributes player updates at 45 ticks per second. Given this, the combination of the overhead from websockets and JSON serialisation begs for a minimalist solution, ergo, the industry uses custom serialisation over UDP.",
    ],
    projectPathVar: "gator_gang",
    websiteUrl: undefined,
    githubUrl: "https://github.com/KooperL/lil-gator-game-mp",
    iframeUrl: undefined,
  },
  pento: {
    projectName: "pento.page",
    projectDescription: [
      "Pento is a user-friendly platform for sharing and storing text based content built with built from the ground up with privacy in mind. It allows users to quickly dump text, code, or any other content without the need for account registration and features the option to completely mask content by encrypting it. Engage with the community by leaving comments and ratings on submissions, and track the popularity of your content through view counts. Pento also offers API and CLI access, making it easy to integrate with your applications and workflows. Share your ideas seamlessly with Pento!",
    ],
    projectPathVar: "pento",
    websiteUrl: "https://pento.page/",
    githubUrl: undefined,
    iframeUrl: "https://pento.page/",
  },
  bingo_app: {
    projectName: "dropzones",
    projectDescription: ["Straight up bingo, with some multiplayer"],
    projectPathVar: "bingo_app",
    websiteUrl: "https://dropzones.io/",
    githubUrl: undefined,
    iframeUrl: "https://dropzones.io/",
  },
  logridge: {
    projectName: "logridge",
    projectDescription: [
      "Logridge is an efficient HTTP-based log aggregator designed for seamless log storage and management. Instead of relying on bulky SDKs, applications can submit logs through a flexible API, simplifying integration. With Logridge, you can view statistics for all applications within designated tenants, allowing for organized log tracking. Applications can be grouped into tenants, and user access management features enable easy user invitations and collaboration. Streamline your logging process and enhance visibility with Logridge.",
    ],
    projectPathVar: "logridge",
    websiteUrl: "https://logridge.net/",
    githubUrl: undefined,
    iframeUrl: "https://logridge.net/",
  },
  mail_catcher: {
    projectName: "Mail catcher",
    projectDescription: [
      "This project provides a simple way to stand up a private disposable mail service, giving the owner access to ANY email address username they'd like.",
      "With API support, it aims to solve the problem of testing automation script being blocked by one time password challenges in apps.",
      "It can be stood up in a single command via docker-compose, as long as the host machine is not firewalled. It's also hosted and provides application access for free.",
    ],
    projectPathVar: "mail_catcher",
    websiteUrl: "https://mail-catcher.net/",
    githubUrl: "https://github.com/KooperL/mail-catcher",
    iframeUrl: "https://mail-catcher.net/",
  },
  md_app: {
    projectName: "text processor",
    projectDescription: [
      "This toy project was made to follow the footsteps over the famously difficult issue of rich text editing in browsers, which was interesting for me to learn. To explore this issue further, I wanted to create a backend for text processing that could be used in text rich environments.",
      "When it comes to having customised rich text (colour, bold, underline, headings) on websites, third-party text editors called WYSIWYG editors are used by the developers. This is because, in vanilla environments, applying bold formatting (for example) to a selection of text is strangely challenging and non standard.",
      "This is because unlike modern web development, web browsers were initially built with no standardization, and different web browsers on different systems handle rich text editing different. Hence the introduction of specialised third-party editors. This aims to be an environment agnostic backend which applies formatting using xml syntax.",
      "Because this project was the backend for a text processor, it was plugged into a simple text processing application for the sake of demonstration."
    ],
    projectPathVar: "md_app",
    websiteUrl: "https://mdapp-site.pages.dev/",
    githubUrl: "https://github.com/KooperL/mdApp",
    iframeUrl: "https://mdapp-site.pages.dev/",
  },
  pocketbase_logging: {
    projectName: "pocketbase-logging",
    projectDescription: [
      "This project aims to empower developers by instantly standing up a fullstack logging application",
      "Logging applications can capture actions, behaviours, application state and more. In no time, you can have a fullstack logging application up and running, ready to capture and store logs from your applications.",
      "Under the hood, this project uses Pocketbase, a backend service that provides a simple and secure way to store and retrieve data in addition to serving a frontend UI.",
    ],
    projectPathVar: "pocketbase_logging",
    websiteUrl: "https://logger.pockethost.io/realtime",
    githubUrl: "https://github.com/KooperL/pocketbase-logging",
    iframeUrl: null && "https://logger.pockethost.io/realtime",
  },
  redirected: {
    projectName: "redirected.dev",
    projectDescription: [
      "Redirected is a tracking pixel generator designed to help capture and analyze web traffic in real time. Create and organize tracking pixels into customizable groups for efficient management. With Redirected, you can easily view aggregated statistics to understand user behavior and optimize your marketing efforts.",
      "The internet has a flaw, whereby users who download an image from a server reveal too much information to the server they're communicating with. This issue can manifest when downloading assets such as images or fonts. When a user visits a website that uses a custom font from google, your web browser begins talking to google to download that font. Now, google knows you have landed on that page and can catalogue your page visit into their profiling database.",
      "A tracking pixel is a 1 pixel x 1 pixel image that works the exact same way as the aforementioned font."
    ],
    projectPathVar: "redirected",
    websiteUrl: "https://redirected.dev/",
    githubUrl: undefined,
    iframeUrl: "https://redirected.dev/",
  },
  portfolio: {
    projectName: "portfolio",
    projectDescription: [
      "The purpose of this project is to showcase my work and provide a platform for me to share my thoughts and ideas.",
      "Built with SvelteKit and TailwindCSS, this site is a playground for me to experiment with new technologies and ideas.",
      "Feel free to have a poke around the live site or the source code and let me know what you think!",
    ],
    projectPathVar: "portfolio",
    websiteUrl: null && "/",
    githubUrl: "https://github.com/KooperL/portfolio",
    iframeUrl: null && "/",
  },
  vitality: {
    projectName: "Vitality",
    projectDescription: [
      "Vitality is a personalised, science backed health and wellbeing program that supports you in making healthier choices every day.",
      "Using the principles of behavioural science, AIA Vitality incentivises you to take small steps towards improving your wellbeing and leading a healthier, longer, better life.",
      "Vitality is available on the apple app store and google play store.",
    ],
    projectPathVar: "vitality",
    websiteUrl:
      "https://apps.apple.com/au/app/aia-vitality-australia/id1584775072",
    githubUrl: null,
    iframeUrl: null,
  },
  svelte_pocketbase_quickstart: {
    projectName: "svelte-pocketbase-quickstart",
    projectDescription: [
      "Pure boiler plate project that I clone and fork every time I wish to quickly begin a new project.",
      "Quickly get started with a Svelte project that uses Pocketbase as a backend service. This project is a great starting point for any Svelte project that needs a backend service.",
    ],
    projectPathVar: "svelte_pocketbase_quickstart",
    websiteUrl: "https://svelte-pocketbase-quickstart.pages.dev/",
    githubUrl: "https://github.com/KooperL/svelte-pocketbase-quickstart",
    iframeUrl: null && "/",
  },
  tailwind_color_generator: {
    projectName: "tailwind-color-generator",
    projectDescription: [
      "This handy tool helps you generate a custom color spectrum for your Tailwind CSS configuration. It solves the problem of creating consistent and visually appealing color palettes for your web projects. Simply choose three key colors or randomize them, and the tool will generate a full spectrum with corresponding Tailwind configuration.",
      "Tailwind is a framework that simultaneously fixes CSS as well as streamlining the process of standardising style formats.",
      " The colours generated here can be plugged straight into a tailwind configuration file to instantly use a beatiful colour palatte across a project using tailwind.",
    ],
    projectPathVar: "tailwind_color_generator",
    websiteUrl: "https://kooperl.github.io/tailwind-color-generator/",
    githubUrl: "https://github.com/KooperL/tailwind-color-generator",
    iframeUrl: "https://kooperl.github.io/tailwind-color-generator/",
  },
  simple_steganography: {
    projectName: "Steganography encoder",
    projectDescription: [
      "Steganography is the practice of hiding information within another medium so that the existence of the hidden information is not obvious. When applied to text, it is often referred to as text steganography.",
      "This project is a simple text steganography encoder that allows you to encode and decode secret messages within text.",
      "The encoder works by using spaces (one space for 0, two spaces for 1) to encode the message. The decoder then reads the spaces to decode the message.",
    ],
    projectPathVar: "simple_steganography",
    websiteUrl: "https://kooperl.github.io/simple-steganography/",
    githubUrl: "https://github.com/KooperL/simple-steganography",
    iframeUrl: "https://kooperl.github.io/simple-steganography/",
  },
    qr_encoder: {
    projectName: "QR File Encoder",
    projectDescription: [
      "Encode and decode files using QR code video streams — all in your browser.",
      "Any file can be encoded into a sequence of QR codes and later reconstruct the original file by scanning the QR codes from the video",
    ],
    projectPathVar: "qr_encoder",
    websiteUrl: "https://kooperl.github.io/qr-stream-generator/index.html",
    githubUrl: "https://github.com/KooperL/qr-stream-generator",
    iframeUrl: "https://kooperl.github.io/qr-stream-generator/index.html",
  },
  vybs: {
    projectName: "vybs.tv",
    projectDescription: ["Pretty b-roll web animations."],
    projectPathVar: "vybs",
    websiteUrl: "https://vybs.tv/",
    githubUrl: "https://github.com/KooperL/____",
    iframeUrl: "https://vybs.tv/",
  },
    perf_gerber: {
    projectName: "perf-gerber",
    projectDescription: ["perf-gerber is a browser-based tool for designing perfboard-style PCBs quickly and exporting them as manufacturable Gerber files.",
      "It is intentionally simple, opinionated, and focused on a single job: turning a perfboard layout into real PCB files without needing a full EDA suite.",
      "Use perf-gerber when you want to:",

      "Design custom perfboard / protoboard PCBs",
      "Quickly lay out point-to-point style traces",
      "Generate Gerber + drill files compatible with common PCB fabs",
      "Prototype circuits that would normally be hand-wired on perfboard",
      "Create single- or double-sided perfboard layouts with plated holes"
    ],
    projectPathVar: "perf_gerber",
    websiteUrl: "https://kooperl.github.io/perf-gerber/index.html",
    githubUrl: "https://github.com/KooperL/perf-gerber",
    iframeUrl: null,
  },
    esp32_person_counter: {
    projectName: "esp32-person-counter",
    projectDescription: ["This project scans for nearby WiFi and Bluetooth Low Energy devices using an ESP32. It reports the number of unique MAC addresses observed during a fixed time window to estimate person presence.",
      "The firmware periodically:",
      "Scans for WiFi networks and records BSSIDs",
      "Scans for BLE advertisements and records device addresses",
      "Outputs counts over the serial interface (115200 baud)",
    ],
    projectPathVar: "esp32_person_counter",
    websiteUrl: null,
    githubUrl: "https://github.com/KooperL/esp32-person-counter",
    iframeUrl: null
  },
    geo_vic: {
    projectName: "geo-vic",
    projectDescription: ["3D modeled and printed topographies/cityscapes in Victoria. Made with Blender and QGIS, contour lines sources from https://discover.data.vic.gov.au. Street map data from OSM."],
    projectPathVar: "geo_vic",
    websiteUrl: null,
    githubUrl: "https://github.com/KooperL/geo-vic",
    iframeUrl: null,
  },
    prado_head_unit_plate: {
    projectName: "prado-head-unit-plate",
    projectDescription: ["A collection of modifications and accessories to my car's head unit"],
    projectPathVar: "prado_head_unit_plate",
    websiteUrl: null,
    githubUrl: "https://github.com/KooperL/prado-head-unit-plate",
    iframeUrl: null,
  },
    audio_sniffer: {
    projectName: "audio-sniffer",
    projectDescription: [
      "A simple, lightweight ESP32 project that records audio from the INMP441 I2S microphone and saves it as 16-bit WAV files to an SD card.",
      "Features:",
      "Records audio at 8 kHz, mono, 16-bit PCM.",
      "Automatically manages SD card storage by deleting the oldest recordings when space is low.",
      "Supports continuous recording by splitting audio into separate WAV files.",
    ],
    projectPathVar: "audio_sniffer",
    websiteUrl: null,
    githubUrl: "https://github.com/KooperL/audio-sniffer",
    iframeUrl: null,
  },
    clover_pit_jumpstart: {
    projectName: "clover-pit-jumpstart",
    projectDescription: [
      "Mod for a game 'clover-pit' to enhance the early game setup. Made in C#.",
      "Provides a subtle early-game jumpstart to early game progression in CloverPit.",
      "The extra clover tickets and free restock smooth out the opening turns, letting players establish momentum faster without disrupting overall balance or progression."
    ],
    projectPathVar: "vybs",
    websiteUrl: "https://www.nexusmods.com/cloverpit/mods/47",
    githubUrl: "https://github.com/KooperL/clover-pit-jumpstart",
    iframeUrl: null,
  },
};

export const generateProjectContent = (
  projectPathVar: keyof typeof projects,
) => {
  const { projectDescription, projectName, websiteUrl, githubUrl, iframeUrl } =
    projects[projectPathVar];

  const jsonContent = {
    pageMetadata: {
      title: projectName,
      description: projectDescription.join(" "),
      headline: projectName,
    },
    pageContent: {
      order: 2,
      elements: [
        {
          type: "textBody",
          content: {
            order: 1,
            title: projectName,
            body: [...projectDescription, "Check it out below!"],
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
  return jsonContent;
};

import type { CMSDocument } from "$lib/utils/CMS/types";

export const site = {
  name: "Kooper's portfolio",
  description:
    "My own corner of the internet to play around with tech that's too fun for a production environment",
};

// Helper to build a CMSDocument for a project page from compact data
interface ProjectDef {
  title: string;
  description: string;
  body: string[];
  buttons: Array<{
    id: string;
    label: string;
    href: string;
    testId?: string;
    icon?: string;
    logContext?: string;
    logAction?: string;
  }>;
  embedUrl?: string;
}

function buildProjectDoc(key: string, def: ProjectDef): CMSDocument {
  const i18n: Record<string, string> = {};
  i18n[`${key}.title`] = def.title;
  def.body.forEach((p, i) => {
    i18n[`${key}.body${i + 1}`] = p;
  });
  def.buttons.forEach((btn) => {
    i18n[`${key}.btn.${btn.id}`] = btn.label;
  });

  const contentChildren: any[] = [];

  // Main content container
  const container: any = {
    id: `${key}-content`,
    type: "container",
    props: {
      title: `@i18n:${key}.title`,
    },
  };

  if (def.body.length > 0) {
    container.props.body = def.body.map((_, i) => `@i18n:${key}.body${i + 1}`);
  }

  if (def.buttons.length > 0) {
    container.children = def.buttons.map((btn) => ({
      id: btn.id,
      type: "button",
      props: {
        testID: btn.testId || `${btn.id}-testId`,
        title: `@i18n:${key}.btn.${btn.id}`,
        href: btn.href,
        ...(btn.icon ? { icon: btn.icon } : {}),
      },
      events: [
        {
          type: "onPress",
          action: "function",
          name: "logInfo",
          params: {
            context: btn.logContext || key,
            action:
              btn.logAction || `Press on '${btn.label.toLowerCase()}' button`,
          },
        },
      ],
    }));
  }

  contentChildren.push(container);

  // Embedded frame
  if (def.embedUrl) {
    contentChildren.push({
      id: `${key}-embed`,
      type: "embeddedFrame",
      props: {
        url: def.embedUrl,
      },
    });
  }

  return {
    _meta: {
      id: key,
      author: "cms team",
      description: `${def.title} project page`,
      revisions: { major: 2, minor: 0 },
    },
    _definitions: {
      tokens: {},
      i18n,
      media: {},
      styleClasses: {},
    },
    layout: "page",
    page: {
      slug: key,
      title: def.title,
      description: def.description,
    },
    children: contentChildren,
  };
}

export const projectContent: Record<string, CMSDocument> = {
  gator_gang: buildProjectDoc("gator_gang", {
    title: "Gator gang",
    description:
      "Gator gang is a co-presence multiplayer mod for lil gator game, allowing players to enjoy the game in a more social way. Each player retains their own progression, inventory, and story state. The goal is to enjoy the atmosphere together, explore side-by-side, and share moments.",
    body: [
      "Gator gang is a co-presence multiplayer mod for lil gator game, allowing players to enjoy the game in a more social way. Each player retains their own progression, inventory, and story state. The goal is to enjoy the atmosphere together, explore side-by-side, and share moments.",
      "It's composed of two projects, a local client (and their friends) must install a modified `.dll` file that was taken from a compiled Unity Engine project. That file is then decompiled into c# code, to which custom classes can be added before recompilation. The file then gets loaded like it normally would to result in a modded player experience. There's also a server component who must orchestrate the multiplayer environment and Go (golang) was chosen for this due to how performat it is compared to the complexity.",
      "The client installs a modified `.dll` file which contains all the logic for ripping the local players stats from memory during runtime and sending it to the server. It's also reponsible for getting a list of that player data from the server and creating player clones from those stats.",
      "The server organises that data from all of the clients and then broadcasts it out through a websockets connection. Games typically use custom serialisation over the UDP protocol and the reason for this became clear while load testing the server. The server receives a packet from each client on each of the clients frame updates (60 frames per second * 1 packet per frame * 5 clients = LOTS of data). The server also distributes player updates at 45 ticks per second. Given this, the combination of the overhead from websockets and JSON serialisation begs for a minimalist solution, ergo, the industry uses custom serialisation over UDP.",
      "Check it out below!",
    ],
    buttons: [
      { id: "gator_gang-back-button", label: "Back", href: "/" },
      {
        id: "gator_gang-code-button",
        label: "View code",
        href: "https://github.com/KooperL/lil-gator-game-mp",
        icon: "ArrowRightToBracketOutline",
      },
    ],
  }),

  pento: buildProjectDoc("pento", {
    title: "pento.page",
    description:
      "Pento is a user-friendly platform for sharing and storing text based content built with built from the ground up with privacy in mind. It allows users to quickly dump text, code, or any other content without the need for account registration and features the option to completely mask content by encrypting it. Engage with the community by leaving comments and ratings on submissions, and track the popularity of your content through view counts. Pento also offers API and CLI access, making it easy to integrate with your applications and workflows. Share your ideas seamlessly with Pento!",
    body: [
      "Pento is a user-friendly platform for sharing and storing text based content built with built from the ground up with privacy in mind. It allows users to quickly dump text, code, or any other content without the need for account registration and features the option to completely mask content by encrypting it. Engage with the community by leaving comments and ratings on submissions, and track the popularity of your content through view counts. Pento also offers API and CLI access, making it easy to integrate with your applications and workflows. Share your ideas seamlessly with Pento!",
      "Check it out below!",
    ],
    buttons: [
      { id: "pento-back-button", label: "Back", href: "/" },
      {
        id: "pento-visit-button",
        label: "Visit",
        href: "https://pento.page/",
        icon: "ArrowRightToBracketOutline",
      },
    ],
    embedUrl: "https://pento.page/",
  }),

  logridge: buildProjectDoc("logridge", {
    title: "logridge",
    description:
      "Logridge is an efficient HTTP-based log aggregator designed for seamless log storage and management. Instead of relying on bulky SDKs, applications can submit logs through a flexible API, simplifying integration. With Logridge, you can view statistics for all applications within designated tenants, allowing for organized log tracking. Applications can be grouped into tenants, and user access management features enable easy user invitations and collaboration. Streamline your logging process and enhance visibility with Logridge.",
    body: [
      "Logridge is an efficient HTTP-based log aggregator designed for seamless log storage and management. Instead of relying on bulky SDKs, applications can submit logs through a flexible API, simplifying integration. With Logridge, you can view statistics for all applications within designated tenants, allowing for organized log tracking. Applications can be grouped into tenants, and user access management features enable easy user invitations and collaboration. Streamline your logging process and enhance visibility with Logridge.",
      "Check it out below!",
    ],
    buttons: [
      { id: "logridge-back-button", label: "Back", href: "/" },
      {
        id: "logridge-visit-button",
        label: "Visit",
        href: "https://logridge.net/",
        icon: "ArrowRightToBracketOutline",
      },
    ],
    embedUrl: "https://logridge.net/",
  }),

  bingo_app: buildProjectDoc("bingo_app", {
    title: "dropzones",
    description: "Straight up bingo, with some multiplayer",
    body: ["Straight up bingo, with some multiplayer", "Check it out below!"],
    buttons: [
      { id: "bingo_app-back-button", label: "Back", href: "/" },
      {
        id: "bingo_app-visit-button",
        label: "Visit",
        href: "https://dropzones.io/",
        icon: "ArrowRightToBracketOutline",
      },
    ],
    embedUrl: "https://dropzones.io/",
  }),

  mail_catcher: buildProjectDoc("mail_catcher", {
    title: "Mail catcher",
    description:
      "This project provides a simple way to stand up a private disposable mail service, giving the owner access to ANY email address username they'd like. With API support, it aims to solve the problem of testing automation script being blocked by one time password challenges in apps. It can be stood up in a single command via docker-compose, as long as the host machine is not firewalled. It's also hosted and provides application access for free.",
    body: [
      "This project provides a simple way to stand up a private disposable mail service, giving the owner access to ANY email address username they'd like.",
      "With API support, it aims to solve the problem of testing automation script being blocked by one time password challenges in apps.",
      "It can be stood up in a single command via docker-compose, as long as the host machine is not firewalled. It's also hosted and provides application access for free.",
      "Check it out below!",
    ],
    buttons: [
      { id: "mail_catcher-back-button", label: "Back", href: "/" },
      {
        id: "mail_catcher-visit-button",
        label: "Visit",
        href: "https://mail-catcher.net/",
        icon: "ArrowRightToBracketOutline",
      },
      {
        id: "mail_catcher-code-button",
        label: "View code",
        href: "https://github.com/KooperL/mail-catcher",
        icon: "ArrowRightToBracketOutline",
      },
    ],
    embedUrl: "https://mail-catcher.net/",
  }),

  md_app: buildProjectDoc("md_app", {
    title: "text processor",
    description:
      "This toy project was made to follow the footsteps over the famously difficult issue of rich text editing in browsers, which was interesting for me to learn. To explore this issue further, I wanted to create a backend for text processing that could be used in text rich environments. When it comes to having customised rich text (colour, bold, underline, headings) on websites, third-party text editors called WYSIWYG editors are used by the developers. This is because, in vanilla environments, applying bold formatting (for example) to a selection of text is strangely challenging and non standard. This is because unlike modern web development, web browsers were initially built with no standardization, and different web browsers on different systems handle rich text editing different. Hence the introduction of specialised third-party editors. This aims to be an environment agnostic backend which applies formatting using xml syntax. Because this project was the backend for a text processor, it was plugged into a simple text processing application for the sake of demonstration.",
    body: [
      "This toy project was made to follow the footsteps over the famously difficult issue of rich text editing in browsers, which was interesting for me to learn. To explore this issue further, I wanted to create a backend for text processing that could be used in text rich environments.",
      "When it comes to having customised rich text (colour, bold, underline, headings) on websites, third-party text editors called WYSIWYG editors are used by the developers. This is because, in vanilla environments, applying bold formatting (for example) to a selection of text is strangely challenging and non standard.",
      "This is because unlike modern web development, web browsers were initially built with no standardization, and different web browsers on different systems handle rich text editing different. Hence the introduction of specialised third-party editors. This aims to be an environment agnostic backend which applies formatting using xml syntax.",
      "Because this project was the backend for a text processor, it was plugged into a simple text processing application for the sake of demonstration.",
      "Check it out below!",
    ],
    buttons: [
      { id: "md_app-back-button", label: "Back", href: "/" },
      {
        id: "md_app-visit-button",
        label: "Visit",
        href: "https://mdapp-site.pages.dev/",
        icon: "ArrowRightToBracketOutline",
      },
      {
        id: "md_app-code-button",
        label: "View code",
        href: "https://github.com/KooperL/mdApp",
        icon: "ArrowRightToBracketOutline",
      },
    ],
    embedUrl: "https://mdapp-site.pages.dev/",
  }),

  pocketbase_logging: buildProjectDoc("pocketbase_logging", {
    title: "pocketbase-logging",
    description:
      "This project aims to empower developers by instantly standing up a fullstack logging application. Logging applications can capture actions, behaviours, application state and more. In no time, you can have a fullstack logging application up and running, ready to capture and store logs from your applications. Under the hood, this project uses Pocketbase, a backend service that provides a simple and secure way to store and retrieve data in addition to serving a frontend UI.",
    body: [
      "This project aims to empower developers by instantly standing up a fullstack logging application",
      "Logging applications can capture actions, behaviours, application state and more. In no time, you can have a fullstack logging application up and running, ready to capture and store logs from your applications.",
      "Under the hood, this project uses Pocketbase, a backend service that provides a simple and secure way to store and retrieve data in addition to serving a frontend UI.",
      "Check it out below!",
    ],
    buttons: [
      { id: "pocketbase_logging-back-button", label: "Back", href: "/" },
      {
        id: "pocketbase_logging-visit-button",
        label: "Visit",
        href: "https://logger.pockethost.io/realtime",
        icon: "ArrowRightToBracketOutline",
      },
      {
        id: "pocketbase_logging-code-button",
        label: "View code",
        href: "https://github.com/KooperL/pocketbase-logging",
        icon: "ArrowRightToBracketOutline",
      },
    ],
    embedUrl: "https://logger.pockethost.io/realtime",
  }),

  redirected: buildProjectDoc("redirected", {
    title: "redirected.dev",
    description:
      "Redirected is a tracking pixel generator designed to help capture and analyze web traffic in real time. Create and organize tracking pixels into customizable groups for efficient management. With Redirected, you can easily view aggregated statistics to understand user behavior and optimize your marketing efforts. The internet has a flaw, whereby users who download an image from a server reveal too much information to the server they're communicating with. This issue can manifest when downloading assets such as images or fonts. When a user visits a website that uses a custom font from google, your web browser begins talking to google to download that font. Now, google knows you have landed on that page and can catalogue your page visit into their profiling database. A tracking pixel is a 1 pixel x 1 pixel image that works the exact same way as the aforementioned font.",
    body: [
      "Redirected is a tracking pixel generator designed to help capture and analyze web traffic in real time. Create and organize tracking pixels into customizable groups for efficient management. With Redirected, you can easily view aggregated statistics to understand user behavior and optimize your marketing efforts.",
      "The internet has a flaw, whereby users who download an image from a server reveal too much information to the server they're communicating with. This issue can manifest when downloading assets such as images or fonts. When a user visits a website that uses a custom font from google, your web browser begins talking to google to download that font. Now, google knows you have landed on that page and can catalogue your page visit into their profiling database.",
      "A tracking pixel is a 1 pixel x 1 pixel image that works the exact same way as the aforementioned font.",
      "Check it out below!",
    ],
    buttons: [
      { id: "redirected-back-button", label: "Back", href: "/" },
      {
        id: "redirected-visit-button",
        label: "Visit",
        href: "https://redirected.dev/",
        icon: "ArrowRightToBracketOutline",
      },
    ],
    embedUrl: "https://redirected.dev/",
  }),

  portfolio: buildProjectDoc("portfolio", {
    title: "portfolio",
    description:
      "The purpose of this project is to showcase my work and provide a platform for me to share my thoughts and ideas. Built with SvelteKit and TailwindCSS, this site is a playground for me to experiment with new technologies and ideas. Feel free to have a poke around the live site or the source code and let me know what you think!",
    body: [
      "The purpose of this project is to showcase my work and provide a platform for me to share my thoughts and ideas.",
      "Built with SvelteKit and TailwindCSS, this site is a playground for me to experiment with new technologies and ideas.",
      "Feel free to have a poke around the live site or the source code and let me know what you think!",
      "Check it out below!",
    ],
    buttons: [
      { id: "portfolio-back-button", label: "Back", href: "/" },
      {
        id: "portfolio-code-button",
        label: "View code",
        href: "https://github.com/KooperL/portfolio",
        icon: "ArrowRightToBracketOutline",
      },
    ],
  }),

  vitality: buildProjectDoc("vitality", {
    title: "Vitality",
    description:
      "Vitality is a personalised, science backed health and wellbeing program that supports you in making healthier choices every day. Using the principles of behavioural science, AIA Vitality incentivises you to take small steps towards improving your wellbeing and leading a healthier, longer, better life. Vitality is available on the apple app store and google play store.",
    body: [
      "Vitality is a personalised, science backed health and wellbeing program that supports you in making healthier choices every day.",
      "Using the principles of behavioural science, AIA Vitality incentivises you to take small steps towards improving your wellbeing and leading a healthier, longer, better life.",
      "Vitality is available on the apple app store and google play store.",
      "Check it out below!",
    ],
    buttons: [
      { id: "vitality-back-button", label: "Back", href: "/" },
      {
        id: "vitality-visit-button",
        label: "Visit",
        href: "https://apps.apple.com/au/app/aia-vitality-australia/id1584775072",
        icon: "ArrowRightToBracketOutline",
      },
    ],
  }),

  svelte_pocketbase_quickstart: buildProjectDoc(
    "svelte_pocketbase_quickstart",
    {
      title: "svelte-pocketbase-quickstart",
      description:
        "Pure boiler plate project that I clone and fork every time I wish to quickly begin a new project. Quickly get started with a Svelte project that uses Pocketbase as a backend service. This project is a great starting point for any Svelte project that needs a backend service.",
      body: [
        "Pure boiler plate project that I clone and fork every time I wish to quickly begin a new project.",
        "Quickly get started with a Svelte project that uses Pocketbase as a backend service. This project is a great starting point for any Svelte project that needs a backend service.",
        "Check it out below!",
      ],
      buttons: [
        {
          id: "svelte_pocketbase_quickstart-back-button",
          label: "Back",
          href: "/",
        },
        {
          id: "svelte_pocketbase_quickstart-visit-button",
          label: "Visit",
          href: "https://svelte-pocketbase-quickstart.pages.dev/",
          icon: "ArrowRightToBracketOutline",
        },
        {
          id: "svelte_pocketbase_quickstart-code-button",
          label: "View code",
          href: "https://github.com/KooperL/svelte-pocketbase-quickstart",
          icon: "ArrowRightToBracketOutline",
        },
      ],
    },
  ),

  tailwind_color_generator: buildProjectDoc("tailwind_color_generator", {
    title: "tailwind-color-generator",
    description:
      "This handy tool helps you generate a custom color spectrum for your Tailwind CSS configuration. It solves the problem of creating consistent and visually appealing color palettes for your web projects. Simply choose three key colors or randomize them, and the tool will generate a full spectrum with corresponding Tailwind configuration. Tailwind is a framework that simultaneously fixes CSS as well as streamlining the process of standardising style formats. The colours generated here can be plugged straight into a tailwind configuration file to instantly use a beatiful colour palatte across a project using tailwind.",
    body: [
      "This handy tool helps you generate a custom color spectrum for your Tailwind CSS configuration. It solves the problem of creating consistent and visually appealing color palettes for your web projects. Simply choose three key colors or randomize them, and the tool will generate a full spectrum with corresponding Tailwind configuration.",
      "Tailwind is a framework that simultaneously fixes CSS as well as streamlining the process of standardising style formats.",
      " The colours generated here can be plugged straight into a tailwind configuration file to instantly use a beatiful colour palatte across a project using tailwind.",
      "Check it out below!",
    ],
    buttons: [
      { id: "tailwind_color_generator-back-button", label: "Back", href: "/" },
      {
        id: "tailwind_color_generator-visit-button",
        label: "Visit",
        href: "https://kooperl.github.io/tailwind-color-generator/",
        icon: "ArrowRightToBracketOutline",
      },
      {
        id: "tailwind_color_generator-code-button",
        label: "View code",
        href: "https://github.com/KooperL/tailwind-color-generator",
        icon: "ArrowRightToBracketOutline",
      },
    ],
    embedUrl: "https://kooperl.github.io/tailwind-color-generator/",
  }),

  simple_steganography: buildProjectDoc("simple_steganography", {
    title: "Steganography encoder",
    description:
      "Steganography is the practice of hiding information within another medium so that the existence of the hidden information is not obvious. When applied to text, it is often referred to as text steganography. This project is a simple text steganography encoder that allows you to encode and decode secret messages within text. The encoder works by using spaces (one space for 0, two spaces for 1) to encode the message. The decoder then reads the spaces to decode the message.",
    body: [
      "Steganography is the practice of hiding information within another medium so that the existence of the hidden information is not obvious. When applied to text, it is often referred to as text steganography.",
      "This project is a simple text steganography encoder that allows you to encode and decode secret messages within text.",
      "The encoder works by using spaces (one space for 0, two spaces for 1) to encode the message. The decoder then reads the spaces to decode the message.",
      "Check it out below!",
    ],
    buttons: [
      { id: "simple_steganography-back-button", label: "Back", href: "/" },
      {
        id: "simple_steganography-visit-button",
        label: "Visit",
        href: "https://kooperl.github.io/simple-steganography/",
        icon: "ArrowRightToBracketOutline",
      },
      {
        id: "simple_steganography-code-button",
        label: "View code",
        href: "https://github.com/KooperL/simple-steganography",
        icon: "ArrowRightToBracketOutline",
      },
    ],
    embedUrl: "https://kooperl.github.io/simple-steganography/",
  }),

  qr_encoder: buildProjectDoc("qr_encoder", {
    title: "QR File Encoder",
    description:
      "Encode and decode files using QR code video streams — all in your browser. Any file can be encoded into a sequence of QR codes and later reconstruct the original file by scanning the QR codes from the video",
    body: [
      "Encode and decode files using QR code video streams — all in your browser.",
      "Any file can be encoded into a sequence of QR codes and later reconstruct the original file by scanning the QR codes from the video",
      "Check it out below!",
    ],
    buttons: [
      { id: "qr_encoder-back-button", label: "Back", href: "/" },
      {
        id: "qr_encoder-visit-button",
        label: "Visit",
        href: "https://kooperl.github.io/qr-stream-generator/index.html",
        icon: "ArrowRightToBracketOutline",
      },
      {
        id: "qr_encoder-code-button",
        label: "View code",
        href: "https://github.com/KooperL/qr-stream-generator",
        icon: "ArrowRightToBracketOutline",
      },
    ],
    embedUrl: "https://kooperl.github.io/qr-stream-generator/index.html",
  }),

  vybs: buildProjectDoc("vybs", {
    title: "vybs.tv",
    description: "Pretty b-roll web animations.",
    body: ["Pretty b-roll web animations.", "Check it out below!"],
    buttons: [
      { id: "vybs-back-button", label: "Back", href: "/" },
      {
        id: "vybs-visit-button",
        label: "Visit",
        href: "https://vybs.tv/",
        icon: "ArrowRightToBracketOutline",
      },
      {
        id: "vybs-code-button",
        label: "View code",
        href: "https://github.com/KooperL/____",
        icon: "ArrowRightToBracketOutline",
      },
    ],
    embedUrl: "https://vybs.tv/",
  }),

  perf_gerber: buildProjectDoc("perf_gerber", {
    title: "perf-gerber",
    description:
      "perf-gerber is a browser-based tool for designing perfboard-style PCBs quickly and exporting them as manufacturable Gerber files. It is intentionally simple, opinionated, and focused on a single job: turning a perfboard layout into real PCB files without needing a full EDA suite. Use perf-gerber when you want to: - Design custom perfboard / protoboard PCBs - Quickly lay out point-to-point style traces - Generate Gerber + drill files compatible with common PCB fabs - Prototype circuits that would normally be hand-wired on perfboard - Create single- or double-sided perfboard layouts with plated holes",
    body: [
      "perf-gerber is a browser-based tool for designing perfboard-style PCBs quickly and exporting them as manufacturable Gerber files.",
      "It is intentionally simple, opinionated, and focused on a single job: turning a perfboard layout into real PCB files without needing a full EDA suite.",
      "Use perf-gerber when you want to:",
      " - Design custom perfboard / protoboard PCBs",
      " - Quickly lay out point-to-point style traces",
      " - Generate Gerber + drill files compatible with common PCB fabs",
      " - Prototype circuits that would normally be hand-wired on perfboard",
      " - Create single- or double-sided perfboard layouts with plated holes",
      "Check it out below!",
    ],
    buttons: [
      { id: "perf_gerber-back-button", label: "Back", href: "/" },
      {
        id: "perf_gerber-visit-button",
        label: "Visit",
        href: "https://kooperl.github.io/perf-gerber/index.html",
        icon: "ArrowRightToBracketOutline",
      },
      {
        id: "perf_gerber-code-button",
        label: "View code",
        href: "https://github.com/KooperL/perf-gerber",
        icon: "ArrowRightToBracketOutline",
      },
    ],
    embedUrl: "https://kooperl.github.io/perf-gerber/index.html",
  }),

  esp32_person_counter: buildProjectDoc("esp32_person_counter", {
    title: "esp32-person-counter",
    description:
      "This project scans for nearby WiFi and Bluetooth Low Energy devices using an ESP32. It reports the number of unique MAC addresses observed during a fixed time window to estimate person presence. The firmware periodically: Scans for WiFi networks and records BSSIDs Scans for BLE advertisements and records device addresses Outputs counts over the serial interface (115200 baud)",
    body: [
      "This project scans for nearby WiFi and Bluetooth Low Energy devices using an ESP32. It reports the number of unique MAC addresses observed during a fixed time window to estimate person presence.",
      "The firmware periodically:",
      "Scans for WiFi networks and records BSSIDs",
      "Scans for BLE advertisements and records device addresses",
      "Outputs counts over the serial interface (115200 baud)",
      "Check it out below!",
    ],
    buttons: [
      { id: "esp32_person_counter-back-button", label: "Back", href: "/" },
      {
        id: "esp32_person_counter-code-button",
        label: "View code",
        href: "https://github.com/KooperL/esp32-person-counter",
        icon: "ArrowRightToBracketOutline",
      },
    ],
  }),

  geo_vic: buildProjectDoc("geo_vic", {
    title: "geo-vic",
    description:
      "3D modeled and printed topographies/cityscapes in Victoria. Made with Blender and QGIS, contour lines sources from https://discover.data.vic.gov.au. Street map data from OSM.",
    body: [
      "3D modeled and printed topographies/cityscapes in Victoria. Made with Blender and QGIS, contour lines sources from https://discover.data.vic.gov.au. Street map data from OSM.",
      "Check it out below!",
    ],
    buttons: [
      { id: "geo_vic-back-button", label: "Back", href: "/" },
      {
        id: "geo_vic-code-button",
        label: "View code",
        href: "https://github.com/KooperL/geo-vic",
        icon: "ArrowRightToBracketOutline",
      },
    ],
  }),

  prado_head_unit_plate: buildProjectDoc("prado_head_unit_plate", {
    title: "prado-head-unit-plate",
    description:
      "A collection of modifications and accessories to my car's head unit",
    body: [
      "A collection of modifications and accessories to my car's head unit",
      "Check it out below!",
    ],
    buttons: [
      { id: "prado_head_unit_plate-back-button", label: "Back", href: "/" },
      {
        id: "prado_head_unit_plate-code-button",
        label: "View code",
        href: "https://github.com/KooperL/prado-head-unit-plate",
        icon: "ArrowRightToBracketOutline",
      },
    ],
  }),

  audio_sniffer: buildProjectDoc("audio_sniffer", {
    title: "audio-sniffer",
    description:
      "A simple, lightweight ESP32 project that records audio from the INMP441 I2S microphone and saves it as 16-bit WAV files to an SD card. Features: Records audio at 8 kHz, mono, 16-bit PCM. Automatically manages SD card storage by deleting the oldest recordings when space is low. Supports continuous recording by splitting audio into separate WAV files.",
    body: [
      "A simple, lightweight ESP32 project that records audio from the INMP441 I2S microphone and saves it as 16-bit WAV files to an SD card.",
      "Features:",
      "Records audio at 8 kHz, mono, 16-bit PCM.",
      "Automatically manages SD card storage by deleting the oldest recordings when space is low.",
      "Supports continuous recording by splitting audio into separate WAV files.",
      "Check it out below!",
    ],
    buttons: [
      { id: "audio_sniffer-back-button", label: "Back", href: "/" },
      {
        id: "audio_sniffer-code-button",
        label: "View code",
        href: "https://github.com/KooperL/audio-sniffer",
        icon: "ArrowRightToBracketOutline",
      },
    ],
  }),

  clover_pit_jumpstart: buildProjectDoc("clover_pit_jumpstart", {
    title: "clover-pit-jumpstart",
    description:
      "Mod for a game 'clover-pit' to enhance the early game setup. Made in C#. Provides a subtle early-game jumpstart to early game progression in CloverPit. The extra clover tickets and free restock smooth out the opening turns, letting players establish momentum faster without disrupting overall balance or progression.",
    body: [
      "Mod for a game 'clover-pit' to enhance the early game setup. Made in C#.",
      "Provides a subtle early-game jumpstart to early game progression in CloverPit.",
      "The extra clover tickets and free restock smooth out the opening turns, letting players establish momentum faster without disrupting overall balance or progression.",
      "Check it out below!",
    ],
    buttons: [
      { id: "clover_pit_jumpstart-back-button", label: "Back", href: "/" },
      {
        id: "clover_pit_jumpstart-visit-button",
        label: "Visit",
        href: "https://www.nexusmods.com/cloverpit/mods/47",
        icon: "ArrowRightToBracketOutline",
      },
      {
        id: "clover_pit_jumpstart-code-button",
        label: "View code",
        href: "https://github.com/KooperL/clover-pit-jumpstart",
        icon: "ArrowRightToBracketOutline",
      },
    ],
  }),
};

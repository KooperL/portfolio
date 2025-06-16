export const site = {
  name: "Kooper's portfolio",
  description:
    "My own corner of the internet to play around with tech that's too fun for a production environment",
};

export const projects = {
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
    projectDescription: ["Straight up bingo"],
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
  md_app: {
    projectName: "text processor",
    projectDescription: [
      "This toy project was made to follow the footsteps over the famously difficult issue of rich text editing in browsers.",
      "When it comes to having customised rich text (colour, bold, underline, headings) on websites, third-party text editors called WYSIWYG editors are used by the developers.",
      "This is because unlike modern web development, web browsers were initially built with no standardization, and different web browsers on different systems handle rich text editing different. Hence the introduction of specialised third-party editors",
    ],
    projectPathVar: "md-app",
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
      "Redirected is a powerful tracking pixel generator designed to help you capture and analyze traffic in real time. Create and organize tracking pixels into customizable groups for efficient management. With Redirected, you can easily view aggregated statistics to understand user behavior and optimize your marketing efforts. Simplify your data tracking process and make informed decisions with real-time insights at your fingertips.",
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
      "Boilerplate, distilled into it's most generic form.",
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
    githubUrl: "https://github.com/KooperL/tailwind-color-generator",
    iframeUrl: "https://vybs.tv/",
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

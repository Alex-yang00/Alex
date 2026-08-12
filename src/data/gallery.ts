export type GalleryLink = {
  label: string;
  href: string;
  type: "video" | "source" | "website";
};

export type HostedEvent = {
  title: string;
  category: string;
  role: string;
  description: string;
  image: string;
  imageAlt: string;
  links: GalleryLink[];
};

export type StudioProject = {
  index: string;
  title: string;
  category: string;
  description: string;
  links: GalleryLink[];
};

export const launchStudioUrl = "https://github.com/Alex-yang00/launch-page-studio";

export const hostedEvents: HostedEvent[] = [
  {
    title: "OpenClaw x Novita AI",
    category: "AI Session",
    role: "Host / DevRel",
    description:
      "A live session on agent sandboxes, inference, and GPU infrastructure, connecting the product story to practical agent workflows.",
    image: "https://i.ytimg.com/vi/DB8Jv1D3bYc/hqdefault.jpg",
    imageAlt: "OpenClaw and Novita AI live session video cover",
    links: [
      {
        label: "Watch session",
        href: "https://www.youtube.com/watch?v=DB8Jv1D3bYc&t=2557s",
        type: "video",
      },
    ],
  },
  {
    title: "Kilo Code ClawShop",
    category: "Community Workshop",
    role: "Guest / DevRel",
    description:
      "A hands-on community workshop around AI developer tools, live building, and the workflows behind useful coding agents.",
    image: "https://i.ytimg.com/vi/4sMvgStBsW4/hqdefault.jpg",
    imageAlt: "Kilo Code ClawShop workshop video cover",
    links: [
      {
        label: "Watch workshop",
        href: "https://www.youtube.com/watch?v=4sMvgStBsW4&t=1007s",
        type: "video",
      },
    ],
  },
];

export const studioProjects: StudioProject[] = [
  {
    index: "001",
    title: "Harbor Agent Benchmark x Novita Sandbox",
    category: "Hackathon",
    description: "A campaign landing page and benchmark submission experience for agent builders.",
    links: [
      {
        label: "Open work",
        href: "/work/harbor",
        type: "website",
      },
      {
        label: "Source",
        href: `${launchStudioUrl}/tree/main/hackathons/001-harbor-agent-benchmark-novita-sandbox`,
        type: "source",
      },
    ],
  },
  {
    index: "002",
    title: "Awesome Hermes Tutorial",
    category: "Developer Education",
    description: "A step-by-step site for configuring providers, channels, and practical Hermes Agent workflows.",
    links: [
      {
        label: "Open work",
        href: "/work/hermes",
        type: "website",
      },
      {
        label: "Source",
        href: `${launchStudioUrl}/tree/main/tutorials/001-awesome-hermes-tutorial`,
        type: "source",
      },
    ],
  },
  {
    index: "003",
    title: "ActionLayer + OpenCode Tech Workshop",
    category: "Technical Workshop",
    description: "An interactive four-step workshop for connecting ActionLayer MCP with OpenCode.",
    links: [
      {
        label: "Open work",
        href: "/work/actionlayer",
        type: "website",
      },
    ],
  },
  {
    index: "004",
    title: "Novita x Kilo Code Workshop",
    category: "Developer Workshop",
    description: "An original Novita and Kilo Code workshop experience, migrated into the personal site as a static page.",
    links: [{ label: "Open work", href: "/work/kilo-workshop", type: "website" }],
  },
  {
    index: "005",
    title: "Novita Startup Program",
    category: "Program Landing Page",
    description: "The original startup program page, now served as a self-contained static page from this repository.",
    links: [{ label: "Open work", href: "/work/startup", type: "website" }],
  },
  {
    index: "006",
    title: "Novita Events",
    category: "Events Archive",
    description: "A static events hub with the original event pages for Kilo Code, Harbor, and Hy3 challenges.",
    links: [{ label: "Open work", href: "/work/events", type: "website" }],
  },
  {
    index: "007",
    title: "Novita AI CLI",
    category: "Developer Infrastructure / Open Source",
    description: "A unified command line for Novita model APIs, media generation, GPU runtimes, Sandbox, and serverless workflows.",
    links: [{ label: "GitHub", href: "https://github.com/novitalabs/novita-cli", type: "source" }],
  },
  {
    index: "008",
    title: "Novita Skills",
    category: "Agent Infrastructure / Open Source",
    description: "Official reusable skills for Novita APIs, GPU infrastructure, Sandbox workflows, integrations, and design guidance.",
    links: [{ label: "GitHub", href: "https://github.com/novitalabs/novita-skills", type: "source" }],
  },
];

export type Project = {
  name: string;
  category: string;
  outcome: string;
  description: string;
  links?: Array<{
    label: string;
    href: string;
    type?: "github" | "video" | "website" | "social";
  }>;
  tech: string[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "Hermes Agent x NovitaAI",
    category: "Partnership / Provider Integration",
    outcome: "Full-cycle partnership / 1000K reach",
    description:
      "Owned the full partnership cycle from outreach and relationship building to provider positioning, integration support, co-marketing launch, and BD follow-up, helping make NovitaAI a first-class built-in provider for Hermes Agent.",
    links: [
      {
        label: "Provider docs",
        href: "https://hermes-agent.nousresearch.com/docs/integrations/providers",
        type: "website",
      },
      {
        label: "X promotion",
        href: "https://x.com/NousResearch/status/2055051105432752509",
        type: "social",
      },
    ],
    tech: ["Partner outreach", "Provider positioning", "Co-marketing"],
    featured: true,
  },
  {
    name: "Novita AI CLI",
    category: "Developer Infrastructure / Open Source",
    outcome: "Unified AI + GPU command line",
    description:
      "Built the Novita CLI for model APIs, image/video/audio generation, GPU runtimes, Sandbox environments, serverless endpoints, files, tasks, and account workflows from a terminal or AI agent.",
    links: [
      { label: "GitHub", href: "https://github.com/novitalabs/novita-cli", type: "github" },
      { label: "PyPI", href: "https://pypi.org/project/novita/", type: "website" },
    ],
    tech: ["Python", "CLI design", "GPU APIs", "Agent tooling"],
    featured: true,
  },
  {
    name: "Novita Skills",
    category: "Agent Infrastructure / Open Source",
    outcome: "Reusable skills for AI builders",
    description:
      "Created the official Novita Skills repository for reusable agent workflows covering model APIs, GPU infrastructure, Sandbox, integrations, troubleshooting, and public-safe design guidance.",
    links: [
      { label: "GitHub", href: "https://github.com/novitalabs/novita-skills", type: "github" },
    ],
    tech: ["Agent skills", "API guidance", "Sandbox", "Documentation"],
    featured: true,
  },
  {
    name: "OpenClaw Community Workshops",
    category: "Foundation Relations / Joint Developer Programs",
    outcome: "Joint workshops / 200+ live viewers",
    description:
      "Established ties with the OpenClaw Foundation and worked with the OpenClaw community to co-plan and co-host developer workshops, coordinating outreach, agenda design, livestream distribution, and follow-up to build ecosystem trust and BD opportunities.",
    links: [
      {
        label: "OpenClaw",
        href: "https://www.youtube.com/watch?v=DB8Jv1D3bYc&t=2557s",
        type: "video",
      },
      {
        label: "ClawShop",
        href: "https://www.youtube.com/watch?v=4sMvgStBsW4&t=1007s",
        type: "video",
      },
    ],
    tech: ["Foundation relations", "Community co-hosting", "Workshops"],
  },
  {
    name: "awesome-hermes-tutorial",
    category: "Open-source / Developer Education",
    outcome: "Public repo + live tutorial site",
    description:
      "Built an open-source Hermes Agent tutorial site covering provider configuration, messaging-channel integration, first conversation flow, and practical agent templates.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Alex-yang00/awesome-hermes-tutorial",
        type: "github",
      },
      {
        label: "Open work",
        href: "/work/hermes",
        type: "website",
      },
    ],
    tech: ["Technical writing", "Agent onboarding", "Templates"],
  },
  {
    name: "NovitaAI GTC Promo Video",
    category: "Creative Coding / Launch Content",
    outcome: "Looped at NVIDIA GTC",
    description:
      "Created a NovitaAI promotional video using Remotion and coding-agent workflows, turning product positioning into a conference-ready launch asset shown at NVIDIA GTC.",
    links: [
      {
        label: "X post",
        href: "https://x.com/Agent_Crafter/status/2055624457293893648",
        type: "social",
      },
    ],
    tech: ["Remotion", "Coding agents", "Launch content"],
  },
  {
    name: "AI Inference Service",
    category: "AI Infrastructure",
    outcome: "OpenAI-compatible secure inference",
    description:
      "Built an OpenAI-compatible inference service with sglang, deterministic inference, GPU TEE-protected bare-metal execution, and on-chain usage metering.",
    tech: ["sglang", "GPU TEE", "On-chain metering"],
    featured: true,
  },
  {
    name: "NovitaAI Docs & Blog Operations",
    category: "Developer Experience / Content Systems",
    outcome: "Docs, onboarding, and content operations",
    description:
      "Improved developer journeys across documentation, onboarding, tutorials, and product education, using agent-assisted workflows for technical content creation, editorial review, and distribution.",
    links: [
      {
        label: "Docs",
        href: "https://novita.ai/docs/guides/introduction",
        type: "website",
      },
      {
        label: "Blog",
        href: "https://blogs.novita.ai/",
        type: "website",
      },
    ],
    tech: ["Developer docs", "Onboarding", "Technical content"],
  },
  {
    name: "DevRel Automation Pipeline",
    category: "Growth Automation",
    outcome: "100+ merged PRs / 10+ leads",
    description:
      "Built a GitHub agent outreach system for repository discovery, PR submission, email follow-up, collaboration tracking, and SEO workflows, supporting 100+ merged PRs and 10+ commercial leads.",
    tech: ["Repository discovery", "PR outreach", "SEO agent"],
  },
];

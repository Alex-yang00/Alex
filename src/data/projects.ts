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
    outcome: "500K X impressions",
    description:
      "Owned the outreach, relationship building, provider positioning, and co-marketing launch that made NovitaAI a first-class built-in provider for Hermes Agent, reaching roughly 500K X impressions.",
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
    name: "OpenClaw + Kilo Code ClawShop",
    category: "Live Sessions / Community Workshops",
    outcome: "200+ live viewers each",
    description:
      "Led the OpenClaw AI Session process as NovitaAI DevRel and participated in Kilo Code's ClawShop, turning live developer sessions into public proof for AI agent tooling and community education.",
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
    tech: ["Event hosting", "Workshop support", "AI developer tools"],
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
    category: "Developer Content Systems",
    outcome: "Docs + blog maintenance",
    description:
      "Maintained developer documentation and core blog operations, using agent-assisted workflows to support technical content creation, editorial review, and AI agent developer onboarding.",
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
    tech: ["Developer docs", "Agent workflows", "Editorial review"],
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

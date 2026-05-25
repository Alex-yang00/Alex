export type Project = {
  name: string;
  category: string;
  outcome: string;
  description: string;
  github?: string;
  website?: string;
  tech: string[];
};

export const projects: Project[] = [
  {
    name: "Hermes Agent x NovitaAI",
    category: "Partnership / Provider Integration",
    outcome: "500K X impressions",
    description:
      "Owned the outreach, relationship building, provider positioning, and co-marketing launch that made NovitaAI a first-class built-in provider for Hermes Agent, reaching roughly 500K X impressions.",
    website: "https://hermes-agent.nousresearch.com/docs/integrations/providers",
    tech: ["Partner outreach", "Provider positioning", "Co-marketing"],
  },
  {
    name: "awesome-hermes-tutorial",
    category: "Open-source / Developer Education",
    outcome: "Public repo + live tutorial site",
    description:
      "Built an open-source Hermes Agent tutorial site covering provider configuration, messaging-channel integration, first conversation flow, and practical agent templates.",
    github: "https://github.com/Alex-yang00/awesome-hermes-tutorial",
    website: "https://awesome-hermes-tutorial.vercel.app",
    tech: ["Technical writing", "Agent onboarding", "Templates"],
  },
  {
    name: "AI Inference Service",
    category: "AI Infrastructure",
    outcome: "OpenAI-compatible secure inference",
    description:
      "Built an OpenAI-compatible inference service with sglang, deterministic inference, GPU TEE-protected bare-metal execution, and on-chain usage metering.",
    tech: ["sglang", "GPU TEE", "On-chain metering"],
  },
  {
    name: "DevRel Automation Pipeline",
    category: "Growth Automation",
    outcome: "50+ merged PRs / 10+ leads",
    description:
      "Built a GitHub agent outreach system for repository discovery, PR submission, email follow-up, collaboration tracking, and SEO workflows, supporting 50+ merged PRs and 10+ commercial leads.",
    tech: ["Repository discovery", "PR outreach", "SEO agent"],
  },
];

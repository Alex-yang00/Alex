export type Experience = {
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  bullets?: string[];
  current?: boolean;
  confidential?: boolean;
};

export const experiences: Experience[] = [
  {
    role: "Developer Relations",
    company: "NovitaAI",
    period: "Jan 2026 - Present",
    location: "",
    summary:
      "Developer relations for AI infrastructure and agent-facing developer tools, spanning partnerships, docs, community growth, content systems, and automation workflows.",
    bullets: [
      "Led the Hermes Agent partnership from outreach to co-marketing launch, helping NovitaAI become a first-class built-in provider and reaching roughly 500K X impressions.",
      "Hosted or participated in public AI developer sessions including OpenClaw AI Session and Kilo Code ClawShop, each with 200+ live viewers.",
      "Built DevRel automation supporting 100+ merged PRs and 10+ leads; grew Discord from 3K to 5K and sourced ~$300K in BD resources through developer community marketing.",
    ],
    current: true,
  },
  {
    role: "Core Developer & Developer Relations",
    company: "Apus Network",
    period: "Feb 2025 - Dec 2025",
    location: "GPU TEE / AI Infrastructure",
    summary:
      "Worked across AI infrastructure, confidential GPU deployment, on-chain protocol logic, model fine-tuning, and developer-facing technical communication.",
    bullets: [
      "Built production AI inference services with WASI-NN, llama.cpp, vLLM, and sglang.",
      "Deployed NVIDIA GPU TEE environments on bare-metal systems and delivered secure inference workloads.",
      "Maintained Lua-based on-chain contracts for token and protocol logic while supporting X Spaces, talks, and live-coding workshops.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Samsung Electronics",
    period: "Jul 2023 - Feb 2025",
    location: "Software Engineering",
    summary:
      "Developed TV client applications with C# and .NET, focusing on performance, memory optimization, and AI-agent application collaboration.",
    bullets: [
      "Optimized memory and CPU usage for TV client application workloads.",
      "Collaborated with Baidu on an AI agent chat application involving Baidu Cloud deployment and RAG integration.",
    ],
  },
];

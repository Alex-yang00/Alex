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
      "Lead developer ecosystem growth for AI infrastructure and agent products, spanning BD, partnerships, developer experience, community programs, technical content, and growth automation.",
    bullets: [
      "Own developer ecosystem GTM across BD, partner outreach, integrations, co-marketing, and developer programs - moving opportunities from first contact to launch and qualified pipeline.",
      "Run initiatives across vLLM, SGLang, Nous Research, Hugging Face, OpenClaw, and leading open-source communities through workshops, hackathons, livestreams, and technical outreach.",
      "Improve developer experience across CLI workflows, docs, onboarding, demos, and product feedback loops; built automation supporting 100+ merged PRs and 10+ commercial leads.",
      "Create technical content, developer-facing videos, and launch campaigns; grew X from 2K to 5K and Discord from 3K to 5K, generating 1000K reach and ~$500K in BD resources.",
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

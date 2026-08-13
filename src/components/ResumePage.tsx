import { ArrowLeft, Download, Mail, Printer } from "lucide-react";
import { useMemo, useState } from "react";
import { profile } from "../data/profile";

type ResumeContent = {
  lang: "en" | "zh-CN";
  kicker: string;
  summary: string;
  sectionLabels: {
    impact: string;
    experience: string;
    projects: string;
    skills: string;
    education: string;
  };
  impacts: Array<{ label: string; value: string; detail: string }>;
  experience: Array<{
    role: string;
    company: string;
    period: string;
    bullets: string[];
  }>;
  projects: Array<{
    name: string;
    outcome: string;
    description: string;
  }>;
  skills: string;
  education: string;
  languages: string;
};

const english: ResumeContent = {
  lang: "en",
  kicker: "Developer Relations / AI Infrastructure",
  summary:
    "I lead developer ecosystem growth for AI products across BD, partnerships, developer experience, community programs, and technical content - turning infrastructure into adoption and qualified pipeline.",
  sectionLabels: {
    impact: "Selected Impact",
    experience: "Experience",
    projects: "Selected Projects",
    skills: "Core Skills",
    education: "Education & Languages",
  },
  impacts: [
    { label: "Ecosystem reach", value: "1000K", detail: "partner and launch campaigns" },
    { label: "Open-source", value: "100+", detail: "merged outreach PRs" },
    { label: "Community", value: "X 2K → 5K", detail: "plus Discord 3K → 5K" },
    { label: "Events", value: "200+", detail: "live viewers per session" },
    { label: "BD resources", value: "~$500K", detail: "sourced through ecosystem growth" },
  ],
  experience: [
    {
      role: "Developer Relations",
      company: "NovitaAI",
      period: "Jan 2026 - Present",
      bullets: [
        "Own developer ecosystem GTM across BD, outreach, partnerships, co-marketing, and developer programs - moving opportunities from first contact to integration, launch, and qualified pipeline.",
        "Run ecosystem initiatives across vLLM, SGLang, Nous Research, Hugging Face, OpenClaw, and leading open-source communities through workshops, hackathons, livestreams, and technical outreach.",
        "Improve developer experience across CLI workflows, docs, onboarding, demos, and feedback loops; built automation supporting 100+ merged PRs and 10+ commercial leads.",
        "Create technical content, product videos, and launch campaigns; grew X from 2K to 5K and Discord from 3K to 5K, generating 1000K reach and ~$500K in BD resources.",
      ],
    },
    {
      role: "Core Developer & Developer Relations",
      company: "Apus Network",
      period: "Feb 2025 - Dec 2025",
      bullets: [
        "Built AI inference services with WASI-NN, llama.cpp, vLLM, and sglang; deployed confidential workloads on NVIDIA GPU TEE.",
        "Maintained Lua on-chain protocol logic and supported technical talks, X Spaces, and live-coding workshops.",
      ],
    },
    {
      role: "Software Engineer",
      company: "Samsung Electronics",
      period: "Jul 2023 - Feb 2025",
      bullets: [
        "Developed C#/.NET TV applications, improving runtime performance, CPU use, and memory efficiency.",
        "Collaborated with Baidu on an AI chat application using cloud deployment and RAG.",
      ],
    },
  ],
  projects: [
    {
      name: "Nous Research (Hermes Agent)",
      outcome: "Full-cycle / 1000K reach",
      description: "Owned outreach, provider positioning, launch coordination, co-marketing, and BD follow-up.",
    },
    {
      name: "OpenClaw Community Workshops",
      outcome: "Foundation relationship / Joint programs",
      description: "Established ties with the OpenClaw Foundation and co-hosted community workshops, connecting developer education with ecosystem trust and BD opportunities.",
    },
    {
      name: "AI Inference Service",
      outcome: "Secure inference",
      description: "OpenAI-compatible sglang service with deterministic inference, GPU TEE, and on-chain metering.",
    },
    {
      name: "awesome-hermes-tutorial",
      outcome: "Open-source education",
      description: "Practical tutorials for provider setup, messaging integration, and reusable agent templates.",
    },
  ],
  skills: "BD & Partnerships / Developer Programs / Developer Experience / Technical Content / Python / Rust / C++ / vLLM / SGLang / GPU TEE",
  education: "Hanyang University - Software Engineering, 2019-2023; full scholarship, GPA 3.4",
  languages: "Chinese (native) / English (IELTS 6.5) / Korean (TOPIK 5)",
};

const chinese: ResumeContent = {
  lang: "zh-CN",
  kicker: "开发者关系 / AI 基础设施",
  summary:
    "负责 AI 产品的开发者生态增长，覆盖 BD、合作伙伴、开发者体验、社区项目与技术内容，将基础设施能力转化为产品采用和有效商业管线。",
  sectionLabels: {
    impact: "核心成果",
    experience: "工作经历",
    projects: "代表项目",
    skills: "核心能力",
    education: "教育与语言",
  },
  impacts: [
    { label: "生态传播", value: "1000K", detail: "合作与发布活动曝光" },
    { label: "开源拓展", value: "100+", detail: "合并的外联 PR" },
    { label: "社区增长", value: "X 2K → 5K", detail: "Discord 3K → 5K" },
    { label: "开发者活动", value: "200+", detail: "单场直播观众" },
    { label: "BD 资源", value: "~$500K", detail: "生态增长带来" },
  ],
  experience: [
    {
      role: "开发者关系",
      company: "NovitaAI",
      period: "2026.01 - 至今",
      bullets: [
        "负责开发者生态 GTM，覆盖 BD、outreach、合作伙伴、联合营销与开发者项目，推动机会从首次接触走向集成、发布和有效商业管线。",
        "围绕 vLLM、SGLang、Nous Research、Hugging Face、OpenClaw 及头部开源社区开展技术外联、workshop、黑客松与直播。",
        "优化 CLI、文档、开发者 onboarding、Demo 与反馈闭环；搭建自动化流程，促成 100+ PR 合并及 10+ 商业线索。",
        "制作技术内容、产品视频与发布活动；推动 X 从 2K 增长至 5K、Discord 从 3K 增长至 5K，获得 100 万曝光及约 50 万美元 BD 资源。",
      ],
    },
    {
      role: "核心开发者与开发者关系",
      company: "Apus Network",
      period: "2025.02 - 2025.12",
      bullets: [
        "使用 WASI-NN、llama.cpp、vLLM 和 sglang 构建推理服务，并在 NVIDIA GPU TEE 部署机密计算负载。",
        "维护 Lua 链上协议逻辑，并参与技术演讲、X Space 与现场编程活动。",
      ],
    },
    {
      role: "软件工程师",
      company: "Samsung Electronics",
      period: "2023.07 - 2025.02",
      bullets: [
        "开发 C#/.NET 电视端应用，优化运行性能、CPU 占用和内存效率。",
        "与百度协作开发 AI 对话应用，涉及云端部署与 RAG 集成。",
      ],
    },
  ],
  projects: [
    {
      name: "Nous Research (Hermes Agent)",
      outcome: "全链路合作 / 100 万曝光",
      description: "负责 outreach、供应商定位、发布协调、联合营销与 BD 跟进。",
    },
    {
      name: "OpenClaw 社区联合 Workshop",
      outcome: "基金会联系 / 联合活动",
      description: "与 OpenClaw 基金会建立合作联系，联合社区策划并举办 workshop，将开发者教育转化为生态信任与 BD 机会。",
    },
    {
      name: "AI 推理服务",
      outcome: "安全推理",
      description: "基于 sglang 构建 OpenAI 兼容服务，支持确定性推理、GPU TEE 与链上计量。",
    },
    {
      name: "awesome-hermes-tutorial",
      outcome: "开源开发者教育",
      description: "提供模型供应商配置、消息渠道接入和智能体模板实战教程。",
    },
  ],
  skills: "BD 与生态合作 / 开发者运营 / 开发者体验 / 技术内容 / Python / Rust / C++ / vLLM / SGLang / GPU TEE",
  education: "汉阳大学 - 软件工程，2019-2023；全额奖学金，GPA 3.4",
  languages: "中文（母语）/ 英语（IELTS 6.5）/ 韩语（TOPIK 5）",
};

type ResumeLanguage = "en" | "zh";

const resumeByLanguage: Record<ResumeLanguage, ResumeContent> = {
  en: english,
  zh: chinese,
};

function ResumeSheet({ content }: { content: ResumeContent }) {
  return (
    <article className="resume-page" lang={content.lang}>
      <header className="resume-hero">
        <div>
          <p className="resume-kicker">{content.kicker}</p>
          <div className="resume-name" lang="en" role="heading" aria-level={1}>
            {profile.name}
          </div>
          <p>{content.summary}</p>
        </div>
        <div className="resume-contact">
          <a href={`mailto:${profile.email}`}>
            <Mail aria-hidden="true" />
            {content.lang === "zh-CN" ? `邮箱：${profile.email}` : profile.email}
          </a>
          <a href={profile.socials.github}>
            {content.lang === "zh-CN" ? "GitHub：Alex-yang00" : "github.com/Alex-yang00"}
          </a>
          <a href={profile.socials.x}>
            {content.lang === "zh-CN" ? "X：Agent_Crafter" : "x.com/Agent_Crafter"}
          </a>
        </div>
      </header>

      <section className="resume-section resume-impact-section">
        <h2>{content.sectionLabels.impact}</h2>
        <div className="resume-impact-grid">
          {content.impacts.map((item) => (
            <div key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="resume-section">
        <h2>{content.sectionLabels.experience}</h2>
        <div className="resume-list">
          {content.experience.map((item) => (
            <section key={`${content.lang}-${item.company}`} className="resume-item">
              <div className="resume-item-head">
                <h3>
                  {item.role} <span>· {item.company}</span>
                </h3>
                <time>{item.period}</time>
              </div>
              <ul>
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <section className="resume-section">
        <h2>{content.sectionLabels.projects}</h2>
        <div className="resume-projects">
          {content.projects.map((project) => (
            <section key={`${content.lang}-${project.name}`}>
              <div>
                <h3>{project.name}</h3>
                <span>{project.outcome}</span>
              </div>
              <p>{project.description}</p>
            </section>
          ))}
        </div>
      </section>

      <section className="resume-section resume-footer-grid">
        <div>
          <h2>{content.sectionLabels.skills}</h2>
          <p>{content.skills}</p>
        </div>
        <div>
          <h2>{content.sectionLabels.education}</h2>
          <p>{content.education}</p>
          <p>{content.languages}</p>
        </div>
      </section>

      <footer className="resume-page-number">
        <span>{content.lang === "zh-CN" ? "个人简历" : "Curriculum Vitae"}</span>
        <span>Alex YANG · 2026</span>
      </footer>
    </article>
  );
}

export function ResumePage() {
  const isCombined = useMemo(() => new URLSearchParams(window.location.search).get("mode") === "all", []);
  const initialLanguage = useMemo<ResumeLanguage>(() => {
    const language = new URLSearchParams(window.location.search).get("lang");
    return language === "zh" ? "zh" : "en";
  }, []);
  const [language, setLanguage] = useState<ResumeLanguage>(initialLanguage);
  const content = resumeByLanguage[language];
  const sheets = isCombined ? [english, chinese] : [content];

  const selectLanguage = (nextLanguage: ResumeLanguage) => {
    setLanguage(nextLanguage);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", nextLanguage);
    window.history.replaceState({}, "", url);
  };

  return (
    <>
      <div className="background" aria-hidden="true" />
      <main className="resume-shell">
        <header className="resume-top">
          <a href="/" className="resume-back">
            <ArrowLeft aria-hidden="true" />
            {language === "zh" ? "返回" : "Back"}
          </a>
          <div className="resume-actions">
            <div className="resume-language" aria-label="Resume language">
              <button
                type="button"
                className={language === "en" ? "is-active" : undefined}
                onClick={() => selectLanguage("en")}
              >
                English
              </button>
              <button
                type="button"
                className={language === "zh" ? "is-active" : undefined}
                onClick={() => selectLanguage("zh")}
              >
                中文
              </button>
            </div>
            <a
              className="resume-download"
              href="/resume.pdf"
              download
            >
              <Download aria-hidden="true" />
              {language === "zh" ? "下载 PDF" : "Download PDF"}
            </a>
            <button type="button" className="resume-print" onClick={() => window.print()}>
              <Printer aria-hidden="true" />
              {language === "zh" ? "打印" : "Print"}
            </button>
          </div>
        </header>

        <div className="resume-document">
          {sheets.map((sheet) => (
            <ResumeSheet key={sheet.lang} content={sheet} />
          ))}
        </div>
      </main>
    </>
  );
}

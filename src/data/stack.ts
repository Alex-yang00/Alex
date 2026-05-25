export type StackItem = {
  label: string;
  src: string;
  invert?: boolean;
};

export const stackItems: StackItem[] = [
  { label: "C++", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { label: "Python", src: "https://siddz.com/icons/tech/python.svg" },
  { label: "Rust", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg", invert: true },
  { label: "C#", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
  { label: "Solidity", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg", invert: true },
  { label: "Lua", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-original.svg" },
  { label: "Linux", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { label: "Docker", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { label: "Git", src: "https://siddz.com/icons/tech/git.svg" },
  { label: "Ray", src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/ray.svg" },
  { label: "NVIDIA", src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/nvidia.svg" },
  { label: "vLLM", src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/openai.svg", invert: true },
  { label: "sglang", src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/python.svg" },
  { label: "llama.cpp", src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/meta.svg", invert: true },
  { label: "WASI-NN", src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/webassembly.svg" },
  { label: "Arweave", src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/web3dotjs.svg", invert: true },
  { label: "Remotion", src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/react.svg" },
  { label: "SEO", src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googlesearchconsole.svg" },
  { label: "Discord", src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/discord.svg" },
  { label: "X", src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg", invert: true },
];

export const iconByLabel = new Map(stackItems.map((item) => [item.label, item]));

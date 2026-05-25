import type { ReactNode } from "react";

type SectionProps = {
  title: string;
  id?: string;
  children: ReactNode;
};

export function Section({ title, id, children }: SectionProps) {
  return (
    <section className="section reveal" id={id}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

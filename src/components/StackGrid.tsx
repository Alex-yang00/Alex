import { stackItems } from "../data/stack";

export function StackGrid() {
  return (
    <div className="stack">
      {stackItems.map((item) => (
        <span className="tech" data-label={item.label} key={item.label}>
          <img src={item.src} alt={item.label} className={item.invert ? "invert" : undefined} />
        </span>
      ))}
    </div>
  );
}

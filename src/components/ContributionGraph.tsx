import { useEffect, useMemo, useState } from "react";

const months = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];
const levels = [0, 0, 0, 1, 0, 2, 1, 3, 0, 1, 4, 2, 0, 3, 1, 2, 4, 0, 1, 3, 2];
const githubUrl = "https://github.com/Alex-yang00";
const githubHandle = "@Alex-yang00";

type ContributionDay = {
  id: string;
  date?: string;
  count: number;
  level: number;
  title: string;
};

type ContributionResponse = {
  source: "github";
  months: Array<{ name: string; totalWeeks: number }>;
  days: Array<{ date: string; count: number; level: number }>;
};

function getContributionLevel(week: number, day: number) {
  const wave = Math.sin((week + 1) * 0.55) + Math.cos((day + 2) * 1.35);
  let level = levels[(week * 7 + day * 3) % levels.length];

  if (week > 8 && week < 18 && day > 1) level = Math.max(level, wave > 0.2 ? 2 : 1);
  if (week > 28 && week < 38 && day !== 0) level = Math.max(level, wave > -0.4 ? 3 : 1);
  if (week > 43 && week < 50 && day > 2) level = Math.max(level, wave > -0.7 ? 4 : 2);
  if ((week + day) % 11 === 0) level = 0;

  return level;
}

function getMockDays(): ContributionDay[] {
  return Array.from({ length: 53 * 7 }, (_, index) => {
    const week = Math.floor(index / 7);
    const day = index % 7;
    const level = getContributionLevel(week, day);
    const count = level * 3 + ((week + day) % 3);

    return {
      id: `${week}-${day}`,
      count,
      level,
      title: `${count} contributions`,
    };
  });
}

function formatContributionTitle(day: ContributionDay) {
  const label = day.count === 1 ? "contribution" : "contributions";
  return day.date ? `${day.date}: ${day.count} ${label}` : `${day.count} ${label}`;
}

export function ContributionGraph() {
  const fallbackDays = useMemo(() => getMockDays(), []);
  const [days, setDays] = useState<ContributionDay[]>(fallbackDays);
  const [monthLabels, setMonthLabels] = useState(months);
  const [source, setSource] = useState<"mock" | "github">("mock");
  const weekCount = Math.ceil(days.length / 7);

  useEffect(() => {
    const controller = new AbortController();

    async function loadContributions() {
      try {
        const response = await fetch("/api/github-contributions", {
          signal: controller.signal,
        });

        if (!response.ok) return;

        const payload = (await response.json()) as ContributionResponse;

        if (!Array.isArray(payload.days) || payload.days.length === 0) return;

        setDays(payload.days.map((day) => ({
          id: day.date,
          date: day.date,
          count: day.count,
          level: day.level,
          title: `${day.count} contributions`,
        })));
        setMonthLabels(payload.months.map((month) => month.name.slice(0, 3)));
        setSource("github");
      } catch (error) {
        if (!controller.signal.aborted) {
          setSource("mock");
        }
      }
    }

    loadContributions();

    return () => controller.abort();
  }, []);

  return (
    <section className="contrib-card reveal" aria-label="GitHub contributions for Alex-yang00">
      <div className="contrib-head">
        <p>
          GitHub activity in the last year
          <span>{source === "github" ? "Live" : "Preview"}</span>
        </p>
        <a href={githubUrl} target="_blank" rel="noreferrer">
          {githubHandle}
        </a>
      </div>

      <div className="months" style={{ gridTemplateColumns: `repeat(${monthLabels.length}, 1fr)` }}>
        {monthLabels.map((month, index) => (
          <span key={`${month}-${index}`}>{month}</span>
        ))}
      </div>

      <div className="heatmap" style={{ gridTemplateColumns: `repeat(${weekCount}, 10px)` }}>
        {days.map((day) => (
          <span key={day.id} className="day" data-level={day.level} title={formatContributionTitle(day)} />
        ))}
      </div>

      <div className="legend">
        <span>Less</span>
        <i />
        <i />
        <i />
        <i />
        <i />
        <span>More</span>
      </div>
    </section>
  );
}

const months = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];
const levels = [0, 0, 0, 1, 0, 2, 1, 3, 0, 1, 4, 2, 0, 3, 1, 2, 4, 0, 1, 3, 2];
const githubUrl = "https://github.com/Alex-yang00";
const githubHandle = "@Alex-yang00";

function getContributionLevel(week: number, day: number) {
  const wave = Math.sin((week + 1) * 0.55) + Math.cos((day + 2) * 1.35);
  let level = levels[(week * 7 + day * 3) % levels.length];

  if (week > 8 && week < 18 && day > 1) level = Math.max(level, wave > 0.2 ? 2 : 1);
  if (week > 28 && week < 38 && day !== 0) level = Math.max(level, wave > -0.4 ? 3 : 1);
  if (week > 43 && week < 50 && day > 2) level = Math.max(level, wave > -0.7 ? 4 : 2);
  if ((week + day) % 11 === 0) level = 0;

  return level;
}

export function ContributionGraph() {
  const days = Array.from({ length: 53 * 7 }, (_, index) => {
    const week = Math.floor(index / 7);
    const day = index % 7;
    const level = getContributionLevel(week, day);

    return {
      id: `${week}-${day}`,
      level,
      title: `${level * 3 + ((week + day) % 3)} contributions`,
    };
  });

  return (
    <section className="contrib-card reveal" aria-label="GitHub contributions for Alex-yang00">
      <div className="contrib-head">
        <p>GitHub activity in the last year</p>
        <a href={githubUrl} target="_blank" rel="noreferrer">
          {githubHandle}
        </a>
      </div>

      <div className="months">
        {months.map((month) => (
          <span key={month}>{month}</span>
        ))}
      </div>

      <div className="heatmap">
        {days.map((day) => (
          <span key={day.id} className="day" data-level={day.level} title={day.title} />
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

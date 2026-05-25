const githubUsername = "Alex-yang00";

const query = `
  query UserContributions($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          months {
            name
            totalWeeks
          }
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

function getLevel(count: number, max: number) {
  if (count === 0 || max === 0) return 0;
  const ratio = count / max;

  if (ratio >= 0.72) return 4;
  if (ratio >= 0.44) return 3;
  if (ratio >= 0.18) return 2;
  return 1;
}

export default async function handler(request: any, response: any) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return response.status(503).json({ error: "Missing GITHUB_TOKEN" });
  }

  try {
    const githubResponse = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "alex-yang-portfolio",
      },
      body: JSON.stringify({
        query,
        variables: { login: githubUsername },
      }),
    });

    const payload = await githubResponse.json();

    if (!githubResponse.ok || payload.errors?.length) {
      return response.status(502).json({
        error: "GitHub GraphQL request failed",
      });
    }

    const calendar = payload.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      return response.status(404).json({ error: "GitHub contribution calendar not found" });
    }

    const flatDays = calendar.weeks.flatMap((week: any) => week.contributionDays);
    const maxCount = flatDays.reduce((max: number, day: any) => Math.max(max, day.contributionCount), 0);

    response.setHeader("Cache-Control", "s-maxage=21600, stale-while-revalidate=86400");

    return response.status(200).json({
      source: "github",
      username: githubUsername,
      months: calendar.months,
      days: flatDays.map((day: any) => ({
        date: day.date,
        count: day.contributionCount,
        level: getLevel(day.contributionCount, maxCount),
      })),
    });
  } catch {
    return response.status(500).json({ error: "Unable to load GitHub contributions" });
  }
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

  const { username, y } = req.query;
  if (!username) return res.status(400).json({ error: 'Missing username' });

  const token = process.env.GITHUB_TOKEN;
  if (!token) return res.status(500).json({ error: 'GITHUB_TOKEN not configured' });

  const year = parseInt(y) || new Date().getFullYear();
  const from = `${year}-01-01T00:00:00Z`;
  const to   = `${year}-12-31T23:59:59Z`;

  const query = `
    query($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  try {
    const resp = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'portfolio-contributions-proxy',
      },
      body: JSON.stringify({ query, variables: { login: username, from, to } }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return res.status(resp.status).json({ error: `GitHub API error: ${resp.status}`, detail: text });
    }

    const json = await resp.json();
    if (json.errors) return res.status(400).json({ error: json.errors[0].message });

    const calendar = json.data.user.contributionsCollection.contributionCalendar;
    const total = calendar.totalContributions;

    const levelMap = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 };
    const contributions = calendar.weeks.flatMap(w =>
      w.contributionDays.map(d => ({
        date: d.date,
        count: d.contributionCount,
        level: levelMap[d.contributionLevel] ?? 0,
      }))
    );

    return res.status(200).json({ total: { [year]: total }, contributions });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

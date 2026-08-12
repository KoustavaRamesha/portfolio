module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

  const { username, y } = req.query;
  if (!username) return res.status(400).json({ error: 'Missing username' });

  const year = parseInt(y) || new Date().getFullYear();

  // 1. Try GitHub GraphQL API if token is provided
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    try {
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
      const resp = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'User-Agent': 'portfolio-contributions-proxy',
        },
        body: JSON.stringify({ query, variables: { login: username, from, to } }),
      });

      if (resp.ok) {
        const json = await resp.json();
        if (!json.errors && json.data && json.data.user) {
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
        }
      }
    } catch (e) {
      // Fall through to public HTML scraper
    }
  }

  // 2. Fallback: Fetch public GitHub profile HTML (no token required)
  try {
    const url = `https://github.com/users/${encodeURIComponent(username)}/contributions?from=${year}-01-01&to=${year}-12-31`;
    const resp = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (!resp.ok) throw new Error(`GitHub HTML return status ${resp.status}`);

    const html = await resp.text();

    const totalMatch = html.match(/([\d,]+)\s+contributions/i);
    const total = totalMatch ? parseInt(totalMatch[1].replace(/,/g, ''), 10) : 0;

    const dayRegex = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d)"|data-level="(\d)"[^>]*data-date="(\d{4}-\d{2}-\d{2})"/g;
    const contributionsMap = new Map();
    let match;

    while ((match = dayRegex.exec(html)) !== null) {
      const date = match[1] || match[4];
      const level = parseInt(match[2] || match[3] || '0', 10);
      if (date && date.startsWith(String(year))) {
        contributionsMap.set(date, { date, count: level > 0 ? level : 0, level });
      }
    }

    const contributions = Array.from(contributionsMap.values()).sort((a, b) => a.date.localeCompare(b.date));

    return res.status(200).json({ total: { [year]: total }, contributions });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

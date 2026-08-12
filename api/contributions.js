export default async function handler(req, res) {
  const { username, y } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Missing username' });
  }

  try {
    const url = `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}${y ? `?y=${y}` : ''}`;
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Upstream error' });
    }

    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch contributions' });
  }
}

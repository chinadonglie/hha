async function getInstagramLink(username) {
  const res = await fetch(
    `https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "X-IG-App-ID": "936619743392459",
        "X-Requested-With": "XMLHttpRequest",
        Referer: `https://www.instagram.com/${username}/`,
      },
    }
  );

  if (!res.ok) throw new Error(`Failed to fetch profile: HTTP ${res.status}`);

  const json = await res.json();
  const externalUrl = json?.data?.user?.external_url;

  return externalUrl || null;
}

module.exports = { getInstagramLink };

const BASE_URL = "https://api.openf1.org/v1";

export async function getMeetings(year = 2023) {
  try {
    const res = await fetch(`${BASE_URL}/meetings?year=${year}`);
    if (!res.ok) throw new Error("Failed to fetch meetings");
    return await res.json();
  } catch (err) {
    console.error("OpenF1 API error:", err);
    return [];
  }
}
import { getStore } from "@netlify/blobs";

const json = (data, status = 200) =>
  Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store" }
  });

export default async (request) => {
  try {
    const store = getStore({
      name: "idle-friends-leaderboard",
      region: "eu-central-1"
    });

    if (request.method === "GET") {
      const { blobs } = await store.list({ prefix: "players/" });
      const players = await Promise.all(
        blobs.map(async (blob) => {
          try {
            return await store.get(blob.key, { type: "json" });
          } catch {
            return null;
          }
        })
      );

      return json({
        leaderboard: players
          .filter(Boolean)
          .sort((a, b) => (b.rebirths || 0) - (a.rebirths || 0))
          .slice(0, 10)
      });
    }

    if (request.method === "POST") {
      const player = await request.json();
      const name = String(player.name || "").trim().slice(0, 24);

      if (!name) {
        return json({ error: "Name fehlt" }, 400);
      }

      const record = {
        name,
        rebirths: Math.max(0, Math.floor(Number(player.rebirths) || 0)),
        bestFriend: player.bestFriend || null
      };

      await store.setJSON(
        "players/" + encodeURIComponent(name.toLowerCase()),
        record
      );

      return json({ ok: true });
    }

    return json({ error: "Method not allowed" }, 405);
  } catch {
    return json({ error: "Serverfehler" }, 500);
  }
};

export const config = { path: "/api/leaderboard" };

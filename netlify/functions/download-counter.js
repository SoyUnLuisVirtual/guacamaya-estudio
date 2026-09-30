import { getStore } from "@netlify/blobs";

export default async (req, context) => {
  const store = getStore("app-stats");
  const key = "download-count";

  let currentCount = parseInt(await store.get(key) || "0", 10);

  if (req.method === "POST") {
    currentCount += 1;
    await store.set(key, currentCount.toString());
  }

  return new Response(JSON.stringify({ total: currentCount }), {
    headers: { 
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
  });
};

import { getStore } from "@netlify/blobs";

export default async (req, context) => {
  // Conectamos a un almacén (store) llamado 'app-stats'
  const store = getStore("app-stats");
  const key = "download-count";

  // Obtenemos el valor actual (si no existe, empieza en 0)
  let currentCount = parseInt(await store.get(key) || "0", 10);

  // Si la petición es POST, incrementamos el contador
  if (req.method === "POST") {
    currentCount += 1;
    await store.set(key, currentCount.toString());
  }

  // Devolvemos el total en formato JSON
  return new Response(JSON.stringify({ total: currentCount }), {
    headers: { "Content-Type": "application/json" },
  });
};  
import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { houses } from "./mock-data";

let db = {
  houses,
};

const app = new Hono();
app.use("/*", serveStatic({ root: "./public" }));

app.use(logger());
app.use("/api/*", cors());

app.get("/api/houses", (context) => {
  return context.json(db.houses);
});

app.get("/api/houses/:id", (context) => {
  const house = db.houses.find((h) => h.id === context.req.param("id"));
  if (!house) {
    return context.json({ error: "House not found" }, 404);
  }
  return context.json(house);
});

app.patch("/api/houses/:id", async (context) => {
  const id = context.req.param("id");
  const house = db.houses.find((h) => h.id === id);
  if (!house) {
    return context.json({ error: "House not found" }, 404);
  }
  
  const updateData = await context.req.json();
  // Update the house with the new data (for booking status)
  Object.assign(house, updateData);
  
  return context.body(null, 204);
});

serve({ fetch: app.fetch, port: 3001 }, (info) => {
  console.log(`API running on ${info.port}`);
});

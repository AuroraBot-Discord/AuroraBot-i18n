const express = require("express");
const app = express();
const fs = require("fs").promises

app.get("/", (req, res) => res.send("Server Working"));

app.get("/data/:language", async (req, res) => {
  let dir = await fs.readdir("locales");
  dir = dir.filter(file => file.endsWith(".json"));
  const code = req.params.language;
  const f = dir.find(file => file.replace(/\.json$/, "") === code);
  if (!f) return res.sendStatus(404);
  const file = await fs.readFile(`locales/${code}.json`, "utf8");
  return res.send(JSON.parse(file));
})

app.listen(8080, () => console.log("Server Started"));
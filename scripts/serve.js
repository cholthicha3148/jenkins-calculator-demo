import { createServer } from "node:http";
import { access, readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const distRoot = join(process.cwd(), "dist");
const publicRoot = join(process.cwd(), "public");
const root = await access(distRoot).then(() => distRoot).catch(() => publicRoot);
const port = Number(process.env.PORT || 3000);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8"
};

createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", `http://localhost:${port}`);
    const requested = url.pathname === "/" ? "/index.html" : url.pathname;
    const filePath = normalize(join(root, requested));

    if (!filePath.startsWith(root)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    const body = await readFile(filePath);
    response.writeHead(200, { "Content-Type": types[extname(filePath)] || "text/plain; charset=utf-8" });
    response.end(body);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
}).listen(port, () => {
  console.log(`Local server: http://localhost:${port}`);
});

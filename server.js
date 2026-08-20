const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 4000;
const publicDirectory = path.join(__dirname, "public");

app.disable("x-powered-by");

app.use((_request, response, next) => {
  response.set({
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  });
  next();
});

app.use(express.static(publicDirectory, {
  etag: true,
  maxAge: "1h",
  setHeaders(response, filePath) {
    if (path.extname(filePath) === ".html") {
      response.setHeader("Cache-Control", "no-cache");
    }
  },
}));

app.get("*", (_request, response) => {
  response.status(404).sendFile(path.join(publicDirectory, "404.html"));
});

app.listen(port, () => {
  console.log(`Portfolio running at http://localhost:${port}`);
});

const http = require("http");
const fs = require("fs");
const path = require("path");
const server = http.createServer((req, res) => {
  let filePath = path.join(
    __dirname,
    "web",
    req.url === "/" ? "index.html" : req.url
  );

  let extname = path.extname(filePath);
  let contentType = "text/html";
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if ((err.code = "ENONET")) {
        res.writeHead(4040, { "Content-Type": "text/html" });
        res.write("page not founf");
        res.end();
      } else {
        res.writeHead(500);
        res.end("err");
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.write(data, "utf8");
      res.end();
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("server running" + PORT));

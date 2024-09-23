const express = require("express");
const path = require("path");

const app = express();
const port = 3333;

const http = require("http");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "404.html"));
});

http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/upload') {
    let fileData = '';
    req.on('data', chunk => {
      fileData += chunk.toString();
    });
    req.on('end', () => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end('Upload simulado com sucesso!');
    });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Rota não encontrada');
  }
});

app.listen(port, () => {
  console.log(` - Running (locally): http://localhost:${port}`);
});
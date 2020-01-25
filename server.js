const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.url.match(/\.mjs$/)) {
    res.setHeader('Content-Type', 'application/javascript');
  }

  try {
    console.log(req.url);

    const filePath = req.url === '/' ? './index.html' : `.${req.url}`;
    const file = fs.readFileSync(filePath);

    res.write(file);
  } catch (err) {
    console.error(err);
  }

  res.end();
});

server.listen(3000);

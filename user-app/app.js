// app.js
const http = require('http');
const fs = require('fs');
const path = require('path');
const userRoutes = require('./routes/userRoutes');

// 정적 파일 서빙 함수
const serveStatic = (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  let pathname = `.${parsedUrl.pathname}`;

  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml'
  };

  fs.exists(pathname, function (exist) {
    if(!exist) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not Found');
      return;
    }

    if (fs.statSync(pathname).isDirectory()) {
      pathname += '/users.html';
    }

    const ext = path.parse(pathname).ext;
    res.setHeader('Content-Type', mimeTypes[ext] || 'text/plain');

    fs.readFile(pathname, function(err, data){
      if(err){
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
      } else {
        res.writeHead(200);
        res.end(data);
      }
    });
  });
};

// 서버 생성
const server = http.createServer((req, res) => {
  // 정적 파일 요청 처리
  if (req.url.startsWith('/css/') && req.method === 'GET') {
    serveStatic(req, res);
  } else {
    // 라우팅 처리
    userRoutes(req, res);
  }
});

// 서버 시작
const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
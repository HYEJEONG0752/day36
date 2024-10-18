//Node.js로 웹 서버 만들기(CommonJS)

// 파일명: simpleServer.js
const http = require('http');

const server = http.createServer((req, res) => {
    res.statusCode = 200;   // 상태 코드를 200으로 설정(성공)
    res.setHeader('Content-Type', 'text/plain');    // 응답 헤더 설정
    res.end('Hello World\n');   // 클라이언트에서 응답
});

const port = 3000;

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
const http = require('http');

const server = http.createServer((req, res) => {
    res.stratusCode = 200;

    res.setHeader('Content-Type', 'text/plain');

    if (req.url === '/about') {
        res.end('About Page');
    } else if (req.url === '/contact') {
        res.end('Contact Page');
    } else {
        res.end('Hello, World!');
    }
});

const port = 3000;

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
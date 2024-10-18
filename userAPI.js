// 파일명: userAPI.js
const http = require('http');

// 사용자 데이터
const users = [
    { id: 1, name: '김미래' },
    { id: 2, name: '이과거' }
];

// 서버 생성
const server = http.createServer((req, res) => {
    const { method, url } = req;

    // CORS 설정
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (method === 'OPTIONS') {
    res.writeHead(204);
    
    res.end();
    
    return;
    }

    if (url === '/users' && method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(users));
    } else if (url === '/users' && method === 'POST') {
        let body = '';
    
        req.on('data', chunk => {
            body += chunk.toString();
        });
    
        req.on('end', () => {
        const newUser = JSON.parse(body);
        newUser.id = users.length + 1;


        users.push(newUser);

        res.statusCode = 201;
        
        res.setHeader('Content-Type', 'application/json');
        
        res.end(JSON.stringify(newUser));
    });
    } else if (url.startsWith('/users/') && method === 'PUT') {
    const id = parseInt(url.split('/')[2]);
    
    let body = '';
    
    req.on('data', chunk => {
        body += chunk.toString();
    });
    
    req.on('end', () => {
    const updatedUser = JSON.parse(body);

    users = users.map(user => (user.id === id ? { ...user, ...updatedUser } : user));
    res.statusCode = 200;
    
    res.setHeader('Content-Type', 'application/json');

    res.end(JSON.stringify(updatedUser));
    });
    } else if (url.startsWith('/users/') && method === 'DELETE') {
    const id = parseInt(url.split('/')[2]);
    
    users = users.filter(user => user.id !== id);
    
    res.statusCode = 204;
    
    res.end();
    } else {
    res.statusCode = 404;
    
    res.end('Not Found');
    }
});

const port = 3000;

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
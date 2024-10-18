// routes/postRoutes.js
const url = require('url');
const querystring = require('querystring');
const postController = require('../controllers/postController');

const postRoutes = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    // 게시물 목록 조회
    if (pathname === '/' && method === 'GET') {
        postController.listPosts(req, res);
    }
    // 특정 게시물 조회
    else if (pathname.startsWith('/posts/') && method === 'GET') {
        const id = parseInt(pathname.split('/')[2]);
        postController.viewPost(req, res, id);
    }
    // 새로운 게시물 추가
    else if (pathname === '/posts' && method === 'POST') {
        postController.createPost(req, res);
    }
    // 게시물 수정
    else if (pathname.startsWith('/posts/') && method === 'POST') {
        const id = parseInt(pathname.split('/')[2]);
        postController.updatePost(req, res, id);
    }
    // 게시물 삭제
    else if (pathname.startsWith('/posts/') && pathname.endsWith('/delete') && method === 'POST') {
        const id = parseInt(pathname.split('/')[2]);
        postController.deletePost(req, res, id);
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
    }
    };

module.exports = postRoutes;
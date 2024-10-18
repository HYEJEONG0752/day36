// controllers/postController.js
const fs = require('fs');
const path = require('path');
const postModel = require('../models/postModel');

const listPosts = (req, res) => {
    const posts = postModel.getAllPosts();
    const filePath = path.join(__dirname, '../views/index.html');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Internal Server Error');
            
            return;
        }

        let postList = '';
        posts.forEach(post => {
        postList += `<li>
                        <a href="/posts/${post.id}">${post.title}</a>
                        <form action="/posts/${post.id}/delete" method="POST" style="display:inline;">
                            <button type="submit">삭제</button>
                        </form>
                    </li>`;
        });

        const modifiedData = data.replace('{{postList}}', postList);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(modifiedData);
    });
};

const viewPost = (req, res, id) => {
    const post = postModel.getPostById(id);
    if (post) {
    const filePath = path.join(__dirname, '../views/post.html');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Internal Server Error');
            
            return;
        }

        let modifiedData = data.replace('{{title}}', post.title)
                            .replace('{{content}}', post.content)
                            .replace('{{id}}', post.id);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(modifiedData);
    });
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('게시물을 찾을 수 없습니다.');
    }
};

const createPost = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const parsedBody = new URLSearchParams(body);
        const title = parsedBody.get('title');
        const content = parsedBody.get('content');
        
        if (title && content) {
            postModel.addPost({ title, content });
            res.writeHead(302, { 'Location': '/' });
            res.end();
        } else {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end('Bad Request: Title and Content are required');
        }
    });
};

const updatePost = (req, res, id) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
    const parsedBody = new URLSearchParams(body);
    const title = parsedBody.get('title');
    const content = parsedBody.get('content');
    
    if (title && content) {
        const updatedPost = { title, content };
        const post = postModel.updatePost(id, updatedPost);
        
        if (post) {
            res.writeHead(302, { 'Location': `/posts/${id}` });
            res.end();
        } else {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('게시물을 수정할 수 없습니다.');
        }
    } else {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end('Bad Request: Title and Content are required');
    }
    });
};

const deletePost = (req, res, id) => {
    const success = postModel.deletePost(id);
    
    if (success) {
        res.writeHead(302, { 'Location': '/' });
        res.end();
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('게시물을 삭제할 수 없습니다.');
    }
};

module.exports = {
    listPosts,
    viewPost,
    createPost,
    updatePost,
    deletePost
};
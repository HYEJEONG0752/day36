// routes/userRoutes.js
const url = require('url');
const querystring = require('querystring');
const userController = require('../controllers/userController');

const userRoutes = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  if (pathname === '/users' && method === 'GET') {
    userController.listUsers(req, res);
  } else if (pathname === '/users' && method === 'POST') {
    userController.createUser(req, res);
  } else if (pathname.startsWith('/users/') && pathname.endsWith('/delete') && method === 'POST') {
    const id = parseInt(pathname.split('/')[2]);
    userController.deleteUser(req, res, id);
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not Found');
  }
};

module.exports = userRoutes;
// controllers/userController.js
const fs = require('fs');
const path = require('path');
const userModel = require('../models/userModel');

const listUsers = (req, res) => {
  const users = userModel.getAllUsers();
  const filePath = path.join(__dirname, '../views/users.html');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.end('Internal Server Error');
      return;
    }

    const userList = '';
    users.forEach(user => {
      userList += `<li>${user.name}
                    <form action="/users/${user.id}/delete" method="POST" style="display:inline;">
                      <button type="submit">삭제</button>
                    </form>
                  </li>`;
    });

    const modifiedData = data.replace('{{userList}}', userList);
    
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    res.end(modifiedData);
  });
};

const createUser = (req, res) => {
  let body = '';
  
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    const parsedBody = new URLSearchParams(body);
    
    const name = parsedBody.get('name');
    
    if (name) {
      userModel.addUser({ name });
      
      res.writeHead(302, { 'Location': '/users' });
      
      res.end();
    } else {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      
      res.end('Bad Request: Name is required');
    }
  });
};

const deleteUser = (req, res, id) => {
  const success = userModel.deleteUser(id);
  
  if (success) {
    res.writeHead(302, { 'Location': '/users' });
    
    res.end();
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    
    res.end('User Not Found');
  }
};

module.exports = {
  listUsers,
  createUser,
  deleteUser
};
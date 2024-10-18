// models/userModel.js
const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' }
  ];
  
  const getAllUsers = () => {
    return users;
  };
  
  const getUserById = (id) => {
    return users.find(user => user.id === id);
  };
  
  const addUser = (user) => {
    user.id = users.length + 1;
    users.push(user);
    
    return user;
  };
  
  const updateUser = (id, updatedUser) => {
    const index = users.findIndex(user => user.id === id);
    
    if (index !== -1) {
      users[index] = { ...users[index], ...updatedUser };
      
      return users[index];
    }
    
    return null;
  };
  
  const deleteUser = (id) => {
    const index = users.findIndex(user => user.id === id);
    
    if (index !== -1) {
      users.splice(index, 1);
      
      return true;
    }
    
    return false;
  };
  
  module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
  };
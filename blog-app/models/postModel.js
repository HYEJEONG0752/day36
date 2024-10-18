// models/postModel.js
let posts = [
    { id: 1, title: '첫 번째 게시물', content: '이것은 첫 번째 게시물의 내용입니다.' },
    { id: 2, title: '두 번째 게시물', content: '이것은 두 번째 게시물의 내용입니다.' }
];

const getAllPosts = () => {
    return posts;
};

const getPostById = (id) => {
    return posts.find(post => post.id === id);
};

const addPost = (post) => {
    post.id = posts.length + 1;
    posts.push(post);
    return post;
};

const updatePost = (id, updatedPost) => {
    const index = posts.findIndex(post => post.id === id);
    if (index !== -1) {
        posts[index] = { ...posts[index], ...updatedPost };
        return posts[index];
    }
    return null;
};

const deletePost = (id) => {
    const index = posts.findIndex(post => post.id === id);
    if (index !== -1) {
        posts.splice(index, 1);
        return true;
    }
    return false;
};

module.exports = {
    getAllPosts,
    getPostById,
    addPost,
    updatePost,
    deletePost
};
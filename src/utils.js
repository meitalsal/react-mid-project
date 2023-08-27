import axios from 'axios';

const postsUrl= "https://jsonplaceholder.typicode.com/posts";
const todosUrl= "https://jsonplaceholder.typicode.com/todos";

const getAll = (url) => axios.get(url);

const getUserTodos = async(id) => {
    const {data: userTodos} = await getAll(`${todosUrl}?userId=${id}`);
    return userTodos;
};

const getUserPosts = async(id) => {
    const {data: userPosts} = await getAll(`${postsUrl}?userId=${id}`);
    return userPosts;
};


export { getAll, getUserTodos, getUserPosts};
import axios from 'axios';
const baseUrl = 'http://localhost:3004';
// 瀏覽
axios.get('http://localhost:3001/todos');
// 新增
axios.post('http://localhost:3001/todos', {
  title: 'example',
  isDone: false,
});
// 修改
axios.patch('http://localhost:3001/todos/1', {
  title: 'example',
});
// 刪除
axios.delete('http://localhost:3001/todos/1');

export const getTodos = async () => {
  try {
    const res = await axios.get(`${baseUrl}/todos`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const addTodos = async (payload) => {
  try {
    const { title, isDone } = payload;
    const res = await axios.post(`${baseUrl}/todos`, { title, isDone });
    return res.data;
  } catch (error) {
    console.log(`Create Todo failed:`, error);
  }
};
export const patchTodos = () => {};
export const deleteTodos = () => {};

import axios from 'axios';
const baseUrl = 'http://localhost:3004';

export const getTodos = async () => {
  try {
    const res = await axios.get(`${baseUrl}/todos`);
    return res.data;
  } catch (error) {
    console.log(`Get Todo failed:`, error);
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
export const patchTodos = async (payload) => {
  try {
    const { id, title, isDone } = payload;
    const res = await axios.patch(`${baseUrl}/todos/${id}`, { title, isDone });
    return res.data;
  } catch (error) {
    console.log(`Patch Todo failed:`, error);
  }
};
export const deleteTodos = async (id) => {
  try {
    const res = await axios.delete(`${baseUrl}/todos/${id}`);
    return res.data;
  } catch (error) {
    console.log(`Delete Todo failed:`, error);
  }
};

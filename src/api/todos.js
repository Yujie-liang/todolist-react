import axios from 'axios';
const baseUrl = 'https://todo-list.alphacamp.io/api';

const axiosInstance = axios.create({
  baseUrl: baseUrl,
});

axiosInstance.interceptors.request.use(
  function (config) {
    // config header before request is sent
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

export const getTodos = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/todos`);
    return res.data.data;
  } catch (error) {
    console.log(`Get Todo failed:`, error);
  }
};
export const addTodos = async (payload) => {
  try {
    const { title, isDone } = payload;
    const res = await axiosInstance.post(`${baseUrl}/todos`, { title, isDone });
    return res.data;
  } catch (error) {
    console.log(`Create Todo failed:`, error);
  }
};
export const patchTodos = async (payload) => {
  try {
    const { id, title, isDone } = payload;
    const res = await axiosInstance.patch(`${baseUrl}/todos/${id}`, {
      title,
      isDone,
    });
    return res.data;
  } catch (error) {
    console.log(`Patch Todo failed:`, error);
  }
};
export const deleteTodos = async (id) => {
  try {
    const res = await axiosInstance.delete(`${baseUrl}/todos/${id}`);
    return res.data;
  } catch (error) {
    console.log(`Delete Todo failed:`, error);
  }
};

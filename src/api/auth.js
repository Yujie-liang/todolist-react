import axios from 'axios';
const authUrl = ' https://todo-list.alphacamp.io/api/auth';

export const login = async ({ username, password }) => {
  try {
    const { data } = await axios.post(`${authUrl}/login`, {
      username,
      password,
    });
    const { authToken } = data;
    console.log(data);
    if (authToken) {
      // 若登入成功，帶上success: true
      return { success: true, ...data };
    }
    return data;
  } catch (error) {
    console.error(`Login failed:`, error);
  }
};

export const register = async ({ username, email, password }) => {
  try {
    const { data } = await axios.post(`${authUrl}/register`, {
      username,
      email,
      password,
    });
    const { authToken } = data;
    if (authToken) {
      return { success: true, ...data };
    }
    return data;
  } catch (error) {
    console.error(`Register failed:`, error);
  }
};

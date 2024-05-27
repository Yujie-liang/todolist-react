import { createContext, useContext, useState, useEffect } from 'react';
import { register, login, checkPermission } from '../api/auth';
import * as jwt from 'jsonwebtoken';
import { useLocation } from 'react-router-dom';
// 每個頁面都讀取得到
const defaultAuthContext = {
  isAuthenticated: false,
  currentMember: null, //當前使用者
  register: null, // 會影響authContext狀態的方法
  login: null,
  logout: null,
};

const AuthContext = createContext(defaultAuthContext);
// 使用context
export const useAuth = () => useContext(AuthContext);
// provider管理context狀態操作
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const checkTokenIsValid = async () => {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        setPayload(null);
        setIsAuthenticated(false);
        return;
      }
      const result = await checkPermission(authToken);
      if (result) {
        const tempPayload = jwt.decode(authToken);
        setPayload(tempPayload);
        setIsAuthenticated(true);
      } else {
        setPayload(null);
        setIsAuthenticated(false);
      }
    };
    checkTokenIsValid();
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentMember: payload && { id: payload.sub, name: payload.name },
        register: async (data) => {
          const { success, authToken } = await register({
            username: data.username,
            email: data.email,
            password: data.password,
          });
          const tempPayload = jwt.decode(authToken); // token中帶username, email, password資料
          if (tempPayload) {
            // 若解析成功
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem('authToken', authToken);
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          return success;
        },
        login: async (data) => {
          const { success, authToken } = await login({
            username: data.username,
            password: data.password,
          });
          const tempPayload = jwt.decode(authToken); // token中帶username, email, password資料
          if (tempPayload) {
            // 若解析成功
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem('authToken', authToken);
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          return success;
        },
        logout: async () => {
          setPayload(null);
          setIsAuthenticated(false);
          localStorage.removeItem('authToken');
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

import { api } from "shared/api/apiConfig";

export const registerUser = async (user) => {
  const response = await api.post('/users', user );
  
  return response.data;
};

export const loginUser = async (user) => {
  const response = await api.post('/users/login', user );
  
  return response.data;
};

export const getUserInfo = async (token) => {
  const response = await api.get('/user', {headers: {Authorization: token}})

  return response.data
}
import axios from "axios";
const userAxios = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
export const createUser = async (email: string, password: string) => {
  const res = await userAxios({
    method: "POST",
    url: `/users?email=${email}&password=${password}`,
  });
};

export const getUser = async (email: string, password: string) => {
  const res = await userAxios({
    method: "GET",
    url: `/users?email=${email}&password=${password}`,
  });
};

import axios from "axios";
const userAxios = axios.create({
  baseURL: "/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
export const createUser = async (email: string, password: string) => {
  const res = await userAxios({
    method: "POST",
    url: "/users",
    data: { email: email, password: password },
  });
};

export const getUser = async (email: string, password: string) => {
  const res = await userAxios({
    method: "GET",
    url: "/users",
    data: { email: email, password: password },
  });
};

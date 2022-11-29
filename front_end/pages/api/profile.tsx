import axios from "axios";
const accountAxios = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const updateAccountInfo = async (picture: string, description: string) => {
  const res = await accountAxios({
    method: "PUT",
    url: `/account?picture=${picture}&description=${description}`,
  });
};

export const getAccountInfo = async () => {
  const res = await accountAxios({
    method: "GET",
    url: `/account?`,
  });
  return res
};
import axios from "axios";
const downloadAxios = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const getDownloadInfo = async (post_url1: string) => {
  const data = {
    post_url: post_url1,
  };
  const res = await downloadAxios({
    method: "GET",
    url: `/download?post_url=${post_url1}`,
  });
  return res;
};

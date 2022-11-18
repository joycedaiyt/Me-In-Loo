import axios from "axios";
const reportAxios = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
export const createReport = async (
  post_url: string,
  rep_description: string
) => {
  const res = await reportAxios({
    method: "POST",
    url: `/reports`,
    data: {
      post_url: post_url,
      rep_description: rep_description,
    },
  });
  return res;
};

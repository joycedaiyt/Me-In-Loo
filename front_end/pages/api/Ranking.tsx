import axios from "axios";
const rankingAxios = axios.create({
  baseURL: "http://127.0.0.1:8000/ranking",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const getAllRankingInfo = async () => {
  const res = await rankingAxios({
    method: "GET",
  });
  return res;
};

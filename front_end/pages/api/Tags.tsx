import axios from "axios";
const tagAxios = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
export const getAllTags = async () => {
  try {
    const res = await tagAxios({
      method: "GET",
      url: "/tags",
    });
    return res;
  } catch (e) {
    console.log(e);
  }
};

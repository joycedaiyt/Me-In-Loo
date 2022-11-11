import axios from "axios";
const postAxios = axios.create({
  baseURL: "http://127.0.0.1:5000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const createPost = async (file: Blob) => {
  try {
    const res = await postAxios({
      method: "POST",
      url: "/posts",
      data: {
        meme: file,
        cost: 5,
        post_name: "post_name",
      },
    });
  } catch (e) {
    console.log(e);
  }
};

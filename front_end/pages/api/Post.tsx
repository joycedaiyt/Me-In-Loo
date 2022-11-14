import axios from "axios";
const postAxios = axios.create({
  baseURL: "http://127.0.0.1:5000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const createPost = async (
  file: File,
  postCost: number,
  postName: string,
  tags: Array<string>
) => {
  try {
    const res = await postAxios({
      method: "POST",
      url: "/posts",
      data: {
        meme: file,
        cost: postCost,
        post_name: postName,
        tags: tags,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

// export const getPost = async (

// )

import axios from "axios";
const postAxios = axios.create({
  baseURL: "http://127.0.0.1:8000",
  // headers: {
  //   "Content-Type": "application/json",
  //   Accept: "application/json",
  // },
});

export const createPost = async (
  file: File,
  postCost: number,
  postName: string,
  tags: Array<string>
) => {
  let form = new FormData();
  form.append("meme", file);
  form.append("cost", postCost.toString());
  form.append("post_name", postName);
  form.append("tags", tags.toString());

  const res = await postAxios({
    method: "POST",
    url: `/posts`,
    data: form,
  });
  return res;
};

export const getPostByPage = async (
  pageNum: number,
  limitPerPage: number,
  selectedTags: Array<string>
) => {
  try {
    const res = await postAxios({
      method: "GET",
      url: `/posts?page=${pageNum}&per_page=${limitPerPage}&include_tag=${selectedTags}`,
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //   },
    });
    return res;
  } catch (e) {
    console.log(e);
  }
};

// export const getPost = async (

// )

export const addLike = async (post_url: string) => {
  try {
    const res = await postAxios({
      method: "POST",
      url: `/like?post_url=${post_url}`,
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //   },
    });
  } catch (e) {
    console.log(e);
  }
};

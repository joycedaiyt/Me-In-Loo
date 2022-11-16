import axios from "axios";
const postAxios = axios.create({
  baseURL: "http://127.0.0.1:5000",
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
  try {
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
  } catch (e) {
    console.log(e);
  }
};

export const getPostByPage = async (pageNum: number, limitPerPage: number) => {
  try {
    console.log("herer2");
    const res = await postAxios({
      method: "GET",
      url: `/posts?page=${pageNum}&per_page=${limitPerPage}`,
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //   },
    });
    // console.log(res);
    // return res.data;
    return res;
  } catch (e) {
    console.log(e);
  }
};

// export const getPost = async (

// )

import axios from "axios";
const postAxios = axios.create({
  baseURL: "http://127.0.0.1:8000",
  // headers: {
  //   "Content-Type": "application/json",
  //   Accept: "application/json",
  // },
});

export const getAccountInfo = async () => {
  const res = await postAxios({
    method: "GET",
    url: `/account`,
  });
  // console.log(res);
  return res;
};

export const updateProfilePic = async (file: File) => {
  let form = new FormData();
  form.append("new_pic", file);
  form.append("new_description", "");

  const res = await postAxios({
    method: "PUT",
    url: `/account/update`,
    data: form,
  });
  return res;
};

export const updateProfileDescription = async (new_description: string) => {
  let form = new FormData();
  form.append("new_description", new_description);

  const res = await postAxios({
    method: "PUT",
    url: `/account/update`,
    data: form,
  });
  return res;
};

export const getMostPopularPost = async () => {
  const res = await postAxios({
    method: "GET",
    url: `/popular`,
  });
  return res;
};

// export const getPost = async (

// )

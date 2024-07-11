import axios from "axios";

const API_KEY = "44888255-ebc90abddb2e9fe7ecd191365";

const apiUrl = `https://pixabay.com/api/?key=${API_KEY}`;

type ParamsType = {
  [key: string]: string | boolean | number;
};

const formatUrl = (params: ParamsType) => {
  let url = apiUrl + "&per_page=25&safesearch=true&editors_choice=true";
  if (!params) return url;
  let paramKeys = Object.keys(params);
  paramKeys.map((key) => {
    let value = key === "q" ? encodeURIComponent(params[key]) : params[key];
    url += `$${key}=${value}`;
  });
  return url;
};

export const apiCall = async (params: ParamsType) => {
  try {
    const response = await axios.get(formatUrl(params));
    const { data } = response;

    return { success: true, data };
  } catch (error: any) {
    console.log("got error: ", error.message);
    return { success: false, msg: error.message };
  }
};

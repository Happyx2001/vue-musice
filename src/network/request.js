import axios from "axios";

export function request(config) {
  const instance = axios.create({
    baseURL: "http://106.52.9.70:3000",
    // baseURL:'http://localhost:3000',
    timeout: 20000,
    withCredentials: true,
  });
  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (err) => {
      console.log(err);
    }
  );
  instance.interceptors.response.use(
    (res) => {
      return res.data;
    },
    (err) => Promise.reject(err.response ? err.response.data : err)
  );

  return instance(config);
}

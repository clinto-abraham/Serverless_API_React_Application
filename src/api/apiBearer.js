import axios from "axios";

const apiBearer = axios.create({
  baseURL:
    "https://u2xb63vnab7qm5rfud3evncbsq0fvvqm.lambda-url.ap-south-1.on.aws",
});

// Add an interceptor for all requests
apiBearer.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("clinto");
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

export default apiBearer;

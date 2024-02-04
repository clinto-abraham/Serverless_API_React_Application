import axios from "axios";

const api = axios.create({
  baseURL:
    "https://u2xb63vnab7qm5rfud3evncbsq0fvvqm.lambda-url.ap-south-1.on.aws",
});

export default api;

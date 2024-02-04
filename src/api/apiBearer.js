import axios from "axios";

const apiBearer = axios.create({
  baseURL:
    "https://u2xb63vnab7qm5rfud3evncbsq0fvvqm.lambda-url.ap-south-1.on.aws",
});

// Add an interceptor for all requests
const headers = {
  "sec-fetch-mode": "cors",
  referer: "http://localhost:5173/",
  "x-amzn-tls-version": "TLSv1.2",
  "sec-fetch-site": "cross-site",
  "accept-language": "en-GB,en;q=0.9",
  "x-forwarded-proto": "https",
  origin: "http://localhost:5173",
  "x-forwarded-port": "443",
  dnt: "1",
  "x-forwarded-for": "45.112.13.147",
  accept: "application/json, text/plain, */*",
  "x-amzn-tls-cipher-suite": "ECDHE-RSA-AES128-GCM-SHA256",
  "sec-ch-ua": "Not A(Brand;v=99, Google Chrome;v=121, Chromium;v=121",
  "sec-ch-ua-mobile": "?0",
  "x-amzn-trace-id": "Root=1-65bfcda9-2d3e8c300af2379254f38b0e",
  "sec-ch-ua-platform": "macOS",
  host: "u2xb63vnab7qm5rfud3evncbsq0fvvqm.lambda-url.ap-south-1.on.aws",
  "accept-encoding": "gzip, deflate, br",
  "sec-fetch-dest": "empty",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET,DELETE,PUT,PATCH",
  "Content-Type": "application/json",
};

// console.log(config, "config");
// const accessToken = localStorage.getItem("clinto");
// config.headers.Authorization = `Bearer ${accessToken}`;
apiBearer.interceptors.request.use((config) => {
  config.headers = headers;
  return config;
});

export default apiBearer;

// config.headers["Access-Control-Allow-Headers"] = "*";
// config.headers["Access-Control-Allow-Methods"] = "OPTIONS,POST,GET";
// config.headers["Content-Type"] = "application/json";

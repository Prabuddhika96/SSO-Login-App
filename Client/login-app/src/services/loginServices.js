import axios from "axios";

const baseURL = "http://localhost:5000";

const microsoftLogin = async () => {
  const response = await axios({
    method: "get",
    url: `${baseURL}/auth/microsoft`,
    headers: {
      "Content-Type": "application/json;",
    },
  });
  return response;
};

const googleLogin = async () => {
  const response = await axios({
    method: "get",
    url: `${baseURL}/auth/google`,
    headers: {
      "Content-Type": "application/json;",
    },
  });
  return response;
};

const loginServices = { microsoftLogin, googleLogin };

export default loginServices;

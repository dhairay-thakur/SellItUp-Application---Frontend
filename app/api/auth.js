import client from "./client";

const endpoint = "/users";

const login = (email, password) =>
  client.post(endpoint + "/login", { email, password });

const register = (userInfo) => client.post(endpoint + "/signup", userInfo);

export default { login, register };

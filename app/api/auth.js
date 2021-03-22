import client from "./client";

const endpoint = "/users";

const login = (email, password) =>
  client.post(endpoint + "/login", { email, password });

export default { login };

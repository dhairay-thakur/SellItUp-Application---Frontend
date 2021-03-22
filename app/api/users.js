import client from "./client";

const endpoint = "/users";

const getUserDetails = (uid) => client.get(endpoint + "/" + uid);

export default {
  getUserDetails,
};

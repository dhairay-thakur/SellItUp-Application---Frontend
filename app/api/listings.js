import client from "./client";

const endpoint = "/listings";

const getAllListings = () => client.get(endpoint);
const getListingsByUser = (uid) => client.get(endpoint + "/user/" + uid);
const getListingsByCategory = (cid) =>
  client.get(endpoint + "/category/" + cid);
  
const addListing = (listing, onUploadProgress) => {
  const data = new FormData();
  data.append("title", listing.title);
  if (listing.description) data.append("description", listing.description);
  data.append("price", listing.price);
  data.append("categoryId", listing.category.value);
  listing.images.forEach((image, index) => {
    data.append("images", {
      name: "image" + index,
      uri: image,
      type: "image/jpeg",
    });
  });
  data.append("userId", "604fc56814ebd61490bb4c3e");

  return client.post(endpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  addListing,
  getAllListings,
  getListingsByCategory,
  getListingsByUser,
};

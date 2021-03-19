import client from "./client";

const endpoint = "/listings";

const getAllListings = () => client.get(endpoint);

const addListing = (listing) => {
  const data = {
    title: listing.title,
    description: listing.description,
    price: listing.price,
    categoryId: listing.category.value,
    location: listing.location,
    images: listing.images,
  };
  return client.post(endpoint, data);
};

export default {
  addListing,
  getAllListings,
};

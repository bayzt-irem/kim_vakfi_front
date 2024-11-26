import service from "../utils/express";

export const CART_API = {
  getAll(placeId) {
    return service.get(`/cart/${placeId}`);
  },
  create(payload) {
    return service.post(`/cart`, payload);
  },
  change(cartId, payload) {
    return service.put(`/cart/${cartId}`, payload);
  },
};

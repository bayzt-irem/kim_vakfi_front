import service from "../utils/express";

export const PLACE_API = {
  getAll() {
    return service.get(`/place/all`).then(x => x.data);
  },
  get(placeId) {
    return service.get(`/place/${placeId}`).then(x => x.data);
  },
  create(payload) {
    return service.post(`/place`, payload);
  },
  change(placeId, payload) {
    return service.put(`/place/${placeId}`, payload);
  },
};

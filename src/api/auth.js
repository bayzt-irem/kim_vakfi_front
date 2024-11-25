import service from "../utils/express";

export const AUTH_API = {
  current() {
    return service.get(`/auth/current`);
  },
  login(payload) {
    return service.post(`/auth/login`, payload);
  },
  register(payload) {
    return service.post(`/auth/register`, payload);
  },
};

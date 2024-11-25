import Cookies from "js-cookie";

const memoryStorage = {};
let localStorageEnabled = true;
let cookieStorageEnabled = true;
let sessionStorageEnabled = true;

export function getToken() {
  return getPersistenceData("token");
}

/**
 * Cookie Storage
 */
const CS = {
  get: (key) => (cookieStorageEnabled ? Cookies.get(key) : null),
  set: (key, value) => (cookieStorageEnabled ? Cookies.set(key, value) : null),
  del: (key) => (cookieStorageEnabled ? Cookies.remove(key) : null),
};
/**
 * Local Storage
 */
const LS = {
  get: (key) => (localStorageEnabled ? localStorage.getItem(key) : null),
  set: (key, value) =>
    localStorageEnabled ? localStorage.setItem(key, value) : null,
  del: (key) => (localStorageEnabled ? localStorage.removeItem(key) : null),
};
/**
 * Session Storage
 */
const SS = {
  get: (key) => (sessionStorageEnabled ? sessionStorage.getItem(key) : null),
  set: (key, value) =>
    sessionStorageEnabled ? sessionStorage.setItem(key, value) : null,
  del: (key) => (sessionStorageEnabled ? sessionStorage.removeItem(key) : null),
};
/**
 * Memory Storage
 */
const MS = {
  get: (key) => memoryStorage[key],
  set: (key, value) => (memoryStorage[key] = value),
  del: (key) => delete memoryStorage[key],
};

export const getPersistenceData = function getPersistenceData(
  key,
  defaultValue = null
) {
  return (
    CS.get(key) || LS.get(key) || MS.get(key) || SS.get(key) || defaultValue
  );
};

export const setPersistenceData = (key, value, onlyLocalStorage = false) => {
  if (onlyLocalStorage) {
    MS.set(key, value);
    LS.set(key, value);
  } else {
    MS.set(key, value);
    LS.set(key, value);
    CS.set(key, value);
    SS.set(key, value);
  }
};
export const removePersistenceData = (key) => {
  CS.del(key);
  LS.del(key);
  MS.del(key);
  SS.del(key);
};

const checkLocalStorage = () => {
  try {
    const key = "ignore";
    const val = "1";
    LS.set(key, val);
    const ignore = LS.get(key);
    LS.del(key);
    localStorageEnabled = ignore === val;
  } catch (e) {
    localStorageEnabled = false;
  }
};
const checkCookieStorage = () => {
  try {
    const key = "ignore";
    const val = "1";
    CS.set(key, val);
    const ignore = CS.get(key);
    CS.del(key);
    cookieStorageEnabled = ignore === val;
  } catch (e) {
    cookieStorageEnabled = false;
  }
};
const checkSessionStorage = () => {
  try {
    const key = "ignore";
    const val = "1";
    SS.set(key, val);
    const ignore = SS.get(key);
    SS.del(key);
    sessionStorageEnabled = ignore === val;
  } catch (e) {
    sessionStorageEnabled = false;
  }
};
(() => {
  checkLocalStorage();
  checkCookieStorage();
  checkSessionStorage();
})();

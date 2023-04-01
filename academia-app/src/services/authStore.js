export const AUTH_STORE_KEY = "AUTH_STORE_KEY_ACADEMIA";
export default class AuthStore {
  static getData() {
    const payloadJson = localStorage.getItem(AUTH_STORE_KEY);
    if (!payloadJson) return null;
    return JSON.parse(payloadJson);
  }

  static setStore(payload) {
    localStorage.setItem(AUTH_STORE_KEY, JSON.stringify(payload));
  }

  static removeStore() {
    localStorage.removeItem(AUTH_STORE_KEY);
  }
}

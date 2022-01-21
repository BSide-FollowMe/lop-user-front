export default class NativeStorage {
  _name: string;
  constructor(name: string) {
    this._name = name;
  }

  async setLocalItem(key: string, value: string): Promise<void> {
    value = JSON.stringify(value);
    await localStorage.setItem(key, value);
  }

  async getLocalItem(key: string): Promise<any> {
    const value = await localStorage.getItem(key);
    if (!value) return value;
    return JSON.parse(value);
  }

  async removeLocalItem(key: string) {
    await localStorage.removeItem(key);
  }
}

const _localStorage = new NativeStorage('localStorage');
const _sessionStorage = new NativeStorage('sessionStorage');

export { _localStorage as localStorage, _sessionStorage as sessionStorage };

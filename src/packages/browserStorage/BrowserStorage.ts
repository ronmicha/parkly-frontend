import {
  createStorageEntry,
  LocalStorage,
  SessionStorage,
} from "./storageEntry";

class BrowserStorage {
  private readonly _isLoggedIn = createStorageEntry("isLoggedIn", LocalStorage);

  get isLoggedIn() {
    return this._isLoggedIn;
  }

  clear(): void {
    LocalStorage.clear();
    SessionStorage.clear();
  }
}

export const browserStorage = new BrowserStorage();

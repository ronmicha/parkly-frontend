class StorageProvider {
  storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  storeItem(key: string, data: unknown): void {
    if (data && typeof data === "object") {
      data = JSON.stringify(data);
    }
    this.storage.setItem(key, data as string);
  }

  getItem<T>(key: string): T | string {
    const rawItem = this.storage.getItem(key) || "";
    try {
      const item = JSON.parse(rawItem) as T;
      if (!item) {
        return rawItem;
      }
      return item;
    } catch {
      return rawItem;
    }
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }
}

export const SessionStorage = new StorageProvider(sessionStorage);
export const LocalStorage = new StorageProvider(localStorage);

type StorageEntry<T> = {
  get: () => T;
  set: (value: T) => void;
  remove: () => void;
  key: () => string;
};

export const createStorageEntry = <T = string>(
  storageKey: string,
  storage: StorageProvider = SessionStorage
): StorageEntry<T> => {
  return {
    get: () => storage.getItem<T>(storageKey) as T,
    set: (value: T) => {
      storage.storeItem(storageKey, value);
    },
    remove: () => {
      storage.removeItem(storageKey);
    },
    key: () => storageKey,
  };
};

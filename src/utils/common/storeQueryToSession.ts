export function storeQueryToSession(storage: Storage, key: string, value: string) {
  if (!value) {
    return;
  }
  const existing = storage.getItem(key);
  if (!existing) {
    storage.setItem(key, value);
  }
}

export function getKeys(obj: Record<string, any>) {
  const names = [];
  let name = '';
  for (name in obj) {
    names.push(name);
  }
  return names;
}

//update key dynamically
const updateObjectKey = (obj, oldkey, newKey) => {
  const descriptor = Object.getOwnPropertyDescriptor(obj, oldkey);
  Object.defineProperty(obj, newKey, descriptor);
  delete obj[oldkey];
  return obj;
}
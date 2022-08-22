export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  console.log(items);
  return [...items].splice(startIndex, pageSize);
}

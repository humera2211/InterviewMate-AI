// utils/leetcode.js
export function getProblemSlug(url) {
  if (!url) return null;
  const match = url.match(/\/problems\/([^/]+)/);
  return match ? match[1] : null;
}

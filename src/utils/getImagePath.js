export const getImagePath = (imageName) => {
  // In development, use relative path
  // In production (GitHub Pages), use PUBLIC_URL
  const baseUrl = process.env.PUBLIC_URL || '';
  return `${baseUrl}/images/${imageName}`;
};
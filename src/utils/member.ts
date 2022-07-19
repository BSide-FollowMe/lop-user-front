export const getImgUrl = (level: string | undefined) => {
  if (level === undefined) return;
  const images = require.context("@/assets/images/level/", false, /\.svg$/);
  return images("./" + level + ".svg");
};
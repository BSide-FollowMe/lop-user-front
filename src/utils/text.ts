export const formatNumber = (input: number) => {
  return String(input).replace(/(.)(?=(\d{3})+$)/g, '$1,');
};

export const formatNumber = (input: number) => {
  return String(input).replace(/(.)(?=(\d{3})+$)/g, '$1,');
};

export const payloadToQueryString = (payload:any) =>
  Object.entries(payload)
    .map((e) => e.join('='))
    .join('&');

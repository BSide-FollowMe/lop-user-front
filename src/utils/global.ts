export const debounce = (fn: any, ms = 1000) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
export const handleInfiniteListScroll = (e: any, list: any, totalLength: any, callBack: any) => {
  if (list.length >= totalLength) return;
  const { scrollHeight, scrollTop, clientHeight } = e.target.documentElement;
  const isAtTheBottom = scrollHeight >= (scrollTop + clientHeight - 100);
  if (isAtTheBottom) callBack();
}

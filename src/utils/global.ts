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
  const isAtTheBottom = scrollHeight >= scrollTop + clientHeight - 100;
  if (isAtTheBottom) callBack();
};
export function dataURLtoFile(dataurl: any, filename: any) {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

export function copyUrl() {
  const val = window.document.location.href;
  const t = document.createElement('textarea');
  document.body.appendChild(t);
  t.value = val;
  t.select();
  document.execCommand('copy');
  document.body.removeChild(t);
}

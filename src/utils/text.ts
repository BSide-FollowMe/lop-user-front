export const formatNumber = (input: number) => {
  return String(input).replace(/(.)(?=(\d{3})+$)/g, '$1,');
};

export const payloadToQueryString = (payload: any) =>
  Object.entries(payload)
    .map((e) => e.join('='))
    .join('&');

export const objectToFormdata = (payload: any) => {
  const formdata = new FormData();

  for (const key in payload) {
    if (payload[key] instanceof Array) {
      payload[key].forEach((e:any) => {
        formdata.append(key, e);
      });
      continue;
    }
    formdata.append(key, payload[key]);
  }
  return formdata;
};

export const getBytes = function (contents: string) {
  let str_character;
  let int_char_count = 0;
  const int_contents_length = contents.length;

  for (let k = 0; k < int_contents_length; k++) {
    str_character = contents.charAt(k);
    if (escape(str_character).length > 4) int_char_count += 2;
    else int_char_count++;
  }

  return int_char_count;
};

export function deepClone(obj:any) {
  const str = JSON.stringify(obj);
  return JSON.parse(str);
}

export function leadingZeroes(n:any) {
  if (n <= 9) {
    return '0' + n;
  }
  return n;
}

export function formatDateOnly(dt:Date) {
  return dt.getFullYear() + '.' + leadingZeroes(dt.getMonth() + 1) + '.' + leadingZeroes(dt.getDate());
}

export function getTimeDistanceWithNaturalStr(createdAt: any) {
  if (!createdAt) return;
  let target = createdAt;
  const currTime:any = new Date();
  if (!(target instanceof Date)) target = new Date(target);
  const milliSeconds = currTime - target;
  const seconds = milliSeconds / 1000;
  if (seconds < 60) return `방금 전`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;
  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;
  if (currTime.getFullYear() == target.getFullYear()) return `${leadingZeroes(target.getMonth() + 1)}월 ${leadingZeroes(target.getDate())}일`;
  return formatDateOnly(target);
}

export function comma(str:string | number) {
  str = String(str);
  return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

export function uncomma(str:string | number) {
  str = String(str);
  return str.replace(/[^\d]+/g, '');
}

export function translate<T,U>(dict:{value:T,label:U}[],value:T):U | undefined{
  return dict.find(item=>item.value===value)?.label;
}
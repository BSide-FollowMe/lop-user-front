export const formatNumber = (input: number) => {
  return String(input).replace(/(.)(?=(\d{3})+$)/g, '$1,');
};


export const payloadToQueryString = (payload:any) =>
  Object.entries(payload)
    .map((e) => e.join('='))
    .join('&');

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


export function validateSearchStr(searchStr?: string) {
  if (!searchStr || !searchStr.length) {
    return '검색어가 입력되지 않았어요!';
  }
  const regex = /^.{1,50}$/;
  if (!regex.test(searchStr)) {
    return '1자 이상, 50자 이하의 검색어를 입력하세요.';
  }
}

import axios from '@/utils/http/axios';
import { payloadToQueryString, objectToFormdata } from '@/utils/text';
import { BoardParamModel, BoardRespModel, BoardListParamModel, CommentParamModel, CommentRespModel } from './model/boardModel';

const API_PREFIX = '/v1';
enum Api {
  BOARD_LIST = '/questions',
  REGIST_BOARD = '/questions',
  UPDATE_BOARD = '/questions', // required` + /${id}`
  DELETE_BOARD = '/questions', // required` + /${id}`
  REGIST_COMMENT = '/comments', // required `/questions/${questionId}/comments`
  TOGGLE_SUPPORT_COMMENTS = '/supports', // required '/comments/{commentId}/supports'
  TOGGLE_SUPPORT_BOARD = '/supports', // required '/qustions/{commentId}/supports'
}

export function registQnaBoard(payload: BoardParamModel): Promise<unknown> {
  const formdata = objectToFormdata(payload);
  return axios.post<BoardRespModel>(API_PREFIX + Api.REGIST_BOARD, formdata, {
    headers: { 'Content-Type': `multipart/form-data` },
  });
}

export function modifyQnaBoard(payload: BoardParamModel, questionId: string): Promise<unknown> {
  const formdata = objectToFormdata(payload);
  return axios.put<BoardRespModel>(API_PREFIX + Api.UPDATE_BOARD + '/' + questionId, formdata, {
    headers: { 'Content-Type': `multipart/form-data` },
  });
}

export function registQnaBoardComment(payload: CommentParamModel, questionId: string): Promise<unknown> {
  return axios.post<CommentRespModel>(API_PREFIX + Api.REGIST_BOARD + '/' + questionId + Api.REGIST_COMMENT, payload);
}
export function modifyQnaBoardComment(payload: CommentParamModel, questionId: string, commentId: string): Promise<unknown> {
  return axios.put<CommentRespModel>(
    API_PREFIX +
      Api.REGIST_BOARD +
      '/' +
      questionId +
      Api.REGIST_COMMENT +
      '?' +
      payloadToQueryString({ questionId: questionId, commentId: commentId }),
    payload,
  );
}

export function deleteQnaBoardComment(questionId: string, commentId: string): Promise<unknown> {
  return axios.delete<CommentRespModel>(
    API_PREFIX +
      Api.REGIST_BOARD +
      '/' +
      questionId +
      Api.REGIST_COMMENT +
      '?' +
      payloadToQueryString({ questionId: questionId, commentId: commentId }),
  );
}

export function getQnaBoardList(payload: BoardListParamModel): Promise<unknown> {
  return axios.get(API_PREFIX + Api.BOARD_LIST + '?' + payloadToQueryString(payload));
}

export function getQnaBoardDetail(boardId: string): Promise<unknown> {
  return axios.get(API_PREFIX + Api.DELETE_BOARD + '/' + boardId);
}

export function removeQnaBoard(boardId: string): Promise<unknown> {
  return axios.delete(API_PREFIX + Api.DELETE_BOARD + '/' + boardId);
}

export function toggleSupportComments(commentId: string): Promise<unknown> {
  return axios.post(API_PREFIX + Api.REGIST_COMMENT + '/' + commentId + Api.TOGGLE_SUPPORT_COMMENTS);
}

export function toggleSupportQuestions(questionId: string): Promise<unknown> {
  return axios.post(API_PREFIX + Api.REGIST_BOARD + '/' + questionId + Api.TOGGLE_SUPPORT_BOARD);
}

export function getImageBlobFromUrl(url: string): Promise<unknown> {
  return axios.get(url, { responseType: 'blob' });
}


// 직접 스토리지 업로드 테스트
const nhnUrl = 'https://api-storage.cloud.toast.com/lop/static/7c43e92f-0818-40ae-84eb-d502f7c6c87c?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220226T034807Z&X-Amz-SignedHeaders=host&X-Amz-Expires=899&X-Amz-Credential=13dc6ffb2a4546c9b1adf9bb20362cb7%2F20220226%2FKR1%2Fs3%2Faws4_request&X-Amz-Signature=7130749291bce718c80805d2b9eba7bf01464278fc13e27ae0f2194d1d301bb7'
export function testUploadImages(payload:any): Promise<unknown> {
  const formdata = objectToFormdata(payload);
  return axios.post(nhnUrl, formdata, {
    headers: { 'Content-Type': `multipart/form-data` },
  });
}
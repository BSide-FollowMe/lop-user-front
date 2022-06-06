import axios from '@/utils/http/axios';
import { payloadToQueryString, objectToFormdata } from '@/utils/text';
import type { BoardParam, BoardResponse, BoardListParam, CommentParam, CommentResponse } from '@/types/api/board';

const API_PREFIX = '/v1';
enum Api {
  BOARD_LIST = '/questions',
  REGIST_BOARD = '/questions',
  UPDATE_BOARD = '/questions', // required` + /${id}`
  DELETE_BOARD = '/questions', // required` + /${id}`
  REGIST_COMMENT = '/comments', // required `/questions/${questionId}/comments`
  BLOB_IMAGES = '/images', // required `/questions/{questionId}/images`
  TOGGLE_SUPPORT_COMMENTS = '/supports', // required '/comments/{commentId}/supports'
  TOGGLE_SUPPORT_BOARD = '/supports', // required '/qustions/{commentId}/supports'
  MY_QUESTIONS = '/questions/me',
}

export function registQnaBoard(payload: BoardParam): Promise<unknown> {
  const formdata = objectToFormdata(payload);
  return axios.post<BoardResponse>(API_PREFIX + Api.REGIST_BOARD, formdata, {
    headers: { 'Content-Type': `multipart/form-data` },
  });
}

export function modifyQnaBoard(payload: BoardParam, questionId: string): Promise<unknown> {
  const formdata = objectToFormdata(payload);
  return axios.put<BoardResponse>(API_PREFIX + Api.UPDATE_BOARD + '/' + questionId, formdata, {
    headers: { 'Content-Type': `multipart/form-data` },
  });
}

export function registQnaBoardComment(payload: CommentParam, questionId: string): Promise<unknown> {
  return axios.post<CommentResponse>(API_PREFIX + Api.REGIST_BOARD + '/' + questionId + Api.REGIST_COMMENT, payload);
}
export function modifyQnaBoardComment(payload: CommentParam, questionId: string, commentId: string): Promise<unknown> {
  return axios.put<CommentResponse>(
    API_PREFIX +
      Api.REGIST_BOARD +
      '/' +
      questionId +
      Api.REGIST_COMMENT +
      '?' +
      payloadToQueryString({ questionId: questionId, commentId: commentId }),
    payload
  );
}

export function deleteQnaBoardComment(questionId: string, commentId: string): Promise<unknown> {
  return axios.delete<CommentResponse>(
    API_PREFIX +
      Api.REGIST_BOARD +
      '/' +
      questionId +
      Api.REGIST_COMMENT +
      '?' +
      payloadToQueryString({ questionId: questionId, commentId: commentId })
  );
}

export function getQnaBoardList(payload: BoardListParam): Promise<unknown> {
  return axios.get(API_PREFIX + Api.BOARD_LIST + '?' + payloadToQueryString(payload));
}

export function getMyQnaBoardList(payload: { plantId?: string }): Promise<unknown> {
  return axios.get(API_PREFIX + Api.MY_QUESTIONS + '?' + payloadToQueryString(payload));
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

export function getQuestionImages(boardId: string): Promise<unknown> {
  return axios.get(API_PREFIX + Api.REGIST_BOARD + '/' + boardId + Api.BLOB_IMAGES);
}

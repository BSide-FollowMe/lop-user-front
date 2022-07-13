import axios from '@/utils/http/axios';
import { payloadToQueryString, objectToFormdata } from '@/utils/text';
import type { BoardParam, BoardResponse, BoardListParam, CommentParam, CommentResponse, Question, Image } from '@/types/api/board';
import { ListResponse } from '@/types/api/common';

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

export async function registQnaBoard(payload: BoardParam): Promise<BoardResponse> {
  const formdata = objectToFormdata(payload);
  const res = await axios.post<BoardResponse>(API_PREFIX + Api.REGIST_BOARD, formdata, {
    headers: { 'Content-Type': `multipart/form-data` },
  });
  return res.data;
}

export async function modifyQnaBoard(payload: BoardParam, questionId: string): Promise<BoardResponse> {
  const formdata = objectToFormdata(payload);
  const res = await axios.put<BoardResponse>(API_PREFIX + Api.UPDATE_BOARD + '/' + questionId, formdata, {
    headers: { 'Content-Type': `multipart/form-data` },
  });
  return res.data;
}

export async function registQnaBoardComment(payload: CommentParam, questionId: string): Promise<CommentResponse> {
  const res = await axios.post<CommentResponse>(API_PREFIX + Api.REGIST_BOARD + '/' + questionId + Api.REGIST_COMMENT, payload);
  return res.data;
}
export async function modifyQnaBoardComment(payload: CommentParam, questionId: string, commentId: string): Promise<CommentResponse> {
  const res = await axios.put<CommentResponse>(
    API_PREFIX +
      Api.REGIST_BOARD +
      '/' +
      questionId +
      Api.REGIST_COMMENT +
      '?' +
      payloadToQueryString({ questionId: questionId, commentId: commentId }),
    payload
  );
  return res.data;
}

export async function deleteQnaBoardComment(questionId: string, commentId: string): Promise<CommentResponse> {
  const res = await axios.delete<CommentResponse>(
    API_PREFIX +
      Api.REGIST_BOARD +
      '/' +
      questionId +
      Api.REGIST_COMMENT +
      '?' +
      payloadToQueryString({ questionId: questionId, commentId: commentId })
  );
  return res.data;
}

export async function getQnaBoardList(payload: BoardListParam): Promise<ListResponse<Question>> {
  const res = await axios.get<ListResponse<Question>>(API_PREFIX + Api.BOARD_LIST + '?' + payloadToQueryString(payload));
  return res.data;
}

export async function getMyQnaBoardList(payload: BoardListParam): Promise<ListResponse<Question>> {
  const res = await axios.get<ListResponse<Question>>(API_PREFIX + Api.MY_QUESTIONS + '?' + payloadToQueryString(payload));
  return res.data;
}

export async function getQnaBoardDetail(boardId: string): Promise<BoardResponse> {
  const res = await axios.get<BoardResponse>(API_PREFIX + Api.DELETE_BOARD + '/' + boardId);
  return res.data;
}

export function removeQnaBoard(boardId: string): Promise<void> {
  return axios.delete(API_PREFIX + Api.DELETE_BOARD + '/' + boardId);
}

export function toggleSupportComments(commentId: string): Promise<void> {
  return axios.post(API_PREFIX + Api.REGIST_COMMENT + '/' + commentId + Api.TOGGLE_SUPPORT_COMMENTS);
}

export function toggleSupportQuestions(questionId: string): Promise<void> {
  return axios.post(API_PREFIX + Api.REGIST_BOARD + '/' + questionId + Api.TOGGLE_SUPPORT_BOARD);
}

// export function getImageBlobFromUrl(url: string): Promise<unknown> {
//   return axios.get(url, { responseType: 'blob' });
// }

export async function getQuestionImages(boardId: string): Promise<{ imageList: Image[] }> {
  const res = await axios.get<{ imageList: Image[] }>(API_PREFIX + Api.REGIST_BOARD + '/' + boardId + Api.BLOB_IMAGES);
  return res.data;
}

import axios from '@/utils/http/axios';
import { payloadToQueryString, objectToFormdata } from '@/utils/text';
import { BoardParamModel, BoardRespModel, BoardListParamModel } from './model/boardModel';

const API_PREFIX = '/v1';
enum Api {
  BOARD_LIST = '/questions',
  REGIST_BOARD = '/questions',
  UPDATE_BOARD = '/questions', // required` + /${id}`
  DELETE_BOARD = '/questions', // required` + /${id}`
}

export function registQnaBoard(payload: BoardParamModel): Promise<unknown> {
  const formdata = objectToFormdata(payload);
  return axios.post<BoardRespModel>(API_PREFIX + Api.REGIST_BOARD, formdata, {
    headers: { 'Content-Type': `multipart/form-data` },
  });
}

export function modifyQnaBoard(payload: BoardParamModel): Promise<unknown> {
  const formdata = objectToFormdata(payload);
  return axios.put<BoardRespModel>(API_PREFIX + Api.UPDATE_BOARD, formdata, {
    headers: { 'Content-Type': `multipart/form-data` },
  });
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

export function getImageBlobFromUrl(url: string): Promise<unknown> {
  return axios.get(url, { responseType: 'blob' });
}
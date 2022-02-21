import axios from '@/utils/http/axios';
import { payloadToQueryString, objectToFormdata } from '@/utils/text';
import { BoardParamModel, BoardRespModel } from './model/boardModel';

const API_PREFIX = '/v1';
enum Api {
  BOARD_LIST = '/questions',
  REGIST_BOARD = '/questions',
  UPDATE_BOARD = '/questions', // required` + /${id}`
}

export function registQnaBoard(payload: BoardParamModel): Promise<unknown> {
  const formdata = objectToFormdata(payload);
  return axios.post<BoardRespModel>(API_PREFIX + Api.REGIST_BOARD, formdata,{
    headers: { 'Content-Type': `multipart/form-data` },
  });
}

export function getQnaBoardList(): Promise<unknown> {
  return axios.get(API_PREFIX + Api.BOARD_LIST);
}
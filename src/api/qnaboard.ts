import axios from '@/utils/http/axios';
import { payloadToQueryString } from '@/utils/text';
import { BoardParamModel, BoardRespModel } from './model/boardModel';

const API_PREFIX = '/v1';
enum Api {
  REGIST_BOARD = '/questions',
  UPDATE_BOARD = '/questions', // required` + /${id}`
}

export function registQnaBoard(payload: BoardParamModel): Promise<unknown> {
  return axios.post<BoardRespModel>(API_PREFIX + Api.REGIST_BOARD, payload);
}

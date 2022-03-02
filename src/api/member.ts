import axios from '@/utils/http/axios';
import { Member, Answer, Question } from './model/memberModel';
import { PlantListData } from './model/plantModel';
import { ListResponse } from './model/common';
import { payloadToQueryString, objectToFormdata } from '@/utils/text';

const API_PREFIX = '/v1';
enum Api {
  ME = '/members/me',
  UPDATE_ME = `/members`,
  POST_WITHDRAWAL = '/withdrawal',
  GET_FAVORITE = '/favorite/me',
  GET_QUESTION = '/questions/me',
  GET_ANSWER = '/comments/me',
}

export async function getMyAccountInfo(): Promise<Member> {
  const res = await axios.get<Member>(`${API_PREFIX}${Api.ME}`);
  return res.data;
}

export async function updateMyAccount({ nickname }: { nickname: string }): Promise<{ nickname: string }> {
  const res = await axios.put<{ nickname: string }>(`${API_PREFIX}${Api.UPDATE_ME}`, {
    nickname,
  });
  return res.data;
}

export async function withdrawal(): Promise<void> {
  return await axios.post(`${API_PREFIX}${Api.POST_WITHDRAWAL}`);
}

export async function getMyFavorite({ size = 10, page }: { size: number; page: number }): Promise<ListResponse<PlantListData>> {
  const res = await axios.get<ListResponse<PlantListData>>(`${API_PREFIX}${Api.GET_FAVORITE}?${payloadToQueryString({ size, page })}`);
  return res.data;
}

export async function getMyQuestions({ size = 10, page }: { size: number; page: number }): Promise<ListResponse<Question>> {
  const res = await axios.get<ListResponse<Question>>(`${API_PREFIX}${Api.GET_QUESTION}?${payloadToQueryString({ size, page })}`);
  return res.data;
}

export async function getMyAnswers({ size = 10, page }: { size: number; page: number }): Promise<ListResponse<Answer>> {
  const res = await axios.get<ListResponse<Answer>>(`${API_PREFIX}${Api.GET_ANSWER}?${payloadToQueryString({ size, page })}`);
  return res.data;
}

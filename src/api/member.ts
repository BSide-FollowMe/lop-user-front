import axios from '@/utils/http/axios';
import { Member } from './model/memberModel';

const API_PREFIX = '/v1';
enum Api {
  ME = '/members/me',
  UPDATE_ME = `/members`,
  POST_WITHDRAWAL='/withdrawal'
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

export async function withdrawal():Promise<void>{
  return await axios.post(`${API_PREFIX}${Api.POST_WITHDRAWAL}`);
}
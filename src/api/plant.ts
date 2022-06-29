import axios from '@/utils/http/axios';
import { payloadToQueryString } from '@/utils/text';
import { PlantListParam, Plant, PlantDetailParam, PlantDetailResponse, ReportParam } from '@/types/api/plant';
import { getClientIpAddress } from '@/utils/http/client';
import { ListResponse } from '@/types/api/common';

const API_PREFIX = '/v1';
enum Api {
  PLANT_LIST = '/plants',
  PLANT_DETAIL = '/plants', // required` + /${plantId}`
  REGISTER_LIKE = '/plants',
  POLL_DIFFICULTY = '/plants',
  REPORT_REGIST = '/reports',
  RECOMMEND_PLANT_LIST = '/recommend-plants',
}

export async function getPlantList(payload: PlantListParam): Promise<ListResponse<Plant>> {
  const res = await axios.get<ListResponse<Plant>>(API_PREFIX + Api.PLANT_LIST + '?' + payloadToQueryString(payload));
  return res.data;
}

export async function getRecommendPlants(): Promise<Plant[]> {
  const res = await axios.get<Plant[]>(API_PREFIX + Api.RECOMMEND_PLANT_LIST);
  return res.data;
}

export async function getPlantDetail(payload: PlantDetailParam): Promise<PlantDetailResponse> {
  const res = await axios.get<PlantDetailResponse>(API_PREFIX + Api.PLANT_DETAIL + '/' + payload.plantId);
  return res.data;
}

export async function registerLike({
  plantId,
  memberId,
  isAdded,
}: {
  plantId: number;
  memberId: number;
  isAdded: boolean;
}): Promise<unknown> {
  return await axios.put(`${API_PREFIX}${Api.REGISTER_LIKE}/${plantId}/favorite`, {
    plantId,
    memberId,
    isAdded,
  });
}

export async function pollDifficulty({ plantId, memberId, type }: { plantId: number; memberId?: number; type: string }): Promise<void> {
  const ip = await getClientIpAddress();
  return await axios.put(`${API_PREFIX}${Api.POLL_DIFFICULTY}/${plantId}/poll-growth`, {
    ip,
    plantId,
    memberId,
    type,
  });
}

export async function registReport(payload: Partial<ReportParam>): Promise<void> {
  return axios.post(API_PREFIX + Api.REPORT_REGIST, payload);
}

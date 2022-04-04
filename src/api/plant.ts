import axios from '@/utils/http/axios';
import { payloadToQueryString } from '@/utils/text';
import { PlantListParamModel, PlantListRespModel, PlantListData, PlantDetailParamModel, PlantDetailRespModel, ReportParamModel } from './model/plantModel';
import { getClientIpAddress } from '@/utils/http/client';

const API_PREFIX = '/v1';
enum Api {
  PLANT_LIST = '/plants',
  PLANT_DETAIL = '/plants', // required` + /${plantId}`
  REGISTER_LIKE = '/plants',
  POLL_DIFFICULTY = '/plants',
  REPORT_REGIST = '/reports',
  RECOMMEND_PLANT_LIST = '/recommend-plants',
}

export async function getPlantList(payload: PlantListParamModel): Promise<{data:PlantListRespModel}> {
  return axios.get(API_PREFIX + Api.PLANT_LIST + '?' + payloadToQueryString(payload));
}

export async function getRecommendPlantList(): Promise<PlantListData[]> {
  return axios.get(API_PREFIX + Api.RECOMMEND_PLANT_LIST);
}

export async function getPlantDetail(payload: PlantDetailParamModel): Promise<PlantDetailRespModel> {
  const res = await axios.get<PlantDetailRespModel>(API_PREFIX + Api.PLANT_DETAIL + '/' + payload.plantId);
  return res.data;
}

export async function registerLike({ plantId, memberId, isAdded }: { plantId: number; memberId: number; isAdded: boolean }): Promise<unknown> {
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

export async function registReport(payload: ReportParamModel): Promise<void> {
  return axios.post(API_PREFIX + Api.REPORT_REGIST, payload);
}

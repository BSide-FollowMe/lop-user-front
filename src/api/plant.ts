import axios from '@/utils/http/axios';
import { payloadToQueryString } from '@/utils/text';
import { PlantListParamModel, PlantListRespModel, PlantListData, PlantDetailParamModel, PlantDetailRespModel, ReportParamModel } from './model/plantModel';
import { getClientIpAddress } from '@/utils/http/client';

const API_PREFIX = '/v1';
enum Api {
  PLANT_LIST = '/plants',
  PLANT_DETAIL = '/plants', // required` + /${plantId}`
  POLL_DIFFICULTY = '/plants',
  REPORT_REGIST = '/reports',
}

export async function getPlantList(payload: PlantListParamModel): Promise<PlantListData[]> {
  return axios.get(API_PREFIX + Api.PLANT_LIST + '?' + payloadToQueryString(payload));
}

export async function getPlantDetail(payload: PlantDetailParamModel): Promise<PlantDetailRespModel> {
  const res = await axios.get<PlantDetailRespModel>(API_PREFIX + Api.PLANT_DETAIL + '/' + payload.plantId);
  return res.data;
}

// export function registerFavorite({plantId:integer}): Promise<unknown> {
//   return axios.put()
// }

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

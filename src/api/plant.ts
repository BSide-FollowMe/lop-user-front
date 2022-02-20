import axios from '@/utils/http/axios';
import { payloadToQueryString } from '@/utils/text';
import { PlantListParamModel, PlantListRespModel, PlantDetailParamModel, PlantDetailRespModel } from './model/plantModel';

const API_PREFIX = '/v1';
enum Api {
  PLANT_LIST = '/plants',
  PLANT_DETAIL = '/plants', // required` + /${plantId}`
}

export function getPlantList(payload: PlantListParamModel): Promise<unknown> {
  return axios.get<PlantListRespModel>(API_PREFIX + Api.PLANT_LIST + '?' + payloadToQueryString(payload));
}

export function getPlantDetail(payload: PlantDetailParamModel): Promise<unknown> {
  return axios.get<PlantDetailRespModel>(API_PREFIX + Api.PLANT_LIST + '?' + payloadToQueryString(payload));
}

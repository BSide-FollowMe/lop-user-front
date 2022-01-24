import axios from '@/utils/http/axios';
import { PlantListResponse, PlantResponse } from './model/adminModel';
import { ListResponse } from './model/common';

const API_PREFIX = '/admin/v1';
enum Api {
  GET_PLANTS = 'plants', // ?keyword=test1&page=0&size=10
  GET_PLANT = 'plants',
}

export const getPlants = async ({
  keyword,
  page,
  size,
}: {
  keyword: string;
  page: number;
  size: number;
}): Promise<ListResponse<PlantListResponse[]>> => {
  const res = await axios.get<ListResponse<PlantListResponse[]>>(
    `${API_PREFIX}/${Api.GET_PLANTS}?${keyword ? `&keyword=${keyword}` : ``}${page ? `&page=${page}` : ``}${size ? `&size:${size}` : ``}`,
  );
  return res.data;
};

export const getPlant = async (id: number): Promise<PlantResponse> => {
  const res = await axios.get<PlantResponse>(`${API_PREFIX}/${Api.GET_PLANT}/${id}`);
  return res.data;
};

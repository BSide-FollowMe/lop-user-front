import { blight, category, sunlightType, winterTemperatureUpDown } from 'plant';

export interface GetAccountInfoModel {
  email: string;
  name: string;
  introduction: string;
  phone: string;
  address: string;
}

export interface PlantListParamModel {
  keyword?: string;
  page?: string;
  size?: string;
}

export interface PlantListRespModel {
  data: PlantListData[];
  page: string;
  size: string;
  totalElement: string;
  totalPage: string;
}

export interface PlantListData {
  category?: string;
  categoryTitle?: string;
  createdDateTime?: string;
  fileName?: string;
  fileUrl?: string;
  hasImage?: string;
  id: string;
  isVisible?: string;
  modifiedDateTime?: string;
  name?: string;
  nickname?: string;
}

export interface PlantDetailParamModel {
  plantId: string;
}

export interface PlantDetailRespModel {
  blights?: blight[];
  category?: category;
  categoryTitle?: string;
  createdDateTime?: string;
  fileName?: string;
  fileSource?: string;
  fileSourceLink?: string;
  fileUrl?: string;
  growthEasy: string;
  growthHard: string;
  id: string;
  isToxicity?: string;
  isVentilation?: string;
  isVisible?: string;
  maxHumidity?: string;
  minHumidity?: string;
  modifiedDateTime?: string;
  name: string;
  nickname?: string;
  pollGrowth: {
    growthEasy: number;
    growthHard: number;
    type: 'EASY' | 'HARD';
  };
  isFavorite: boolean;
  properTemperature?: string;
  scientificName?: string;
  soil?: string;
  sunlight?: string;
  sunlightTypes?: sunlightType[];
  temperatureExtra?: string;
  waterPeriod?: string;
  winterTemperature?: string;
  winterTemperatureUpDown?: winterTemperatureUpDown;
}

export interface ReportParamModel {
  content: string;
  email: string;
  plantId?: number | string;
  reportType: string;
}

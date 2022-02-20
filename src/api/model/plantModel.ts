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

interface PlantListData {
  category?: string;
  categoryTitle?: string;
  createdDateTime?: string;
  fileName?: string;
  fileUrl?: string;
  hasImage?: string;
  id?: string;
  isVisible?: string;
  modifiedDateTime?: string;
  name?: string;
  nickname?: string;
}

export interface PlantDetailParamModel {
  plantId: string;
}

export interface PlantDetailRespModel {
  blights?: string[];
  category?: string;
  categoryTitle?: string;
  createdDateTime?: string;
  fileName?: string;
  fileSource?: string;
  fileSourceLink?: string;
  fileUrl?: string;
  growthEasy?: string;
  growthHard?: string;
  id?: string;
  isToxicity?: string;
  isVentilation?: string;
  isVisible?: string;
  maxHumidity?: string;
  minHumidity?: string;
  modifiedDateTime?: string;
  name?: string;
  nickname?: string;
  pollGrowth?: {
    growthEasy?: string;
    growthHard?: string;
  }
  properTemperature?: string;
  scientificName?: string;
  soil?: string;
  sunlight?: string;
  sunlightTypes?: string[];
  temperatureExtra?: string;
  waterPeriod?: string;
  winterTemperature?: string;
  winterTemperatureUpDown?: string;
}
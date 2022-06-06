import { blight, category, sunlightType, winterTemperatureUpDown } from 'plant';
import { Question } from './board';

export type GetAccountInfoModel = {
  email: string;
  name: string;
  introduction: string;
  phone: string;
  address: string;
};

export type PlantListParam = {
  keyword?: string;
  page?: number;
  size: number;
};

export type Plant = {
  category: category;
  categoryTitle: string;
  createdDateTime: string;
  fileName: string;
  fileUrl: string;
  hasImage: string;
  id: string;
  isVisible: string;
  modifiedDateTime: string;
  name: string;
  nickname: string;
};

export type PlantDetailParam = {
  plantId: string;
};

export type PlantDetailResponse = Nullable<
  Omit<Plant, 'hasImage'>,
  'category' | 'categoryTitle' | 'createdDateTime' | 'fileName' | 'fileUrl' | 'isVisible' | 'modifiedDateTime' | 'nickname'
> & {
  blights?: blight[];
  fileSource?: string;
  fileSourceLink?: string;
  growthEasy: string;
  growthHard: string;
  id: string;
  isToxicity?: boolean;
  isVentilation?: boolean;
  maxHumidity?: string;
  minHumidity?: string;
  name: string;
  pollGrowth: {
    growthEasy: number;
    growthHard: number;
    type: 'EASY' | 'HARD';
  };
  questions: {
    data: Question[];
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
};

export type ReportParam = {
  content: string;
  email: string;
  plantId?: number | string;
  reportType: string;
};

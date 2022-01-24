export interface PlantParamModel {
  keyword?: string;
  page: number;
  size: number;
}

export interface PlantListResponse {
  id: string;
  name: string;
  nickname: string;
  isVisible: boolean;
  hasImage: boolean;
  createdDateTime: Date;
  modifiedDateTime: Date;
}
// hasImage로 인해 Plant 상속 불가능
export interface PlantResponse {
  id: number;
  name: string;
  nickname: string;
  isVisible: boolean;
  createdDateTime: Date;
  modifiedDateTime: Date;
  growthEasy: number;
  growthHard: number;
  waterPeriod: string;
  blights: string[];
  sunlightTypes: string[];
  sunlight: string;
  properTemperature: string;
  isVentilation: boolean;
  isToxicity: boolean;
  category: string;
  scientificName: string;
  fileName: string;
  fileUrl: string;
  fileSource: string;
  fileSourceLink: string;
  winterTemperature: number;
  humidity: number;
  temperatureExtra: string;
  soil: string;
}

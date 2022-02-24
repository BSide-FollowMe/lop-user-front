export interface BoardListParamModel {
  keyword: string;
  page: number;
  size?: number;
}

export interface BoardParamModel {
  content: string;
  type: string;
  plantWaterCycle?: string;
  plantName?: string;
  plantLifeCycle?: string;
  plantId?: string;
  plantCountermeasure?: string;
  images?: string[];
}

export interface BoardRespModel {
  comments: {
    data: CommentData[];
    page: string;
    size: string;
    totalElement: string;
    totalPage: string;
  };
  content: string;
  createdDateTime: string;
  id: string;
  images: {
    imageUrl: string;
    name: string;
  }[];
  isSupport: boolean;
  modifiedDateTime: string;
  plantCountermeasure: string;
  plantLifeCycle: string;
  plantName: string;
  plantWaterCycle: string;
  supportCount: number;
  type: string;
  writer: {
    id: string;
    nickname: string;
  };
}
interface CommentData {
  commentOrder: string;
  content: string;
  createdDateTime: string;
  deletedDateTime: string;
  id: string;
  isSupport: boolean;
  modifiedDateTime: string;
  refId: string;
  supportCount: number;
  writer: {
    id: string;
    nickname: string;
  };
}
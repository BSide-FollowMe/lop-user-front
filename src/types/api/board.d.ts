export type BoardListParam = {
  keyword?: string;
  page: number;
  size?: number;
  plantId?: string | number;
};

export type BoardParam = {
  questionId?: string;
  content: string;
  type: string;
  plantWaterCycle?: string;
  plantName?: string;
  plantLifeCycle?: string;
  plantId?: string;
  plantCountermeasure?: string;
  images?: string[];
};

type CommentData = {
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
};
export type BoardResponse = {
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
  plantId: string;
  plantLifeCycle: string;
  plantName: string;
  plantWaterCycle: string;
  supportCount: number;
  type: string;
  writer: {
    id: string;
    nickname: string;
  };
};

export type CommentParam = {
  content: string;
  refId?: number | string;
};

export type CommentResponse = {
  commentOrder: number | string;
  content: string;
  createdDateTime: string;
  deletedDateTime: string;
  id: number | string;
  isSupport: string;
  modifiedDateTime: string;
  refId: number | string;
  supportCount: number | string;
  writer: {
    id: number | string;
    nickname: string;
  };
};

type Post = {
  id: string | number;
  createdDateTime: string;
  plantName: string;
  supportCount: number;
};

export type Answer = {
  commentContent: string;
  questionContent: string;
  questionId: number;
  commentOrder: number;
} & Post;

export type Question = {
  commentCount: number;
  content: string;
  imageUrl: string;
} & Post;

export type Image = {
  imageBinary: string;
  name: string;
};

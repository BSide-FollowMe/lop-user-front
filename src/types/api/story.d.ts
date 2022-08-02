import type { Plant } from './plant';
import type { ListResponse } from './common';

export type Story = {
  commentCount: number;
  content: string;
  createdDateTime: string;
  id: number;
  imageUrl: string;
  supportCount: number;
};

export type StoryImage = {
  imageUrl: string;
  name: string;
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

export type StoryWriter = {
  id: number;
  memberImageUrl: string;
  nickname: string;
};

export type StoryDetail = {
  comments: ListResponse<CommentData>;
  content: string;
  createdDateTime: string;
  id: number;
  images: StoryImage[];
  isSupport: boolean;
  modifiedDateTime: string;
  plantList: Plant[];
  supportCount: number;
  writer: StoryWriter;
};

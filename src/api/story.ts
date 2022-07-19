import axios from '@/utils/http/axios';
import { payloadToQueryString, objectToFormdata } from '@/utils/text';
import { ListResponse } from '@/types/api/common';
import { Story, StoryImage } from '@/types/api/story';

const API_PREFIX = '/v1/stories';
enum Api {
  images = '/images',
}

export async function getStories(payload: { page: number; plantId: number; size: number }): Promise<ListResponse<Story>> {
  const res = await axios.get<ListResponse<Story>>(API_PREFIX + '?' + payloadToQueryString(payload));
  return res.data;
}

export async function postStory(payload: { content: string; images: string[]; plantIdList: number[] }): Promise<void> {
  const res = await axios.post(API_PREFIX, objectToFormdata(payload));
  return res.data;
}

export async function getStoryImages(payload: { storyId: number }): Promise<StoryImage[]> {
  const res = await axios.get(API_PREFIX + '/' + payload.storyId + '/' + Api.images);
  return res.data;
}

export async function getStory(payload: { storyId: number }): Promise<Story> {
  const res = await axios.get(API_PREFIX + `/${payload.storyId}`);
  return res.data;
}

export async function updateStory(payload: { content: string; images: string[]; plantIdList: number[]; storyId: number }): Promise<void> {
  const res = await axios.put(
    API_PREFIX + `/${payload.storyId}`,
    objectToFormdata({
      content: payload.content,
      images: payload.images,
      playIdList: payload.plantIdList,
    }),
  );
  return res.data;
}

export async function deleteStory(payload: { storyId: number }): Promise<void> {
  const res = await axios.delete(API_PREFIX + `/${payload.storyId}`);
  return res.data;
}
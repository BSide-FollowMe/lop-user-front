export type MemberLevel = {
  grade: string;
  likeCount: number;
  pollCount: number;
  postingContentCount: number;
};

export type Member = {
  email: string;
  id: number;
  memberLevel: MemberLevel;
  nickname: string;
};

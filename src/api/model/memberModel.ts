interface MemberLevel {
  grade: string;
  likeCount: number;
  pollCount: number;
  postingContentCount: number;
}

export interface Member {
  email: string;
  id: number;
  memberLevel: MemberLevel;
  nickname: string;
}

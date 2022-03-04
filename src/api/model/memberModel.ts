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

export interface Answer {
  commentContent: string;
  createdDateTime: string;
  id: number;
  plantName: string;
  questionContent: string;
  supportCount: number;
  questionId: number;
  commentOrder: number;
}

export interface Question {
  commentCount: number;
  content: string;
  createdDateTime: string;
  id: number;
  imageUrl: string;
  plantName: string;
  supportCount: number;
}

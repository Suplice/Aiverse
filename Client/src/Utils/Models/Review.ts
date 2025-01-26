export type Review = {
  Id: number;
  CommentValue: string;
  UserId: number;
  Stars: number;
  AiServiceId: number;
  HasReplies: boolean;
  Likes: number;
  Dislikes: number;
  CreatedAt: Date;
};

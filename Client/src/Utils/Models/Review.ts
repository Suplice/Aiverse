export type Review = {
  Id: number;
  CommentValue: string;
  UserId: number;
  Stars: number;
  AiServiceId: number;
  hasComments: boolean;
  likes: number;
  dislikes: number;
};

export type Comment = {
  Id: number;
  CommentValue: string;
  UserId: number;
  ReviewId: number;
  ParentId: number;
  hasComments: boolean;
  likes: number;
  dislikes: number;
};

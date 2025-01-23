export type Comment = {
  Id: number;
  CommentValue: string;
  UserId: number;
  ReviewId: number;
  ParentId: number;
  HasComments: boolean;
  Likes: number;
  Dislikes: number;
};

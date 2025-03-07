export type Comment = {
  Id: number;
  CommentValue: string;
  UserId: number;
  ReviewId: number;
  ParentId: number;
  HasReplies: boolean;
  Likes: number;
  Dislikes: number;
  CreatedAt: Date;
};

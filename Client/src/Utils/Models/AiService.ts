export type AiService = {
  Id: number;
  Title: string;
  Description: string;
  FullDescription?: string;
  Price: string;
  Categories: string[];
  Image: string;
  Stars: number;
  Reviews: number;
  Status: "Verified" | "Declined" | "Pending";
  CreatedAt?: Date;
  CreatorId: number;
};

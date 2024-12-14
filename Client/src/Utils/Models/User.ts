export type User = {
  Id: number;
  Email: string;
  Provider: string;
  Name?: string;
  Picture?: string;
  CreatedAt?: string;
  Role: "USER" | "ADMIN" | "MODERATOR";
};

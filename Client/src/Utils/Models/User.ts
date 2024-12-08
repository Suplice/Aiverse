export type User = {
  Id: string;
  Email: string;
  provider: string;
  Name?: string;
  Picture?: string;
  CreatedAt: string;
  role: "authenticated" | "admin" | "moderator" | "guest";
};

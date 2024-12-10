export type User = {
  Id: number;
  Email: string;
  Provider: string;
  Name?: string;
  Picture?: string;
  CreatedAt?: string;
  Role: "USER" | "ADMIN" | "MODERATOR";
};

export type SignInFormData = {
  Email: string;
  Password: string;
  RememberMe: boolean;
};

export type SignUpFormData = {
  Email: string;
  Password: string;
  ConfirmPassword: string;
  Provider?: string;
};

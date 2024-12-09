export type User = {
  Id: number;
  Email: string;
  provider: string;
  Name?: string;
  Picture?: string;
  CreatedAt: string;
  role: "USER" | "ADMIN" | "MODERATOR";
};

export type SignInFormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type SignUpFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

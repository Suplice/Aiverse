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

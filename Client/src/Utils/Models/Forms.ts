export type SignInFormData = {
  Email: string;
  Password: string;
};

export type SignUpFormData = {
  Email: string;
  Password: string;
  ConfirmPassword: string;
  Provider?: string;
};

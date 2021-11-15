export interface AuthSignUp {
  username: string;
  email: string;
  password: string;
}

export interface AuthConfirmSignUp {
  username: string;
  code: string;
}

export interface AuthSignIn {
  username: string;
  password: string;
}

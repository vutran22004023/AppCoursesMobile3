export interface User {
  name?: string | '';
  email?: string | '';
  password: string | '';
  isAdmin?: boolean | '';
  status?: boolean | '';
  avatar?: string | '';
  confirmPassword?: string | '';
}

export interface ResetPassProps {
  password?: string;
  confirmPassword?: string;
  token?: string;
}
export interface StatusAuthProps {
  status?: boolean;
  token?: string;
}

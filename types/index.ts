
export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  name?: string | '';
  email?: string | '';
  password: string | '';
  isAdmin?: boolean | '';
  status?: boolean | '';
  avatar?: string | '';
  confirmPassword?: string | '';
}

export interface ApiResponse {
  status: number;
  message: string;
  data?: any; // Thêm nếu phản hồi có chứa dữ liệu khác
}


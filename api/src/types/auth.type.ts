export interface IRegisterBody {
  name: string;
  email: string;
  password: string;
}

export interface ILoginBody {
  email: string;
  password: string;
}

export interface IUpdateProfile {
  name: string;
  email: string;
}

export interface IForgetPasswordBody {
  email: string;
}

export interface IResetPasswordBody {
  token: string;
  password: string;
}

export interface IChangePasswordBody {
  currentPassword: string;
  newPassword: string;
}

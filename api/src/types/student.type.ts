import type { Document, Types } from 'mongoose';

interface ITwoFactorMethod {
  [key: string]: string;
}
export interface IStudent extends Document {
  id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  countryCode: string;
  role: number;
  status: number;
  googleId?: string;
  facebookId?: string;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  generateResetToken: () => string;
  comparePassword: (enteredPassword: string) => Promise<boolean>;
  isDeleted: boolean;
  twoFAOtp: string;
  isTwoAuthEnabled: boolean;
  appToken: StudentIAppSecret;
  createdAt: Date;
  updatedAt: Date;
  preferredTwoFAMethods?: ITwoFactorMethod[];
  recoveryCodes: StudentIRecoveryCode[];
  [key: string]: any;
}

export interface UnifiedStudentServiceResponse {
  status: number;
  success: boolean;
  message: string;
  data: any | null;
}

export interface StudentSetPasswordTokenResult {
  token: string;
  hashedToken: string;
  expireDate: Date;
}

export interface StudentIAppSecret {
  ascii: string;
  hex: string;
  base32: string;
  otpauth_url: string;
}

export interface StudentIRecoveryCode {
  code: string; // The hashed recovery code
  used: boolean; // Indicates if the code has been used
}

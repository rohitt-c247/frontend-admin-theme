// Built-in modules
import crypto from 'node:crypto';
import env from '@config/envVar';
import { logger } from '@config/logger';
import { defaultRole } from '@config/role';
import {
  BAD_REQUEST,
  CONFLICT,
  CREATED,
  NOT_FOUND,
  OK,
  SERVER_ERROR,
  UNAUTHORIZE,
  authMessages,
  commonMessages,
  commonVariables,
  emailTemplatesVariables,
  twoFAMessages,
} from '@constants';
// Types
import type {
  AuthTokenPayload,
  IApiResponse,
  IChangePasswordBody,
  ICustomError,
  IForgetPasswordBody,
  ILoginBody,
  IRegisterBody,
  IResetPasswordBody,
  IUpdateProfile,
  IUser,
} from '@customTypes';
import { TwoFactorMethod, UserStatus } from '@enums';
// Models
import { User } from '@models';
import { twoFAService } from '@services';
// Utilities
import { authHandler, commonHandler, emailHandler, generateTokenHandler } from '@utils';
// Third-party modules
import type { Response } from 'express';

/**
 * Handles user registration
 * @param {IRegisterBody} data User registration data
 * @returns {Promise<IApiResponse>} Response containing the created user or error information
 */
export const register = async (data: IRegisterBody): Promise<IApiResponse> => {
  const { name, email, password } = data;
  const formatEmail = email.toLowerCase();
  const checkUser = await User.findOne({ email: formatEmail });

  if (checkUser) {
    return {
      status: CONFLICT,
      success: false,
      message: commonMessages.USER_ALREADY_EXISTS,
      data: null,
    };
  }

  const hashedPassword = await authHandler.hashPassword(password);

  const user = await User.create({
    name,
    email: formatEmail,
    password: hashedPassword,
    role: defaultRole,
  });
  if (!user) {
    return {
      status: UNAUTHORIZE,
      success: false,
      message: commonMessages.INTERNAL_SERVER_ERROR,
      data: null,
    };
  }
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  // const verifyToken = await authHandler.generateVerifyEmailToken(payload);

  // const emailInfo = await emailHandler.sendEmailBySlug({
  //   toEmail: email,
  //   toName: `${user.name}`,
  //   templateName: emailTemplatesVariables.emailTemplates[2].slug,
  //   data: { token: verifyToken },
  // });
  // logger.log(`verifyToken: ${verifyToken}`);
  // if (!emailInfo) {
  //   await User.deleteOne({ _id: user._id });
  //   return {
  //     status: SERVER_ERROR,
  //     success: false,
  //     message: commonMessages.EMAIL_NOT_SENT,
  //     data: null,
  //   };
  // }
  return {
    status: CREATED,
    success: true,
    message: authMessages.USER_VERIFY_EMAIL,
    data: null,
  };
};

/**
 * Verifies the user's email address using the provided token.
 * - Decodes and verifies the JWT token.
 * - Finds the user associated with the email in the token.
 * - Checks if the user is already active.
 * - Activates the user if not already active.
 *
 * @param {string} token - JWT token for email verification.
 * @returns {Promise<IApiResponse>} Response indicating the result of the verification process.
 * - Success: Returns status OK and a success message if email is successfully verified.
 * - Failure: Returns appropriate error status and message if verification fails.
 */

export const verifyEmail = async (token: string): Promise<IApiResponse> => {
  try {
    // Verify the token
    let decoded: AuthTokenPayload;

    try {
      decoded = await commonHandler.verifyJwt(token, env.JWT_SECRET);
    } catch (error) {
      const err = error as ICustomError;
      const errorMessage =
        err.name === commonVariables.TOKEN_EXPIRED_ERROR
          ? commonMessages.SESSION_TIMEOUT
          : commonMessages.INVALID_TOKEN;
      return {
        status: UNAUTHORIZE,
        success: false,
        message: errorMessage,
        data: null,
      };
    }
    const email = decoded.email;

    // Find the user by email
    const user = await User.findOne({ email }, { email: 1, status: 1 });
    if (!user) {
      return {
        status: NOT_FOUND,
        success: false,
        message: commonMessages.USER_NOT_FOUND,
        data: null,
      };
    }

    // Check if user is already active
    if (user.status === UserStatus.Active) {
      return {
        status: BAD_REQUEST,
        success: false,
        message: authMessages.USER_VERIFIED,
        data: null,
      };
    }

    // Update user status
    user.status = UserStatus.Active;
    await user.save();

    return {
      status: OK,
      success: true,
      message: authMessages.VERIFY_EMAIL_SUCCESS,
      data: null,
    };
  } catch (error) {
    console.error(error);
    return {
      status: SERVER_ERROR,
      success: false,
      message: commonMessages.FORGET_PASSWORD_ERROR,
      data: error,
    };
  }
};

/**
 * Login a user with email and password. If the user has TwoFA enabled, a verification code will be sent to the selected method.
 * @param {ILoginBody} data - The login data
 * @param {Response} res - The response
 * @returns {Promise<IApiResponse>} - The response
 */
export const login = async (data: ILoginBody, res: Response): Promise<IApiResponse> => {
  const { email, password } = data;
  const formatEmail = email.toLowerCase();
  //  'name email role password isTwoAuthEnabled preferredTwoFAMethods,'
  const user = await User.findOne({ email: formatEmail });

  if (!user) {
    return {
      status: BAD_REQUEST,
      success: false,
      message: commonMessages.INVALID_CREDENTIALS,
      data: null,
    };
  }

  if (user && user.status === 0) {
    return {
      status: BAD_REQUEST,
      success: false,
      message: commonMessages.INVALID_CREDENTIALS,
      data: null,
    };
  }
  const isMatch = await authHandler.comparePassword(password, user.password);

  if (!isMatch) {
    return {
      status: BAD_REQUEST,
      success: false,
      message: commonMessages.INVALID_CREDENTIALS,
      data: null,
    };
  }
  if (user.isTwoAuthEnabled) {
    // Send OTP to the selected method
    // Check if the method is already active
    if (user.preferredTwoFAMethods?.find((dt: any) => dt.methodType === TwoFactorMethod.EMAIL)) {
      await twoFAService.sendOtpToMail(email, user.password);
      return {
        status: OK,
        success: true,
        message: twoFAMessages.VERIFICATION_CODE_TO_EMAIL,
        data: {
          isTwoAuthEnabled: user.isTwoAuthEnabled,
          token: null,
          role: user.role,
        },
      };
    } else if (user.preferredTwoFAMethods?.find((dt: any) => dt.methodType === TwoFactorMethod.PHONE)) {
      await twoFAService.sendSmsCode(user.phoneNumber);
      return {
        status: OK,
        success: true,
        message: twoFAMessages.VERIFICATION_CODE_TO_PHONE,
        data: {
          isTwoAuthEnabled: user.isTwoAuthEnabled,
          token: null,
          role: user.role,
        },
      };
    } else if (user.preferredTwoFAMethods?.find((dt: any) => dt.methodType === TwoFactorMethod.APP)) {
      // send QR
      await twoFAService.createQRCode(user.email);
      return {
        status: OK,
        success: true,
        message: twoFAMessages.VERIFICATION_CODE_TO_PHONE,
        data: {
          isTwoAuthEnabled: user.isTwoAuthEnabled,
          token: null,
          role: user.role,
        },
      };
    } else {
      return {
        status: BAD_REQUEST,
        success: true,
        message: twoFAMessages.INVALID_TWOFA,
        data: {
          isTwoAuthEnabled: user.isTwoAuthEnabled,
          token: null,
          role: user.role,
        },
      };
    }
  } else {
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };
    return {
      status: OK,
      success: true,
      message: authMessages.LOGIN_SUCCESS,
      data: {
        token: await generateTokenHandler.generateAuthToken(res, payload),
        role: user.role,
        isTwoAuthEnabled: user.isTwoAuthEnabled,
      },
    };
  }
};

/**
 * Returns the user profile.
 * @param {IUser} user - The user object.
 * @return {IApiResponse} - The response object.
 */
export const userProfile = async (user: IUser): Promise<IApiResponse> => {
  return {
    status: OK,
    success: true,
    message: authMessages.USER_PROFILE,
    data: user,
  };
};

/**
 * Updates user profile information.
 * @param {IUser} userData - The user object to be updated.
 * @param {IUpdateProfile} data - The user profile data to be updated.
 * @returns {Promise<IApiResponse>} - The response object with the updated user object.
 */
export const updateProfile = async (userData: IUser, data: IUpdateProfile): Promise<IApiResponse> => {
  const { name, email } = data;

  if (email && email !== userData.email && (await User.findOne({ email })))
    return {
      status: CONFLICT,
      success: false,
      message: commonMessages.USER_ALREADY_EXISTS,
      data: null,
    };

  Object.assign(userData, {
    name: name || userData.name,
    email: email || userData.email,
  });

  const updatedUser = await userData.save();

  return {
    status: CREATED,
    success: true,
    message: authMessages.UPDATE_PROFILE,
    data: updatedUser,
  };
};

/**
 * Handles user forget password by sending an email with a reset link.
 * @param {IForgetPasswordBody} data - The user email to be used for sending the reset link.
 * @returns {Promise<IApiResponse>} - The response object with the status, success, message and data.
 */
export const forgetPassword = async (data: IForgetPasswordBody): Promise<IApiResponse> => {
  try {
    const { email } = data;
    const user = await User.findOne({ email });

    if (!user) {
      return {
        status: OK,
        success: true,
        message: commonMessages.SHARE_RESET_LINK,
        data: null,
      };
    }

    const { token, hashedToken, expireDate } = await authHandler.generateResetToken();
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = expireDate;

    await user.save();
    logger.log(`token: ${token}`);
    const emailInfo = await emailHandler.sendEmailBySlug({
      toEmail: email,
      toName: `${user.name}`,
      templateName: emailTemplatesVariables.emailTemplates[1].slug,
      data: { token },
    });
    return {
      status: emailInfo ? OK : SERVER_ERROR,
      success: emailInfo,
      message: emailInfo ? commonMessages.SHARE_RESET_LINK : commonMessages.EMAIL_NOT_SENT,
      data: null,
    };
  } catch (error) {
    return {
      status: SERVER_ERROR,
      success: false,
      message: commonMessages.FORGET_PASSWORD_ERROR,
      data: error,
    };
  }
};

/**
 * Resets user password with a valid reset token.
 * @param {IResetPasswordBody} data - The user data to be reset.
 * @returns {Promise<IApiResponse>} - The response object with the status, success, message and data.
 */
export const resetPassword = async (data: IResetPasswordBody): Promise<IApiResponse> => {
  const { token, password } = data;

  const resetToken = await crypto.createHash(`${commonVariables.HASH_METHOD}`).update(token).digest('hex');

  const user = await User.findOne({
    resetPasswordToken: resetToken,
    resetPasswordExpire: { $gt: new Date() }, // Check if token hasn't expired
  });

  if (!user) {
    return {
      status: UNAUTHORIZE,
      success: false,
      message: commonMessages.USER_NOT_FOUND,
      data: user,
    };
  }

  const hashedPassword = await authHandler.hashPassword(password);

  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  return {
    status: CREATED,
    success: true,
    message: authMessages.PASSWORD_CHANGED,
    data: null,
  };
};

/**
 * Changes the user's password.
 * @param {IUser} user - The user instance.
 * @param {IChangePasswordBody} data - The user data to be changed.
 * @returns {Promise<IApiResponse>} - The response object with the status, success, message and data.
 */
export const changePassword = async (user: IUser, data: IChangePasswordBody): Promise<IApiResponse> => {
  const { currentPassword, newPassword } = data;

  const isMatch = await authHandler.comparePassword(currentPassword, user.password);
  if (!isMatch) {
    return {
      status: UNAUTHORIZE,
      success: false,
      message: authMessages.INCORRECT_PASSWORD,
      data: null,
    };
  }

  const hashedPassword = await authHandler.hashPassword(newPassword);

  user.password = hashedPassword;
  await user.save();
  return {
    status: CREATED,
    success: true,
    message: authMessages.PASSWORD_CHANGED,
    data: null,
  };
};

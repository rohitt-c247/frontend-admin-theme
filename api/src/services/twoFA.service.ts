import bcrypt from 'bcryptjs';

import { logger } from '@config/logger';
import { BAD_REQUEST, OK, commonMessages, emailTemplatesVariables, twoFAMessages, twoFAVariables } from '@constants';
import type { IApiResponse } from '@customTypes';
import { TwoFactorMethod } from '@enums';
import { userCommonService } from '@services';
import { emailHandler, generateTokenHandler, twoFAHandler } from '@utils';
import type { Response } from 'express';
import { TOKEN_SENT } from '../constants/messages/twoFA.messages';
import { charSet, otpLength } from '../constants/variables/twoFA.variables';

/**
 * Handles enabling or disabling two factor authentication.
 * @param {string} email - Email of the user
 * @param {string} password - Password of the user
 * @param {boolean} isTwoAuthEnabled - Two factor authentication status
 * @param {TwoFactorMethod} twoFAMethodType - Two factor authentication method type
 * @returns {Promise<IApiResponse>} - The response
 */
export const activeTwoFAAuthentication = async (
  email: string,
  password: string,
  isTwoAuthEnabled: boolean,
  twoFAMethodType: TwoFactorMethod,
): Promise<IApiResponse> => {
  try {
    // Check if the methodType is valid
    if (!Object.values(TwoFactorMethod).includes(twoFAMethodType)) {
      return {
        status: BAD_REQUEST,
        success: false,
        message: twoFAMessages.INVALID_TWOFA_METHOD,
        data: null,
      };
    }
    const userDoc = await userCommonService.getUserByEmail(email);
    if (!userDoc || !(await bcrypt.compare(password, userDoc.password)))
      return {
        status: BAD_REQUEST,
        success: false,
        message: commonMessages.INVALID_CREDENTIALS,
        data: null,
      };
    const updates = {
      isTwoAuthEnabled: isTwoAuthEnabled,
      preferredTwoFAMethods: [{ methodType: twoFAMethodType }],
    };
    // save generated otp in db for verification
    const updatedUserDoc = await userCommonService.updateUserByEmail(email, updates);
    return {
      status: OK,
      success: true,
      message: twoFAMessages.USER_TWOFA_UPDATED,
      data: {
        isTwoAuthEnabled: updatedUserDoc ? updatedUserDoc.isTwoAuthEnabled : null,
        token: null,
        role: updatedUserDoc?.role,
      },
    };
  } catch (error) {
    /** add log for verify response */
    const errorMessage = error instanceof Error ? error.message : commonMessages.INTERNAL_SERVER_ERROR;
    throw new Error(`Error while active TwoFA: ${errorMessage}`);
  }
};

/**
 * Handles sending the two factor authentication code to the user's registered email.
 * @param {string} email - Email of the user
 * @param {string} password - Password of the user
 * @returns {Promise<IApiResponse>} - The response
 */
export const sendOtpToMail = async (email: string, password: string): Promise<IApiResponse> => {
  try {
    const userDoc = await userCommonService.getUserByEmail(email);
    if (!userDoc || !(await bcrypt.compare(password, userDoc.password)))
      return {
        status: BAD_REQUEST,
        success: false,
        message: commonMessages.INVALID_CREDENTIALS,
        data: null,
      };
    /** save secret token for verify user which TwoFA process */
    const otp = await twoFAHandler.generateTwoFAOTP(otpLength, charSet);
    // send generated otp in user registered mail
    await emailHandler.sendEmailBySlug({
      toEmail: email,
      toName: `${userDoc.name}`,
      templateName: emailTemplatesVariables.emailTemplates[3].slug,
      data: { otp },
    });
    // save generated otp in db for verification
    const updates = {
      twoFAOtp: otp,
    };
    await userCommonService.updateUserByEmail(email, updates);
    return {
      status: OK,
      success: true,
      message: TOKEN_SENT,
      data: null,
    };
  } catch (error) {
    /** add log for verify response */
    const errorMessage = error instanceof Error ? error.message : commonMessages.INTERNAL_SERVER_ERROR;
    throw new Error(`Error verifying token: ${errorMessage}`);
  }
};

/**
 * Sends the two-factor authentication code to the user's registered phone number.
 * @param {string} phoneNumber - The phone number of the user.
 * @returns {Promise<IApiResponse>} - The response indicating the success or failure of the operation.
 */

export const sendSmsCode = async (phoneNumber: string): Promise<IApiResponse> => {
  try {
    /** save secret token for verify user which TwoFA process */
    const user = await userCommonService.getUserByPhone(phoneNumber);
    if (!user)
      return {
        status: BAD_REQUEST,
        success: false,
        message: commonMessages.INVALID_CREDENTIALS,
        data: null,
      };
    const phoneNumberWithCode = `${user.countryCode}${phoneNumber}`;
    await twoFAHandler.sendSmsToUser(phoneNumberWithCode, twoFAVariables.TWILO_CHANNEL);
    return {
      status: OK,
      success: true,
      message: twoFAMessages.VERIFICATION_CODE_TO_PHONE,
      data: null,
    };
  } catch (error) {
    /** add log for verify response */
    const errorMessage = error instanceof Error ? error.message : commonMessages.INTERNAL_SERVER_ERROR;
    throw new Error(`Error verifying token: ${errorMessage}`);
  }
};

/**
 * Generates a QR code for the two-factor authentication setup process.
 * @param {string} email - The email of the user.
 * @returns {Promise<IApiResponse>} - The response indicating the success or failure of the operation.
 */
export const createQRCode = async (email: string): Promise<IApiResponse> => {
  try {
    const userDoc = await userCommonService.getUserByEmail(email);
    if (!userDoc)
      return {
        status: BAD_REQUEST,
        success: false,
        message: commonMessages.INVALID_CREDENTIALS,
        data: null,
      };
    const secretToken = await twoFAHandler.generateAppTokenSecret(email);
    const recoveryCodes = await twoFAHandler.generateRecoveryCodes();

    const updates = {
      appToken: secretToken,
      recoveryCodes: recoveryCodes,
    };

    await userCommonService.updateUserByEmail(email, updates);
    /** save secret token for verify user which TwoFA process */
    const qrCodeUrl = await twoFAHandler.generateAppQR(secretToken);
    return {
      status: OK,
      success: true,
      message: twoFAMessages.VERIFICATION_CODE_TO_PHONE,
      data: { qrCodeUrl: qrCodeUrl, setupKey: secretToken.base32 },
    };
  } catch (error) {
    /** add log for verify response */
    const errorMessage = error instanceof Error ? error.message : commonMessages.INTERNAL_SERVER_ERROR;
    throw new Error(`Error verifying token: ${errorMessage}`);
  }
};

/**
 * Handles verifying the two factor authentication code
 * @param {string} email - Email of the user
 * @param {string} inputOTP - OTP entered by the user
 * @param {Response} res - Express response object
 * @returns {Promise<IApiResponse>} - The response indicating the success or failure of the operation.
 */
export const verifyToken = async (email: string, inputOTP: string, res: Response): Promise<IApiResponse> => {
  try {
    let updates = null;
    /** save secret token for verify user which TwoFA process */
    const user = await userCommonService.getUserByEmail(email);
    if (!user)
      return {
        status: BAD_REQUEST,
        success: false,
        message: commonMessages.INVALID_CREDENTIALS,
        data: null,
      };

    if (!user.isTwoAuthEnabled)
      return {
        status: OK,
        success: true,
        message: twoFAMessages.VERIFICATION_NOT_ACTIVE,
        data: null,
      };
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };
    if (user.preferredTwoFAMethods?.find((dt: any) => dt.methodType === TwoFactorMethod.EMAIL)) {
      const generatedOTP = user ? user?.twoFAOtp : '';
      // biome-ignore lint/complexity/useOptionalChain: <explanation>
      if (!inputOTP || inputOTP?.length !== (generatedOTP && generatedOTP?.length)) {
        return {
          status: BAD_REQUEST,
          success: false,
          message: twoFAMessages.INVALID_OTP,
          data: null,
        };
      }
      for (const char of inputOTP.toString()) {
        if (!charSet.includes(char)) {
          return {
            status: BAD_REQUEST,
            success: false,
            message: twoFAMessages.INVALID_OTP,
            data: null,
          };
        }
      }
      if (Number.parseInt(inputOTP) === Number.parseInt(generatedOTP)) {
        updates = {
          twoFAOtp: '',
        };
      }
      await userCommonService.updateUserByEmail(email, updates);
      return {
        status: OK,
        success: true,
        message: twoFAMessages.SUCCESS,
        data: { token: await generateTokenHandler.generateAuthToken(res, payload), role: user.role },
      };
    } else if (user.preferredTwoFAMethods?.find((dt: any) => dt.methodType === TwoFactorMethod.PHONE)) {
      await twoFAHandler.verifySmsOTP(`${user.countryCode}${user.phoneNumber}`, inputOTP);
      return {
        status: OK,
        success: true,
        message: twoFAMessages.SUCCESS,
        data: { token: await generateTokenHandler.generateAuthToken(res, payload), role: user.role },
      };
    } else if (user.preferredTwoFAMethods?.find((dt: any) => dt.methodType === TwoFactorMethod.APP)) {
      await twoFAHandler.verifyAppOtp(inputOTP, user.appToken);
      return {
        status: OK,
        success: true,
        message: twoFAMessages.SUCCESS,
        data: { token: await generateTokenHandler.generateAuthToken(res, payload), role: user.role },
      };
    } else {
      return {
        status: BAD_REQUEST,
        success: false,
        message: commonMessages.UNKNOWN_ERROR,
        data: null,
      };
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : commonMessages.INTERNAL_SERVER_ERROR;
    logger.error(errorMessage);
    throw new Error(`Error verifying token: ${errorMessage}`);
  }
};

/**
 * Handles verifying the two factor authentication code
 * @param {string} email - Email of the user
 * @param {string} providedCode - Recovery code entered by the user
 * @returns {Promise<IApiResponse>} - The response indicating the success or failure of the operation.
 */
export const validateRecoveryCode = async (email: string, providedCode: string): Promise<IApiResponse> => {
  try {
    const userDoc = await userCommonService.getUserByEmail(email);
    if (!userDoc)
      return {
        status: BAD_REQUEST,
        success: false,
        message: commonMessages.INVALID_CREDENTIALS,
        data: null,
      };
    for (const recovery of userDoc.recoveryCodes) {
      const codeIndex = recovery.code.indexOf(providedCode);
      if (codeIndex !== -1) {
        recovery.used = true;
        await userDoc.save();
        return {
          status: BAD_REQUEST,
          success: true,
          message: twoFAMessages.VAILD_RECOVERY_CODE,
          data: null,
        };
      }
    }
    return {
      status: BAD_REQUEST,
      success: false,
      message: twoFAMessages.INVAILD_RECOVERY_CODE,
      data: null,
    };
  } catch (error) {
    /** add log for verify response */
    const errorMessage = error instanceof Error ? error.message : commonMessages.INTERNAL_SERVER_ERROR;
    throw new Error(`Error verifying token: ${errorMessage}`);
  }
};

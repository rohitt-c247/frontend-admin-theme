"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// constants
const _constants_1 = require("@constants");
// utils
const _utils_1 = require("@utils");
const twoFactorAuthResponses = {
    EnebleTwoFactorAuthResponse: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.twoFAMessages.USER_UPDATED, {
        // '#/components/schemas/EnebleTwoFactorAuthResponse
        $ref: '',
    }),
    SendEmailResponse: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.twoFAMessages.TOKEN_SENT, {
        // #/components/schemas/SendEmailResponse
        $ref: '',
    }),
    VerifyOtpResponse: _utils_1.swaggerHandler.createSuccessResponse(_constants_1.twoFAMessages.OTP_VERIFIED, {
        // '#/components/schemas/VerifyOtpResponse'
        $ref: '',
    }),
};
exports.default = twoFactorAuthResponses;
//# sourceMappingURL=responses.js.map
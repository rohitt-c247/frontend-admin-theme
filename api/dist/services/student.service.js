"use strict";
//Constants
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeStatus = exports.setPassword = exports.updateStudent = exports.deleteStudent = exports.getStudent = exports.createStudent = void 0;
const _constants_1 = require("@constants");
//Utils
// notificationHandler
const _utils_1 = require("@utils");
//Models
//Enums
// NotificationPriority, NotificationType,
const _enums_1 = require("@enums");
const index_1 = require("@config/index");
const _models_1 = require("@models");
const _services_1 = require("@services");
/**
 * Handles Student creation
 * @param {Request} req Express request object
 * @returns {Promise<CreateStudentResponse>} Response containing the created Student or error information
 */
const createStudent = (name, email, password, phoneNumber, gender, dob, status) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield _services_1.studentCommonService.checkIfUserExists(email)) {
        return {
            status: _constants_1.CONFLICT,
            success: false,
            message: _constants_1.commonMessages.USER_ALREADY_EXISTS,
            data: null,
        };
    }
    const { hashedToken, expireDate, token } = yield _utils_1.userHandler.generateSetPasswordToken();
    const hashedPassword = yield _utils_1.authHandler.hashPassword(password);
    const newUser = new _models_1.Student({
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        gender,
        dob,
        status,
        resetPasswordToken: hashedToken,
        resetPasswordExpire: expireDate,
    });
    const createdUser = yield newUser.save();
    index_1.logger.log(`token: ${token}`);
    const emailInfo = yield _utils_1.emailHandler.sendEmailBySlug({
        toEmail: email,
        toName: `${createdUser.name}`,
        templateName: _constants_1.emailTemplatesVariables.emailTemplates[0].slug,
        data: { token },
    });
    return {
        status: _constants_1.CREATED,
        success: true,
        message: emailInfo ? _constants_1.userMessages.USER_CREATED_AND_EMAIL_SENT : _constants_1.userMessages.USER_CREATED_AND_EMAIL_NOT_SENT,
        data: createdUser,
    };
});
exports.createStudent = createStudent;
/**
 * Retrieves users from the database.
 * If a userId is provided, fetch that specific user; otherwise, fetch all users.
 * @param {Request} req Express request object
 * @returns {Promise<GetUsersResponse>} Response containing the user(s) or error information
 */
const getStudent = (userId, pageNumber, pageSize, search, sortBy, // -1 , 1,
orderBy) => __awaiter(void 0, void 0, void 0, function* () {
    if (userId) {
        const user = yield _services_1.studentCommonService.getUserById(userId);
        return {
            status: user ? _constants_1.OK : _constants_1.BAD_REQUEST,
            success: Boolean(user),
            message: user ? _constants_1.userMessages.USER_FETCH_SUCCESS : _constants_1.commonMessages.USER_NOT_FOUND,
            data: user || null,
        };
    }
    // get pagination for manage pagination records
    const { limit, offset } = _utils_1.paginationHandler.getPagination(pageNumber, pageSize);
    /**
     * Manage sorting and pagination
     */
    // /sort_by = createdAt
    // order = asc || desc
    let sort = { createdAt: -1 };
    const order = orderBy ? orderBy : 'createdAt';
    if (sortBy || order) {
        orderBy = orderBy === 'asc' ? 1 : -1;
        sort = { [sortBy]: orderBy };
    }
    const filter = {
    // Modify the filter criteria to include different statuses or roles
    // status: UserStatus.Active,
    // role: Role.User,
    };
    if (search) {
        // biome-ignore lint/complexity/useLiteralKeys: <explanation>
        filter['name'] = { $regex: search, $options: 'i' };
    }
    const users = yield _services_1.studentCommonService.getAllUsers(limit, offset, filter, sort);
    // Fetch total count for pagination metadata
    const total = yield _models_1.Student.countDocuments({ role: _enums_1.Role.User });
    return {
        status: _constants_1.OK,
        success: true,
        message: _constants_1.userMessages.USERS_FETCH_SUCCESS,
        data: { total: total, users: users },
    };
});
exports.getStudent = getStudent;
/**
 * Deletes a user from the database based on the provided user ID.
 * @param {Request} req Express request object
 * @returns {Promise<DeleteUserResponse>} Response containing the deletion result or error information
 */
const deleteStudent = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield _models_1.Student.findByIdAndDelete(userId);
    return {
        status: user ? _constants_1.NO_CONTENT : _constants_1.BAD_REQUEST,
        success: !!user,
        message: user ? _constants_1.userMessages.USER_DELETE_SUCCESS : _constants_1.commonMessages.USER_NOT_FOUND,
        data: null,
    };
});
exports.deleteStudent = deleteStudent;
/**
 * Service to update a user's information (name, email, role, status only)
 * @param {Request} req Express request object
 * @returns {Promise<UpdateUserResponse>} Response containing the updated user or error information
 */
const updateStudent = (userId, name, email, role, status) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield _services_1.studentCommonService.getUserById(userId);
    if (!user)
        return {
            status: _constants_1.BAD_REQUEST,
            success: false,
            message: _constants_1.commonMessages.USER_NOT_FOUND,
            data: null,
        };
    if (email && email !== user.email && (yield _services_1.studentCommonService.checkIfUserExists(email)))
        return {
            status: _constants_1.CONFLICT,
            success: false,
            message: _constants_1.commonMessages.USER_WITH_THIS_EMAIL_ALREADY_EXISTS,
            data: null,
        };
    Object.assign(user, {
        name: name || user.name,
        email: email || user.email,
        role: role || user.role,
        status: status || user.status,
    });
    // await notificationHandler.sendNotification({
    //   recipientId: req?.user?.id,
    //   type: NotificationType.NOTIFICATION,
    //   title: userMessages.USER_UPDATE_NOTIFICATION.title,
    //   message: userMessages.USER_UPDATE_NOTIFICATION.message,
    //   priority: NotificationPriority.MEDIUM,
    // });
    const updatedUser = yield user.save();
    return {
        status: _constants_1.OK,
        success: true,
        message: _constants_1.userMessages.USER_UPDATED_SUCCESS,
        data: updatedUser,
    };
});
exports.updateStudent = updateStudent;
/**
 * Handles user password change
 * @param {Request} req Express request object
 * @returns {Promise<SetPasswordResponse>} Response containing the updated user or error information
 */
const setPassword = (token, password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedToken = yield _utils_1.userHandler.generateHashedToken(token);
    const user = yield _models_1.Student.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { $gt: new Date() },
    });
    if (!user || (user.resetPasswordExpire && user.resetPasswordExpire < new Date())) {
        return {
            status: _constants_1.BAD_REQUEST,
            success: false,
            message: user ? _constants_1.userMessages.USER_SET_PASSWORD_LINK_EXPIRED : _constants_1.userMessages.USER_SET_PASSWORD_LINK_INVALID,
            data: null,
        };
    }
    const hashedPassword = yield _utils_1.authHandler.hashPassword(password);
    user.password = hashedPassword;
    user.status = _enums_1.UserStatus.Active;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    yield user.save();
    return {
        status: _constants_1.OK,
        success: true,
        message: _constants_1.userMessages.USER_PASSWORD_SET_SUCCESS,
        data: null,
    };
});
exports.setPassword = setPassword;
/**
 * Handles user status change
 * @param {Request} req Express request object
 * @returns {Promise<UnifiedStudentServiceResponse>} Response containing the updated user or error information
 */
const changeStatus = (userId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield _services_1.studentCommonService.getUserById(userId);
    if (!user) {
        return {
            status: _constants_1.BAD_REQUEST,
            success: false,
            message: _constants_1.commonMessages.USER_NOT_FOUND,
            data: null,
        };
    }
    user.status = status;
    const updatedUser = yield user.save();
    return {
        status: updatedUser ? _constants_1.OK : _constants_1.SERVER_ERROR,
        success: !!updatedUser,
        message: updatedUser ? _constants_1.userMessages.USER_STATUS_UPDATED : _constants_1.commonMessages.USER_NOT_FOUND,
        data: null,
    };
});
exports.changeStatus = changeStatus;
//# sourceMappingURL=student.service.js.map
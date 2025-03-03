"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagination = void 0;
const _constants_1 = require("@constants");
/**
 * Calculates pagination parameters.
 *
 * @param _page - The current page number.
 * @param _limit - The number of items per page.
 * @returns An object containing the limit and offset for pagination.
 *          - limit: The adjusted number of items per page.
 *          - offset: The offset from the start of the dataset for the current page.
 */
const getPagination = (_page, _limit) => {
    const limit = _limit ? +_limit : _constants_1.commonVariables.paginations.ITEM_LIMIT;
    const offset = _page ? (_page - 1) * limit : _constants_1.commonVariables.paginations.DEFAULT_PAGE;
    return { limit, offset };
};
exports.getPagination = getPagination;
//# sourceMappingURL=pagination.handler.js.map
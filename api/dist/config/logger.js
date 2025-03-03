"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const _utils_1 = require("@utils");
exports.logger = {
    log: (message) => {
        if (_utils_1.commonHandler.isLogger) {
            exports.logger.info(`[LOG]: ${message}`);
        }
    },
    error: (error) => {
        if (_utils_1.commonHandler.isLogger) {
            console.error(`[ERROR]: ${error}`);
        }
    },
    info: (info) => {
        if (_utils_1.commonHandler.isLogger) {
            console.info(`[INFO]: ${info}`);
        }
    },
};
//# sourceMappingURL=logger.js.map
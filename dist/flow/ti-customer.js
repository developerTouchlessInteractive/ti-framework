"use strict";
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
exports.TiCustomer = void 0;
const ti_errors_1 = require("../errors/ti.errors");
const axios = require('axios');
class TiCustomer {
    /**
     *
     * @param url server URL
     * @param sessionId flow server session-id
     * @param flowId flowId to connect to
     * @param customer customer related data
     * @returns Promise resolving to
     */
    registerCustomer(url, sessionId, flowId, customer) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (url === undefined || url.length === 0) {
                    throw new ti_errors_1.InvalidInputException(ti_errors_1.ErrorMesssages.SERVER_URL_INVALID);
                }
                if (sessionId === undefined || sessionId.length === 0) {
                    throw new ti_errors_1.InvalidInputException(ti_errors_1.ErrorMesssages.INVALID_SESSION_INFO);
                }
                if (flowId === undefined || flowId.length === 0) {
                    throw new ti_errors_1.InvalidInputException(ti_errors_1.ErrorMesssages.FLOWID_INVALID);
                }
                if (customer === undefined || customer.length === 0) {
                    throw new ti_errors_1.InvalidInputException(ti_errors_1.ErrorMesssages.CUSTOMER_ID_INVALID);
                }
                const reg_data = { sessionId: sessionId, flowId: flowId, customer: customer };
                const response = yield axios({
                    method: 'post',
                    url: url + 'register/customerByCode',
                    data: reg_data
                });
                console.log(JSON.stringify(response.data, null, 2));
                resolve(response);
            }
            catch (error) {
                if (!error.code) {
                    error = new ti_errors_1.GenericException(JSON.stringify(error, null, 2));
                }
                reject(error);
            }
        }));
    }
    /**
     * register customer by invite code
     * returns resolves to flow/session related details
     * @param url server url -- to register
     * @param inviteCode invite code, from client application
     */
    registerCustomerByCode(url, inviteCode) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (url === undefined || url.length === 0) {
                    throw new ti_errors_1.InvalidInputException(ti_errors_1.ErrorMesssages.SERVER_URL_INVALID);
                }
                if (inviteCode === undefined || inviteCode.length === 0) {
                    throw new ti_errors_1.InvalidInputException(ti_errors_1.ErrorMesssages.INVITE_CODE_INVALID);
                }
                const reg_data = { inviteCode: inviteCode };
                const response = yield axios({
                    method: 'post',
                    url: url + 'register/customerByCode',
                    data: reg_data
                });
                console.log(JSON.stringify(response.data, null, 2));
                resolve(response);
            }
            catch (error) {
                if (!error.code) {
                    error = new ti_errors_1.GenericException(JSON.stringify(error, null, 2));
                }
                reject(error);
            }
        }));
    }
}
exports.TiCustomer = TiCustomer;
//# sourceMappingURL=ti-customer.js.map
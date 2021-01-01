"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.TiFlow = void 0;
const axios = require('axios');
const ti_errors_1 = require("../../errors/ti.errors");
const ti = __importStar(require("../../ti"));
class FlowClient {
    /**
     *
     * @param name name of the flow
     * @param stages stages included in the flow, provide as string array of stageIds
     * @param hostCanAbort optional -> an option for host to abort this flow.
     */
    createFlow(name, stages, hostCanAbort) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (name.length === 0 || !name)
                    throw new ti_errors_1.InvalidInputException(ti_errors_1.ErrorMesssages.INVALID_FLOW_NAME);
                if (stages.length === 0)
                    throw new ti_errors_1.InvalidStagesException();
                const flow = { name: name, stages: stages, hostCanAbort: hostCanAbort ? hostCanAbort : false };
                const response = yield axios({
                    method: 'post',
                    url: ti.URL + 'flow',
                    data: flow
                });
                console.log(JSON.stringify(response.data, null, 2));
                if (!response.data || response.data.length === 0)
                    throw new Error();
                resolve(response.data);
            }
            catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error, null, 2);
                    error = new ti_errors_1.GenericException(errorString ? errorString : ti_errors_1.ErrorMesssages.UNABLE_TO_CREATE_FLOW);
                }
                reject(error);
            }
        }));
    }
    getFlowById(id) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id || id.length === 0)
                    throw new ti_errors_1.InvalidInputException(ti_errors_1.ErrorMesssages.INVALID_FLOW_ID);
                const response = yield axios({
                    method: 'get',
                    url: ti.URL + 'flow/byid/' + id
                });
                console.log(JSON.stringify(response.data, null, 2));
                resolve(response.data);
            }
            catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error, null, 2);
                    error = new ti_errors_1.GenericException(errorString ? errorString : ti_errors_1.ErrorMesssages.UNABLE_TO_FETCH_FLOW);
                }
                reject(error);
            }
        }));
    }
    getFlowDetailById(id) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id || id.length === 0)
                    throw new ti_errors_1.InvalidInputException(ti_errors_1.ErrorMesssages.INVALID_FLOW_ID);
                const response = yield axios({
                    method: 'get',
                    url: ti.URL + 'flow/total/' + id
                });
                console.log(JSON.stringify(response.data, null, 2));
                resolve(response.data);
            }
            catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error, null, 2);
                    error = new ti_errors_1.GenericException(errorString ? errorString : ti_errors_1.ErrorMesssages.UNABLE_TO_FETCH_FLOW);
                }
                reject(error);
            }
        }));
    }
    getAllFlows() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios({
                    method: 'get',
                    url: ti.URL + 'flow/all'
                });
                console.log(JSON.stringify(response.data, null, 2));
                const flows = response.data;
                resolve(flows);
            }
            catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error, null, 2);
                    error = new ti_errors_1.GenericException(errorString ? errorString : ti_errors_1.ErrorMesssages.UNABLE_TO_FETCH_FLOW);
                }
                reject(error);
            }
        }));
    }
    deleteFlow(id) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id || id.length === 0)
                    throw new ti_errors_1.InvalidInputException(ti_errors_1.ErrorMesssages.INVALID_FLOW_ID);
                const data = { id: id };
                const response = yield axios({
                    method: 'post',
                    url: ti.URL + 'flow/delete',
                    data: data
                });
                console.log(JSON.stringify(response.data, null, 2));
                resolve(response.data);
            }
            catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error, null, 2);
                    error = new ti_errors_1.GenericException(errorString ? errorString : ti_errors_1.ErrorMesssages.UNABLE_TO_DELETE_FLOW);
                }
                reject(error);
            }
        }));
    }
}
exports.TiFlow = FlowClient;
//# sourceMappingURL=ticlient-flow.js.map
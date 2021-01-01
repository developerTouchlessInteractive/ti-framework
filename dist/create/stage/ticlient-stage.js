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
exports.TiStage = void 0;
const axios = require('axios');
const ti_errors_1 = require("../../errors/ti.errors");
const ti = __importStar(require("../../ti"));
class StageClient {
    /**
     * Creating a Stage
     * @param name provide a name for this stage
     * @param tasks list of tasks(task-ids) this stage should execute
     * @param canSkip option to skip for customer
     * @param hostConsentToProceed once stage is complete does this stage require a consent from the host
     */
    createStage(name, tasks, canSkip, hostConsentToProceed) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (name.length === 0 || !name)
                    throw new ti_errors_1.InvalidInputException(ti_errors_1.ErrorMesssages.INVALID_STAGE_NAME);
                if (tasks.length === 0)
                    throw new ti_errors_1.InvalidTasksException();
                const stage = { name: name, tasks: tasks, canSkip: canSkip, hostConsentToProceed: hostConsentToProceed };
                const response = yield axios({
                    method: 'post',
                    url: ti.URL + 'stage',
                    data: stage
                });
                console.log(JSON.stringify(response.data, null, 2));
                if (!response.data || response.data.length === 0)
                    throw new Error();
                resolve(response.data);
            }
            catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error, null, 2);
                    error = new ti_errors_1.GenericException(errorString ? errorString : ti_errors_1.ErrorMesssages.UNABLE_TO_CREATE_STAGE);
                }
                reject(error);
            }
        }));
    }
    getStageById(id) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id || id.length === 0)
                    throw new ti_errors_1.InvalidInputException(ti_errors_1.ErrorMesssages.INVALID_STAGE_ID);
                const response = yield axios({
                    method: 'get',
                    url: ti.URL + 'stage/' + id
                });
                console.log(JSON.stringify(response.data, null, 2));
                resolve(response.data);
            }
            catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error, null, 2);
                    error = new ti_errors_1.GenericException(errorString ? errorString : "");
                }
                reject(error);
            }
        }));
    }
    getStageDetailById(id) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id || id.length === 0)
                    throw new ti_errors_1.InvalidInputException(ti_errors_1.ErrorMesssages.INVALID_STAGE_ID);
                const response = yield axios({
                    method: 'get',
                    url: ti.URL + 'stage/total/' + id
                });
                console.log(JSON.stringify(response.data, null, 2));
                resolve(response.data);
            }
            catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error, null, 2);
                    error = new ti_errors_1.GenericException(errorString ? errorString : ti_errors_1.ErrorMesssages.UNABLE_TO_FETCH_STAGE);
                }
                reject(error);
            }
        }));
    }
    getAllStages() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios({
                    method: 'get',
                    url: ti.URL + 'stage/all'
                });
                console.log(JSON.stringify(response.data, null, 2));
                const stages = response.data.stages;
                resolve(stages);
            }
            catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error, null, 2);
                    error = new ti_errors_1.GenericException(errorString ? errorString : ti_errors_1.ErrorMesssages.UNABLE_TO_FETCH_STAGE);
                }
                reject(error);
            }
        }));
    }
    deleteStage(id) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id || id.length === 0)
                    throw new ti_errors_1.InvalidInputException(ti_errors_1.ErrorMesssages.INVALID_STAGE_ID);
                const data = { id: id };
                const response = yield axios({
                    method: 'post',
                    url: ti.URL + 'stage/delete',
                    data: data
                });
                console.log(JSON.stringify(response.data, null, 2));
                resolve(response.data);
            }
            catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error, null, 2);
                    error = new ti_errors_1.GenericException(errorString ? errorString : ti_errors_1.ErrorMesssages.UNABLE_TO_DELETE_STAGE);
                }
                reject(error);
            }
        }));
    }
}
exports.TiStage = StageClient;
//# sourceMappingURL=ticlient-stage.js.map
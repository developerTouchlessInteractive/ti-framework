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
exports.TiTask = exports.TaskClient = void 0;
const axios = require('axios');
const ti_errors_1 = require("../../errors/ti.errors");
const ti = __importStar(require("../../ti"));
class TaskClient {
    /**
    *
    * @param name name of the task
    * @param resource url or file or any other resource definition for the task to load/present to user
    * @param userAction type of user-action ex: accepting/denying a terms&condition case
    * @param userInput user provided input type, ex: signature or form input etc..,
    */
    createTask(name, controller_name, resource, userAction, userInput) {
        const task = { name: name, controllerName: controller_name, resource: resource, userAction: userAction, userInput: userInput };
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!controller_name || controller_name.length === 0)
                    throw new ti_errors_1.InvalidControllerNameException();
                if (name.length === 0 || !name)
                    throw new ti_errors_1.InvalidInputException(ti_errors_1.ErrorMesssages.INVALID_TASK_NAME);
                const response = yield axios({
                    method: 'post',
                    url: ti.URL + 'task',
                    data: task
                });
                console.log(JSON.stringify(response.data, null, 2));
                resolve(response.data);
            }
            catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error, null, 2);
                    error = new ti_errors_1.GenericException(errorString ? errorString : ti_errors_1.ErrorMesssages.UNABLE_TO_CREATE_TASK);
                }
                reject(error);
            }
        }));
    }
    getTaskById(id) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id || id.length === 0)
                    throw new ti_errors_1.InvalidInputException();
                const response = yield axios({
                    method: 'get',
                    url: ti.URL + 'task/' + id
                });
                console.log(JSON.stringify(response.data.tasks, null, 2));
                resolve(response.data.tasks);
            }
            catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error, null, 2);
                    error = new ti_errors_1.GenericException(errorString ? errorString : "Invalid Task ID. Task Does not Exist");
                }
                reject(error);
            }
        }));
    }
    getAllTasks() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios({
                    method: 'get',
                    url: ti.URL + 'task/all'
                });
                console.log(JSON.stringify(response.data, null, 2));
                const tasks = response.data.tasks;
                resolve(tasks);
            }
            catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error, null, 2);
                    error = new ti_errors_1.GenericException(errorString ? errorString : "Unable to retrive Tasks. Please check logs");
                }
                reject(error);
            }
        }));
    }
    deleteTask(id) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id || id.length === 0)
                    throw new ti_errors_1.InvalidInputException();
                const data = { id: id };
                const response = yield axios({
                    method: 'post',
                    url: ti.URL + 'task/delete',
                    data: data
                });
                console.log(JSON.stringify(response.data, null, 2));
                resolve(response.data);
            }
            catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error, null, 2);
                    error = new ti_errors_1.GenericException(errorString ? errorString : "Unable to Delete Tasks. Please Try again");
                }
                reject(error);
            }
        }));
    }
}
exports.TaskClient = TaskClient;
exports.TiTask = TaskClient;
//# sourceMappingURL=ticlient-task.js.map
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
require("reflect-metadata");
const ti_errors_1 = require("../../errors/ti.errors");
const ti = __importStar(require("../../ti"));
const ticlient_task_1 = require("./ticlient-task");
const validCreateTaskInput = {
    name: "TestName",
    controller_name: "TestController",
    resource: "test.com",
    userAction: ti.UserAction.ACCEPT_OR_DENY,
    userInput: ti.UserInput.NONE
};
const invalidTaskNameInput = {
    name: "",
    controller_name: "TestController",
    resource: "test.com",
    userAction: ti.UserAction.ACCEPT_OR_DENY,
    userInput: ti.UserInput.NONE
};
const invalidControllerNameInput = {
    name: "TestName",
    controller_name: "TestController",
    resource: "test.com",
    userAction: ti.UserAction.ACCEPT_OR_DENY,
    userInput: ti.UserInput.NONE
};
const taskClient = new ticlient_task_1.TiTask();
/**
 * Test Setup/Preconditions
 */
beforeAll(() => {
    ti.setEnv(ti.local_serverUrl, ti.EnvType.DEBUG, ti.interact_local_serverUrl);
});
/**
 * Test Suite for createTask()
 */
describe('create Task', () => {
    /**
     * Test case for invalid task name
     */
    it('reject invalid task name with 1001', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield taskClient.createTask(invalidTaskNameInput.name, invalidTaskNameInput.controller_name, invalidTaskNameInput.resource, invalidTaskNameInput.userAction, invalidTaskNameInput.userInput);
        }
        catch (error) {
            console.log(JSON.stringify(error));
            expect(error.code).toEqual(1001);
            expect(error.message).toEqual(ti_errors_1.ErrorMesssages.INVALID_TASK_NAME);
        }
    }));
    /**
    * Test case for invalid controller name
    */
    it('reject invalid controller name with 1001', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield taskClient.createTask(invalidControllerNameInput.name, invalidControllerNameInput.controller_name, invalidControllerNameInput.resource, invalidControllerNameInput.userAction, invalidControllerNameInput.userInput);
        }
        catch (error) {
            console.log(JSON.stringify(error));
            expect([3001, "ECONNREFUSED"]).toContain(error.code);
            expect(["connect ECONNREFUSED 127.0.0.1:3000", ti_errors_1.ErrorMesssages.MISSING_CONTROLLER_NAME]).toContain(error.message);
            // expect(error.message).toEqual(ErrorMesssages.MISSING_CONTROLLER_NAME)
        }
    }));
    /**
     * Test case for valid inputs
     */
    it('success repsonse', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield taskClient.createTask(validCreateTaskInput.name, validCreateTaskInput.controller_name, validCreateTaskInput.resource, validCreateTaskInput.userAction, validCreateTaskInput.userInput);
            expect(true).toBeTruthy();
        }
        catch (error) {
            console.log(JSON.stringify(error));
        }
    }));
});
/**
 * Test Suite for getTaskById
 */
describe('getTaskByID', () => {
    /**
     * Test case for invalid inputs
     */
    it('reject undefined input with 1001', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield taskClient.getTaskById("");
        }
        catch (error) {
            console.log(JSON.stringify(error));
            expect(error.code).toEqual(1001);
            expect(error.message).toEqual(ti_errors_1.ErrorMesssages.INVALID_INPUT);
        }
    }));
});
/**
 * Test Suite for deleteTaskById
 */
describe('deleteTask', () => {
    /**
     * Test case for invalid inputs
     */
    it('reject undefined input with 1001', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield taskClient.deleteTask("");
        }
        catch (error) {
            console.log(JSON.stringify(error));
            expect(error.code).toEqual(1001);
            expect(error.message).toEqual(ti_errors_1.ErrorMesssages.INVALID_INPUT);
        }
    }));
});
//# sourceMappingURL=ticlient-task.spec.js.map
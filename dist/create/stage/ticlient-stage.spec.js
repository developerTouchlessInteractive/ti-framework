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
const ticlient_stage_1 = require("./ticlient-stage");
var stages;
const stageClient = new ticlient_stage_1.TiStage();
const validCreateStageInput = {
    name: "string",
    tasks: ["string", "string2"],
    canSkip: false,
    hostConsentToProceed: false
};
const invalidStageNameInput = {
    name: "",
    tasks: ["string", "string2"],
    canSkip: false,
    hostConsentToProceed: false
};
const invalidTaskLengthInput = {
    name: "string",
    tasks: [],
    canSkip: false,
    hostConsentToProceed: false
};
/**
 * Test Setup/Preconditions
 */
beforeAll(() => {
    ti.setEnv(ti.local_serverUrl, ti.EnvType.DEBUG, ti.interact_local_serverUrl);
    stageClient.getAllStages().then(res => {
        stages = res;
    }).catch(error => {
        console.log("setup failed, unable to retrive stages" + JSON.stringify(error));
    });
});
/**
 * Test Suite for createStage()
 */
describe('create Stage', () => {
    /**
    * Test case for invalid stage name
    */
    it('reject invalid stage name with 1001', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield stageClient.createStage(invalidStageNameInput.name, invalidStageNameInput.tasks, invalidStageNameInput.canSkip, invalidStageNameInput.hostConsentToProceed);
        }
        catch (error) {
            console.log(JSON.stringify(error));
            expect(error.code).toEqual(1001);
            expect(error.message).toEqual(ti_errors_1.ErrorMesssages.INVALID_STAGE_NAME);
        }
    }));
    /**
    * Test case for invalid TaskLength name. checks if a Stage is being created without any tasks
    */
    it('reject invalid task length input', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield stageClient.createStage(invalidTaskLengthInput.name, invalidTaskLengthInput.tasks, invalidTaskLengthInput.canSkip, invalidTaskLengthInput.hostConsentToProceed);
        }
        catch (error) {
            console.log(JSON.stringify(error));
            expect(error.code).toEqual(3002);
            expect(error.message).toEqual(ti_errors_1.ErrorMesssages.MISSING_TASKS);
        }
    }));
    /**
    * Test case for valid inputs
    */
    it('success case', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield stageClient.createStage(validCreateStageInput.name, validCreateStageInput.tasks, validCreateStageInput.canSkip, validCreateStageInput.hostConsentToProceed);
            expect(true).toBeTruthy();
        }
        catch (error) {
            console.log(JSON.stringify(error));
        }
    }));
});
/**
 * Test Suite for getStagebyID
 */
describe('getStageByID', () => {
    /**
     * Test case for invalid inputs
     */
    it('reject invalid stageID input with 1001', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield stageClient.getStageById("");
        }
        catch (error) {
            console.log(JSON.stringify(error));
            expect(error.code).toEqual(1001);
            expect(error.message).toEqual(ti_errors_1.ErrorMesssages.INVALID_STAGE_ID);
        }
    }));
    /**
    * Test case for valid inputs
    */
    it('success case', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield stageClient.getStageById(stages[0]._id);
            expect(true).toBeTruthy();
        }
        catch (error) {
            console.log(JSON.stringify(error));
        }
    }));
});
/**
 * Test Suite for getStageDetailsbyID
 */
describe('getStageDetailsByID', () => {
    /**
     * Test case for invalid inputs
     */
    it('reject invalid stageID input with 1001', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield stageClient.getStageDetailById("");
        }
        catch (error) {
            console.log(JSON.stringify(error));
            expect(error.code).toEqual(1001);
            expect(error.message).toEqual(ti_errors_1.ErrorMesssages.INVALID_STAGE_ID);
        }
    }));
    /**
    * Test case for valid inputs
    */
    it('success case', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield stageClient.getStageDetailById(stages[0]._id);
            expect(true).toBeTruthy();
        }
        catch (error) {
            console.log(JSON.stringify(error));
        }
    }));
});
/**
 * Test Suite for deleteStageById
 */
describe('deleteStage', () => {
    /**
     * Test case for invalid inputs
     */
    it('reject undefined input with 1001', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield stageClient.deleteStage("");
        }
        catch (error) {
            console.log(JSON.stringify(error));
            expect(error.code).toEqual(1001);
            expect(error.message).toEqual(ti_errors_1.ErrorMesssages.INVALID_STAGE_ID);
        }
    }));
});
//# sourceMappingURL=ticlient-stage.spec.js.map
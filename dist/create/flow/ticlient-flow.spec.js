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
const ticlient_flow_1 = require("./ticlient-flow");
var flows;
const flowClient = new ticlient_flow_1.TiFlow();
const validCreateFlowInput = {
    name: "string",
    stages: ["string", "string2"],
    hostCanAbort: false
};
const invalidFlowNameInput = {
    name: "",
    stages: ["string", "string2"],
    hostCanAbort: false
};
const invalidStageLengthInput = {
    name: "string",
    stages: [],
    hostCanAbort: false
};
/**
 * Test Setup/Preconditions
 */
beforeAll(() => {
    ti.setEnv(ti.local_serverUrl, ti.EnvType.DEBUG, ti.interact_local_serverUrl);
    flowClient.getAllFlows().then(res => {
        flows = res;
    }).catch(error => {
        console.log("setup failed, unable to retrive flows" + JSON.stringify(error));
    });
});
/**
 * Test Suite for createFlow()
 */
describe('create Flow', () => {
    /**
* Test case for invalid stage name
*/
    it('reject invalid stage name with 1001', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield flowClient.createFlow(invalidFlowNameInput.name, invalidFlowNameInput.stages, invalidFlowNameInput.hostCanAbort);
        }
        catch (error) {
            console.log(JSON.stringify(error));
            expect(error.code).toEqual(1001);
            expect(error.message).toEqual(ti_errors_1.ErrorMesssages.INVALID_FLOW_NAME);
        }
    }));
    /**
* Test case for invalid TaskLength name. checks if a FLow is being created without any stages
*/
    it('reject invalid stage length input', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield flowClient.createFlow(invalidStageLengthInput.name, invalidStageLengthInput.stages, invalidStageLengthInput.hostCanAbort);
        }
        catch (error) {
            console.log(JSON.stringify(error));
            expect(error.code).toEqual(3003);
            expect(error.message).toEqual(ti_errors_1.ErrorMesssages.MISSING_STAGES);
        }
    }));
    /**
* Test case for valid inputs
*/
    it('success case', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield flowClient.createFlow(validCreateFlowInput.name, validCreateFlowInput.stages, validCreateFlowInput.hostCanAbort);
            expect(true).toBeTruthy();
        }
        catch (error) {
            console.log(JSON.stringify(error));
        }
    }));
});
/**
 * Test Suite for getFlowbyID
 */
describe('getFlowByID', () => {
    /**
     * Test case for invalid inputs
     */
    it('reject invalid flow ID input with 1001', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield flowClient.getFlowById("");
        }
        catch (error) {
            console.log(JSON.stringify(error));
            expect(error.code).toEqual(1001);
            expect(error.message).toEqual(ti_errors_1.ErrorMesssages.INVALID_FLOW_ID);
        }
    }));
    /**
    * Test case for valid inputs
    */
    it('success case', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield flowClient.getFlowById(flows[0]._id.toString());
            expect(true).toBeTruthy();
        }
        catch (error) {
            console.log(JSON.stringify(error));
        }
    }));
});
/**
 * Test Suite for getFlowDetailsbyID
 */
describe('getFlowDetailsByID', () => {
    /**
     * Test case for invalid inputs
     */
    it('reject invalid Flow ID input with 1001', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield flowClient.getFlowDetailById("");
        }
        catch (error) {
            console.log(JSON.stringify(error));
            expect(error.code).toEqual(1001);
            expect(error.message).toEqual(ti_errors_1.ErrorMesssages.INVALID_FLOW_ID);
        }
    }));
    /**
    * Test case for valid inputs
    */
    it('success case', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield flowClient.getFlowDetailById(flows[0]._id.toString());
            expect(true).toBeTruthy();
        }
        catch (error) {
            console.log(JSON.stringify(error));
        }
    }));
});
/**
 * Test Suite for deleteFlowById
 */
describe('deleteFlow', () => {
    /**
     * Test case for invalid inputs
     */
    it('reject undefined input with 1001', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield flowClient.deleteFlow("");
        }
        catch (error) {
            console.log(JSON.stringify(error));
            expect(error.code).toEqual(1001);
            expect(error.message).toEqual(ti_errors_1.ErrorMesssages.INVALID_FLOW_ID);
        }
    }));
});
//# sourceMappingURL=ticlient-flow.spec.js.map
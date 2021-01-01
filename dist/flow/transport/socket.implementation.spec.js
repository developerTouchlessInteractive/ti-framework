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
const tsyringe_1 = require("tsyringe");
const ti = __importStar(require("./../../ti"));
const testutil_1 = require("../../flow/testutil");
const ti_errors_1 = require("../../errors/ti.errors");
const injection_index_1 = require("../../flow/injection.index");
const testContainer = tsyringe_1.container.createChildContainer();
const testUtil = testContainer.resolve(testutil_1.TestUtil);
beforeAll(() => {
    ti.setEnv(ti.local_serverUrl, ti.EnvType.DEBUG, ti.interact_local_serverUrl);
    testUtil.addSessionData(testContainer);
    testUtil.addEventListener(testContainer);
    testUtil.addCommunicationHandlerFromFactory(testContainer);
    testUtil.addFlowListener(testContainer);
    testUtil.addUtils(testContainer);
});
/**
 * Test Suite for connect()
 */
describe('connect', () => {
    /**
    * Test Case connect with valid inputs
    */
    // it('connect succesful', async () => {
    //     try {
    //         const commHandler: CommunicationHandler = testContainer.resolve(ParameterKeys.COMMUNICATION_HANDLER)
    //         await commHandler.connect()
    //         expect(true).toBeTruthy()
    //     } catch (error) {
    //         console.log(JSON.stringify(error, null, 2))
    //     }
    // })
    // /**
    //  * Test Case connect with invalid inputs
    //  */
    // it('connect will reject with error code when event listener is not present' , async () => {
    //     try {
    //         testContainer.registerInstance(ParameterKeys.EVENTLISTNER,undefined)
    //         const commHandler:CommunicationHandler = testContainer.resolve(ParameterKeys.COMMUNICATION_HANDLER)
    //         await commHandler.connect()
    //     } catch (error) {
    //         console.log(JSON.stringify(error, null, 2))
    //         expect(error.code).toEqual(2002)
    //         expect(error.message).toEqual(ErrorMesssages.INVALID_EVENT_LISTENER)
    //     }
    // })
});
/**
 * Test Suite for sendPayload()
 */
describe('send payload', () => {
    /**
     * Test Case for invalid payload reject
     */
    it('sendPayload will reject undefined inputs with error code 2003', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const commHandler = testContainer.resolve(injection_index_1.ParameterKeys.COMMUNICATION_HANDLER);
            yield commHandler.sendPayload(undefined);
        }
        catch (error) {
            console.log(JSON.stringify(error, null, 2));
            expect(error.message).toEqual(ti_errors_1.ErrorMesssages.UNABLE_TO_SEND_PAYLOAD_ON_INTERACTION_CHANNEL);
            expect(error.code).toEqual(2003);
        }
    }));
});
//# sourceMappingURL=socket.implementation.spec.js.map
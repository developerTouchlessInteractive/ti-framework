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
const ti = __importStar(require("./ti"));
const tsyringe_1 = require("tsyringe");
const injection_index_1 = require("./flow/injection.index");
const testutil_1 = require("./flow/testutil");
const ti_errors_1 = require("./errors/ti.errors");
const testContainer = tsyringe_1.container.createChildContainer();
const testUtil = testContainer.resolve(testutil_1.TestUtil);
/**
 * Test Setup/Preconditions
 */
beforeAll(() => {
    ti.setEnv(ti.local_serverUrl, ti.EnvType.DEBUG, ti.interact_local_serverUrl);
    console.log(tsyringe_1.container.resolve(injection_index_1.ParameterKeys.URL));
    // const testUtil = testContainer.resolve(TestUtil)
    testUtil.addSessionData(testContainer);
    testUtil.addEventListener(testContainer);
    testUtil.addCommunicationHandlerFromFactory(testContainer);
    testUtil.addFlowListener(testContainer);
    testUtil.addUtils(testContainer);
});
const flowListener = testUtil.getFlowListener(testContainer);
// const flowListener:ti.FlowListener = testContainer.resolve(ParameterKeys.FLOWLISTENER)
const sessionInfo = {
    sessionId: 'testSessionId',
    channelId: 'testChannelId',
    inviteCode: 'testInviteCode'
};
const invalidSessionInfo = {
    sessionId: '',
    channelId: '',
    inviteCode: ''
};
const registerData = {
    sessionId: 'testSessionId',
    customerChannel: 'testChannelId'
};
const invalidRegisterData = {
    sessionId: '',
    customerChannel: ''
};
const invalidRouteConfig = {
    routes: []
};
const inavlidRouteConfig = {
    routes: []
};
const routeConfig = {
    "routes": [
        {
            "controllerName": "RegisterComponent",
            "path": "register"
        },
        {
            "controllerName": "StateComponent",
            "path": "test"
        },
        {
            "controllerName": "TermsComponent",
            "path": "terms"
        },
        {
            "controllerName": "PrivacypolicyComponent",
            "path": "policy"
        },
        {
            "controllerName": "DocumentComponent",
            "path": "doc"
        }
    ]
};
const flowState = {
    stageStates: [
        {
            tasks: ["krnVDCNPS", "9-MTKnRZV", "FyKsKiMeu"],
            "_id": "ZO2_ZdL0G",
            "name": "stage1",
            "canSkip": false,
            "hostConsentToProceed": false,
            "createdDate": "Nov 26th 2020 07:47 pm",
            "taskStates": [
                {
                    "uniqueReference": "tw0tcMI4fD",
                    "isCompleted": false,
                    "_id": "krnVDCNPS",
                    "name": "sample1",
                    "controllerName": "TermsComponent",
                    "resource": "wonder.com",
                    "userAction": ti.UserAction.ACCEPT_OR_DENY,
                    "userInput": ti.UserInput.INPUT_MIXED,
                    "createdDate": "Nov 26th 2020 07:43 pm"
                },
                {
                    "uniqueReference": "G020GU5tD5",
                    "isCompleted": false,
                    "_id": "9-MTKnRZV",
                    "name": "sample2",
                    "controllerName": "PrivacypolicyComponent",
                    "resource": "www.policy.com",
                    "userAction": ti.UserAction.ACCEPT_OR_DENY,
                    "userInput": ti.UserInput.INPUT_MIXED,
                    "createdDate": "Nov 26th 2020 07:45 pm"
                },
                {
                    "uniqueReference": "ScFoYqqmV0",
                    "isCompleted": false,
                    "_id": "FyKsKiMeu",
                    "name": "sample3",
                    "controllerName": "DocumentComponent",
                    "resource": "www.wonder.com",
                    "userAction": ti.UserAction.SUBMIT_CANCEL,
                    "userInput": ti.UserInput.INPUT_MIXED,
                    "createdDate": "Nov 26th 2020 07:46 pm"
                }
            ],
            "uniqueReference": "DvvlFOIMP6",
            "isCompleted": false
        }
    ],
    "taskLedger": [
        {
            "uniqueReference": "tw0tcMI4fD",
            "isCompleted": false,
            "_id": "krnVDCNPS",
            "name": "sample1",
            "controllerName": "TermsComponent",
            "resource": "wonder.com",
            "userAction": ti.UserAction.ACCEPT_OR_DENY,
            "userInput": ti.UserInput.INPUT_MIXED,
            "createdDate": "Nov 26th 2020 07:43 pm",
            "order": 0
        },
        {
            "uniqueReference": "G020GU5tD5",
            "isCompleted": false,
            "_id": "9-MTKnRZV",
            "name": "sample2",
            "controllerName": "PrivacypolicyComponent",
            "resource": "www.policy.com",
            "userAction": ti.UserAction.ACCEPT_OR_DENY,
            "userInput": ti.UserInput.INPUT_MIXED,
            "createdDate": "Nov 26th 2020 07:45 pm",
            "order": 1
        },
        {
            "uniqueReference": "ScFoYqqmV0",
            "isCompleted": false,
            "_id": "FyKsKiMeu",
            "name": "sample3",
            "controllerName": "DocumentComponent",
            "resource": "www.wonder.com",
            "userAction": ti.UserAction.ACCEPT_OR_DENY,
            "userInput": ti.UserInput.INPUT_MIXED,
            "createdDate": "Nov 26th 2020 07:46 pm",
            "order": 2
        }
    ],
    "isCompleted": false,
    "stages": [
        {
            "tasks": ["krnVDCNPS", "9-MTKnRZV"],
            "_id": "ZO2_ZdL0G",
            "name": "stage1",
            "canSkip": false,
            "hostConsentToProceed": false,
            "createdDate": "Nov 26th 2020 07:47 pm",
            "hostCanAbort": false,
        }
    ],
    "_id": "1bUMkotGk",
    "name": "flow1",
    "hostCanAbort": false,
    "createdDate": "Nov 26th 2020 07:47 pm"
};
/**
 * Test Suite for ti variables like server URL
 */
describe('test ti', () => {
    it('has server url', () => {
        expect(ti.serverUrl).toBeDefined();
    });
    it('has local server url', () => {
        expect(ti.local_serverUrl).toBeDefined();
    });
});
/**
 * Test Suite for startFlow()
 */
describe('startFlow()', () => {
    /**
     * Test case for invalid inputs
     */
    it('startflow() should reject invalid sessionID with 1001 ', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield ti.startFlow("", flowListener);
        }
        catch (error) {
            console.log(JSON.stringify(error));
            expect(error.code).toEqual(1001);
        }
    }));
});
/**
 * Test Suite for createFlowManagerForClient()
 */
describe('createFlowManagerForClient ti', () => {
    /**
    * Test case for createFlowManagerForClient() undefined inputs
    */
    it('createFlowManagerForClient() should reject undefined inputs with 1001', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield ti.createFlowManagerForClient(invalidSessionInfo, flowListener);
        }
        catch (error) {
            console.log(JSON.stringify(error));
            expect(error.code).toEqual(1001);
        }
    }));
});
/**
 * Test Suite for createFlowManagerForCustomer()
 */
describe('createFlowManagerForCustomer ti', () => {
    /**
     *
     */
    it('createFlowManagerForCustomer() should reject undefined inputs with 1001', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield ti.createFlowManagerForCustomer(invalidRegisterData, routeConfig, flowState, flowListener);
        }
        catch (error) {
            console.log(JSON.stringify(error));
            expect(error.code).toEqual(1001);
            expect(error.message).toEqual(ti_errors_1.ErrorMesssages.REGISTER_DATA_INVALID);
        }
    }));
    /**
     *
     */
    it('createFlowManagerForCustomer() should reject undefined registerdata with 1001', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield ti.createFlowManagerForCustomer(registerData, invalidRouteConfig, flowState, flowListener);
            testContainer.reset();
        }
        catch (error) {
            testContainer.reset();
            console.log(JSON.stringify(error));
            expect(error.code).toEqual(1001);
            expect(error.message).toEqual(ti_errors_1.ErrorMesssages.ROUTE_CONFIG_INVALID);
        }
    }));
    // /**
    //  * 
    //  */
    // it('createFlowManagerForCustomer() should reject undefined listener with 1001', async () => {
    //     try {           
    //         const result = await ti.createFlowManagerForCustomer(registerData, routeConfig, flowState, flowListener)                     
    //     } catch (error) {
    //         console.log(JSON.stringify(error))
    //         expect(error.code).toEqual(1001)
    //         expect(error.message).toEqual(ErrorMesssages.FLOW_LISTENER_INVALID)
    //     }
    // })
    /**
     * Test Case for valid inputs
     */
    // it('createFlowManagerForCustomer() should give success response for valid registerata and listener', async () => {
    //     try {
    //         const result = await ti.createFlowManagerForCustomer(registerData, routeConfig, flowState, flowListener)
    //         expect(true).toBeTruthy()
    //     } catch (error) {
    //         console.log(JSON.stringify(error))
    //         // expect(false).toBeTruthy()
    //         expect(error.code).toEqual(900)
    //         // expect(error.message).toEqual(ErrorMesssages.GENERIC_ERROR)
    //     }
    // })
});
// /**
//  * Test Suite for sendInteraction()
//  */
// describe('sendInteraction ti', () => {
//     /**
//      * 
//      */
//     it('sendInteraction() should reject undefined inputs with 1001', async () => {
//         try {
//             const result = await ti.sendInteractionData("", await ti.util.getCommunicationData("testSessionId","hello"))
//         } catch (error) {
//             console.log(JSON.stringify(error))
//             expect(error.code).toEqual(2001)
//         }
//     })
// })
/**
 * Test Suite for createContainerWithDetailForCustomer()
 */
describe('container ti', () => {
    /**
     *
     */
    it('createContainerWithDetailsForCustomer() should reject undefined inputs with 1001', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield ti.createContainerWithDetailsForCustomer(undefined);
        }
        catch (error) {
            console.log(JSON.stringify(error));
            expect(error.code).toEqual(1001);
            expect(error.message).toEqual(ti_errors_1.ErrorMesssages.REGISTER_DATA_INVALID);
        }
    }));
    /**
     *
     */
    it('createContainerWithDetailsForCustomer() should reject undefined inputs with 2001', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield ti.createContainerWithDetailsForCustomer(invalidRegisterData);
        }
        catch (error) {
            console.log(JSON.stringify(error));
            expect(error.code).toEqual(2001);
            expect(error.message).toEqual(ti_errors_1.ErrorMesssages.INVALID_SESSION_INFO);
        }
    }));
    /**
     *
     */
    it('createContainerWithDetailsForCustomer() should return container with all SessionData registered', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield ti.createContainerWithDetailsForCustomer(registerData);
            console.log(JSON.stringify(result));
            expect(result.isRegistered(injection_index_1.ParameterKeys.SESSIONID)).toBeTruthy();
            expect(result.isRegistered(injection_index_1.ParameterKeys.INITDATA)).toBeTruthy();
            expect(result.isRegistered(injection_index_1.ParameterKeys.FLOWCHANNEL)).toBeTruthy();
            expect(result.isRegistered(injection_index_1.ParameterKeys.SESSIONID)).toBeTruthy();
            expect(result.isRegistered(injection_index_1.ParameterKeys.SESSIONDATA)).toBeTruthy();
        }
        catch (error) {
            console.log(JSON.stringify(error));
            expect(error.code).toEqual(2001);
        }
    }));
    /**
     *
     */
    it('createContainerWithDetailsForCustomer() should reject invalid registerdata with 2001', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield ti.createContainerWithDetailsForCustomer(registerData);
            console.log(JSON.stringify(result));
            expect(result.isRegistered(injection_index_1.ParameterKeys.SESSIONID)).toBeTruthy();
            expect(result.isRegistered(injection_index_1.ParameterKeys.INITDATA)).toBeTruthy();
            expect(result.isRegistered(injection_index_1.ParameterKeys.FLOWCHANNEL)).toBeTruthy();
            expect(result.isRegistered(injection_index_1.ParameterKeys.SESSIONID)).toBeTruthy();
            expect(result.isRegistered(injection_index_1.ParameterKeys.SESSIONDATA)).toBeTruthy();
        }
        catch (error) {
            console.log(JSON.stringify(error));
            expect(error.code).toEqual(2001);
        }
    }));
});
/**
 * Test Suite for createContainerWithDetails()
 */
describe('create container for client', () => {
    const sessionInfo = {
        sessionId: 'testSessionId',
        customerChannel: 'testChannelId'
    };
    const InvalidSessionInfo = {
        sessionId: 'testSessionId',
        customerChannelId: 'testChannelId',
        inviteCode: 'testInviteCode'
    };
    /**
     *
     */
    it('createContainerWithDetailsForCustomer() should reject undefined inputs with 1001', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield ti.createContainerWithDetailsForCustomer(undefined);
        }
        catch (error) {
            console.log(JSON.stringify(error));
            expect(error.code).toEqual(1001);
            expect(error.message).toEqual(ti_errors_1.ErrorMesssages.REGISTER_DATA_INVALID);
        }
    }));
    /**
     *
     */
    it('createContainerWithDetailsForCustomer() should reject undefined inputs with 2001', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield ti.createContainerWithDetailsForCustomer(invalidSessionInfo);
        }
        catch (error) {
            console.log(JSON.stringify(error));
            expect(error.code).toEqual(2001);
            expect(error.message).toEqual(ti_errors_1.ErrorMesssages.INVALID_SESSION_INFO);
        }
    }));
    /**
     *
     */
    it('createContainerWithDetailsForCustomer() should return container with all SessionData registered', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield ti.createContainerWithDetailsForCustomer(sessionInfo);
            console.log(JSON.stringify(result));
            expect(result.isRegistered(injection_index_1.ParameterKeys.SESSIONID)).toBeTruthy();
            expect(result.isRegistered(injection_index_1.ParameterKeys.INITDATA)).toBeTruthy();
            expect(result.isRegistered(injection_index_1.ParameterKeys.FLOWCHANNEL)).toBeTruthy();
            expect(result.isRegistered(injection_index_1.ParameterKeys.SESSIONID)).toBeTruthy();
            expect(result.isRegistered(injection_index_1.ParameterKeys.SESSIONDATA)).toBeTruthy();
        }
        catch (error) {
            console.log(JSON.stringify(error));
            expect(error.code).toEqual(2001);
        }
    }));
    /**
     *
     */
    it('createContainerWithDetailsForCustomer() should reject invalid registerdata with 2001', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield ti.createContainerWithDetailsForCustomer(sessionInfo);
            console.log(JSON.stringify(result));
            expect(result.isRegistered(injection_index_1.ParameterKeys.SESSIONID)).toBeTruthy();
            expect(result.isRegistered(injection_index_1.ParameterKeys.INITDATA)).toBeTruthy();
            expect(result.isRegistered(injection_index_1.ParameterKeys.FLOWCHANNEL)).toBeTruthy();
            expect(result.isRegistered(injection_index_1.ParameterKeys.SESSIONID)).toBeTruthy();
            expect(result.isRegistered(injection_index_1.ParameterKeys.SESSIONDATA)).toBeTruthy();
        }
        catch (error) {
            console.log(JSON.stringify(error));
            expect(error.code).toEqual(2001);
        }
    }));
});
//# sourceMappingURL=ti.spec.js.map
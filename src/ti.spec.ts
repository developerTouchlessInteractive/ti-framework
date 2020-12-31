import * as ti from './ti'
import { container} from 'tsyringe'
import { ParameterKeys } from './flow/injection.index'
import { TestUtil } from './flow/testutil'
import { ErrorMesssages } from './errors/ti.errors'

const testContainer = container.createChildContainer()
const testUtil = testContainer.resolve(TestUtil)
/**
 * Test Setup/Preconditions
 */
beforeAll(() => {
    ti.setEnv(ti.local_serverUrl, ti.EnvType.DEBUG, ti.interact_local_serverUrl)
    console.log(container.resolve(ParameterKeys.URL))
    // const testUtil = testContainer.resolve(TestUtil)
    testUtil.addSessionData(testContainer)
    testUtil.addEventListener(testContainer)
    testUtil.addCommunicationHandlerFromFactory(testContainer)
    testUtil.addFlowListener(testContainer)
    testUtil.addUtils(testContainer)
});


const flowListener = testUtil.getFlowListener(testContainer)
// const flowListener:ti.FlowListener = testContainer.resolve(ParameterKeys.FLOWLISTENER)

const sessionInfo = {
    sessionId: 'testSessionId',
    channelId: 'testChannelId',
    inviteCode: 'testInviteCode'
}
const invalidSessionInfo = {
    sessionId: '',
    channelId: '',
    inviteCode: ''
}

const registerData = {
    sessionId: 'testSessionId',
    customerChannel: 'testChannelId'
}

const invalidRegisterData = {
    sessionId: '',
    customerChannel: ''
}
const invalidRouteConfig: ti.handler.TiRouteConfig = {
    routes: []
}
const inavlidRouteConfig: ti.handler.TiRouteConfig = {
    routes: []
}

const routeConfig: ti.handler.TiRouteConfig = {

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
}

const flowState: ti.FlowState = {

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
}​




/**
 * Test Suite for ti variables like server URL
 */
describe('test ti', () => { 
    it('has server url', () => { 
        expect(ti.serverUrl).toBeDefined()
    })
        
    it('has local server url', () => {
        expect(ti.local_serverUrl).toBeDefined()
    })

})

/**
 * Test Suite for startFlow()
 */
describe('startFlow()', () => {
    /**
     * Test case for invalid inputs
     */
    it('startflow() should reject invalid sessionID with 1001 ', async () => {
        try {
            const result = await ti.startFlow("",flowListener)
        } catch (error) {
            console.log(JSON.stringify(error))
            expect(error.code).toEqual(1001)
        }
    })

})

/**
 * Test Suite for createFlowManagerForClient()
 */
describe('createFlowManagerForClient ti', () => {
    /**
    * Test case for createFlowManagerForClient() undefined inputs
    */
    it('createFlowManagerForClient() should reject undefined inputs with 1001', async () => {
        try {
            const result = await ti.createFlowManagerForClient(invalidSessionInfo, flowListener)
        } catch (error) {
            console.log(JSON.stringify(error))
            expect(error.code).toEqual(1001)
        }
    })
})

/**
 * Test Suite for createFlowManagerForCustomer()
 */
describe('createFlowManagerForCustomer ti', () => {
    /**
     * 
     */
    it('createFlowManagerForCustomer() should reject undefined inputs with 1001', async () => {
        try {
            const result = await ti.createFlowManagerForCustomer(invalidRegisterData, routeConfig, flowState, flowListener)
        } catch (error) {
            console.log(JSON.stringify(error))
            expect(error.code).toEqual(1001)
            expect(error.message).toEqual(ErrorMesssages.REGISTER_DATA_INVALID)
        }
    })
    /**
     * 
     */
    it('createFlowManagerForCustomer() should reject undefined registerdata with 1001', async () => {
        try {
            const result = await ti.createFlowManagerForCustomer(registerData, invalidRouteConfig, flowState, flowListener)
            testContainer.reset()
        } catch (error) {
            testContainer.reset()
            console.log(JSON.stringify(error))
            expect(error.code).toEqual(1001)
            expect(error.message).toEqual(ErrorMesssages.ROUTE_CONFIG_INVALID)
        }
    })
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
  
})

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
    it('createContainerWithDetailsForCustomer() should reject undefined inputs with 1001', async () => {
        try {
            const result = await ti.createContainerWithDetailsForCustomer(undefined)
        } catch (error) {
            console.log(JSON.stringify(error))
            expect(error.code).toEqual(1001)
            expect(error.message).toEqual(ErrorMesssages.REGISTER_DATA_INVALID)
        }
    })
    /**
     * 
     */
    it('createContainerWithDetailsForCustomer() should reject undefined inputs with 2001' , async () => {
        try {
            const result = await ti.createContainerWithDetailsForCustomer(invalidRegisterData)
        } catch (error) {
            console.log(JSON.stringify(error))
            expect(error.code).toEqual(2001)
            expect(error.message).toEqual(ErrorMesssages.INVALID_SESSION_INFO)
        }
    })
    /**
     * 
     */
    it('createContainerWithDetailsForCustomer() should return container with all SessionData registered', async () => {
        try {
            const result = await ti.createContainerWithDetailsForCustomer(registerData)
            console.log(JSON.stringify(result))
            expect(result.isRegistered(ParameterKeys.SESSIONID)).toBeTruthy()
            expect(result.isRegistered(ParameterKeys.INITDATA)).toBeTruthy()
            expect(result.isRegistered(ParameterKeys.FLOWCHANNEL)).toBeTruthy()
            expect(result.isRegistered(ParameterKeys.SESSIONID)).toBeTruthy()
            expect(result.isRegistered(ParameterKeys.SESSIONDATA)).toBeTruthy()

        } catch (error) {
            console.log(JSON.stringify(error))
            expect(error.code).toEqual(2001)
        }
    })
    /**
     * 
     */
    it('createContainerWithDetailsForCustomer() should reject invalid registerdata with 2001', async () => {
        try {
            const result = await ti.createContainerWithDetailsForCustomer(registerData)
            console.log(JSON.stringify(result))
            expect(result.isRegistered(ParameterKeys.SESSIONID)).toBeTruthy()
            expect(result.isRegistered(ParameterKeys.INITDATA)).toBeTruthy()
            expect(result.isRegistered(ParameterKeys.FLOWCHANNEL)).toBeTruthy()
            expect(result.isRegistered(ParameterKeys.SESSIONID)).toBeTruthy()
            expect(result.isRegistered(ParameterKeys.SESSIONDATA)).toBeTruthy()

        } catch (error) {
            console.log(JSON.stringify(error))
            expect(error.code).toEqual(2001)
        }
    })

})

/**
 * Test Suite for createContainerWithDetails()
 */
describe('create container for client' , () => {
    const sessionInfo = {
        sessionId: 'testSessionId',
        customerChannel: 'testChannelId'
    }
    const InvalidSessionInfo = {
        sessionId: 'testSessionId',
        customerChannelId: 'testChannelId',
        inviteCode: 'testInviteCode'
    }
    /**
     * 
     */
    it('createContainerWithDetailsForCustomer() should reject undefined inputs with 1001', async () => {
        try {
            const result = await ti.createContainerWithDetailsForCustomer(undefined)
        } catch (error) {
            console.log(JSON.stringify(error))
            expect(error.code).toEqual(1001)
            expect(error.message).toEqual(ErrorMesssages.REGISTER_DATA_INVALID)
        }
    })
    /**
     * 
     */
    it('createContainerWithDetailsForCustomer() should reject undefined inputs with 2001', async () => {
        try {
            const result = await ti.createContainerWithDetailsForCustomer(invalidSessionInfo)
        } catch (error) {
            console.log(JSON.stringify(error))
            expect(error.code).toEqual(2001)
            expect(error.message).toEqual(ErrorMesssages.INVALID_SESSION_INFO)
        }
    })
    /**
     * 
     */
    it('createContainerWithDetailsForCustomer() should return container with all SessionData registered', async () => {
        try {
            const result = await ti.createContainerWithDetailsForCustomer(sessionInfo)
            console.log(JSON.stringify(result))
            expect(result.isRegistered(ParameterKeys.SESSIONID)).toBeTruthy()
            expect(result.isRegistered(ParameterKeys.INITDATA)).toBeTruthy()
            expect(result.isRegistered(ParameterKeys.FLOWCHANNEL)).toBeTruthy()
            expect(result.isRegistered(ParameterKeys.SESSIONID)).toBeTruthy()
            expect(result.isRegistered(ParameterKeys.SESSIONDATA)).toBeTruthy()

        } catch (error) {
            console.log(JSON.stringify(error))
            expect(error.code).toEqual(2001)
        }
    })
    /**
     * 
     */
    it('createContainerWithDetailsForCustomer() should reject invalid registerdata with 2001', async () => {
        try {
            const result = await ti.createContainerWithDetailsForCustomer(sessionInfo)
            console.log(JSON.stringify(result))
            expect(result.isRegistered(ParameterKeys.SESSIONID)).toBeTruthy()
            expect(result.isRegistered(ParameterKeys.INITDATA)).toBeTruthy()
            expect(result.isRegistered(ParameterKeys.FLOWCHANNEL)).toBeTruthy()
            expect(result.isRegistered(ParameterKeys.SESSIONID)).toBeTruthy()
            expect(result.isRegistered(ParameterKeys.SESSIONDATA)).toBeTruthy()

        } catch (error) {
            console.log(JSON.stringify(error))
            expect(error.code).toEqual(2001)
        }
    })

})




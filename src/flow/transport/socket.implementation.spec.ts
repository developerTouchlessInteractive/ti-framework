import "reflect-metadata"
import { container } from 'tsyringe' 
import * as ti from './../../ti'
import { TestUtil } from "../../flow/testutil"
import { ErrorMesssages } from "../../errors/ti.errors"
import { ParameterKeys } from "../../flow/injection.index"
import { CommunicationHandler } from "./transport.protocol.interface"

const testContainer = container.createChildContainer()
const testUtil = testContainer.resolve(TestUtil)

beforeAll(() => {
    ti.setEnv(ti.local_serverUrl, ti.EnvType.DEBUG, ti.interact_local_serverUrl)
    
    testUtil.addSessionData(testContainer)
    testUtil.addEventListener(testContainer)
    testUtil.addCommunicationHandlerFromFactory(testContainer)
    testUtil.addFlowListener(testContainer)
    testUtil.addUtils(testContainer)
});

/**
 * Test Suite for connect()
 */
describe('connect' , () => {
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

})

/**
 * Test Suite for sendPayload()
 */
describe('send payload' , () => {
    /**
     * Test Case for invalid payload reject
     */
    it('sendPayload will reject undefined inputs with error code 2003' , async()=>{
        try {
            const commHandler: CommunicationHandler = testContainer.resolve(ParameterKeys.COMMUNICATION_HANDLER)
            await commHandler.sendPayload(undefined)
        } catch (error) {
            console.log(JSON.stringify(error, null, 2))
            expect(error.message).toEqual(ErrorMesssages.UNABLE_TO_SEND_PAYLOAD_ON_INTERACTION_CHANNEL)
            expect(error.code).toEqual(2003)
        }
    })
})
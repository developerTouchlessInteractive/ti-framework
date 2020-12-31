import "reflect-metadata"
import { container } from 'tsyringe'
import * as ti from '../ti'
import { FlowManager } from "./flow.manager"
import { TestUtil } from "./testutil"
import { ErrorMesssages } from "../errors/ti.errors"


const testContainer = container.createChildContainer()

beforeAll(() => {
    ti.setEnv(ti.local_serverUrl, ti.EnvType.DEBUG, ti.interact_local_serverUrl)
    const testUtil = testContainer.resolve(TestUtil)
    testUtil.addSessionData(testContainer)
    testUtil.addEventListener(testContainer)
    testUtil.addCommunicationHandlerFromFactory(testContainer)
    testUtil.addFlowListener(testContainer)
    testUtil.addUtils(testContainer)
});

describe('test flow manager ti', () => {
    const type = ti.CustomerEvent
    it('sendTaskPayloadToServer() should reject undefined inputs with 1001', async () => {
        try {
            const flowMgr = testContainer.resolve(FlowManager)
            const result = await flowMgr.sendTaskPayloadToServer(undefined, undefined)
        } catch (error) {
            console.log(JSON.stringify(error))
            expect(error.code).toEqual(1001)
            expect(error.message).toEqual(ErrorMesssages.UNABLE_TO_EMIT_PAYLOAD)
        }

    })
})
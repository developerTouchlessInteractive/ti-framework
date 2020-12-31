import "reflect-metadata"
import { container} from 'tsyringe'
import { UtilService } from '../ti'
import * as ti from '../ti'
import { TestUtil } from "../flow/testutil"

describe('test Util ti', () => {
    const type = ti.CustomerEvent 
    it('getEventResponseData() should reject undefined inputs with 5001', async() => {
        const testCont = container.createChildContainer()

        try {
            const testUtil = testCont.resolve(TestUtil)
            // console.log('test util serv container' + JSON.stringify(testUtil))
            testUtil.addSessionData(testCont)
            const util = testCont.resolve(UtilService)            
            const result = await util.getEventResponseData(type, undefined)
            testCont.reset()            
        } catch (error) {
            testCont.reset()
            console.log(JSON.stringify(error))
            expect(error.code).toEqual(5001)
        }

    })

    it('getCommunicationData() should reject undefined inputs with 5001', async() => {
        const testCont = container.createChildContainer()
        try {
            const testUtil = testCont.resolve(TestUtil)
            testUtil.addSessionData(testCont)
            const util = testCont.resolve(UtilService)
            const result = await util.getCommunicationData(undefined)
            testCont.reset()  

        } catch (error) {
            testCont.reset() 
            console.log(JSON.stringify(error))
            expect(error.code).toEqual(5001)
        }

    })

})
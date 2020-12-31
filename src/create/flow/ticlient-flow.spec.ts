import "reflect-metadata"
import { ErrorMesssages } from "../../errors/ti.errors"
import { Flow } from "../../ti"
import * as ti from "../../ti"
import { TiFlow } from "./ticlient-flow"

var flows: Flow[]
const flowClient = new TiFlow()

const validCreateFlowInput = {
    name: "string",
    stages: ["string", "string2"],
    hostCanAbort: false

}

const invalidFlowNameInput = {
    name: "",
    stages: ["string", "string2"],
    hostCanAbort: false
}

const invalidStageLengthInput = {
    name: "string",
    stages: [],
    hostCanAbort: false
}

/**
 * Test Setup/Preconditions
 */
beforeAll(() => {
    ti.setEnv(ti.local_serverUrl, ti.EnvType.DEBUG, ti.interact_local_serverUrl)
    flowClient.getAllFlows().then(res => {
        flows = res
    }).catch(error => {
        console.log("setup failed, unable to retrive flows" + JSON.stringify(error))
    })
})

/**
 * Test Suite for createFlow()
 */
describe('create Flow', () => {
    /**
* Test case for invalid stage name
*/
    it('reject invalid stage name with 1001', async () => {
        try {
            await flowClient.createFlow(invalidFlowNameInput.name,
                invalidFlowNameInput.stages,
                invalidFlowNameInput.hostCanAbort)
        } catch (error) {
            console.log(JSON.stringify(error))
            expect(error.code).toEqual(1001)
            expect(error.message).toEqual(ErrorMesssages.INVALID_FLOW_NAME)
        }
    })
    /**
* Test case for invalid TaskLength name. checks if a FLow is being created without any stages
*/
    it('reject invalid stage length input', async () => {
        try {
            await flowClient.createFlow(invalidStageLengthInput.name,
                invalidStageLengthInput.stages,
                invalidStageLengthInput.hostCanAbort)

        } catch (error) {
            console.log(JSON.stringify(error))
            expect(error.code).toEqual(3003)
            expect(error.message).toEqual(ErrorMesssages.MISSING_STAGES)
        }
    })
    /**
* Test case for valid inputs    
*/
    it('success case', async () => {
        try {
            const result = await flowClient.createFlow(validCreateFlowInput.name,
                validCreateFlowInput.stages,
                validCreateFlowInput.hostCanAbort)
            expect(true).toBeTruthy()
        } catch (error) {
            console.log(JSON.stringify(error))
        }
    })
})


/**
 * Test Suite for getFlowbyID
 */
describe('getFlowByID', () => {
    /**
     * Test case for invalid inputs
     */
    it('reject invalid flow ID input with 1001', async () => {
        try {
            const result = await flowClient.getFlowById("")
        } catch (error) {
            console.log(JSON.stringify(error))
            expect(error.code).toEqual(1001)
            expect(error.message).toEqual(ErrorMesssages.INVALID_FLOW_ID)
        }
    })
    /**
    * Test case for valid inputs
    */
    it('success case', async () => {
        try {
            const result = await flowClient.getFlowById(flows[0]._id!.toString())
            expect(true).toBeTruthy()
        } catch (error) {
            console.log(JSON.stringify(error))
        }
    })
})

/**
 * Test Suite for getFlowDetailsbyID
 */
describe('getFlowDetailsByID', () => {
    /**
     * Test case for invalid inputs
     */
    it('reject invalid Flow ID input with 1001', async () => {
        try {
            const result = await flowClient.getFlowDetailById("")
        } catch (error) {
            console.log(JSON.stringify(error))
            expect(error.code).toEqual(1001)
            expect(error.message).toEqual(ErrorMesssages.INVALID_FLOW_ID)
        }
    })
    /**
    * Test case for valid inputs
    */
    it('success case', async () => {
        try {
            const result = await flowClient.getFlowDetailById(flows[0]._id!.toString())
            expect(true).toBeTruthy()
        } catch (error) {
            console.log(JSON.stringify(error))
        }
    })
})

/**
 * Test Suite for deleteFlowById
 */
describe('deleteFlow', () => {
    /**
     * Test case for invalid inputs
     */
    it('reject undefined input with 1001', async () => {
        try {
            const result = await flowClient.deleteFlow("")
        } catch (error) {
            console.log(JSON.stringify(error))
            expect(error.code).toEqual(1001)
            expect(error.message).toEqual(ErrorMesssages.INVALID_FLOW_ID)
        }
    })
})
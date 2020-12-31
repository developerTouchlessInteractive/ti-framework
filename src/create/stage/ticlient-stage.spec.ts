import "reflect-metadata"
import { ErrorMesssages } from "../../errors/ti.errors"
import { Stage } from "../../ti"
import * as ti from "../../ti"
import { TiStage} from "./ticlient-stage"

var stages: Stage[]
const stageClient = new TiStage()

const validCreateStageInput = {
    name: "string",
    tasks: ["string", "string2"],
    canSkip: false,
    hostConsentToProceed: false
}

const invalidStageNameInput = {
    name: "",
    tasks: ["string", "string2"],
    canSkip: false,
    hostConsentToProceed: false
}

const invalidTaskLengthInput = {
    name: "string",
    tasks: [],
    canSkip: false,
    hostConsentToProceed: false
}

/**
 * Test Setup/Preconditions
 */
beforeAll(() => {
    ti.setEnv(ti.local_serverUrl, ti.EnvType.DEBUG, ti.interact_local_serverUrl)
    stageClient.getAllStages().then(res => {
        stages = res
    }).catch(error => {
        console.log("setup failed, unable to retrive stages" + JSON.stringify(error))
    })
})

/**
 * Test Suite for createStage()
 */
describe('create Stage', () => {
    /**
    * Test case for invalid stage name
    */
    it('reject invalid stage name with 1001', async () => {
        try {
            await stageClient.createStage(invalidStageNameInput.name,
                invalidStageNameInput.tasks,
                invalidStageNameInput.canSkip,
                invalidStageNameInput.hostConsentToProceed)

        } catch (error) {
            console.log(JSON.stringify(error))
            expect(error.code).toEqual(1001)
            expect(error.message).toEqual(ErrorMesssages.INVALID_STAGE_NAME)
        }
    })
    /**
    * Test case for invalid TaskLength name. checks if a Stage is being created without any tasks
    */
    it('reject invalid task length input', async () => {
        try {
            await stageClient.createStage(invalidTaskLengthInput.name,
                invalidTaskLengthInput.tasks,
                invalidTaskLengthInput.canSkip,
                invalidTaskLengthInput.hostConsentToProceed)

        } catch (error) {
            console.log(JSON.stringify(error))
            expect(error.code).toEqual(3002)
            expect(error.message).toEqual(ErrorMesssages.MISSING_TASKS)
        }
    })
    /**
    * Test case for valid inputs    
    */
    it('success case', async () => {
        try {
            const result = await stageClient.createStage(validCreateStageInput.name,
                validCreateStageInput.tasks,
                validCreateStageInput.canSkip,
                validCreateStageInput.hostConsentToProceed)
            expect(true).toBeTruthy()
        } catch (error) {
            console.log(JSON.stringify(error))
        }
    })

})

/**
 * Test Suite for getStagebyID
 */
describe('getStageByID', () => {
    /**
     * Test case for invalid inputs
     */
    it('reject invalid stageID input with 1001', async () => {
        try {
            const result = await stageClient.getStageById("")
        } catch (error) {
            console.log(JSON.stringify(error))
            expect(error.code).toEqual(1001)
            expect(error.message).toEqual(ErrorMesssages.INVALID_STAGE_ID)
        }
    })
    /**
    * Test case for valid inputs
    */
    it('success case', async () => {
        try {
            const result = await stageClient.getStageById(stages[0]._id!)
            expect(true).toBeTruthy()
        } catch (error) {
            console.log(JSON.stringify(error))
        }
    })
})

/**
 * Test Suite for getStageDetailsbyID
 */
describe('getStageDetailsByID', () => {
    /**
     * Test case for invalid inputs
     */
    it('reject invalid stageID input with 1001', async () => {
        try {
            const result = await stageClient.getStageDetailById("")
        } catch (error) {
            console.log(JSON.stringify(error))
            expect(error.code).toEqual(1001)
            expect(error.message).toEqual(ErrorMesssages.INVALID_STAGE_ID)
        }
    })
    /**
    * Test case for valid inputs
    */
    it('success case', async () => {
        try {
            const result = await stageClient.getStageDetailById(stages[0]._id!)
            expect(true).toBeTruthy()
        } catch (error) {
            console.log(JSON.stringify(error))
        }
    })
})

/**
 * Test Suite for deleteStageById
 */
describe('deleteStage', () => {
    /**
     * Test case for invalid inputs
     */
    it('reject undefined input with 1001', async () => {
        try {
            const result = await stageClient.deleteStage("")
        } catch (error) {
            console.log(JSON.stringify(error))
            expect(error.code).toEqual(1001)
            expect(error.message).toEqual(ErrorMesssages.INVALID_STAGE_ID)
        }
    })
})
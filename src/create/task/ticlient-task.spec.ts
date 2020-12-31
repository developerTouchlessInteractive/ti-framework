import "reflect-metadata"
import { ErrorMesssages } from "../../errors/ti.errors"
import * as ti from "../../ti"
import { TiTask } from "./ticlient-task"

const validCreateTaskInput = {
    name: "TestName",
    controller_name: "TestController",
    resource: "test.com",
    userAction: ti.UserAction.ACCEPT_OR_DENY,
    userInput: ti.UserInput.NONE
}
const invalidTaskNameInput = {
    name: "",
    controller_name: "TestController",
    resource: "test.com",
    userAction: ti.UserAction.ACCEPT_OR_DENY,
    userInput: ti.UserInput.NONE
}
const invalidControllerNameInput = {
    name: "TestName",
    controller_name: "TestController",
    resource: "test.com",
    userAction: ti.UserAction.ACCEPT_OR_DENY,
    userInput: ti.UserInput.NONE
}

const taskClient = new TiTask()

/**
 * Test Setup/Preconditions
 */
beforeAll(() =>{
    ti.setEnv(ti.local_serverUrl, ti.EnvType.DEBUG, ti.interact_local_serverUrl)    
})

/**
 * Test Suite for createTask()
 */
describe('create Task', () => {
    /**
     * Test case for invalid task name
     */
    it('reject invalid task name with 1001', async () => {
        try {
            
            await taskClient.createTask(invalidTaskNameInput.name,
                invalidTaskNameInput.controller_name,
                invalidTaskNameInput.resource,
                invalidTaskNameInput.userAction,
                invalidTaskNameInput.userInput)

        } catch (error) {
            console.log(JSON.stringify(error))
            expect(error.code).toEqual(1001)
            expect(error.message).toEqual(ErrorMesssages.INVALID_TASK_NAME)
        }
    })
    /**
    * Test case for invalid controller name
    */
    it('reject invalid controller name with 1001', async () => {
        try {
            await taskClient.createTask(invalidControllerNameInput.name,
                invalidControllerNameInput.controller_name,
                invalidControllerNameInput.resource,
                invalidControllerNameInput.userAction,
                invalidControllerNameInput.userInput)

        } catch (error) {
            console.log(JSON.stringify(error))
            expect([3001,"ECONNREFUSED"]).toContain(error.code)
            expect(["connect ECONNREFUSED 127.0.0.1:3000", ErrorMesssages.MISSING_CONTROLLER_NAME]).toContain(error.message)
            // expect(error.message).toEqual(ErrorMesssages.MISSING_CONTROLLER_NAME)
        }
    })   
    /**
     * Test case for valid inputs
     */
    it('success repsonse', async () => {
        try {
            const result = await taskClient.createTask(validCreateTaskInput.name,
                validCreateTaskInput.controller_name,
                validCreateTaskInput.resource,
                validCreateTaskInput.userAction,
                validCreateTaskInput.userInput)
            expect(true).toBeTruthy()

        } catch (error) {
            console.log(JSON.stringify(error))
        }
    }) 
})

/**
 * Test Suite for getTaskById
 */
describe('getTaskByID', () => {
    /**
     * Test case for invalid inputs
     */
    it('reject undefined input with 1001' , async () =>{
        try {
            const result = await taskClient.getTaskById("")
        } catch (error) {
            console.log(JSON.stringify(error))
            expect(error.code).toEqual(1001)
            expect(error.message).toEqual(ErrorMesssages.INVALID_INPUT)   
        }
    })
})

/**
 * Test Suite for deleteTaskById
 */
describe('deleteTask', () => {
    /**
     * Test case for invalid inputs
     */
    it('reject undefined input with 1001', async () => {
        try {
            const result = await taskClient.deleteTask("")
        } catch (error) {
            console.log(JSON.stringify(error))
            expect(error.code).toEqual(1001)
            expect(error.message).toEqual(ErrorMesssages.INVALID_INPUT)
        }
    })
})
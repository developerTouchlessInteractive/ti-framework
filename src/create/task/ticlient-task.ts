const axios = require('axios')
import { ErrorMesssages, GenericException, InvalidControllerNameException, InvalidInputException } from '../../errors/ti.errors'
import * as ti from '../../ti'
import {Response} from '../../ti'

export class TaskClient {
     /**
     * 
     * @param name name of the task
     * @param resource url or file or any other resource definition for the task to load/present to user
     * @param userAction type of user-action ex: accepting/denying a terms&condition case
     * @param userInput user provided input type, ex: signature or form input etc..,
     */
    public createTask(name: string, controller_name: string, resource: string, userAction: ti.UserAction, userInput: ti.UserInput) {
        const task: ti.Task = { name: name, controllerName:controller_name,resource: resource, userAction: userAction, userInput: userInput }
        return new Promise<Response>(async (resolve, reject) => {
            try {
                if(!controller_name || controller_name.length ===0) throw new InvalidControllerNameException()
                if (name.length === 0 || !name) throw new InvalidInputException(ErrorMesssages.INVALID_TASK_NAME)

                const response = await axios({
                    method: 'post',
                    url: ti.URL + 'task',
                    data: task
                })    
                console.log(JSON.stringify(response.data, null, 2))
                resolve(response.data)
            } catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error, null, 2)
                    error = new GenericException(errorString ? errorString : ErrorMesssages.UNABLE_TO_CREATE_TASK)
                }
                reject(error)
            }
        })
    }

    getTaskById(id: string) {
        return new Promise(async (resolve, reject) => {
            try {
                if(!id || id.length ===0)throw new InvalidInputException()
                const response = await axios({
                    method: 'get',
                    url: ti.URL + 'task/' + id
                })
                console.log(JSON.stringify(response.data.tasks, null, 2))
                resolve(response.data.tasks)
            } catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error, null, 2)
                    error = new GenericException(errorString ? errorString : "Invalid Task ID. Task Does not Exist")
                }
                reject(error)
            }
        })
    }

    getAllTasks():Promise<ti.Task[]> {
        return new Promise(async (resolve, reject) => {
            try { 
                const response = await axios({
                    method: 'get',
                    url: ti.URL + 'task/all'
                })
                console.log(JSON.stringify(response.data, null, 2))
                const tasks: ti.Task[] = response.data.tasks
                resolve(tasks)
            } catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error, null, 2)
                    error = new GenericException(errorString ? errorString : "Unable to retrive Tasks. Please check logs")
                }
                reject(error)
            }
        })
    }

    deleteTask(id: string) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!id || id.length === 0) throw new InvalidInputException()
                const data = { id: id }
                const response = await axios({
                    method: 'post',
                    url: ti.URL + 'task/delete',
                    data: data
                })
                console.log(JSON.stringify(response.data, null, 2))
                resolve(response.data)
            } catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error, null, 2)
                    error = new GenericException(errorString ? errorString : "Unable to Delete Tasks. Please Try again")
                }
                reject(error)
            }
        })
    }
}

export { TaskClient as TiTask }
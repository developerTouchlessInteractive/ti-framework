const axios = require('axios') 
import { ErrorMesssages, GenericException, InvalidInputException, InvalidTasksException } from '../../errors/ti.errors'
import * as ti from '../../ti'
import { Response } from '../../ti'

class StageClient{
    /**
     * Creating a Stage 
     * @param name provide a name for this stage
     * @param tasks list of tasks(task-ids) this stage should execute 
     * @param canSkip option to skip for customer
     * @param hostConsentToProceed once stage is complete does this stage require a consent from the host
     */
    createStage(name: string, tasks: string[], canSkip: Boolean, hostConsentToProceed: Boolean) {
        return new Promise<Response>(async (resolve, reject) => {
            try {
                if (name.length === 0 || !name) throw new InvalidInputException(ErrorMesssages.INVALID_STAGE_NAME)
                if(tasks.length===0) throw new InvalidTasksException()
                const stage: ti.Stage = { name: name, tasks: tasks, canSkip: canSkip, hostConsentToProceed: hostConsentToProceed }
                const response = await axios({
                    method: 'post',
                    url: ti.URL + 'stage',
                    data: stage
                })
                console.log(JSON.stringify(response.data, null, 2))
                if(!response.data || response.data.length===0)throw new Error()
                resolve(response.data)
            } catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error, null, 2)
                    error = new GenericException(errorString ? errorString : ErrorMesssages.UNABLE_TO_CREATE_STAGE)
                }
                reject(error)
            }
        })
    }

    getStageById(id: string) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!id || id.length === 0) throw new InvalidInputException(ErrorMesssages.INVALID_STAGE_ID)
                const response = await axios({
                    method: 'get',
                    url: ti.URL + 'stage/' + id
                })
                console.log(JSON.stringify(response.data, null, 2)) 
                resolve(response.data)
            } catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error, null, 2)
                    error = new GenericException(errorString ? errorString : "")
                }
                reject(error)
            }
        })
    }


    getStageDetailById(id: string): Promise<String> {
        return new Promise(async (resolve, reject) => {
            try {
                if (!id || id.length === 0) throw new InvalidInputException(ErrorMesssages.INVALID_STAGE_ID)
                const response = await axios({
                    method: 'get',
                    url: ti.URL + 'stage/total/' + id
                })
                console.log(JSON.stringify(response.data, null, 2))
                resolve(response.data)
            } catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error, null, 2)
                    error = new GenericException(errorString ? errorString : ErrorMesssages.UNABLE_TO_FETCH_STAGE)
                }
                reject(error)
            }
        })
    }

    getAllStages(): Promise<ti.Stage[]> {
        return new Promise(async (resolve,reject)=>{
            try {
                const response = await axios({
                    method: 'get',
                    url: ti.URL + 'stage/all'
                })
                console.log(JSON.stringify(response.data, null, 2))
                const stages: ti.Stage[] = response.data.stages
                resolve(stages)
            } catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error, null, 2)
                    error = new GenericException(errorString ? errorString : ErrorMesssages.UNABLE_TO_FETCH_STAGE)
                }
                reject(error)
            }          
        })
    }

    deleteStage(id: string) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!id || id.length === 0) throw new InvalidInputException(ErrorMesssages.INVALID_STAGE_ID)
                const data = { id: id }
                const response = await axios({
                    method: 'post',
                    url: ti.URL + 'stage/delete',
                    data: data
                })
                console.log(JSON.stringify(response.data, null, 2))
                resolve(response.data)
            } catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error, null, 2)
                    error = new GenericException(errorString ? errorString : ErrorMesssages.UNABLE_TO_DELETE_STAGE)
                }
                reject(error)
            }
        })
    }
}

export { StageClient as TiStage }
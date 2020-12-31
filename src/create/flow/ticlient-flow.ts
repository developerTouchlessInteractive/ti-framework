const axios = require('axios')
import * as io from 'socket.io-client';
import { InvalidInputException, ErrorMesssages, GenericException, InvalidStagesException } from '../../errors/ti.errors';
import * as ti from "../../ti";
import { Task, UserAction, UserInput, Stage, Flow } from '../../models/ti.models';
import { Response } from '../../ti'

class FlowClient {
    /**
     * 
     * @param name name of the flow 
     * @param stages stages included in the flow, provide as string array of stageIds
     * @param hostCanAbort optional -> an option for host to abort this flow. 
     */
    createFlow(name: string, stages: string[], hostCanAbort?: Boolean) {
        return new Promise<Response>(async (resolve, reject) => {
            try {
                if (name.length === 0 || !name) throw new InvalidInputException(ErrorMesssages.INVALID_FLOW_NAME)
                if (stages.length === 0) throw new InvalidStagesException()
                const flow: Flow = { name: name, stages: stages, hostCanAbort: hostCanAbort ? hostCanAbort : false }

                const response = await axios({
                    method: 'post',
                    url: ti.URL + 'flow',
                    data: flow
                })
                console.log(JSON.stringify(response.data, null, 2))
                if (!response.data || response.data.length === 0) throw new Error()
                resolve(response.data)
            } catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error, null, 2)
                    error = new GenericException(errorString ? errorString : ErrorMesssages.UNABLE_TO_CREATE_FLOW)
                }
                reject(error)
            }
        })
    }

    getFlowById(id: string) {

        return new Promise(async (resolve, reject) => {
            try {
                if (!id || id.length === 0) throw new InvalidInputException(ErrorMesssages.INVALID_FLOW_ID)
                const response = await axios({
                    method: 'get',
                    url: ti.URL + 'flow/byid/' + id
                })
                console.log(JSON.stringify(response.data, null, 2))
                resolve(response.data)
            } catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error, null, 2)
                    error = new GenericException(errorString ? errorString : ErrorMesssages.UNABLE_TO_FETCH_FLOW)
                }
                reject(error)
            }
        })
    }

    getFlowDetailById(id: string): Promise<String> {
        return new Promise(async (resolve, reject) => {
            try {
                if (!id || id.length === 0) throw new InvalidInputException(ErrorMesssages.INVALID_FLOW_ID)
                const response = await axios({
                    method: 'get',
                    url: ti.URL + 'flow/total/' + id
                })
                console.log(JSON.stringify(response.data, null, 2))
                resolve(response.data)
            } catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error, null, 2)
                    error = new GenericException(errorString ? errorString : ErrorMesssages.UNABLE_TO_FETCH_FLOW)
                }
                reject(error)
            }
        })
    }

    getAllFlows(): Promise<Flow[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios({
                    method: 'get',
                    url: ti.URL + 'flow/all'
                })
                console.log(JSON.stringify(response.data, null, 2))
                const flows: Flow[] = response.data
                resolve(flows)
            } catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error, null, 2)
                    error = new GenericException(errorString ? errorString : ErrorMesssages.UNABLE_TO_FETCH_FLOW)
                }
                reject(error)
            }
        })
    }

    deleteFlow(id: string) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!id || id.length === 0) throw new InvalidInputException(ErrorMesssages.INVALID_FLOW_ID)
                const data = { id: id }
                const response = await axios({
                    method: 'post',
                    url: ti.URL + 'flow/delete',
                    data: data
                })
                console.log(JSON.stringify(response.data, null, 2))
                resolve(response.data)
            } catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error, null, 2)
                    error = new GenericException(errorString ? errorString : ErrorMesssages.UNABLE_TO_DELETE_FLOW)
                }
                reject(error)
            }
        })
    }
}

export { FlowClient as TiFlow }
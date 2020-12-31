import { inject, injectable } from "tsyringe";  
import { CommunicationHandler, EventListener } from "../flow/transport/transport.protocol.interface";
import { ParameterKeys } from "./injection.index"; 
import * as ti from '../ti' 
import { InvalidInputException, ErrorMesssages, GenericException, ErrorInstruction } from "../errors/ti.errors";
import { ServerEvent, SessionData } from "../ti";

@injectable()
export class FlowManager { 
    constructor(
        @inject(ParameterKeys.COMMUNICATION_HANDLER) private communicationHandler:CommunicationHandler,
        @inject(ParameterKeys.EVENTLISTNER) private eventListener:EventListener, 
        @inject(ParameterKeys.UTIL) private util: ti.UtilService,
        @inject(ParameterKeys.FLOWLISTENER) private flowListener:ti.FlowListener,
        @inject(ParameterKeys.SESSIONDATA) private sessionData:SessionData
    ) { }

    connect():Promise<void> {
    return new Promise(async (resolve, reject) => {
            try {
                await this.communicationHandler.connect()
                resolve()
            } catch (error) {
                reject(error)
            }
        })
    }

    async flowIsComplete(finalData?:any) {
        const data = this.util.getEventResponseData(ServerEvent.SESSION_COMPLETE, finalData ? finalData : undefined)
        await this.flowListener.flowIsComplete(finalData)
        await this.communicationHandler?.closeConnection() 
    }

    /**
    * Send Task Payload To Server, 
    * @param taskPayload task payload which should be output
    * @param event flow event - including task related status
    */
    sendTaskPayloadToServer(taskPayload: any, event: ti.CustomerEvent | ti.ClientEvent |undefined) {
        return new Promise(async (resolve, reject) => {
            try {
                if (taskPayload === undefined || event ===undefined) {
                    throw new InvalidInputException(ErrorMesssages.UNABLE_TO_EMIT_PAYLOAD,ErrorInstruction.TASK_UPDATE_ERROR_INSTRUCTION)
                }
                // const util = container.resolve(ti.UtilService)
                const data: ti.ResponseData = await this.util.getEventResponseData(event, taskPayload)
                this.communicationHandler?.sendPayload(data)
                resolve()
            } catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error, null, 2)
                    error = new GenericException(errorString ? errorString : ErrorMesssages.GENERIC_ERROR)
                }
                reject(error)
            }
        })
    }
}
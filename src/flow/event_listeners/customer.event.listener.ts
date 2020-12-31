import * as ti from '../../ti'
import { inject, injectable } from "tsyringe" 
import { ParameterKeys } from '../injection.index'
import { CommunicationHandler, SessionData } from '../../ti' 
import { RouteHandler } from '../route.handler'

@injectable()
export class CustomerServerEventListener implements ti.EventListener {

    hasConnected = false
    communicationhandler: ti.CommunicationHandler | undefined 

    constructor(
        @inject(ParameterKeys.FLOWLISTENER) private listener: ti.FlowListener, 
        @inject(ParameterKeys.UTIL) private util: ti.UtilService,
        @inject(ParameterKeys.SESSIONDATA) private sessionData: SessionData,
        @inject(ParameterKeys.ROUTEHANDLER)private routeHandler:RouteHandler) {
     }

    setCommunicationHandler(handler?: CommunicationHandler) {
        this.communicationhandler = handler
    }

    disconnected() {
        this.listener?.flowDisconnected()
    }

    connected(data?: any) {
        this.hasConnected = true
        this.listener?.flowConnected()
    }

    async listenEvent(data?: ti.ResponseData) {
        if (data?.route.source === ti.EndPoint.SERVER) {
            switch (data!.type) {
                case ti.ServerEvent.PAYLOAD_PROCESSED
                    || ti.ServerEvent.ACK_PAYLOAD
                    || ti.ServerEvent.PAYLOAD_SENT_TO_REMOTE
                    || ti.ServerEvent.AWAITING_REMOTE_CONFIRMATION
                    || ti.ServerEvent.ACK_CONNECTION
                    || ti.ServerEvent.AUTHENTICATION
                    || ti.ServerEvent.PROCESSING
                    || ti.ServerEvent.ACK_TASK_COMPLETE_REQUEST:
                    data ? await this.listener?.flowUpdate(data) : await this.listener?.flowUpdate()
                    break;
                case ti.ServerEvent.FLOW_COMPLETE:
                    // this.listener?.flowIsComplete(data)
                    // this.communicationhandler?.closeConnection()
                    // ti.clearSessionData(this.sessionData.sessionId)
                    const respData = await this.util.getEventResponseData(ti.ServerEvent.SESSION_COMPLETE, data ? data : undefined)
                    await ti.wipeSession(this.sessionData.sessionId, respData)
                    break;
                case ti.ServerEvent.STAGE_COMPLETE:
                    await this.listener?.stageIsComplete(data)
                    break;
                case ti.ServerEvent.TASK_COMPLETE:
                    // //TODO we need to update taskcomplete in our flowState
                    // //and then calculate the below
                    // //since order cant change we need to bundle them up
                    // //or just task complete update will trigger below
                    // await this.stateHandler?.checkForStageCompletion(data)
                    // await this.stateHandler?.checkForFlowCompletion()
                    await this.listener?.taskIsComplete(data)
                    // route handler update task Is Complete
                    await this.routeHandler.updateTaskComplete(data.data.uniqueReference)
                    break;
                default:
                    data ? await this.listener?.flowUpdate(data) : await this.listener?.flowUpdate()
                    break;
            }
        } else if (data?.route.source === ti.EndPoint.CLIENT) {
            switch (data!.type) {
                case ti.ClientEvent.PAYLOAD_PROCESSED || ti.ClientEvent.PAYLOAD_RECEIVED:
                    await this.listener?.taskUpdate(data)
                    break;
                case ti.ClientEvent.TASK_COMPLETE:
                    this.listenTaskComplete(data)
                    break;
                case ti.ClientEvent.STAGE_COMPLETE:
                    this.listenStageComplete(data)
                    break;
                case ti.ClientEvent.FLOW_COMPLETE:
                    this.listenFlowComplete(data)
                    break;
                default:
                    await this.listener?.taskUpdate(data)
                    break;
            }
        }
    }

    listenTaskComplete(data?: any) {
        this.listener?.taskIsComplete(data)
    }

    listenStageComplete(data?: any) {
        this.listener?.stageIsComplete(data)
    }

    listenFlowComplete(data?: any) {
        this.listener?.flowIsComplete(data)
    }
}
import { inject, injectable } from "tsyringe"
import { EventListener, CommunicationHandler } from "../../flow/transport/transport.protocol.interface"
import * as ti from '../../ti'
import { ServerEvent, FlowListener, EndPoint, SessionData } from "../../ti";
import { ParameterKeys } from "../injection.index"

@injectable()
export class ClientServerEventListener implements EventListener {

    clientListener: FlowListener | undefined
    hasConnected = false
    communicationHandler: CommunicationHandler | undefined

    constructor(@inject(ParameterKeys.FLOWLISTENER) private listener: FlowListener, 
        @inject(ParameterKeys.UTIL) private util: ti.UtilService,
        @inject(ParameterKeys.SESSIONDATA) private sessionData: SessionData) {
        this.clientListener = listener 
    }

    setCommunicationHandler(handler?: CommunicationHandler) {
        this.communicationHandler = handler
    }

    disconnected() {
        this.clientListener?.flowDisconnected()
    }

    connected(data?: any) {
        this.hasConnected = true
        this.clientListener?.flowConnected()
    }

    async listenEvent(data?: any) {
        if (data?.route.source === EndPoint.SERVER) {
            switch (data!.type) {
                case ServerEvent.PAYLOAD_PROCESSED
                    || ServerEvent.ACK_FLOW_INITIATION
                    || ServerEvent.ACK_PAYLOAD
                    || ServerEvent.PAYLOAD_SENT_TO_REMOTE
                    || ServerEvent.AWAITING_REMOTE_CONFIRMATION
                    || ServerEvent.ACK_CONNECTION
                    || ServerEvent.AUTHENTICATION
                    || ServerEvent.PROCESSING:
                    data ? await this.clientListener?.flowUpdate(data) : await this.clientListener?.flowUpdate()
                    break;
                case ServerEvent.FLOW_COMPLETE: 
                    
                    // await this.clientListener?.flowIsComplete(respData)
                    // await this.communicationHandler?.closeConnection()
                    // await ti.clearSessionData(this.sessionData.sessionId)
                    const respData = this.util.getEventResponseData(ServerEvent.SESSION_COMPLETE, data ? data : undefined)
                    await ti.wipeSession(this.sessionData.sessionId,respData)
                    break;
                case ServerEvent.TASK_COMPLETE:
                    //TODO 
                    await this.clientListener?.taskIsComplete()
                    break;
                case ServerEvent.STAGE_COMPLETE:
                    //TODO 
                    await this.clientListener?.stageIsComplete()
                    break;
                default:
                    data ? await this.clientListener?.flowUpdate(data) : await this.clientListener?.flowUpdate()
                    break;
            }
        }
    }

    listenTaskComplete(data?: any) {
        // this.listener?.taskComplete()
    }

    listenStageComplete(data?: any) {
        // this.listener?.stageComplete()
    }

    listenFlowComplete(data?: any) {
        //this.listener?.flowComplete()
    }
}

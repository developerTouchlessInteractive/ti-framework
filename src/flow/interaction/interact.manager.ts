import * as ti from '../../ti' 
import { CommunicationData, DataInterface, comm_events, Interactor, MessageAckListener, Operations, Route } from '../../models/interact.model' 
import * as shortid from 'shortid'
import { DataType, EndPoint, SessionData } from '../../models/data.model';
import { inject, injectable } from 'tsyringe';
import { ParameterKeys } from '../injection.index';
import { CommunicationHandler } from '../transport/transport.protocol.interface';
import { InteractionListener } from '../../ti';

@injectable()
export class InteractManager { 
    
    deviceType:EndPoint | undefined
    
    constructor(@inject(ParameterKeys.SESSIONDATA) private sessionData: SessionData,
        @inject(ParameterKeys.INTERACTION_COMMUNICATION_HANDLER) private communicationHandler: CommunicationHandler,
        @inject(ParameterKeys.INTERACT_LISTENER) private interactionListener: InteractionListener,
        @inject(ParameterKeys.UTIL) private util: ti.UtilService
    ) { 
    }

    broadcastData(communicationData: CommunicationData):Promise<boolean> {
        return new Promise(async(resolve, reject) => {
            try {
                if (this.communicationHandler.isConnected()) {  
                    await this.communicationHandler.sendPayload(communicationData)
                    const ack: MessageAckListener  = {
                        processAndAck(data: any) { 
                            resolve(true)
                        },
                        packetId: communicationData.packetId
                    }
                    this.interactionListener.acks.push(ack)     
                }
            } catch (error) {
                reject(false)
            }
        })
    }


    async connect() {
        await this.communicationHandler.connect()
    }

    async interactionIsComplete(finalData?: any) { 
        await this.communicationHandler.closeConnection()
    }

    getCommunicationData(type: comm_events, source: EndPoint, id?: string, data?: CommunicationData) {
        const commdata:CommunicationData = {
            type:type,
            time: Date.now(),
            route: (id) ? this.getRoute(source, id) : this.getRoute(source),
            packetId: shortid.generate(),
            dataType: DataType.INTERACTION
        }
        if (data) {
            commdata['data'] = data
        }
        return commdata
    }

    getRoute(source: EndPoint, id?: any) {
        const route: Route = {
            sessionId: this.sessionData.sessionId!,
            channelId: id ? id : this.sessionData.channelId,
            deviceType: this.deviceType?this.deviceType:EndPoint.CLIENT,
            flowChannel: this.sessionData.flowChannel!, //flow events channel
            interactChannel: this.sessionData.interactChannel!, //communication related channel
            source: source 
        }
        return route
    }
} 

import * as shortid from 'shortid'
import { inject, injectable } from "tsyringe"; 
import { ErrorMesssages, GenericException, TiUtilException } from '../errors/ti.errors';
import { ParameterKeys } from '../flow/injection.index';
import { ClientInteractEvent, CustomerInteractEvent } from '../flow/interaction/interact.events';
import * as ti from "../ti"
import { CommunicationData, EndPoint, SessionData  } from '../ti';

@injectable()
export class UtilService {

    constructor(@inject(ParameterKeys.SESSIONDATA) private sessionData: SessionData
    ) { }

    getEventResponseData(type: ti.ServerEvent | ti.CustomerEvent | ti.ClientEvent, data?: any): Promise<ti.ResponseData> {
        return new Promise((resolve, reject) => {
            try {
                if (data === undefined) {
                    throw new TiUtilException(ErrorMesssages.UNABLE_TO_CREATE_FLOW_EVENT_MESSAGE)
                }
                const responseData: ti.ResponseData = {
                    type: type,
                    time: Date.now(),
                    packetId: shortid.generate(),
                    route: this.getRoute(),
                    data: data ? data : undefined,
                    dataType: ti.DataType.FLOW
                }
                resolve(responseData)
            } catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error, null, 2)
                    error = new GenericException(errorString ? errorString : "")
                }
                reject(error)
            }
        })
    }

    getCommunicationData(data?: any | undefined): Promise<ti.CommunicationData> {
        return new Promise((resolve, reject) => {
            try {
                if (data === undefined) {
                    throw new TiUtilException(ErrorMesssages.UNABLE_TO_CREATE_INTERACTION_MESSAGE)
                }
                const commdata: CommunicationData = {
                    time: Date.now(),
                    route: this.getRoute(),
                    packetId: shortid.generate(),
                    dataType: ti.DataType.INTERACTION,
                    type: this.sessionData.deviceType === EndPoint.CLIENT ? ClientInteractEvent.COMMUNICATION_DATA : CustomerInteractEvent.COMMUNICATION_DATA
                }
                if (data) {
                    commdata['data'] = data
                }
                resolve(commdata)
            } catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error, null, 2)
                    error = new GenericException(errorString ? errorString : "")
                }
                reject(error)
            }
        })
    }

    getRoute(id?: any) {
        const route: ti.Route = {
            sessionId: this.sessionData.sessionId!,
            channelId: id ? id : this.sessionData.channelId,
            deviceType: this.sessionData.deviceType,
            flowChannel: this.sessionData.flowChannel!, //flow events channel
            interactChannel: this.sessionData.interactChannel!, //communication related channel
            source: this.sessionData.deviceType,
        }
        return route
    }

}

import { EndPoint } from '../../ti';
import { DependencyContainer, injectable } from 'tsyringe';
import { SocketHandler } from './socket.implementation'; 
import { InteractSocketHandler } from './interactsocket.implementation'; 
import { InteractionListener } from '../../ti';


export interface EventListener { 
    connected(data?: any):any
    listenEvent(data?: any): any
    disconnected(): any
    listenTaskComplete(data?:any):any
    listenStageComplete(data?:any): any
    listenFlowComplete(data?: any): any
    
    // setStateHandler?(stateHandler:StateHandler):any
    setCommunicationHandler?(communicationHandler: CommunicationHandler): any
}

export interface ServerDataListener { 
    connected(data?: any): any
    listenEvent(data?: any): any
    disconnected(): any
}
 
export interface DataAddress { 
    sessionId: string,
    channelId: string,
    deviceType: EndPoint
}

export enum Transporter { 
    SOCKET = "SOCKET",
    MQTT = "MQTT",
    RABBITMQ = "RABBITMQ"
}

export enum Mode { 
    FLOW,
    INTERACTION
}

@injectable()
export class CommunicationFactory { 
   
    constructor() { }
    /**
     * a factory method to give Transport mode as CommunicationHandler
     * extend CommunicationHandler as per your custom transport mechanism.
     * @param transportType transport mechanisim that the sdk uses
     */
    getCommunicationHandler(transportType:Transporter,container:DependencyContainer,mode?:Mode) { 
        if (transportType === Transporter.SOCKET)
        { 
            if (mode === Mode.INTERACTION) {
                const socketHandler = container.resolve(InteractSocketHandler)
                const sockhandler: CommunicationHandler = socketHandler
                return sockhandler
            } else { 
                const socketHandler = container.resolve(SocketHandler)
                const sockhandler: CommunicationHandler = socketHandler
                return sockhandler
            }
        }
    }
}

export interface CommunicationHandler { 

    URL: string | undefined
    flowConnectionData: DataAddress | undefined
    //flow event listener
    eventListener?: EventListener | undefined

    //interact event listener & data receiver
    interactListener?: InteractionListener 

    connect(listener?: EventListener | ServerDataListener): Promise<void>

    sendPayload(payload:any):Promise<void>
    
    isConnected(): boolean
    
    closeConnection():Promise<void>
}




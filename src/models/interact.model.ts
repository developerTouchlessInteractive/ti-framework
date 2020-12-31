import { CustomerInteractEvent, ClientInteractEvent, ServerInteractEvent } from "../flow/interaction/interact.events";
import { DataType, EndPoint } from "./data.model"; 

export enum comm_events {
    COMMUNICATION_DATA,
    SERVER_ACK_CLIENT_COMMUNICATION_REQ,
    SERVER_ACK_CUSTOMER_COMMUNICATION_REQ,
    ERROR_NO_FLOW_TO_CONNECT,

    CLIENT_INTERACTION_INITIATED,
    ERROR_CLIENT_CONNECTION,
    CLIENT_ENDS_INTERACTION,

    CUSTOMER_INTERACTION_INITIATED,
    ERROR_CUSTOMER_CONNECTION,
    CUSTOMER_ENDS_INTERACTION,
    
    //sending message
    CLIENT_SENDS_COMM_DATA,
    CUSTOMER_SENDS_COMM_DATA,
    SERVER_ACK_PACKET,
}


export interface CommunicationData {
    time: number,
    type: CustomerInteractEvent|ClientInteractEvent|ServerInteractEvent,
    data?: any,
    packetId:string,
    route: Route,
    dataType: DataType
}

export interface Route{
    sessionId: string,
    channelId: string,
    flowChannel: string,
    interactChannel: string,
    deviceType: string,
    source: EndPoint 
}

/**
 * Interaction interface for  Data sending   
 */
export interface Interactor {
    broadcastData(data: any): Promise<boolean>
    sendDataById?(data: any, channelId: string) : Promise<boolean> 
    startScreenShareToAll?(): Promise<boolean> 
    startScreenShareById?(customerId: string): Promise<boolean> 
}

// export interface CommunicationReceiver {
//     receiveData(data: CommunicationData): void
//     receiveScreenShareRequest?(data: CommunicationData): void
// }

// export interface ConnectListener {
//     connected(data?: any): void
//     disConnected(data?: any): void
//     connectionUpdate(data?: any): void
// }

/**
 * connection listener for communication/interaction session
 * only initiated after establishing a Flow session
 */
export interface DataInterface
{
    receiveData(data: CommunicationData): void
    receiveScreenShareRequest?(data: CommunicationData): void
    interactionConnected(data?: any): void
    interactionDisConnected(data?: any): void
    connectionUpdate(data?: any): void
}

export interface Operations{
    endInteraction(deviceType: EndPoint): void
    isConnected(): boolean
    initInteraction(deviceType: EndPoint, dataInterface: DataInterface): Promise<boolean>
    initInteractionCustomer(deviceType: EndPoint, dataInterface: DataInterface, sessionId: string, channelId: string, interactChannel: string): Promise<boolean>
}

export interface MessageAckListener {
    processAndAck(data: any): void
    packetId: string | undefined
}

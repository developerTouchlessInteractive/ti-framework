import { CustomerInteractEvent, ClientInteractEvent, ServerInteractEvent } from "../flow/interaction/interact.events";
import { DataType, EndPoint } from "./data.model";
export declare enum comm_events {
    COMMUNICATION_DATA = 0,
    SERVER_ACK_CLIENT_COMMUNICATION_REQ = 1,
    SERVER_ACK_CUSTOMER_COMMUNICATION_REQ = 2,
    ERROR_NO_FLOW_TO_CONNECT = 3,
    CLIENT_INTERACTION_INITIATED = 4,
    ERROR_CLIENT_CONNECTION = 5,
    CLIENT_ENDS_INTERACTION = 6,
    CUSTOMER_INTERACTION_INITIATED = 7,
    ERROR_CUSTOMER_CONNECTION = 8,
    CUSTOMER_ENDS_INTERACTION = 9,
    CLIENT_SENDS_COMM_DATA = 10,
    CUSTOMER_SENDS_COMM_DATA = 11,
    SERVER_ACK_PACKET = 12
}
export interface CommunicationData {
    time: number;
    type: CustomerInteractEvent | ClientInteractEvent | ServerInteractEvent;
    data?: any;
    packetId: string;
    route: Route;
    dataType: DataType;
}
export interface Route {
    sessionId: string;
    channelId: string;
    flowChannel: string;
    interactChannel: string;
    deviceType: string;
    source: EndPoint;
}
/**
 * Interaction interface for  Data sending
 */
export interface Interactor {
    broadcastData(data: any): Promise<boolean>;
    sendDataById?(data: any, channelId: string): Promise<boolean>;
    startScreenShareToAll?(): Promise<boolean>;
    startScreenShareById?(customerId: string): Promise<boolean>;
}
/**
 * connection listener for communication/interaction session
 * only initiated after establishing a Flow session
 */
export interface DataInterface {
    receiveData(data: CommunicationData): void;
    receiveScreenShareRequest?(data: CommunicationData): void;
    interactionConnected(data?: any): void;
    interactionDisConnected(data?: any): void;
    connectionUpdate(data?: any): void;
}
export interface Operations {
    endInteraction(deviceType: EndPoint): void;
    isConnected(): boolean;
    initInteraction(deviceType: EndPoint, dataInterface: DataInterface): Promise<boolean>;
    initInteractionCustomer(deviceType: EndPoint, dataInterface: DataInterface, sessionId: string, channelId: string, interactChannel: string): Promise<boolean>;
}
export interface MessageAckListener {
    processAndAck(data: any): void;
    packetId: string | undefined;
}
//# sourceMappingURL=interact.model.d.ts.map
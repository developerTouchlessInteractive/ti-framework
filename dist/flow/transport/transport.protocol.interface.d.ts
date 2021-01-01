import { EndPoint } from '../../ti';
import { DependencyContainer } from 'tsyringe';
import { InteractionListener } from '../../ti';
export interface EventListener {
    connected(data?: any): any;
    listenEvent(data?: any): any;
    disconnected(): any;
    listenTaskComplete(data?: any): any;
    listenStageComplete(data?: any): any;
    listenFlowComplete(data?: any): any;
    setCommunicationHandler?(communicationHandler: CommunicationHandler): any;
}
export interface ServerDataListener {
    connected(data?: any): any;
    listenEvent(data?: any): any;
    disconnected(): any;
}
export interface DataAddress {
    sessionId: string;
    channelId: string;
    deviceType: EndPoint;
}
export declare enum Transporter {
    SOCKET = "SOCKET",
    MQTT = "MQTT",
    RABBITMQ = "RABBITMQ"
}
export declare enum Mode {
    FLOW = 0,
    INTERACTION = 1
}
export declare class CommunicationFactory {
    constructor();
    /**
     * a factory method to give Transport mode as CommunicationHandler
     * extend CommunicationHandler as per your custom transport mechanism.
     * @param transportType transport mechanisim that the sdk uses
     */
    getCommunicationHandler(transportType: Transporter, container: DependencyContainer, mode?: Mode): CommunicationHandler | undefined;
}
export interface CommunicationHandler {
    URL: string | undefined;
    flowConnectionData: DataAddress | undefined;
    eventListener?: EventListener | undefined;
    interactListener?: InteractionListener;
    connect(listener?: EventListener | ServerDataListener): Promise<void>;
    sendPayload(payload: any): Promise<void>;
    isConnected(): boolean;
    closeConnection(): Promise<void>;
}
//# sourceMappingURL=transport.protocol.interface.d.ts.map
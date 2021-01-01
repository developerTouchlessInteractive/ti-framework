/// <reference types="socket.io-client" />
import { CommunicationHandler, DataAddress, EventListener } from './transport.protocol.interface';
export declare let socket: SocketIOClient.Socket;
export declare class SocketHandler implements CommunicationHandler {
    private url;
    private queryData;
    private flowChannel;
    private eL;
    URL: string | undefined;
    eventListener?: EventListener | undefined;
    flowConnectionData: DataAddress | undefined;
    /**
     * implementation of communication handler
     * @param url
     * @param queryData
     * @param flowChannel
     * @param interactChannel
     */
    constructor(url: string, queryData: DataAddress, flowChannel: string, eL: EventListener);
    isConnected(): boolean;
    closeConnection(): Promise<void>;
    connect(): Promise<void>;
    sendPayload(payload: any): Promise<void>;
}
//# sourceMappingURL=socket.implementation.d.ts.map
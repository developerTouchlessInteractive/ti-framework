/// <reference types="socket.io-client" />
import { CommunicationHandler, DataAddress, InteractionListener } from '../../ti';
export declare let socket: SocketIOClient.Socket;
export declare class InteractSocketHandler implements CommunicationHandler {
    private url;
    private queryData;
    private interactChannel;
    private il;
    URL: string | undefined;
    interactListener: InteractionListener | undefined;
    flowConnectionData: DataAddress | undefined;
    constructor(url: string, queryData: DataAddress, interactChannel: string, il: InteractionListener);
    isConnected(): boolean;
    closeConnection(): Promise<void>;
    connect(): Promise<void>;
    sendPayload(payload: any): Promise<void>;
}
//# sourceMappingURL=interactsocket.implementation.d.ts.map
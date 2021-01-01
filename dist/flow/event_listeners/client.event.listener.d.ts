import { EventListener, CommunicationHandler } from "../../flow/transport/transport.protocol.interface";
import * as ti from '../../ti';
import { FlowListener, SessionData } from "../../ti";
export declare class ClientServerEventListener implements EventListener {
    private listener;
    private util;
    private sessionData;
    clientListener: FlowListener | undefined;
    hasConnected: boolean;
    communicationHandler: CommunicationHandler | undefined;
    constructor(listener: FlowListener, util: ti.UtilService, sessionData: SessionData);
    setCommunicationHandler(handler?: CommunicationHandler): void;
    disconnected(): void;
    connected(data?: any): void;
    listenEvent(data?: any): Promise<void>;
    listenTaskComplete(data?: any): void;
    listenStageComplete(data?: any): void;
    listenFlowComplete(data?: any): void;
}
//# sourceMappingURL=client.event.listener.d.ts.map
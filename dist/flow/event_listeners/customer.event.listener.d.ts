import * as ti from '../../ti';
import { CommunicationHandler, SessionData } from '../../ti';
import { RouteHandler } from '../route.handler';
export declare class CustomerServerEventListener implements ti.EventListener {
    private listener;
    private util;
    private sessionData;
    private routeHandler;
    hasConnected: boolean;
    communicationhandler: ti.CommunicationHandler | undefined;
    constructor(listener: ti.FlowListener, util: ti.UtilService, sessionData: SessionData, routeHandler: RouteHandler);
    setCommunicationHandler(handler?: CommunicationHandler): void;
    disconnected(): void;
    connected(data?: any): void;
    listenEvent(data?: ti.ResponseData): Promise<void>;
    listenTaskComplete(data?: any): void;
    listenStageComplete(data?: any): void;
    listenFlowComplete(data?: any): void;
}
//# sourceMappingURL=customer.event.listener.d.ts.map
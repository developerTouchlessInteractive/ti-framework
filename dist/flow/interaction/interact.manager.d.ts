import * as ti from '../../ti';
import { CommunicationData, comm_events, Route } from '../../models/interact.model';
import { EndPoint, SessionData } from '../../models/data.model';
import { CommunicationHandler } from '../transport/transport.protocol.interface';
import { InteractionListener } from '../../ti';
export declare class InteractManager {
    private sessionData;
    private communicationHandler;
    private interactionListener;
    private util;
    deviceType: EndPoint | undefined;
    constructor(sessionData: SessionData, communicationHandler: CommunicationHandler, interactionListener: InteractionListener, util: ti.UtilService);
    broadcastData(communicationData: CommunicationData): Promise<boolean>;
    connect(): Promise<void>;
    interactionIsComplete(finalData?: any): Promise<void>;
    getCommunicationData(type: comm_events, source: EndPoint, id?: string, data?: CommunicationData): ti.CommunicationData;
    getRoute(source: EndPoint, id?: any): Route;
}
//# sourceMappingURL=interact.manager.d.ts.map
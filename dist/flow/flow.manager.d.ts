import { CommunicationHandler, EventListener } from "../flow/transport/transport.protocol.interface";
import * as ti from '../ti';
import { SessionData } from "../ti";
export declare class FlowManager {
    private communicationHandler;
    private eventListener;
    private util;
    private flowListener;
    private sessionData;
    constructor(communicationHandler: CommunicationHandler, eventListener: EventListener, util: ti.UtilService, flowListener: ti.FlowListener, sessionData: SessionData);
    connect(): Promise<void>;
    flowIsComplete(finalData?: any): Promise<void>;
    /**
    * Send Task Payload To Server,
    * @param taskPayload task payload which should be output
    * @param event flow event - including task related status
    */
    sendTaskPayloadToServer(taskPayload: any, event: ti.CustomerEvent | ti.ClientEvent | undefined): Promise<unknown>;
}
//# sourceMappingURL=flow.manager.d.ts.map
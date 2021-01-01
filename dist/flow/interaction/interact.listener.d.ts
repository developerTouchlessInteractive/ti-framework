import { EndPoint, MessageAckListener, comm_events, CommunicationData, Route, DataInterface, SessionData } from "../../ti";
import { ServerDataListener } from "../transport/transport.protocol.interface";
export declare class InteractionListener implements ServerDataListener {
    private dataInterface;
    private sessionData;
    deviceType: EndPoint | undefined;
    acks: MessageAckListener[];
    constructor(dataInterface: DataInterface, sessionData: SessionData);
    connected(data?: any): void;
    listenEvent(comm?: any): void;
    disconnected(): void;
    getCommunicationData(type: comm_events, source: EndPoint, id?: string, data?: CommunicationData): CommunicationData;
    getRoute(source: EndPoint, id?: any): Route;
}
//# sourceMappingURL=interact.listener.d.ts.map
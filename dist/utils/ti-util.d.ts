import * as ti from "../ti";
import { SessionData } from '../ti';
export declare class UtilService {
    private sessionData;
    constructor(sessionData: SessionData);
    getEventResponseData(type: ti.ServerEvent | ti.CustomerEvent | ti.ClientEvent, data?: any): Promise<ti.ResponseData>;
    getCommunicationData(data?: any | undefined): Promise<ti.CommunicationData>;
    getRoute(id?: any): ti.Route;
}
//# sourceMappingURL=ti-util.d.ts.map
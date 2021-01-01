import { ResponseData, SdkNotificationData } from "../models/data.model";
export interface FlowListener {
    /**
     * receives updates on the flow from server/client applications
     * @param event event with type and data
     */
    flowUpdate(event?: ResponseData | SdkNotificationData): Promise<void>;
    flowOperationError(event?: ResponseData | SdkNotificationData): void;
    flowExitedWithError(event?: ResponseData): void;
    taskUpdate(event?: ResponseData): Promise<void>;
    flowConnected(event?: ResponseData): void;
    flowDisconnected(event?: ResponseData): void;
    taskIsComplete(event?: ResponseData): Promise<void>;
    stageIsComplete(event?: ResponseData): Promise<void>;
    flowIsComplete(event?: ResponseData): Promise<void>;
    nextTaskPath?(path: string, uniqueReference: string): void;
}
//# sourceMappingURL=flow.listener.d.ts.map
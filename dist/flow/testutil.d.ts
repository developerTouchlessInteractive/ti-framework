import { DependencyContainer } from "tsyringe";
import { SdkNotificationData } from "../models/data.model";
import { FlowListener, SessionData } from "../ti";
import { DataAddress, EventListener } from "../flow/transport/transport.protocol.interface";
import * as ti from '../ti';
export declare class TestUtil {
    registerData: {
        sessionId: string;
        customerChannel: string;
    };
    sessionInfo: {
        sessionId: string;
        channelId: string;
        inviteCode: string;
    };
    initData: DataAddress;
    sessionId: string;
    channelId: string;
    flowChannel: string;
    interactChannel: string;
    sessionData: SessionData;
    constructor();
    addSessionInfo(testContainer: DependencyContainer): void;
    addSessionData(testContainer: DependencyContainer): DependencyContainer;
    addFlowListener(testContainer: DependencyContainer): DependencyContainer;
    addEventListener(testContainer: DependencyContainer): DependencyContainer;
    getFlowListener(testContainer: DependencyContainer): TestFlowListener;
    addUtils(testContainer: DependencyContainer): DependencyContainer;
    getFlowChannel(sessionId: string, channelId: string): string;
    getInteractChannel(sessionId: string, channelId: string): string;
    addCommunicationHandlerFromFactory(testContainer: DependencyContainer): DependencyContainer;
}
export declare class TestFlowListener implements FlowListener {
    constructor();
    flowUpdate(event?: ti.ResponseData | SdkNotificationData): Promise<void>;
    flowOperationError(event?: ti.ResponseData | SdkNotificationData): void;
    flowExitedWithError(event?: ti.ResponseData): void;
    taskUpdate(event?: ti.ResponseData): Promise<void>;
    flowConnected(event?: ti.ResponseData): void;
    flowDisconnected(event?: ti.ResponseData): void;
    taskIsComplete(event?: ti.ResponseData): Promise<void>;
    stageIsComplete(event?: ti.ResponseData): Promise<void>;
    flowIsComplete(event?: ti.ResponseData): Promise<void>;
}
export declare class TestEventListener implements EventListener {
    constructor();
    connected(data?: any): void;
    listenEvent(data?: any): void;
    disconnected(): void;
    listenTaskComplete(data?: any): void;
    listenStageComplete(data?: any): void;
    listenFlowComplete(data?: any): void;
}
//# sourceMappingURL=testutil.d.ts.map
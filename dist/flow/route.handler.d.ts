import { FlowListener, handler, SessionData, FlowState, TaskOrder } from '../ti';
export declare class RouteHandler implements TaskPathCalculator {
    private sessionData;
    private routeConfig;
    private flowState;
    private flowListener;
    private currentTask;
    constructor(sessionData: SessionData, routeConfig: handler.TiRouteConfig, flowState: FlowState, flowListener: FlowListener);
    getCurrentTask(): TaskOrder | undefined;
    isCurrentTask(reference: string): boolean;
    updateTaskComplete(uniqueReference: string): Promise<void>;
    /**
    * use this method to determine what task should be enabled next
    * @param order <order comes from flowSateService.ts>
    */
    calculateNextTask(): Promise<void>;
    reportNextTaskPath(): Promise<void>;
    isAnyStageComplete(): Promise<void>;
    updateTaskLedger(ref: string): Promise<void>;
    updateTaskStateForProgress(reference: string): Promise<void>;
    updateStageState(reference: string): Promise<void>;
    updateFlowState(): Promise<void>;
    isFlowComplete(): Promise<boolean>;
}
interface TaskPathCalculator {
    getCurrentTask(): TaskOrder | undefined;
    isCurrentTask(reference: string): boolean;
    calculateNextTask(): Promise<void>;
    reportNextTaskPath(): Promise<void>;
    updateTaskComplete(uniqueReference: string): Promise<void>;
}
export {};
//# sourceMappingURL=route.handler.d.ts.map
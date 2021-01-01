import { FlowState } from "../../ti";
import { EventListener } from "../transport/transport.protocol.interface";
export declare class StoreContainerFactory {
    private static _instance;
    private constructor();
    static getInstance(): StoreContainerFactory;
    /**
     * a factory method to give store container as StoreContainerHandler
     * extend StoreContainerHandler as per your custom store container- state management .
     * @param storeType transport mechanisim that the sdk uses
     */
    getStateContainerHandler(storeType: StoreMethod, eventListener: EventListener): StateHandler | undefined;
}
export declare enum StoreMethod {
    CUSTOM = "custom",
    REDUX = "REDUX"
}
export declare abstract class StateHandler {
    eventListener: EventListener;
    private flowDetails;
    private _flowState;
    getflowState(): FlowState | undefined;
    setflowState(value: FlowState | undefined): void;
    constructor(listener: EventListener);
    stageComplete(data?: any): void;
    flowComplete(data?: any): void;
    taskComplete(data?: any): void;
    checkForStageCompletion(data?: any): Promise<unknown>;
    abstract updateStageState(reference: string): Promise<void>;
    checkForFlowCompletion(): Promise<unknown>;
}
export declare class RxjsStateManager extends StateHandler {
    private static _instance;
    private constructor();
    static getInstance(listener: EventListener): RxjsStateManager;
    updateStageState(reference: string): Promise<void>;
}
//# sourceMappingURL=store.interface.d.ts.map
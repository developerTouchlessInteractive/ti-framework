import { FlowDetails,FlowState } from "../../ti";
import { EventListener } from "../transport/transport.protocol.interface";

export class StoreContainerFactory {
    private static _instance: StoreContainerFactory;

    private constructor() { }

    static getInstance() {
        return this._instance || (this._instance = new this());
    }

    /**
     * a factory method to give store container as StoreContainerHandler
     * extend StoreContainerHandler as per your custom store container- state management .
     * @param storeType transport mechanisim that the sdk uses
     */
    getStateContainerHandler(storeType: StoreMethod, eventListener: EventListener) {
        if (storeType === StoreMethod.CUSTOM) {
            const statehandler: StateHandler = RxjsStateManager.getInstance(eventListener)
            return statehandler
        }
        else if (storeType === StoreMethod.REDUX) { 
            // return your_redux_state_manager_who_extends_to_StateHandler
        }
    }
}

export enum StoreMethod {
    CUSTOM = "custom",
    REDUX = "REDUX"
}

export abstract class StateHandler { 
    eventListener: EventListener
    private flowDetails: FlowDetails | undefined;
    private _flowState: FlowState | undefined;

    public getflowState(): FlowState | undefined {
        return this._flowState;
    }
    
    public setflowState(value: FlowState | undefined) {
        this._flowState = value;
    }
    
    constructor(listener: EventListener) { 
        this.eventListener = listener
    }

    stageComplete(data?:any) { 
        this.eventListener.listenStageComplete(data)
    }

    flowComplete(data?:any) {
        this.eventListener.listenFlowComplete(data)
    }

    taskComplete(data?: any) { 
        this.eventListener.listenTaskComplete(data)
    }

    checkForStageCompletion(data?:any) { 
        //TODO calculates if stages or flows are complete and 
        // if complete triggers the above methods. respectively
        //this is common for all subclasses of StateHandler
           return new Promise((resolve,reject)=>{
               try {
                   if (this.getflowState() && this.getflowState()!.isCompleted) {
                       this.getflowState()!.stageStates.forEach(async stage_state => {
                           if (!stage_state.isCompleted) {
                               const isStageComplete = stage_state.taskStates.every(x => x.isCompleted === true)
                               if (isStageComplete) {
                                   await this.updateStageState(stage_state.uniqueReference!)
                                   this.stageComplete(data)
                               }
                           }
                       });
                   }
               resolve()
             } catch (error) {
               reject()
             }
           })
    }

    abstract updateStageState(reference: string):Promise<void>

    checkForFlowCompletion() { 
            return new Promise((resolve,reject)=>{
                try {
                //TODO write flow complete logic
                // this.flowComplete()
                resolve()
              } catch (error) {
                reject()
              }
            })
    }
}


export class RxjsStateManager extends StateHandler {
   
    private static _instance: RxjsStateManager;

    private constructor(listener: EventListener) {
        super(listener)
     }

    static getInstance(listener: EventListener) {
        return this._instance || (this._instance = new this(listener));
    }

    updateStageState(reference: string): Promise<void> {
            return new Promise((resolve,reject)=>{
                try {
                    const state = this.getflowState()
                    state!.stageStates.find(x => x.uniqueReference === reference)!.isCompleted = true
                    //TODO check if flow is true
                    
                resolve()
              } catch (error) {
                reject()
              }
            })
    }
}
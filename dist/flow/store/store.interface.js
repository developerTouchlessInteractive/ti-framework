"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RxjsStateManager = exports.StateHandler = exports.StoreMethod = exports.StoreContainerFactory = void 0;
class StoreContainerFactory {
    constructor() { }
    static getInstance() {
        return this._instance || (this._instance = new this());
    }
    /**
     * a factory method to give store container as StoreContainerHandler
     * extend StoreContainerHandler as per your custom store container- state management .
     * @param storeType transport mechanisim that the sdk uses
     */
    getStateContainerHandler(storeType, eventListener) {
        if (storeType === StoreMethod.CUSTOM) {
            const statehandler = RxjsStateManager.getInstance(eventListener);
            return statehandler;
        }
        else if (storeType === StoreMethod.REDUX) {
            // return your_redux_state_manager_who_extends_to_StateHandler
        }
    }
}
exports.StoreContainerFactory = StoreContainerFactory;
var StoreMethod;
(function (StoreMethod) {
    StoreMethod["CUSTOM"] = "custom";
    StoreMethod["REDUX"] = "REDUX";
})(StoreMethod = exports.StoreMethod || (exports.StoreMethod = {}));
class StateHandler {
    constructor(listener) {
        this.eventListener = listener;
    }
    getflowState() {
        return this._flowState;
    }
    setflowState(value) {
        this._flowState = value;
    }
    stageComplete(data) {
        this.eventListener.listenStageComplete(data);
    }
    flowComplete(data) {
        this.eventListener.listenFlowComplete(data);
    }
    taskComplete(data) {
        this.eventListener.listenTaskComplete(data);
    }
    checkForStageCompletion(data) {
        //TODO calculates if stages or flows are complete and 
        // if complete triggers the above methods. respectively
        //this is common for all subclasses of StateHandler
        return new Promise((resolve, reject) => {
            try {
                if (this.getflowState() && this.getflowState().isCompleted) {
                    this.getflowState().stageStates.forEach((stage_state) => __awaiter(this, void 0, void 0, function* () {
                        if (!stage_state.isCompleted) {
                            const isStageComplete = stage_state.taskStates.every(x => x.isCompleted === true);
                            if (isStageComplete) {
                                yield this.updateStageState(stage_state.uniqueReference);
                                this.stageComplete(data);
                            }
                        }
                    }));
                }
                resolve();
            }
            catch (error) {
                reject();
            }
        });
    }
    checkForFlowCompletion() {
        return new Promise((resolve, reject) => {
            try {
                //TODO write flow complete logic
                // this.flowComplete()
                resolve();
            }
            catch (error) {
                reject();
            }
        });
    }
}
exports.StateHandler = StateHandler;
class RxjsStateManager extends StateHandler {
    constructor(listener) {
        super(listener);
    }
    static getInstance(listener) {
        return this._instance || (this._instance = new this(listener));
    }
    updateStageState(reference) {
        return new Promise((resolve, reject) => {
            try {
                const state = this.getflowState();
                state.stageStates.find(x => x.uniqueReference === reference).isCompleted = true;
                //TODO check if flow is true
                resolve();
            }
            catch (error) {
                reject();
            }
        });
    }
}
exports.RxjsStateManager = RxjsStateManager;
//# sourceMappingURL=store.interface.js.map
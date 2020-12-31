import { inject, injectable } from "tsyringe"; 
import { ParameterKeys } from "./injection.index"; 
import { FlowListener, handler, SessionData, FlowState, TaskOrder} from '../ti'

@injectable()
export class RouteHandler implements TaskPathCalculator {
    private currentTask!:TaskOrder|undefined

    constructor(@inject(ParameterKeys.SESSIONDATA) private sessionData: SessionData,
        @inject(ParameterKeys.ROUTECONFIG) private routeConfig: handler.TiRouteConfig,
        @inject(ParameterKeys.FLOW_STATE) private flowState: FlowState,
        @inject(ParameterKeys.FLOWLISTENER)private flowListener:FlowListener) { }


    getCurrentTask() {
        return this.currentTask?this.currentTask:undefined
    }

    isCurrentTask(reference: string): boolean {
        return (this.getCurrentTask()?.uniqueReference === reference)
    }

    updateTaskComplete(uniqueReference: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.updateTaskLedger(uniqueReference)
                await this.updateTaskStateForProgress(uniqueReference)
                await this.isAnyStageComplete()
                await this.isFlowComplete()
                await this.calculateNextTask()
                await this.reportNextTaskPath()

                resolve()
            } catch (error) {
                reject()
            }
        })
    }

    /**
    * use this method to determine what task should be enabled next
    * @param order <order comes from flowSateService.ts>
    */
    calculateNextTask(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const order:TaskOrder[] = this.flowState.taskLedger.sort((a, b) => (a.order > b.order) ? 1 : -1)
                if(order.every(task => task.isCompleted)){
                    this.currentTask = undefined
                }else{
                    this.currentTask = order[order.findIndex(task => !task.isCompleted)]
                    if (this.currentTask) {
                        const index = this.routeConfig.routes.findIndex(x => x.controllerName === this.currentTask!.controllerName)
                        if (index > -1) {
                            const path = this.routeConfig.routes[index].path
                            this.currentTask.path = path ? path : undefined
                        }
                    }
                }
                resolve()
            } catch (error) {
                reject()
            }
        })
    }



    reportNextTaskPath(): Promise<void> {
        return new Promise((resolve,reject)=>{
            if(this.currentTask){
                if (this.currentTask.path!.length <= 0) {
                    reject()
                }
                this.flowListener.nextTaskPath!(this.currentTask.path!, this.currentTask.uniqueReference!)
            }
            resolve()
        })
    }

    isAnyStageComplete(): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                this.flowState!.stageStates.forEach(async stage_state => {
                    if (!stage_state.isCompleted) {
                        const isStageComplete = stage_state.taskStates.every(x => x.isCompleted === true)
                        if (isStageComplete) {
                            await this.updateStageState(stage_state.uniqueReference!) 
                        }
                    }
                });
                resolve()
            } catch (error) {
                reject()
            }
        })
    }

    updateTaskLedger(ref:string) {
        return new Promise<void>((resolve, reject) => {
            try {
                const task = this.flowState.taskLedger.find(x => x.uniqueReference === ref)
                if (task) task.isCompleted = true
                resolve()
            } catch (error) {
                reject()
            }
        })
    }

    updateTaskStateForProgress(reference: string): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                this.flowState.stageStates.find(stage => {
                    const task = stage.taskStates.find(task => task.uniqueReference === reference)
                    if (task) task.isCompleted = true
                })
                resolve()
            } catch (error) {
                reject()
            }
        })
    }

    updateStageState(reference: string): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const stage = this.flowState.stageStates.find(x => x.uniqueReference === reference)
                if (stage) stage.isCompleted = true
                resolve()
            } catch (error) {
                reject()
            }
        })
    }

    updateFlowState(): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                this.flowState!.isCompleted = true
                resolve()
            } catch (error) {
                reject()
            }
        })
    }


    isFlowComplete(): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                const isFlowComplete = this.flowState!.stageStates.every(stage => stage.isCompleted === true)
                if (isFlowComplete) await this.updateFlowState()
                resolve(isFlowComplete)
            } catch (error) {
                reject()
            }
        })
    }
}

interface TaskPathCalculator { 
    getCurrentTask():TaskOrder|undefined
    isCurrentTask(reference:string):boolean
    calculateNextTask(): Promise<void>
    reportNextTaskPath():Promise<void>
    updateTaskComplete(uniqueReference: string): Promise<void>
}
export interface Task {
    name: string
    controllerName:string
    userAction: UserAction
    userInput: UserInput
    resource: string
    _id?: string
    type?: string
    createdDate?: string
}

export interface Stage{
    _id?: string,
    tasks: string[],
    detailTasks?:Task[]
    createdDate?: string,
    name: string,
    canSkip: Boolean,
    hostConsentToProceed: Boolean
}

export interface Flow{
    _id?: String,
    stages: string[],
    createdDate?: string,
    name: string,
    hostCanAbort: Boolean
}

export interface Response{
    id?:string,
    code?:number,
    message?:string
}

export enum UserAction {
    ACCEPT_OR_DENY = "ACCEPT_OR_DENY",
    SUBMIT_CANCEL = "SUBMIT_CANCEL",
    OK_CANCEL = "OK_CANCEL",
    DISMISS = "DISMISS"
}

export enum UserInput {
    INPUT_SINGATURE = "INPUT_SINGATURE",
    INPUT_FORM = "INPUT_FORM",
    INPUT_MIXED = "INPUT_MIXED",
    NONE = "NONE"
}

export enum Message {
    SUCCESS_TASK_CREATION = "task created succesfully",
    FAILURE_TASK_CREATION = "task creation failed, retry",
    FAILURE_TASK_DELETION = "task deletion failed, retry",
    FAILURE_TASK_CREATION_INVALID = "task creation failed, retry",
    CREATION_FAILURE_TASK_CONFIG_EXISTS = "a similar task exists with same config",
    SUCCESS_TASK_DELETED = "task is deleted succesfully",
    DELETE_TASK_DOESNT_EXIST = "task doesnt exist",

    SUCCESS_STAGE_CREATION = "stage created succesfully",
    FAILURE_STAGE_CREATION = "stage creation failed, retry",
    FAILURE_STAGE_DELETION = "stage deletion failed, retry",
    FAILURE_STAGE_CREATION_INVALID = "stage creation failed, retry",
    CREATION_FAILURE_STAGE_CONFIG_EXISTS = "a similar stage exists with same config",
    SUCCESS_STAGE_DELETED = "stage is deleted succesfully",
    DELETE_STAGE_DOESNT_EXIST = "stage doesnt exist",

    SUCCESS_FLOW_CREATION = "flow created succesfully",
    FAILURE_FLOW_CREATION = "flow creation failed, retry",
    FAILURE_FLOW_DELETION = "flow deletion failed, retry",
    FAILURE_FLOW_CREATION_INVALID = "flow creation failed, retry",
    CREATION_FAILURE_FLOW_CONFIG_EXISTS = "a similar flow exists with same config",
    SUCCESS_FLOW_DELETED = "flow is deleted succesfully",
    DELETE_FLOW_DOESNT_EXIST = "flow doesnt exist"
}


//new models 
//TODO rearrange models in appropriate places

export interface FlowDetails {
    _id: string,
    name: string,
    hostCanAbort: boolean,
    createdDate: string,
    stages: {
        tasks: string[],
        _id: string,
        name: string,
        hostCanAbort: boolean,
        createdDate: string,
        canSkip: boolean,
        hostConsentToProceed: boolean
    }[]
}

export interface FlowState extends FlowDetails {
    stageStates: StageState[]
    taskLedger: TaskOrder[]
    isCompleted: boolean
}

export interface StageState extends Stage {
    taskStates: TaskState[],
    uniqueReference?: string,
    isCompleted: boolean
}

export interface TaskState extends Task {
    uniqueReference?: string, 
    isCompleted: boolean
}

export interface TaskOrder extends TaskState {
    order: number,
    isCompleted: boolean,
    path?:string
}

export interface SessionInfo { 
    sessionId: string,
    channelId: string,
    inviteCode?: string
}
export declare abstract class TiSdkError {
    abstract code: number;
    message?: string;
    instructions?: string;
    constructor(msg?: string, steps?: string);
}
/**
 * 7000's -- container/instantiation related errors
 */
export declare class InstantiationException extends TiSdkError {
    code: number;
    constructor(msg?: string, steps?: string);
}
export declare class InvalidContainerException extends TiSdkError {
    code: number;
    constructor(msg?: string, steps?: string);
}
export declare class DIRegisterInstanceException extends TiSdkError {
    code: number;
    constructor(msg?: string, steps?: string);
}
export declare class DIResolveInstanceException extends TiSdkError {
    instructions?: string | undefined;
    code: number;
    message: string;
}
/**
 * 1000's general errors
    ex: invalid inputs, urls, emails, etc..,
 */
export declare class InvalidInputException extends TiSdkError {
    instructions?: string | undefined;
    code: number;
    constructor(msg?: string, steps?: string);
}
export declare class GenericException extends TiSdkError {
    code: number;
    constructor(msg?: string, steps?: string);
}
/**
 * 2000's
 * Flow/Session related errors
 */
export declare class InvalidSessionInfoException extends TiSdkError {
    code: number;
    constructor(msg?: string, steps?: string);
}
export declare class InvalidEventListenerException extends TiSdkError {
    code: number;
    constructor(msg?: string, steps?: string);
}
export declare class InvalidPayloadException extends TiSdkError {
    code: number;
    constructor(msg?: string, steps?: string);
}
export declare class InvalidFlowChannelException extends TiSdkError {
    instructions?: string | undefined;
    code: number;
    message: string;
    constructor(msg?: string, steps?: string);
}
export declare class InvalidInteractListenerException extends TiSdkError {
    code: number;
    constructor(msg?: string, steps?: string);
}
export declare class InvalidInteractChannelException extends TiSdkError {
    code: number;
    constructor(msg?: string, steps?: string);
}
export declare class FinishFlowException extends TiSdkError {
    constructor(msg?: string, steps?: string);
    code: number;
}
/**
 * 3000's
 * create task/stage/flow exceptions
 */
export declare class InvalidControllerNameException extends TiSdkError {
    code: number;
    constructor(msg?: string, steps?: string);
}
export declare class InvalidTasksException extends TiSdkError {
    code: number;
    constructor(msg?: string, steps?: string);
}
export declare class InvalidStagesException extends TiSdkError {
    code: number;
    constructor(msg?: string, steps?: string);
}
/**
 * 4000's
 * communication handler exceptions
 */
export declare class ConnectionException extends TiSdkError {
    code: number;
    constructor(msg?: string, steps?: string);
}
export declare class CloseConnectionException extends TiSdkError {
    code: number;
    constructor(msg?: string, steps?: string);
}
export declare class DataTransmissionException extends TiSdkError {
    code: number;
    constructor(msg?: string, steps?: string);
}
/**
 * 5000's
 * UTil Service exceptions
 */
export declare class TiUtilException extends TiSdkError {
    code: number;
    constructor(msg?: string, steps?: string);
}
export declare class ErrorMesssages {
    static readonly INSTANTIATION_ERROR = "unable to instantiate class or value";
    static readonly CONTAINER_ERROR = "invalid container";
    static readonly UNABLE_TO_REGISTER_INSTANCE = "unable to register instance to DI container";
    static readonly UNABLE_TO_RESOLVE_INSTANCE = "unable to resolve instance to DI container";
    static readonly UNABLE_TO_REGISTER_FLOW_LISTENER = "unable to register flow listener";
    static readonly UNABLE_TO_REGISTER_ROUTE_CONFIG = "unable to register route config";
    static readonly UNABLE_TO_REGISTER_FLOW_STATE = "unable to register flow state";
    static readonly UNABLE_TO_REGISTER_ROUTE_HANDLER = "unable to register route handler";
    static readonly UNABLE_TO_REGISTER_COMMUNICATION_HANDLER = "unable to register communication handler";
    static readonly UNABLE_TO_REGISTER_EVENTLISTENER = "unable to register event listener";
    static readonly UNABLE_TO_REGISTER_FLOW_MANAGER = "unable to register flow manager";
    static readonly UNABLE_TO_RESOLVE_FLOW_MANAGER = "unable to resolve flow manager";
    static readonly UNABLE_TO_CLOSE_CONNECTION = "unable to close communication channel";
    static readonly UNABLE_TO_SEND_PAYLOAD = "unable to send payload over communication channel";
    static readonly INVALID_INPUT = "invalid input";
    static readonly FLOWID_INVALID = "invalid flow id";
    static readonly FLOW_LISTENER_INVALID = "invalid flow listener";
    static readonly INVALID_SESSION_INFO = "invalid flow information to begin session";
    static readonly INVALID_FLOW_CHANNEL = "invalid flowchannel id";
    static readonly INVALID_INTERACT_CHANNEL = "invalid interact channel id";
    static readonly INVALID_EVENT_LISTENER = "event listener passed is invalid";
    static readonly INVALID_INTERACT_LISTENER = "Interact listener passed is invalid";
    static readonly REGISTER_DATA_INVALID = "register data is invalid, check server response for resgiter response ";
    static readonly SERVER_URL_INVALID = "Server url is invalid";
    static readonly INVITE_CODE_INVALID = "Invite code is invalid.";
    static readonly CUSTOMER_ID_INVALID = "Customer ID is invalid";
    static readonly ROUTE_CONFIG_INVALID = "route config is invalid";
    static readonly GENERIC_ERROR = "unable to determine what went wrong.";
    static readonly UNABLE_TO_CONNECT_TO_INTERACTION_CHANNEL = "unable to connect to interaction channel";
    static readonly UNABLE_TO_SEND_PAYLOAD_ON_INTERACTION_CHANNEL = "unable to send payload on interaction channel";
    static readonly UNABLE_TO_REGISTER_INTERACT_DATA_INTERFACE = "unable to register Interact data interface";
    static readonly UNABLE_TO_REGISTER_INTERACT_LISTENER = "unable to register Interact listener";
    static readonly UNABLE_TO_REGISTER_INTERACTION_COMMUNICATION_HANDLER = "unable to register Interaction Communication Handler";
    static readonly UNABLE_TO_REGISTER_INTERACT_MANAGER = "unable to register interact Manager";
    static readonly UNABLE_TO_RESOLVE_INTERACT_MANAGER = "unable to resolve interact Manager";
    static readonly UNABLE_TO_REGISTER_SESSION_INFO = "UNABLE to register session info";
    static readonly UNABLE_TO_EMIT_PAYLOAD = "unable to update task/flow to server";
    static readonly UNABLE_TO_FINISH_FLOW = "error occurred, unable to finish flow";
    /**
     * task/stage/flow creation exceptions
     */
    static readonly MISSING_CONTROLLER_NAME = "controller name is empty or missing";
    static readonly MISSING_TASKS = "tasks array is empty";
    static readonly MISSING_STAGES = "stages array is empty";
    static readonly UNABLE_TO_CREATE_STAGE = "unable to create stage";
    static readonly UNABLE_TO_CREATE_TASK = "unable to create task";
    static readonly UNABLE_TO_CREATE_FLOW = "unable to create flow";
    static readonly UNABLE_TO_FETCH_TASK = "unable to fetch task(s) details";
    static readonly UNABLE_TO_FETCH_STAGE = "unable to fetch stage(s) details";
    static readonly UNABLE_TO_FETCH_FLOW = "unable to fetch flow(s) details";
    static readonly UNABLE_TO_DELETE_TASK = "unable to DELETE task details";
    static readonly UNABLE_TO_DELETE_STAGE = "unable to DELETE stage details";
    static readonly UNABLE_TO_DELETE_FLOW = "unable to DELETE flow details";
    static readonly INVALID_TASK_NAME = "invalid task name provided";
    static readonly INVALID_STAGE_NAME = "invalid stage name provided";
    static readonly INVALID_FLOW_NAME = "invalid flow name provided";
    static readonly INVALID_TASK_ID = "invalid task ID provided";
    static readonly INVALID_STAGE_ID = "invalid stage ID provided";
    static readonly INVALID_FLOW_ID = "invalid flow ID provided";
    /**
    * UTIL service exceptions
    */
    static readonly UNABLE_TO_CREATE_FLOW_EVENT_MESSAGE = "unable to create event payload type-ResponseData";
    static readonly UNABLE_TO_CREATE_INTERACTION_MESSAGE = "unable to create interction payload type-CommunicationData";
}
export declare class ErrorInstruction {
    static readonly CONTAINER_ERROR_INSTRUCTION = "unable to fetch flow session, restart your flow!";
    static readonly INPUT_INSTRUCTION = "please check your input parameters";
    static readonly CHECK_SESSION_INFO = "check your server's flow configuration/controller's startFlow API";
    static readonly CHECK_FLOWCHANNEL_ID = "check your flow channel id";
    static readonly CHECK_INTERACTCHANNEL_ID = "check your interact channel id";
    static readonly GENERIC_INSTRUCTION = "Please check logs";
    static readonly UNEXPECTED_ERROR = "unexpected error occurred! restart your flow-session";
    static readonly TASK_UPDATE_ERROR_INSTRUCTION = "PLease check task payload and channel";
    static readonly CHECK_NETWORK_CONFIGURATION = "check your network configuration or firewall";
    static readonly CHECK_EVENT_LISTENER = "check the event listener passed";
    static readonly CHECK_INTERACT_LISTENER = "check the Interact listener passed";
    static readonly CHECK_PAYLOAD_OR_CONNECTION = "check if you are passing a valid payload or if the interaction channel is intact";
    static readonly CHECK_CONTROLLER_NAME = "provide the name of the controller which handles this task on your customer application";
    static readonly CHECK_TASKS = "create a stage with atleast one task";
    static readonly CHECK_STAGES = "create a flow with atleast one stage";
    static readonly FINISH_FLOW_INSTRUCTIONS = "check if the session your trying finish is active.";
}
//# sourceMappingURL=ti.errors.d.ts.map
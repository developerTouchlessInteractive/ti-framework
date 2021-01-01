"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorInstruction = exports.ErrorMesssages = exports.TiUtilException = exports.DataTransmissionException = exports.CloseConnectionException = exports.ConnectionException = exports.InvalidStagesException = exports.InvalidTasksException = exports.InvalidControllerNameException = exports.FinishFlowException = exports.InvalidInteractChannelException = exports.InvalidInteractListenerException = exports.InvalidFlowChannelException = exports.InvalidPayloadException = exports.InvalidEventListenerException = exports.InvalidSessionInfoException = exports.GenericException = exports.InvalidInputException = exports.DIResolveInstanceException = exports.DIRegisterInstanceException = exports.InvalidContainerException = exports.InstantiationException = exports.TiSdkError = void 0;
const tsyringe_1 = require("tsyringe");
class TiSdkError {
    constructor(msg, steps) {
        this.message = msg;
        this.instructions = steps;
    }
}
exports.TiSdkError = TiSdkError;
/**
 * 7000's -- container/instantiation related errors
 */
let InstantiationException = class InstantiationException extends TiSdkError {
    constructor(msg, steps) {
        super(msg ? msg : ErrorMesssages.INSTANTIATION_ERROR, steps ? steps : ErrorInstruction.GENERIC_INSTRUCTION);
        this.code = 7000;
    }
};
InstantiationException = __decorate([
    tsyringe_1.injectable()
], InstantiationException);
exports.InstantiationException = InstantiationException;
let InvalidContainerException = class InvalidContainerException extends TiSdkError {
    constructor(msg, steps) {
        super(msg ? msg : ErrorMesssages.INSTANTIATION_ERROR, steps ? steps : ErrorInstruction.CONTAINER_ERROR_INSTRUCTION);
        this.code = 7001;
    }
};
InvalidContainerException = __decorate([
    tsyringe_1.injectable()
], InvalidContainerException);
exports.InvalidContainerException = InvalidContainerException;
let DIRegisterInstanceException = class DIRegisterInstanceException extends TiSdkError {
    constructor(msg, steps) {
        super(msg ? msg : ErrorMesssages.UNABLE_TO_REGISTER_INSTANCE, steps ? steps : ErrorInstruction.UNEXPECTED_ERROR);
        this.code = 7002;
    }
};
DIRegisterInstanceException = __decorate([
    tsyringe_1.injectable()
], DIRegisterInstanceException);
exports.DIRegisterInstanceException = DIRegisterInstanceException;
let DIResolveInstanceException = class DIResolveInstanceException extends TiSdkError {
    constructor() {
        super(...arguments);
        this.instructions = ErrorInstruction.UNEXPECTED_ERROR;
        this.code = 7003;
        this.message = ErrorMesssages.UNABLE_TO_RESOLVE_INSTANCE;
    }
};
DIResolveInstanceException = __decorate([
    tsyringe_1.injectable()
], DIResolveInstanceException);
exports.DIResolveInstanceException = DIResolveInstanceException;
/**
 * 1000's general errors
    ex: invalid inputs, urls, emails, etc..,
 */
let InvalidInputException = class InvalidInputException extends TiSdkError {
    constructor(msg, steps) {
        super(msg ? msg : ErrorMesssages.INVALID_INPUT, steps ? steps : ErrorInstruction.INPUT_INSTRUCTION);
        this.code = 1001;
    }
};
InvalidInputException = __decorate([
    tsyringe_1.injectable()
], InvalidInputException);
exports.InvalidInputException = InvalidInputException;
let GenericException = class GenericException extends TiSdkError {
    constructor(msg, steps) {
        super(msg ? msg : ErrorMesssages.GENERIC_ERROR, steps ? steps : ErrorInstruction.GENERIC_INSTRUCTION);
        this.code = 900;
    }
};
GenericException = __decorate([
    tsyringe_1.injectable()
], GenericException);
exports.GenericException = GenericException;
/**
 * 2000's
 * Flow/Session related errors
 */
let InvalidSessionInfoException = class InvalidSessionInfoException extends TiSdkError {
    constructor(msg, steps) {
        super(msg ? msg : ErrorMesssages.INVALID_SESSION_INFO, steps ? steps : ErrorInstruction.CHECK_SESSION_INFO);
        this.code = 2001;
    }
};
InvalidSessionInfoException = __decorate([
    tsyringe_1.injectable()
], InvalidSessionInfoException);
exports.InvalidSessionInfoException = InvalidSessionInfoException;
let InvalidEventListenerException = class InvalidEventListenerException extends TiSdkError {
    constructor(msg, steps) {
        super(msg ? msg : ErrorMesssages.INVALID_EVENT_LISTENER, steps ? steps : ErrorInstruction.CHECK_EVENT_LISTENER);
        this.code = 2002;
    }
};
InvalidEventListenerException = __decorate([
    tsyringe_1.injectable()
], InvalidEventListenerException);
exports.InvalidEventListenerException = InvalidEventListenerException;
let InvalidPayloadException = class InvalidPayloadException extends TiSdkError {
    constructor(msg, steps) {
        super(msg ? msg : ErrorMesssages.UNABLE_TO_SEND_PAYLOAD_ON_INTERACTION_CHANNEL, steps ? steps : ErrorInstruction.CHECK_PAYLOAD_OR_CONNECTION);
        this.code = 2003;
    }
};
InvalidPayloadException = __decorate([
    tsyringe_1.injectable()
], InvalidPayloadException);
exports.InvalidPayloadException = InvalidPayloadException;
let InvalidFlowChannelException = class InvalidFlowChannelException extends TiSdkError {
    constructor(msg, steps) {
        super(msg ? msg : ErrorMesssages.INVALID_FLOW_CHANNEL, steps ? steps : ErrorInstruction.CHECK_FLOWCHANNEL_ID);
        this.instructions = ErrorInstruction.CHECK_FLOWCHANNEL_ID;
        this.code = 2004;
        this.message = ErrorMesssages.INVALID_FLOW_CHANNEL;
    }
};
InvalidFlowChannelException = __decorate([
    tsyringe_1.injectable()
], InvalidFlowChannelException);
exports.InvalidFlowChannelException = InvalidFlowChannelException;
let InvalidInteractListenerException = class InvalidInteractListenerException extends TiSdkError {
    constructor(msg, steps) {
        super(msg ? msg : ErrorMesssages.INVALID_INTERACT_LISTENER, steps ? steps : ErrorInstruction.CHECK_INTERACT_LISTENER);
        this.code = 2005;
    }
};
InvalidInteractListenerException = __decorate([
    tsyringe_1.injectable()
], InvalidInteractListenerException);
exports.InvalidInteractListenerException = InvalidInteractListenerException;
let InvalidInteractChannelException = class InvalidInteractChannelException extends TiSdkError {
    constructor(msg, steps) {
        super(msg ? msg : ErrorMesssages.INVALID_INTERACT_CHANNEL, steps ? steps : ErrorInstruction.CHECK_INTERACTCHANNEL_ID);
        this.code = 2006;
    }
};
InvalidInteractChannelException = __decorate([
    tsyringe_1.injectable()
], InvalidInteractChannelException);
exports.InvalidInteractChannelException = InvalidInteractChannelException;
let FinishFlowException = class FinishFlowException extends TiSdkError {
    constructor(msg, steps) {
        super(msg ? msg : ErrorMesssages.UNABLE_TO_FINISH_FLOW, steps ? steps : ErrorInstruction.FINISH_FLOW_INSTRUCTIONS);
        this.code = 2007;
    }
};
FinishFlowException = __decorate([
    tsyringe_1.injectable()
], FinishFlowException);
exports.FinishFlowException = FinishFlowException;
/**
 * 3000's
 * create task/stage/flow exceptions
 */
let InvalidControllerNameException = class InvalidControllerNameException extends TiSdkError {
    constructor(msg, steps) {
        super(msg ? msg : ErrorMesssages.MISSING_CONTROLLER_NAME, steps ? steps : ErrorInstruction.CHECK_CONTROLLER_NAME);
        this.code = 3001;
    }
};
InvalidControllerNameException = __decorate([
    tsyringe_1.injectable()
], InvalidControllerNameException);
exports.InvalidControllerNameException = InvalidControllerNameException;
let InvalidTasksException = class InvalidTasksException extends TiSdkError {
    constructor(msg, steps) {
        super(msg ? msg : ErrorMesssages.MISSING_TASKS, steps ? steps : ErrorInstruction.CHECK_TASKS);
        this.code = 3002;
    }
};
InvalidTasksException = __decorate([
    tsyringe_1.injectable()
], InvalidTasksException);
exports.InvalidTasksException = InvalidTasksException;
let InvalidStagesException = class InvalidStagesException extends TiSdkError {
    constructor(msg, steps) {
        super(msg ? msg : ErrorMesssages.MISSING_STAGES, steps ? steps : ErrorInstruction.CHECK_STAGES);
        this.code = 3003;
    }
};
InvalidStagesException = __decorate([
    tsyringe_1.injectable()
], InvalidStagesException);
exports.InvalidStagesException = InvalidStagesException;
/**
 * 4000's
 * communication handler exceptions
 */
let ConnectionException = class ConnectionException extends TiSdkError {
    constructor(msg, steps) {
        super(msg ? msg : ErrorMesssages.UNABLE_TO_CONNECT_TO_INTERACTION_CHANNEL, steps ? steps : ErrorInstruction.CHECK_NETWORK_CONFIGURATION);
        this.code = 4001;
    }
};
ConnectionException = __decorate([
    tsyringe_1.injectable()
], ConnectionException);
exports.ConnectionException = ConnectionException;
let CloseConnectionException = class CloseConnectionException extends TiSdkError {
    constructor(msg, steps) {
        super(msg ? msg : ErrorMesssages.UNABLE_TO_CLOSE_CONNECTION, steps ? steps : ErrorInstruction.CHECK_NETWORK_CONFIGURATION);
        this.code = 4002;
    }
};
CloseConnectionException = __decorate([
    tsyringe_1.injectable()
], CloseConnectionException);
exports.CloseConnectionException = CloseConnectionException;
let DataTransmissionException = class DataTransmissionException extends TiSdkError {
    constructor(msg, steps) {
        super(msg ? msg : ErrorMesssages.UNABLE_TO_SEND_PAYLOAD, steps ? steps : ErrorInstruction.CHECK_NETWORK_CONFIGURATION);
        this.code = 4003;
    }
};
DataTransmissionException = __decorate([
    tsyringe_1.injectable()
], DataTransmissionException);
exports.DataTransmissionException = DataTransmissionException;
/**
 * 5000's
 * UTil Service exceptions
 */
let TiUtilException = class TiUtilException extends TiSdkError {
    constructor(msg, steps) {
        super(msg ? msg : ErrorMesssages.UNABLE_TO_SEND_PAYLOAD, steps ? steps : ErrorInstruction.GENERIC_INSTRUCTION);
        this.code = 5001;
    }
};
TiUtilException = __decorate([
    tsyringe_1.injectable()
], TiUtilException);
exports.TiUtilException = TiUtilException;
class ErrorMesssages {
}
exports.ErrorMesssages = ErrorMesssages;
ErrorMesssages.INSTANTIATION_ERROR = "unable to instantiate class or value";
ErrorMesssages.CONTAINER_ERROR = "invalid container";
ErrorMesssages.UNABLE_TO_REGISTER_INSTANCE = "unable to register instance to DI container";
ErrorMesssages.UNABLE_TO_RESOLVE_INSTANCE = "unable to resolve instance to DI container";
ErrorMesssages.UNABLE_TO_REGISTER_FLOW_LISTENER = "unable to register flow listener";
ErrorMesssages.UNABLE_TO_REGISTER_ROUTE_CONFIG = "unable to register route config";
ErrorMesssages.UNABLE_TO_REGISTER_FLOW_STATE = "unable to register flow state";
ErrorMesssages.UNABLE_TO_REGISTER_ROUTE_HANDLER = "unable to register route handler";
ErrorMesssages.UNABLE_TO_REGISTER_COMMUNICATION_HANDLER = "unable to register communication handler";
ErrorMesssages.UNABLE_TO_REGISTER_EVENTLISTENER = "unable to register event listener";
ErrorMesssages.UNABLE_TO_REGISTER_FLOW_MANAGER = "unable to register flow manager";
ErrorMesssages.UNABLE_TO_RESOLVE_FLOW_MANAGER = "unable to resolve flow manager";
ErrorMesssages.UNABLE_TO_CLOSE_CONNECTION = "unable to close communication channel";
ErrorMesssages.UNABLE_TO_SEND_PAYLOAD = "unable to send payload over communication channel";
ErrorMesssages.INVALID_INPUT = "invalid input";
ErrorMesssages.FLOWID_INVALID = "invalid flow id";
ErrorMesssages.FLOW_LISTENER_INVALID = "invalid flow listener";
ErrorMesssages.INVALID_SESSION_INFO = "invalid flow information to begin session";
ErrorMesssages.INVALID_FLOW_CHANNEL = "invalid flowchannel id";
ErrorMesssages.INVALID_INTERACT_CHANNEL = "invalid interact channel id";
ErrorMesssages.INVALID_EVENT_LISTENER = "event listener passed is invalid";
ErrorMesssages.INVALID_INTERACT_LISTENER = "Interact listener passed is invalid";
ErrorMesssages.REGISTER_DATA_INVALID = "register data is invalid, check server response for resgiter response ";
ErrorMesssages.SERVER_URL_INVALID = "Server url is invalid";
ErrorMesssages.INVITE_CODE_INVALID = "Invite code is invalid.";
ErrorMesssages.CUSTOMER_ID_INVALID = "Customer ID is invalid";
ErrorMesssages.ROUTE_CONFIG_INVALID = "route config is invalid";
ErrorMesssages.GENERIC_ERROR = "unable to determine what went wrong.";
ErrorMesssages.UNABLE_TO_CONNECT_TO_INTERACTION_CHANNEL = "unable to connect to interaction channel";
ErrorMesssages.UNABLE_TO_SEND_PAYLOAD_ON_INTERACTION_CHANNEL = "unable to send payload on interaction channel";
// static readonly UNABLE_TO_REGISTER_INTERACT_CONNECT_LISTENER = "unable to register Interact Connect listener"
// static readonly UNABLE_TO_REGISTER_INTERACT_DATA_RECEIVER = "unable to register Interact DATA Receiver"
ErrorMesssages.UNABLE_TO_REGISTER_INTERACT_DATA_INTERFACE = "unable to register Interact data interface";
ErrorMesssages.UNABLE_TO_REGISTER_INTERACT_LISTENER = "unable to register Interact listener";
ErrorMesssages.UNABLE_TO_REGISTER_INTERACTION_COMMUNICATION_HANDLER = "unable to register Interaction Communication Handler";
ErrorMesssages.UNABLE_TO_REGISTER_INTERACT_MANAGER = "unable to register interact Manager";
ErrorMesssages.UNABLE_TO_RESOLVE_INTERACT_MANAGER = "unable to resolve interact Manager";
ErrorMesssages.UNABLE_TO_REGISTER_SESSION_INFO = "UNABLE to register session info";
ErrorMesssages.UNABLE_TO_EMIT_PAYLOAD = "unable to update task/flow to server";
ErrorMesssages.UNABLE_TO_FINISH_FLOW = "error occurred, unable to finish flow";
/**
 * task/stage/flow creation exceptions
 */
ErrorMesssages.MISSING_CONTROLLER_NAME = "controller name is empty or missing";
ErrorMesssages.MISSING_TASKS = "tasks array is empty";
ErrorMesssages.MISSING_STAGES = "stages array is empty";
ErrorMesssages.UNABLE_TO_CREATE_STAGE = "unable to create stage";
ErrorMesssages.UNABLE_TO_CREATE_TASK = "unable to create task";
ErrorMesssages.UNABLE_TO_CREATE_FLOW = "unable to create flow";
ErrorMesssages.UNABLE_TO_FETCH_TASK = "unable to fetch task(s) details";
ErrorMesssages.UNABLE_TO_FETCH_STAGE = "unable to fetch stage(s) details";
ErrorMesssages.UNABLE_TO_FETCH_FLOW = "unable to fetch flow(s) details";
ErrorMesssages.UNABLE_TO_DELETE_TASK = "unable to DELETE task details";
ErrorMesssages.UNABLE_TO_DELETE_STAGE = "unable to DELETE stage details";
ErrorMesssages.UNABLE_TO_DELETE_FLOW = "unable to DELETE flow details";
ErrorMesssages.INVALID_TASK_NAME = "invalid task name provided";
ErrorMesssages.INVALID_STAGE_NAME = "invalid stage name provided";
ErrorMesssages.INVALID_FLOW_NAME = "invalid flow name provided";
ErrorMesssages.INVALID_TASK_ID = "invalid task ID provided";
ErrorMesssages.INVALID_STAGE_ID = "invalid stage ID provided";
ErrorMesssages.INVALID_FLOW_ID = "invalid flow ID provided";
/**
* UTIL service exceptions
*/
ErrorMesssages.UNABLE_TO_CREATE_FLOW_EVENT_MESSAGE = "unable to create event payload type-ResponseData";
ErrorMesssages.UNABLE_TO_CREATE_INTERACTION_MESSAGE = "unable to create interction payload type-CommunicationData";
class ErrorInstruction {
}
exports.ErrorInstruction = ErrorInstruction;
ErrorInstruction.CONTAINER_ERROR_INSTRUCTION = "unable to fetch flow session, restart your flow!";
ErrorInstruction.INPUT_INSTRUCTION = "please check your input parameters";
ErrorInstruction.CHECK_SESSION_INFO = "check your server's flow configuration/controller's startFlow API";
ErrorInstruction.CHECK_FLOWCHANNEL_ID = "check your flow channel id";
ErrorInstruction.CHECK_INTERACTCHANNEL_ID = "check your interact channel id";
ErrorInstruction.GENERIC_INSTRUCTION = "Please check logs";
ErrorInstruction.UNEXPECTED_ERROR = "unexpected error occurred! restart your flow-session";
ErrorInstruction.TASK_UPDATE_ERROR_INSTRUCTION = "PLease check task payload and channel";
ErrorInstruction.CHECK_NETWORK_CONFIGURATION = "check your network configuration or firewall";
ErrorInstruction.CHECK_EVENT_LISTENER = "check the event listener passed";
ErrorInstruction.CHECK_INTERACT_LISTENER = "check the Interact listener passed";
ErrorInstruction.CHECK_PAYLOAD_OR_CONNECTION = "check if you are passing a valid payload or if the interaction channel is intact";
ErrorInstruction.CHECK_CONTROLLER_NAME = "provide the name of the controller which handles this task on your customer application";
ErrorInstruction.CHECK_TASKS = "create a stage with atleast one task";
ErrorInstruction.CHECK_STAGES = "create a flow with atleast one stage";
ErrorInstruction.FINISH_FLOW_INSTRUCTIONS = "check if the session your trying finish is active.";
//# sourceMappingURL=ti.errors.js.map
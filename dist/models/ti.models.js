"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.UserInput = exports.UserAction = void 0;
var UserAction;
(function (UserAction) {
    UserAction["ACCEPT_OR_DENY"] = "ACCEPT_OR_DENY";
    UserAction["SUBMIT_CANCEL"] = "SUBMIT_CANCEL";
    UserAction["OK_CANCEL"] = "OK_CANCEL";
    UserAction["DISMISS"] = "DISMISS";
})(UserAction = exports.UserAction || (exports.UserAction = {}));
var UserInput;
(function (UserInput) {
    UserInput["INPUT_SINGATURE"] = "INPUT_SINGATURE";
    UserInput["INPUT_FORM"] = "INPUT_FORM";
    UserInput["INPUT_MIXED"] = "INPUT_MIXED";
    UserInput["NONE"] = "NONE";
})(UserInput = exports.UserInput || (exports.UserInput = {}));
var Message;
(function (Message) {
    Message["SUCCESS_TASK_CREATION"] = "task created succesfully";
    Message["FAILURE_TASK_CREATION"] = "task creation failed, retry";
    Message["FAILURE_TASK_DELETION"] = "task deletion failed, retry";
    Message["FAILURE_TASK_CREATION_INVALID"] = "task creation failed, retry";
    Message["CREATION_FAILURE_TASK_CONFIG_EXISTS"] = "a similar task exists with same config";
    Message["SUCCESS_TASK_DELETED"] = "task is deleted succesfully";
    Message["DELETE_TASK_DOESNT_EXIST"] = "task doesnt exist";
    Message["SUCCESS_STAGE_CREATION"] = "stage created succesfully";
    Message["FAILURE_STAGE_CREATION"] = "stage creation failed, retry";
    Message["FAILURE_STAGE_DELETION"] = "stage deletion failed, retry";
    Message["FAILURE_STAGE_CREATION_INVALID"] = "stage creation failed, retry";
    Message["CREATION_FAILURE_STAGE_CONFIG_EXISTS"] = "a similar stage exists with same config";
    Message["SUCCESS_STAGE_DELETED"] = "stage is deleted succesfully";
    Message["DELETE_STAGE_DOESNT_EXIST"] = "stage doesnt exist";
    Message["SUCCESS_FLOW_CREATION"] = "flow created succesfully";
    Message["FAILURE_FLOW_CREATION"] = "flow creation failed, retry";
    Message["FAILURE_FLOW_DELETION"] = "flow deletion failed, retry";
    Message["FAILURE_FLOW_CREATION_INVALID"] = "flow creation failed, retry";
    Message["CREATION_FAILURE_FLOW_CONFIG_EXISTS"] = "a similar flow exists with same config";
    Message["SUCCESS_FLOW_DELETED"] = "flow is deleted succesfully";
    Message["DELETE_FLOW_DOESNT_EXIST"] = "flow doesnt exist";
})(Message = exports.Message || (exports.Message = {}));
//# sourceMappingURL=ti.models.js.map
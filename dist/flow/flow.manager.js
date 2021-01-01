"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.FlowManager = void 0;
const tsyringe_1 = require("tsyringe");
const injection_index_1 = require("./injection.index");
const ti_errors_1 = require("../errors/ti.errors");
const ti_1 = require("../ti");
let FlowManager = class FlowManager {
    constructor(communicationHandler, eventListener, util, flowListener, sessionData) {
        this.communicationHandler = communicationHandler;
        this.eventListener = eventListener;
        this.util = util;
        this.flowListener = flowListener;
        this.sessionData = sessionData;
    }
    connect() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.communicationHandler.connect();
                resolve();
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    flowIsComplete(finalData) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const data = this.util.getEventResponseData(ti_1.ServerEvent.SESSION_COMPLETE, finalData ? finalData : undefined);
            yield this.flowListener.flowIsComplete(finalData);
            yield ((_a = this.communicationHandler) === null || _a === void 0 ? void 0 : _a.closeConnection());
        });
    }
    /**
    * Send Task Payload To Server,
    * @param taskPayload task payload which should be output
    * @param event flow event - including task related status
    */
    sendTaskPayloadToServer(taskPayload, event) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (taskPayload === undefined || event === undefined) {
                    throw new ti_errors_1.InvalidInputException(ti_errors_1.ErrorMesssages.UNABLE_TO_EMIT_PAYLOAD, ti_errors_1.ErrorInstruction.TASK_UPDATE_ERROR_INSTRUCTION);
                }
                // const util = container.resolve(ti.UtilService)
                const data = yield this.util.getEventResponseData(event, taskPayload);
                (_a = this.communicationHandler) === null || _a === void 0 ? void 0 : _a.sendPayload(data);
                resolve();
            }
            catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error, null, 2);
                    error = new ti_errors_1.GenericException(errorString ? errorString : ti_errors_1.ErrorMesssages.GENERIC_ERROR);
                }
                reject(error);
            }
        }));
    }
};
FlowManager = __decorate([
    tsyringe_1.injectable(),
    __param(0, tsyringe_1.inject(injection_index_1.ParameterKeys.COMMUNICATION_HANDLER)),
    __param(1, tsyringe_1.inject(injection_index_1.ParameterKeys.EVENTLISTNER)),
    __param(2, tsyringe_1.inject(injection_index_1.ParameterKeys.UTIL)),
    __param(3, tsyringe_1.inject(injection_index_1.ParameterKeys.FLOWLISTENER)),
    __param(4, tsyringe_1.inject(injection_index_1.ParameterKeys.SESSIONDATA))
], FlowManager);
exports.FlowManager = FlowManager;
//# sourceMappingURL=flow.manager.js.map
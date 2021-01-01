"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.CustomerServerEventListener = void 0;
const ti = __importStar(require("../../ti"));
const tsyringe_1 = require("tsyringe");
const injection_index_1 = require("../injection.index");
let CustomerServerEventListener = class CustomerServerEventListener {
    constructor(listener, util, sessionData, routeHandler) {
        this.listener = listener;
        this.util = util;
        this.sessionData = sessionData;
        this.routeHandler = routeHandler;
        this.hasConnected = false;
    }
    setCommunicationHandler(handler) {
        this.communicationhandler = handler;
    }
    disconnected() {
        var _a;
        (_a = this.listener) === null || _a === void 0 ? void 0 : _a.flowDisconnected();
    }
    connected(data) {
        var _a;
        this.hasConnected = true;
        (_a = this.listener) === null || _a === void 0 ? void 0 : _a.flowConnected();
    }
    listenEvent(data) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function* () {
            if ((data === null || data === void 0 ? void 0 : data.route.source) === ti.EndPoint.SERVER) {
                switch (data.type) {
                    case ti.ServerEvent.PAYLOAD_PROCESSED
                        || ti.ServerEvent.ACK_PAYLOAD
                        || ti.ServerEvent.PAYLOAD_SENT_TO_REMOTE
                        || ti.ServerEvent.AWAITING_REMOTE_CONFIRMATION
                        || ti.ServerEvent.ACK_CONNECTION
                        || ti.ServerEvent.AUTHENTICATION
                        || ti.ServerEvent.PROCESSING
                        || ti.ServerEvent.ACK_TASK_COMPLETE_REQUEST:
                        data ? yield ((_a = this.listener) === null || _a === void 0 ? void 0 : _a.flowUpdate(data)) : yield ((_b = this.listener) === null || _b === void 0 ? void 0 : _b.flowUpdate());
                        break;
                    case ti.ServerEvent.FLOW_COMPLETE:
                        // this.listener?.flowIsComplete(data)
                        // this.communicationhandler?.closeConnection()
                        // ti.clearSessionData(this.sessionData.sessionId)
                        const respData = yield this.util.getEventResponseData(ti.ServerEvent.SESSION_COMPLETE, data ? data : undefined);
                        yield ti.wipeSession(this.sessionData.sessionId, respData);
                        break;
                    case ti.ServerEvent.STAGE_COMPLETE:
                        yield ((_c = this.listener) === null || _c === void 0 ? void 0 : _c.stageIsComplete(data));
                        break;
                    case ti.ServerEvent.TASK_COMPLETE:
                        // //TODO we need to update taskcomplete in our flowState
                        // //and then calculate the below
                        // //since order cant change we need to bundle them up
                        // //or just task complete update will trigger below
                        // await this.stateHandler?.checkForStageCompletion(data)
                        // await this.stateHandler?.checkForFlowCompletion()
                        yield ((_d = this.listener) === null || _d === void 0 ? void 0 : _d.taskIsComplete(data));
                        // route handler update task Is Complete
                        yield this.routeHandler.updateTaskComplete(data.data.uniqueReference);
                        break;
                    default:
                        data ? yield ((_e = this.listener) === null || _e === void 0 ? void 0 : _e.flowUpdate(data)) : yield ((_f = this.listener) === null || _f === void 0 ? void 0 : _f.flowUpdate());
                        break;
                }
            }
            else if ((data === null || data === void 0 ? void 0 : data.route.source) === ti.EndPoint.CLIENT) {
                switch (data.type) {
                    case ti.ClientEvent.PAYLOAD_PROCESSED || ti.ClientEvent.PAYLOAD_RECEIVED:
                        yield ((_g = this.listener) === null || _g === void 0 ? void 0 : _g.taskUpdate(data));
                        break;
                    case ti.ClientEvent.TASK_COMPLETE:
                        this.listenTaskComplete(data);
                        break;
                    case ti.ClientEvent.STAGE_COMPLETE:
                        this.listenStageComplete(data);
                        break;
                    case ti.ClientEvent.FLOW_COMPLETE:
                        this.listenFlowComplete(data);
                        break;
                    default:
                        yield ((_h = this.listener) === null || _h === void 0 ? void 0 : _h.taskUpdate(data));
                        break;
                }
            }
        });
    }
    listenTaskComplete(data) {
        var _a;
        (_a = this.listener) === null || _a === void 0 ? void 0 : _a.taskIsComplete(data);
    }
    listenStageComplete(data) {
        var _a;
        (_a = this.listener) === null || _a === void 0 ? void 0 : _a.stageIsComplete(data);
    }
    listenFlowComplete(data) {
        var _a;
        (_a = this.listener) === null || _a === void 0 ? void 0 : _a.flowIsComplete(data);
    }
};
CustomerServerEventListener = __decorate([
    tsyringe_1.injectable(),
    __param(0, tsyringe_1.inject(injection_index_1.ParameterKeys.FLOWLISTENER)),
    __param(1, tsyringe_1.inject(injection_index_1.ParameterKeys.UTIL)),
    __param(2, tsyringe_1.inject(injection_index_1.ParameterKeys.SESSIONDATA)),
    __param(3, tsyringe_1.inject(injection_index_1.ParameterKeys.ROUTEHANDLER))
], CustomerServerEventListener);
exports.CustomerServerEventListener = CustomerServerEventListener;
//# sourceMappingURL=customer.event.listener.js.map
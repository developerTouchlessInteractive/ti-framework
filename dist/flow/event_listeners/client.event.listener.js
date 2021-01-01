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
exports.ClientServerEventListener = void 0;
const tsyringe_1 = require("tsyringe");
const ti = __importStar(require("../../ti"));
const ti_1 = require("../../ti");
const injection_index_1 = require("../injection.index");
let ClientServerEventListener = class ClientServerEventListener {
    constructor(listener, util, sessionData) {
        this.listener = listener;
        this.util = util;
        this.sessionData = sessionData;
        this.hasConnected = false;
        this.clientListener = listener;
    }
    setCommunicationHandler(handler) {
        this.communicationHandler = handler;
    }
    disconnected() {
        var _a;
        (_a = this.clientListener) === null || _a === void 0 ? void 0 : _a.flowDisconnected();
    }
    connected(data) {
        var _a;
        this.hasConnected = true;
        (_a = this.clientListener) === null || _a === void 0 ? void 0 : _a.flowConnected();
    }
    listenEvent(data) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            if ((data === null || data === void 0 ? void 0 : data.route.source) === ti_1.EndPoint.SERVER) {
                switch (data.type) {
                    case ti_1.ServerEvent.PAYLOAD_PROCESSED
                        || ti_1.ServerEvent.ACK_FLOW_INITIATION
                        || ti_1.ServerEvent.ACK_PAYLOAD
                        || ti_1.ServerEvent.PAYLOAD_SENT_TO_REMOTE
                        || ti_1.ServerEvent.AWAITING_REMOTE_CONFIRMATION
                        || ti_1.ServerEvent.ACK_CONNECTION
                        || ti_1.ServerEvent.AUTHENTICATION
                        || ti_1.ServerEvent.PROCESSING:
                        data ? yield ((_a = this.clientListener) === null || _a === void 0 ? void 0 : _a.flowUpdate(data)) : yield ((_b = this.clientListener) === null || _b === void 0 ? void 0 : _b.flowUpdate());
                        break;
                    case ti_1.ServerEvent.FLOW_COMPLETE:
                        // await this.clientListener?.flowIsComplete(respData)
                        // await this.communicationHandler?.closeConnection()
                        // await ti.clearSessionData(this.sessionData.sessionId)
                        const respData = this.util.getEventResponseData(ti_1.ServerEvent.SESSION_COMPLETE, data ? data : undefined);
                        yield ti.wipeSession(this.sessionData.sessionId, respData);
                        break;
                    case ti_1.ServerEvent.TASK_COMPLETE:
                        //TODO 
                        yield ((_c = this.clientListener) === null || _c === void 0 ? void 0 : _c.taskIsComplete());
                        break;
                    case ti_1.ServerEvent.STAGE_COMPLETE:
                        //TODO 
                        yield ((_d = this.clientListener) === null || _d === void 0 ? void 0 : _d.stageIsComplete());
                        break;
                    default:
                        data ? yield ((_e = this.clientListener) === null || _e === void 0 ? void 0 : _e.flowUpdate(data)) : yield ((_f = this.clientListener) === null || _f === void 0 ? void 0 : _f.flowUpdate());
                        break;
                }
            }
        });
    }
    listenTaskComplete(data) {
        // this.listener?.taskComplete()
    }
    listenStageComplete(data) {
        // this.listener?.stageComplete()
    }
    listenFlowComplete(data) {
        //this.listener?.flowComplete()
    }
};
ClientServerEventListener = __decorate([
    tsyringe_1.injectable(),
    __param(0, tsyringe_1.inject(injection_index_1.ParameterKeys.FLOWLISTENER)),
    __param(1, tsyringe_1.inject(injection_index_1.ParameterKeys.UTIL)),
    __param(2, tsyringe_1.inject(injection_index_1.ParameterKeys.SESSIONDATA))
], ClientServerEventListener);
exports.ClientServerEventListener = ClientServerEventListener;
//# sourceMappingURL=client.event.listener.js.map
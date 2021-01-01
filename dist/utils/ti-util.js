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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilService = void 0;
const shortid = __importStar(require("shortid"));
const tsyringe_1 = require("tsyringe");
const ti_errors_1 = require("../errors/ti.errors");
const injection_index_1 = require("../flow/injection.index");
const interact_events_1 = require("../flow/interaction/interact.events");
const ti = __importStar(require("../ti"));
const ti_1 = require("../ti");
let UtilService = class UtilService {
    constructor(sessionData) {
        this.sessionData = sessionData;
    }
    getEventResponseData(type, data) {
        return new Promise((resolve, reject) => {
            try {
                if (data === undefined) {
                    throw new ti_errors_1.TiUtilException(ti_errors_1.ErrorMesssages.UNABLE_TO_CREATE_FLOW_EVENT_MESSAGE);
                }
                const responseData = {
                    type: type,
                    time: Date.now(),
                    packetId: shortid.generate(),
                    route: this.getRoute(),
                    data: data ? data : undefined,
                    dataType: ti.DataType.FLOW
                };
                resolve(responseData);
            }
            catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error, null, 2);
                    error = new ti_errors_1.GenericException(errorString ? errorString : "");
                }
                reject(error);
            }
        });
    }
    getCommunicationData(data) {
        return new Promise((resolve, reject) => {
            try {
                if (data === undefined) {
                    throw new ti_errors_1.TiUtilException(ti_errors_1.ErrorMesssages.UNABLE_TO_CREATE_INTERACTION_MESSAGE);
                }
                const commdata = {
                    time: Date.now(),
                    route: this.getRoute(),
                    packetId: shortid.generate(),
                    dataType: ti.DataType.INTERACTION,
                    type: this.sessionData.deviceType === ti_1.EndPoint.CLIENT ? interact_events_1.ClientInteractEvent.COMMUNICATION_DATA : interact_events_1.CustomerInteractEvent.COMMUNICATION_DATA
                };
                if (data) {
                    commdata['data'] = data;
                }
                resolve(commdata);
            }
            catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error, null, 2);
                    error = new ti_errors_1.GenericException(errorString ? errorString : "");
                }
                reject(error);
            }
        });
    }
    getRoute(id) {
        const route = {
            sessionId: this.sessionData.sessionId,
            channelId: id ? id : this.sessionData.channelId,
            deviceType: this.sessionData.deviceType,
            flowChannel: this.sessionData.flowChannel,
            interactChannel: this.sessionData.interactChannel,
            source: this.sessionData.deviceType,
        };
        return route;
    }
};
UtilService = __decorate([
    tsyringe_1.injectable(),
    __param(0, tsyringe_1.inject(injection_index_1.ParameterKeys.SESSIONDATA))
], UtilService);
exports.UtilService = UtilService;
//# sourceMappingURL=ti-util.js.map
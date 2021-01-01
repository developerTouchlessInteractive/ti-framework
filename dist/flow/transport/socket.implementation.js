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
exports.SocketHandler = exports.socket = void 0;
const io = __importStar(require("socket.io-client"));
const tsyringe_1 = require("tsyringe");
const injection_index_1 = require("../../flow/injection.index");
const ti_errors_1 = require("../../errors/ti.errors");
let SocketHandler = class SocketHandler {
    /**
     * implementation of communication handler
     * @param url
     * @param queryData
     * @param flowChannel
     * @param interactChannel
     */
    constructor(url, queryData, flowChannel, eL) {
        this.url = url;
        this.queryData = queryData;
        this.flowChannel = flowChannel;
        this.eL = eL;
        this.URL = url;
        this.flowConnectionData = queryData;
        this.eventListener = eL;
    }
    isConnected() {
        return exports.socket.connected;
    }
    closeConnection() {
        return new Promise((resolve, reject) => {
            var _a;
            try {
                exports.socket.close();
                (_a = this.eventListener) === null || _a === void 0 ? void 0 : _a.disconnected();
            }
            catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error, null, 2);
                    error = new ti_errors_1.CloseConnectionException(errorString ? errorString : "");
                }
                reject(error);
            }
        });
    }
    connect() {
        return new Promise((resolve, reject) => {
            try {
                if (!this.eventListener)
                    throw new ti_errors_1.InvalidEventListenerException();
                exports.socket = io.connect(this.URL, { query: this.queryData });
                exports.socket.on('connect', () => {
                    var _a;
                    (_a = this.eventListener) === null || _a === void 0 ? void 0 : _a.connected();
                    exports.socket.on(this.flowChannel, (data) => {
                        var _a;
                        console.log(`socket listened data: ${JSON.stringify(data)}`);
                        (_a = this.eventListener) === null || _a === void 0 ? void 0 : _a.listenEvent(data);
                    });
                    resolve();
                });
            }
            catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error, null, 2);
                    error = new ti_errors_1.ConnectionException(errorString ? errorString : "");
                }
                reject(error);
            }
        });
    }
    sendPayload(payload) {
        return new Promise((resolve, reject) => {
            try {
                if (!payload)
                    throw new ti_errors_1.InvalidPayloadException();
                if (!this.flowChannel)
                    throw new ti_errors_1.InvalidFlowChannelException();
                exports.socket === null || exports.socket === void 0 ? void 0 : exports.socket.emit(this.flowChannel, payload);
                resolve();
            }
            catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error, null, 2);
                    error = new ti_errors_1.DataTransmissionException(errorString ? errorString : "");
                }
                reject(error);
            }
        });
    }
};
SocketHandler = __decorate([
    tsyringe_1.injectable(),
    __param(0, tsyringe_1.inject(injection_index_1.ParameterKeys.URL)),
    __param(1, tsyringe_1.inject(injection_index_1.ParameterKeys.INITDATA)),
    __param(2, tsyringe_1.inject(injection_index_1.ParameterKeys.FLOWCHANNEL)),
    __param(3, tsyringe_1.inject(injection_index_1.ParameterKeys.EVENTLISTNER))
], SocketHandler);
exports.SocketHandler = SocketHandler;
//# sourceMappingURL=socket.implementation.js.map
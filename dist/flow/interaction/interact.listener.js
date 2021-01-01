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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionListener = void 0;
const shortid_1 = __importDefault(require("shortid"));
const tsyringe_1 = require("tsyringe");
const injection_index_1 = require("../injection.index");
const ti_1 = require("../../ti");
const interact_events_1 = require("./interact.events");
let InteractionListener = class InteractionListener {
    constructor(dataInterface, sessionData) {
        this.dataInterface = dataInterface;
        this.sessionData = sessionData;
        this.acks = [];
        this.deviceType = sessionData.deviceType;
    }
    connected(data) {
        this.dataInterface.interactionConnected(data);
    }
    listenEvent(comm) {
        switch (comm.type) {
            case interact_events_1.ServerInteractEvent.ACK_INTERACTION_CONNECTION:
                this.dataInterface.connectionUpdate({ type: comm.type, time: Date.now() });
                break;
            case interact_events_1.ClientInteractEvent.COMMUNICATION_DATA || interact_events_1.CustomerInteractEvent.COMMUNICATION_DATA:
                this.dataInterface.receiveData(comm);
                break;
            case interact_events_1.ServerInteractEvent.ACK_COMMUNICATION_DATA:
                console.log(`ack for ${comm.packetId}`);
                const ack = this.acks.find(x => x.packetId === comm.packetId);
                if (ack)
                    ack.processAndAck("");
                break;
            default:
                console.log(JSON.stringify(comm, null, 2));
                break;
        }
    }
    disconnected() {
        this.dataInterface.interactionDisConnected();
    }
    getCommunicationData(type, source, id, data) {
        const commdata = {
            type: type,
            time: Date.now(),
            route: (id) ? this.getRoute(source, id) : this.getRoute(source),
            packetId: shortid_1.default.generate(),
            dataType: ti_1.DataType.INTERACTION
        };
        if (data) {
            commdata['data'] = data;
        }
        return commdata;
    }
    getRoute(source, id) {
        const route = {
            sessionId: this.sessionData.sessionId,
            channelId: id ? id : this.sessionData.channelId,
            deviceType: this.deviceType ? this.deviceType : ti_1.EndPoint.CLIENT,
            flowChannel: this.sessionData.flowChannel,
            interactChannel: this.sessionData.interactChannel,
            source: source
        };
        return route;
    }
};
InteractionListener = __decorate([
    tsyringe_1.injectable(),
    __param(0, tsyringe_1.inject(injection_index_1.ParameterKeys.INTERACT_DATA_INTERFACE)),
    __param(1, tsyringe_1.inject(injection_index_1.ParameterKeys.SESSIONDATA))
], InteractionListener);
exports.InteractionListener = InteractionListener;
//# sourceMappingURL=interact.listener.js.map
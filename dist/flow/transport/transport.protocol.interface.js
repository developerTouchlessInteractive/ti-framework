"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicationFactory = exports.Mode = exports.Transporter = void 0;
const tsyringe_1 = require("tsyringe");
const socket_implementation_1 = require("./socket.implementation");
const interactsocket_implementation_1 = require("./interactsocket.implementation");
var Transporter;
(function (Transporter) {
    Transporter["SOCKET"] = "SOCKET";
    Transporter["MQTT"] = "MQTT";
    Transporter["RABBITMQ"] = "RABBITMQ";
})(Transporter = exports.Transporter || (exports.Transporter = {}));
var Mode;
(function (Mode) {
    Mode[Mode["FLOW"] = 0] = "FLOW";
    Mode[Mode["INTERACTION"] = 1] = "INTERACTION";
})(Mode = exports.Mode || (exports.Mode = {}));
let CommunicationFactory = class CommunicationFactory {
    constructor() { }
    /**
     * a factory method to give Transport mode as CommunicationHandler
     * extend CommunicationHandler as per your custom transport mechanism.
     * @param transportType transport mechanisim that the sdk uses
     */
    getCommunicationHandler(transportType, container, mode) {
        if (transportType === Transporter.SOCKET) {
            if (mode === Mode.INTERACTION) {
                const socketHandler = container.resolve(interactsocket_implementation_1.InteractSocketHandler);
                const sockhandler = socketHandler;
                return sockhandler;
            }
            else {
                const socketHandler = container.resolve(socket_implementation_1.SocketHandler);
                const sockhandler = socketHandler;
                return sockhandler;
            }
        }
    }
};
CommunicationFactory = __decorate([
    tsyringe_1.injectable()
], CommunicationFactory);
exports.CommunicationFactory = CommunicationFactory;
//# sourceMappingURL=transport.protocol.interface.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerInteractEvent = exports.ClientInteractEvent = exports.ServerInteractEvent = void 0;
class ServerInteractEvent {
}
exports.ServerInteractEvent = ServerInteractEvent;
/**
* SERVER acknowledges a Intercation connection from client/customer
*/
ServerInteractEvent.ACK_INTERACTION_CONNECTION = "ACK_INTERACTION_CONNECTION";
/**
* SERVER acknowledges Communication Data from client/customer
*/
ServerInteractEvent.ACK_COMMUNICATION_DATA = "ACK_COMMUNICATION_DATA";
class ClientInteractEvent {
}
exports.ClientInteractEvent = ClientInteractEvent;
/**
* client sends communicationData
*/
ClientInteractEvent.COMMUNICATION_DATA = "COMMUNICATION_DATA";
class CustomerInteractEvent {
}
exports.CustomerInteractEvent = CustomerInteractEvent;
/**
* CUSTOMER sends communicationData
*/
CustomerInteractEvent.COMMUNICATION_DATA = "COMMUNICATION_DATA";
//# sourceMappingURL=interact.events.js.map
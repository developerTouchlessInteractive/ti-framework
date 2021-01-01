"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comm_events = void 0;
var comm_events;
(function (comm_events) {
    comm_events[comm_events["COMMUNICATION_DATA"] = 0] = "COMMUNICATION_DATA";
    comm_events[comm_events["SERVER_ACK_CLIENT_COMMUNICATION_REQ"] = 1] = "SERVER_ACK_CLIENT_COMMUNICATION_REQ";
    comm_events[comm_events["SERVER_ACK_CUSTOMER_COMMUNICATION_REQ"] = 2] = "SERVER_ACK_CUSTOMER_COMMUNICATION_REQ";
    comm_events[comm_events["ERROR_NO_FLOW_TO_CONNECT"] = 3] = "ERROR_NO_FLOW_TO_CONNECT";
    comm_events[comm_events["CLIENT_INTERACTION_INITIATED"] = 4] = "CLIENT_INTERACTION_INITIATED";
    comm_events[comm_events["ERROR_CLIENT_CONNECTION"] = 5] = "ERROR_CLIENT_CONNECTION";
    comm_events[comm_events["CLIENT_ENDS_INTERACTION"] = 6] = "CLIENT_ENDS_INTERACTION";
    comm_events[comm_events["CUSTOMER_INTERACTION_INITIATED"] = 7] = "CUSTOMER_INTERACTION_INITIATED";
    comm_events[comm_events["ERROR_CUSTOMER_CONNECTION"] = 8] = "ERROR_CUSTOMER_CONNECTION";
    comm_events[comm_events["CUSTOMER_ENDS_INTERACTION"] = 9] = "CUSTOMER_ENDS_INTERACTION";
    //sending message
    comm_events[comm_events["CLIENT_SENDS_COMM_DATA"] = 10] = "CLIENT_SENDS_COMM_DATA";
    comm_events[comm_events["CUSTOMER_SENDS_COMM_DATA"] = 11] = "CUSTOMER_SENDS_COMM_DATA";
    comm_events[comm_events["SERVER_ACK_PACKET"] = 12] = "SERVER_ACK_PACKET";
})(comm_events = exports.comm_events || (exports.comm_events = {}));
//# sourceMappingURL=interact.model.js.map
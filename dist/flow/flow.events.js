"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TISdkErrorMessages = exports.ClientEvent = exports.CustomerEvent = exports.ServerEvent = void 0;
class ServerEvent {
}
exports.ServerEvent = ServerEvent;
/**
 * SERVER acknowledges a connection from client/customer
 */
ServerEvent.ACK_CONNECTION = "ACK_CONNECTION";
/**
 * SERVER clicent/customer authetication update
 */
ServerEvent.AUTHENTICATION = "AUTHENTICATION";
/**
 * SERVER acknowledges flow initiation by client
 */
ServerEvent.ACK_FLOW_INITIATION = "ACK_FLOW_INITIATION";
/**
 * SERVER processing a flow initiation request
 */
ServerEvent.PROCESSING_REQUEST = "PROCESSING_REQUEST";
/**
 * SERVER delivers created flow session information
 */
ServerEvent.SESSION_INFO = "SESSION_INFO";
/**
 * SERVER is Trying to process payload, wait
 */
ServerEvent.PROCESSING = "PROCESSING";
/**
* SERVER processed a  payload, send this event along with helpful
* information to understand if processing is successful or failed
*/
ServerEvent.PAYLOAD_PROCESSED = "PAYLOAD_PROCESSED";
/**
* SERVER is waiting for remote party to confim
*/
ServerEvent.AWAITING_REMOTE_CONFIRMATION = "AWAITING_REMOTE_CONFIRMATION";
/**
* SERVER recieved payload
*/
ServerEvent.ACK_PAYLOAD = "ACK_PAYLOAD";
/**
* SERVER relayed payload to remote
*/
ServerEvent.PAYLOAD_SENT_TO_REMOTE = "PAYLOAD_SENT_TO_REMOTE";
/**
* SERVER wants to halt the flow as there is a pending Action on SERVER side
*/
ServerEvent.FLOW_LOCK_ACTIVATE = "FLOW_LOCK_ACTIVATE";
/**
* SERVER wants to release the flow as the pending Action os complete
*/
ServerEvent.FLOW_LOCK_RELEASE = "FLOW_LOCK_RELEASE";
/**
 * SERVER ack for customer's request for processing task completion.
 */
ServerEvent.ACK_TASK_COMPLETE_REQUEST = "ACK_TASK_COMPLETE_REQUEST";
/**
 * SERVER confirms task completed to Customer.
 */
ServerEvent.TASK_COMPLETE = "TASK_COMPLETE";
/**
* SERVER confirms that Stage completed to CUSTOMER and CLIENT.
*/
ServerEvent.STAGE_COMPLETE = "STAGE_COMPLETE";
/**
* SERVER confirms that Flow completed to CUSTOMER and CLIENT.
*/
ServerEvent.FLOW_COMPLETE = "FLOW_COMPLETE";
/**
* SERVER sent session completion
*/
ServerEvent.SESSION_COMPLETE = "SESSION_COMPLETE";
/**
 * Flow events from Touchless SDK to Server/CustomerApp
 * use these from SDK to customer app and Server.
 *  this can be extended
 */
class CustomerEvent {
}
exports.CustomerEvent = CustomerEvent;
/**
 * CUSTOMER sends this to server whe its ready to start sending
 * events / payload
 */
CustomerEvent.FLOW_CONNECTION = "FLOW_CONNECTION";
/**
* CUSTOMER recieves a  payload
*/
CustomerEvent.PAYLOAD_RECEIVED = "PAYLOAD_RECEIVED";
/**
* CUSTOMER processed a  payload, send this event along with helpful
* information to understand if processing is successful or failed
*/
CustomerEvent.PAYLOAD_PROCESSED = "PAYLOAD_PROCESSED";
/**
* CUSTOMER unable to connect to flow
*/
CustomerEvent.FLOW_CONNECTION_ERROR = "FLOW_CONNECTION_ERROR";
/**
* CUSTOMER wants to halt the flow as there is a pending Action on CUSTOMER side
*/
CustomerEvent.FLOW_LOCK_ACTIVATE = "FLOW_LOCK_ACTIVATE";
/**
* CUSTOMER wants to release the flow as the pending Action os complete
*/
CustomerEvent.FLOW_LOCK_RELEASE = "FLOW_LOCK_RELEASE";
/***
* CUSTOMER Task Started
*/
CustomerEvent.TASK_STARTED = "TASK_STARTED";
/***
 * SDK- customer initiates a request to complete task. which is sent to
 * Server to be processed.
 */
CustomerEvent.TASK_COMPLETE_REQUEST = "TASK_COMPLETE_REQUEST";
/***
 * CUSTOMER Task is Complete
 */
CustomerEvent.TASK_COMPLETE = "TASK_COMPLETE";
/***
 * Flow events from Touchless SDK
 * use these from SDK to client app. this can be extended
 */
class ClientEvent {
}
exports.ClientEvent = ClientEvent;
/**
 * CLIENT can request flow initiation using below event
 */
ClientEvent.FLOW_INITIATION = "FLOW_INITIATION";
/**
 * CLIENT recieves a  payload and ack to remote party
 */
ClientEvent.PAYLOAD_RECEIVED = "PAYLOAD_RECEIVED";
/**
* CLIENT processed a  payload, send this event along with helpful
* information to understand if processing is successful or failed
*/
ClientEvent.PAYLOAD_PROCESSED = "PAYLOAD_PROCESSED";
/**
 * CLIENT flow has been established with the server, client connected
 *  a flow channel with server
 */
ClientEvent.FLOW_ESTABLISHED = "FLOW_ESTABLISHED";
/**
* CLIENT UNABLE to initiate flow
*/
ClientEvent.FLOW_INITIATION_ERROR = "FLOW_INITIATION_ERROR";
/**
* CLIENT wants to halt the flow as there is a pending Action on CLIENT side
*/
ClientEvent.FLOW_LOCK_ACTIVATE = "FLOW_LOCK_ACTIVATE";
/**
* CLIENT wants to release the flow as the pending Action os complete
*/
ClientEvent.FLOW_LOCK_RELEASE = "FLOW_LOCK_RELEASE";
/**
 * CLIENT ack for customer -> server's request for processing task completion.
 */
ClientEvent.ACK_TASK_COMPLETE_REQUEST = "ACK_TASK_COMPLETE_REQUEST";
/**
 * CLIENT confirms task completed to Server -> Customer.
 */
ClientEvent.TASK_COMPLETE = "TASK_COMPLETE";
/**
 * CLIENT confirms stage completed to Server -> Customer.
 */
ClientEvent.STAGE_COMPLETE = "STAGE_COMPLETE";
/**
 * CLIENT confirms flow completed to Server -> Customer.
 */
ClientEvent.FLOW_COMPLETE = "FLOW_COMPLETE";
/**
 * CLIENT initiates task session completion request
 */
ClientEvent.SESSION_COMPLETE_REQUEST = "SESSION_COMPLETE_REQUEST";
class TISdkErrorMessages {
}
exports.TISdkErrorMessages = TISdkErrorMessages;
TISdkErrorMessages.BAD_REQUEST = "Please Check your Request Data";
/**
*SDK received error from Server / Customer.
*/
TISdkErrorMessages.PROCESSING_ERROR = "PROCESSING_ERROR";
//# sourceMappingURL=flow.events.js.map
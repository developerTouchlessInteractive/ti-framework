export class ServerEvent {
    /**
     * SERVER acknowledges a connection from client/customer
     */
    public static readonly ACK_CONNECTION = "ACK_CONNECTION"
    /**
     * SERVER clicent/customer authetication update 
     */
    public static readonly AUTHENTICATION = "AUTHENTICATION"
    /**
     * SERVER acknowledges flow initiation by client
     */
    public static readonly ACK_FLOW_INITIATION =  "ACK_FLOW_INITIATION"
    /**
     * SERVER processing a flow initiation request
     */
    public static readonly PROCESSING_REQUEST =  "PROCESSING_REQUEST"
    /**
     * SERVER delivers created flow session information
     */
    public static readonly SESSION_INFO = "SESSION_INFO"

    /**
     * SERVER is Trying to process payload, wait
     */
    public static readonly PROCESSING = "PROCESSING"

    /**
    * SERVER processed a  payload, send this event along with helpful
    * information to understand if processing is successful or failed
    */
    public static readonly PAYLOAD_PROCESSED = "PAYLOAD_PROCESSED"  

    /**
    * SERVER is waiting for remote party to confim
    */
    public static readonly AWAITING_REMOTE_CONFIRMATION = "AWAITING_REMOTE_CONFIRMATION"
    /**
    * SERVER recieved payload
    */
    public static readonly ACK_PAYLOAD = "ACK_PAYLOAD"
    /**
    * SERVER relayed payload to remote 
    */
    public static readonly PAYLOAD_SENT_TO_REMOTE = "PAYLOAD_SENT_TO_REMOTE"

    /**
    * SERVER wants to halt the flow as there is a pending Action on SERVER side
    */
    public static readonly FLOW_LOCK_ACTIVATE = "FLOW_LOCK_ACTIVATE"
    /**
    * SERVER wants to release the flow as the pending Action os complete
    */
    public static readonly FLOW_LOCK_RELEASE = "FLOW_LOCK_RELEASE"      

    /**
     * SERVER ack for customer's request for processing task completion.
     */
    public static readonly ACK_TASK_COMPLETE_REQUEST = "ACK_TASK_COMPLETE_REQUEST"      

    /**
     * SERVER confirms task completed to Customer.
     */
    public static readonly TASK_COMPLETE = "TASK_COMPLETE" 
    /**
    * SERVER confirms that Stage completed to CUSTOMER and CLIENT.
    */
    public static readonly STAGE_COMPLETE = "STAGE_COMPLETE" 
    /**
    * SERVER confirms that Flow completed to CUSTOMER and CLIENT.
    */
    public static readonly FLOW_COMPLETE = "FLOW_COMPLETE" 
    /**
    * SERVER sent session completion 
    */
    public static readonly SESSION_COMPLETE = "SESSION_COMPLETE" 
}

/**
 * Flow events from Touchless SDK to Server/CustomerApp
 * use these from SDK to customer app and Server.
 *  this can be extended
 */
export class CustomerEvent {
    /**
     * CUSTOMER sends this to server whe its ready to start sending 
     * events / payload
     */
    public static readonly FLOW_CONNECTION = "FLOW_CONNECTION"
    /**
    * CUSTOMER recieves a  payload
    */
    public static readonly PAYLOAD_RECEIVED = "PAYLOAD_RECEIVED"
    /**
    * CUSTOMER processed a  payload, send this event along with helpful
    * information to understand if processing is successful or failed
    */
    public static readonly PAYLOAD_PROCESSED = "PAYLOAD_PROCESSED"  
    /**
    * CUSTOMER unable to connect to flow
    */
    public static readonly FLOW_CONNECTION_ERROR = "FLOW_CONNECTION_ERROR"
    /**
    * CUSTOMER wants to halt the flow as there is a pending Action on CUSTOMER side
    */
    public static readonly FLOW_LOCK_ACTIVATE = "FLOW_LOCK_ACTIVATE"
    /**
    * CUSTOMER wants to release the flow as the pending Action os complete
    */
    public static readonly FLOW_LOCK_RELEASE = "FLOW_LOCK_RELEASE"  
    /***
    * CUSTOMER Task Started
    */
    public static readonly TASK_STARTED = "TASK_STARTED"  
    /***
     * SDK- customer initiates a request to complete task. which is sent to
     * Server to be processed.
     */
    public static readonly TASK_COMPLETE_REQUEST = "TASK_COMPLETE_REQUEST"  
    /***
     * CUSTOMER Task is Complete
     */
    public static readonly TASK_COMPLETE = "TASK_COMPLETE"
}


/***
 * Flow events from Touchless SDK
 * use these from SDK to client app. this can be extended
 */
export class ClientEvent {

    /**
     * CLIENT can request flow initiation using below event
     */
    public static readonly FLOW_INITIATION = "FLOW_INITIATION"
    /**
     * CLIENT recieves a  payload and ack to remote party
     */
    public static readonly PAYLOAD_RECEIVED = "PAYLOAD_RECEIVED"
    /**
    * CLIENT processed a  payload, send this event along with helpful 
    * information to understand if processing is successful or failed
    */
    public static readonly PAYLOAD_PROCESSED = "PAYLOAD_PROCESSED"

    /**
     * CLIENT flow has been established with the server, client connected
     *  a flow channel with server
     */
    public static readonly FLOW_ESTABLISHED = "FLOW_ESTABLISHED"
    /**
    * CLIENT UNABLE to initiate flow
    */
    public static readonly FLOW_INITIATION_ERROR = "FLOW_INITIATION_ERROR"
    /**
    * CLIENT wants to halt the flow as there is a pending Action on CLIENT side
    */
    public static readonly FLOW_LOCK_ACTIVATE = "FLOW_LOCK_ACTIVATE"  
    /**
    * CLIENT wants to release the flow as the pending Action os complete
    */
    public static readonly FLOW_LOCK_RELEASE = "FLOW_LOCK_RELEASE"  

    /**
     * CLIENT ack for customer -> server's request for processing task completion.
     */
    public static readonly ACK_TASK_COMPLETE_REQUEST = "ACK_TASK_COMPLETE_REQUEST"

    /**
     * CLIENT confirms task completed to Server -> Customer.
     */
    public static readonly TASK_COMPLETE = "TASK_COMPLETE" 
    /**
     * CLIENT confirms stage completed to Server -> Customer.
     */
    public static readonly STAGE_COMPLETE = "STAGE_COMPLETE" 
    /**
     * CLIENT confirms flow completed to Server -> Customer.
     */
    public static readonly FLOW_COMPLETE = "FLOW_COMPLETE" 
    /**
     * CLIENT initiates task session completion request
     */
    public static readonly SESSION_COMPLETE_REQUEST = "SESSION_COMPLETE_REQUEST" 
}

export class TISdkErrorMessages {
    public static readonly BAD_REQUEST = "Please Check your Request Data"
    /**
    *SDK received error from Server / Customer.
    */
    public static readonly PROCESSING_ERROR = "PROCESSING_ERROR" 
}




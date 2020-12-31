export class ServerInteractEvent {
    /**
    * SERVER acknowledges a Intercation connection from client/customer
    */
    public static readonly ACK_INTERACTION_CONNECTION = "ACK_INTERACTION_CONNECTION"
    /**
    * SERVER acknowledges Communication Data from client/customer
    */
    public static readonly ACK_COMMUNICATION_DATA = "ACK_COMMUNICATION_DATA"
    
}

export class ClientInteractEvent {
    /**
    * client sends communicationData
    */
    public static readonly COMMUNICATION_DATA = "COMMUNICATION_DATA"
}

export class CustomerInteractEvent {
    /**
    * CUSTOMER sends communicationData
    */
    public static readonly COMMUNICATION_DATA = "COMMUNICATION_DATA"

}
export declare class ServerInteractEvent {
    /**
    * SERVER acknowledges a Intercation connection from client/customer
    */
    static readonly ACK_INTERACTION_CONNECTION = "ACK_INTERACTION_CONNECTION";
    /**
    * SERVER acknowledges Communication Data from client/customer
    */
    static readonly ACK_COMMUNICATION_DATA = "ACK_COMMUNICATION_DATA";
}
export declare class ClientInteractEvent {
    /**
    * client sends communicationData
    */
    static readonly COMMUNICATION_DATA = "COMMUNICATION_DATA";
}
export declare class CustomerInteractEvent {
    /**
    * CUSTOMER sends communicationData
    */
    static readonly COMMUNICATION_DATA = "COMMUNICATION_DATA";
}
//# sourceMappingURL=interact.events.d.ts.map
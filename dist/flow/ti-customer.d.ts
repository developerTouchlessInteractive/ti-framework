declare class TiCustomer {
    /**
     *
     * @param url server URL
     * @param sessionId flow server session-id
     * @param flowId flowId to connect to
     * @param customer customer related data
     * @returns Promise resolving to
     */
    registerCustomer(url: string, sessionId: string, flowId: string, customer: any): Promise<unknown>;
    /**
     * register customer by invite code
     * returns resolves to flow/session related details
     * @param url server url -- to register
     * @param inviteCode invite code, from client application
     */
    registerCustomerByCode(url: string, inviteCode: string): Promise<any>;
}
export { TiCustomer };
//# sourceMappingURL=ti-customer.d.ts.map
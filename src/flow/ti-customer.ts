import { InvalidInputException, ErrorMesssages, GenericException} from "../errors/ti.errors";
const axios = require('axios')

class TiCustomer {
    /**
     * 
     * @param url server URL
     * @param sessionId flow server session-id 
     * @param flowId flowId to connect to
     * @param customer customer related data    
     * @returns Promise resolving to 
     */
    registerCustomer(url: string, sessionId: string, flowId: string, customer: any) {
        return new Promise(async(resolve, reject) => {
            try {
                if (url === undefined || url.length === 0) {
                    throw new InvalidInputException(ErrorMesssages.SERVER_URL_INVALID)
                }
                if (sessionId === undefined || sessionId.length === 0) {
                    throw new InvalidInputException(ErrorMesssages.INVALID_SESSION_INFO)
                }
                if (flowId === undefined || flowId.length === 0) {
                    throw new InvalidInputException(ErrorMesssages.FLOWID_INVALID)
                }
                if (customer === undefined || customer.length === 0) {
                    throw new InvalidInputException(ErrorMesssages.CUSTOMER_ID_INVALID)
                }
                const reg_data = { sessionId: sessionId, flowId: flowId, customer: customer }
                const response = await axios({
                    method: 'post',
                    url: url + 'register/customerByCode',
                    data: reg_data
                })
                console.log(JSON.stringify(response.data, null, 2))
                resolve(response)
            } catch (error) {
                if (!error.code) {
                    error = new GenericException(JSON.stringify(error, null, 2))
                }
                reject(error)
            }
        })
    }

    /**
     * register customer by invite code
     * returns resolves to flow/session related details
     * @param url server url -- to register
     * @param inviteCode invite code, from client application
     */
    registerCustomerByCode(url: string, inviteCode: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                if (url === undefined || url.length === 0) {
                    throw new InvalidInputException(ErrorMesssages.SERVER_URL_INVALID)
                }
                if (inviteCode === undefined || inviteCode.length === 0) {
                    throw new InvalidInputException(ErrorMesssages.INVITE_CODE_INVALID)
                }
                const reg_data = { inviteCode: inviteCode }
                const response = await axios({
                    method: 'post',
                    url: url + 'register/customerByCode',
                    data: reg_data
                })
                console.log(JSON.stringify(response.data, null, 2))
                resolve(response)
            } catch (error) {
                if (!error.code) {
                    error = new GenericException(JSON.stringify(error, null, 2))
                }
                reject(error)
            }
        })
    }


}

export { TiCustomer }
    

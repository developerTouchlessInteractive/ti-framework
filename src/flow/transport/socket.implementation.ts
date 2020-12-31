import * as io from 'socket.io-client'; 
import { CommunicationHandler, DataAddress, EventListener } from './transport.protocol.interface';
import { inject, injectable } from 'tsyringe';
import { ParameterKeys } from '../../flow/injection.index';
import { CloseConnectionException, ConnectionException, DataTransmissionException, InvalidEventListenerException, InvalidFlowChannelException, InvalidPayloadException } from '../../errors/ti.errors'; 
import { ResponseData } from '../../ti';

export let socket: SocketIOClient.Socket 

@injectable()
export class SocketHandler implements CommunicationHandler {
    URL: string | undefined;
    eventListener?: EventListener | undefined;
    flowConnectionData: DataAddress | undefined;
    /**
     * implementation of communication handler 
     * @param url 
     * @param queryData 
     * @param flowChannel 
     * @param interactChannel 
     */
    constructor(@inject(ParameterKeys.URL) private url: string,
        @inject(ParameterKeys.INITDATA) private queryData: DataAddress,
        @inject(ParameterKeys.FLOWCHANNEL) private flowChannel: string, 
        @inject(ParameterKeys.EVENTLISTNER) private eL: EventListener,
    ) { 
        this.URL = url
        this.flowConnectionData = queryData
        this.eventListener = eL
    }


    isConnected() {
        return socket.connected
    }

    closeConnection(): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                socket.close()
                this.eventListener?.disconnected()
            } catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error, null, 2)
                    error = new CloseConnectionException(errorString ? errorString : "")
                }
                reject(error)
            }
        })
    }

    connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                if (!this.eventListener) throw new InvalidEventListenerException()
                socket = io.connect(this.URL!, { query: this.queryData });
                 
                socket.on('connect', () => {
                    this.eventListener?.connected()
                    socket.on(this.flowChannel!, (data: ResponseData) => {
                        console.log(`socket listened data: ${JSON.stringify(data)}`)
                        this.eventListener?.listenEvent(data)
                    })
                    resolve()
                })
            } catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error, null, 2)
                    error = new ConnectionException(errorString ? errorString : "")
                }
                reject(error)
            }
        })
    }
 
    sendPayload(payload: any): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                if (!payload) throw new InvalidPayloadException()
                if(!this.flowChannel) throw new InvalidFlowChannelException()
                socket?.emit(this.flowChannel!, payload)
                resolve()
            } catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error, null, 2)
                    error = new DataTransmissionException(errorString ? errorString : "")
                } 
                reject(error)
            }
        })
    }
}

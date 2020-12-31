import * as io from 'socket.io-client';  
import { inject, injectable } from 'tsyringe';
import { ParameterKeys } from '../../flow/injection.index';
import { CommunicationHandler, DataAddress, CommunicationData, InteractionListener } from '../../ti';  
import { CloseConnectionException, DataTransmissionException, InvalidInteractListenerException, InvalidInteractChannelException, InvalidPayloadException, ConnectionException } from '../../errors/ti.errors';
 
export let socket: SocketIOClient.Socket 

@injectable()
export class InteractSocketHandler implements CommunicationHandler {
    URL: string | undefined;
    interactListener:InteractionListener | undefined
    flowConnectionData: DataAddress | undefined;
   
    constructor(@inject(ParameterKeys.INTERACT_URL) private url: string,
        @inject(ParameterKeys.INITDATA) private queryData: DataAddress,
        @inject(ParameterKeys.INTERACTCHANNEL) private interactChannel: string,
        @inject(ParameterKeys.INTERACT_LISTENER) private il:InteractionListener
    ) { 
        this.URL = url
        this.flowConnectionData = queryData
        this.interactListener = il
    }


    isConnected() {
        return socket.connected
    }

    closeConnection(): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                if (!this.interactListener) throw new InvalidInteractListenerException()
                socket.close()
                this.interactListener?.disconnected()
                resolve()
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
                if (!this.interactListener) throw new InvalidInteractListenerException()
                socket = io.connect(this.URL!, { query: this.queryData });

                socket.on('connect', () =>
                { 
                    this.interactListener?.connected()
                    socket.on(this.interactChannel!, (data: CommunicationData) => {
                        console.log(`socket listened interaction data: ${JSON.stringify(data)}`)
                        this.interactListener?.listenEvent(data)
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
                if (!this.interactChannel) throw new InvalidInteractChannelException()
                socket?.emit(this.interactChannel!, payload)
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

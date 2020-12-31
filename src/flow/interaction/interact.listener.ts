import shortid from "shortid"
import { injectable, inject } from "tsyringe" 
import { ParameterKeys } from "../injection.index"
import { EndPoint, MessageAckListener, comm_events, CommunicationData, DataType, Route, DataInterface, SessionData } from "../../ti"
import { ServerDataListener } from "../transport/transport.protocol.interface"
import { ServerInteractEvent, ClientInteractEvent, CustomerInteractEvent } from './interact.events'


@injectable()
export class InteractionListener implements ServerDataListener {
    deviceType: EndPoint | undefined
    acks: MessageAckListener[] = []

    constructor(@inject(ParameterKeys.INTERACT_DATA_INTERFACE) private dataInterface: DataInterface,
        @inject(ParameterKeys.SESSIONDATA) private sessionData: SessionData) {
        this.deviceType = sessionData.deviceType
    }

    connected(data?: any) {
        this.dataInterface.interactionConnected(data)
    }

    listenEvent(comm?: any) {
        switch (comm.type) {
            case ServerInteractEvent.ACK_INTERACTION_CONNECTION:
                this.dataInterface.connectionUpdate({ type: comm.type, time: Date.now() })
                break;
            case ClientInteractEvent.COMMUNICATION_DATA || CustomerInteractEvent.COMMUNICATION_DATA:
                this.dataInterface.receiveData(comm)
                break;
            case ServerInteractEvent.ACK_COMMUNICATION_DATA:
                console.log(`ack for ${comm.packetId}`)
                const ack = this.acks.find(x => x.packetId === comm.packetId)
                if (ack) ack.processAndAck("")
                break;
            default:
                console.log(JSON.stringify(comm, null, 2))
                break;
        }
    }

    disconnected() {
        this.dataInterface.interactionDisConnected()
    }


    getCommunicationData(type: comm_events, source: EndPoint, id?: string, data?: CommunicationData) {
        const commdata: CommunicationData = {
            type: type,
            time: Date.now(),
            route: (id) ? this.getRoute(source, id) : this.getRoute(source),
            packetId: shortid.generate(),
            dataType: DataType.INTERACTION
        }
        if (data) {
            commdata['data'] = data
        }
        return commdata
    }

    getRoute(source: EndPoint, id?: any) {
        const route: Route = {
            sessionId: this.sessionData.sessionId!,
            channelId: id ? id : this.sessionData.channelId,
            deviceType: this.deviceType ? this.deviceType : EndPoint.CLIENT,
            flowChannel: this.sessionData.flowChannel!, //flow events channel
            interactChannel: this.sessionData.interactChannel!, //communication related channel
            source: source
        }
        return route
    }

}
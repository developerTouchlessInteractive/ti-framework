import { ClientEvent, CustomerEvent, ServerEvent, TISdkErrorMessages } from "../flow/flow.events"; 

export enum EndPoint {
    CUSTOMER = "CUSTOMER",
    CLIENT = "CLIENT",
    SERVER = "SERVER"
}

export enum DataType{
    FLOW = "FLOW",
    INTERACTION = "INTERACTION"
}

export interface ResponseData {
    time: number,
    type: ServerEvent | CustomerEvent | ClientEvent,
    data?: any,
    packetId?: string,
    route: Route,
    dataType:DataType
}

export interface Route {
    sessionId: string,
    channelId: string,
    flowChannel: string,
    interactChannel: string,
    deviceType: EndPoint,
    source: EndPoint
}

export interface SdkNotificationData {
    time: number,
    type: ServerEvent | CustomerEvent | ClientEvent | TISdkErrorMessages,
    data?: any
}


export interface SessionData {
    sessionId: string,
    channelId: string,
    flowChannel: string,
    interactChannel: string,
    deviceType: EndPoint
}
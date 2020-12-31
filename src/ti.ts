import "reflect-metadata";
import { TiTask } from './create/task/ticlient-task';
import { TiStage } from './create/stage/ticlient-stage';
import { TiFlow } from './create/flow/ticlient-flow'; 
import axios from 'axios' 
import { TiCustomer } from './flow/ti-customer'; 
import { CommunicationData, DataInterface, comm_events, Interactor, MessageAckListener, Operations } from "./models/interact.model";
import { CommunicationFactory, CommunicationHandler, DataAddress, EventListener, Mode, Transporter } from './flow/transport/transport.protocol.interface';
import { DataType, EndPoint, ResponseData, Route, SessionData, SdkNotificationData } from './models/data.model';
import { ServerEvent, TISdkErrorMessages, ClientEvent, CustomerEvent } from './flow/flow.events';
import { UtilService } from './utils/ti-util';
import { container, DependencyContainer } from 'tsyringe'
import { FlowManager } from './flow/flow.manager';
import { ClientServerEventListener } from './flow/event_listeners/client.event.listener';
import { ParameterKeys } from "./flow/injection.index";
import { FlowListener } from "./flow/flow.listener"; 
import { StateHandler, StoreContainerFactory, StoreMethod } from "./flow/store/store.interface";
import { FlowDetails, FlowState, StageState, Task, TaskState, UserAction, UserInput, Stage, Flow, SessionInfo, TaskOrder, Response } from "./models/ti.models";
import { CustomerServerEventListener } from "./flow/event_listeners/customer.event.listener";
import { DIRegisterInstanceException, DIResolveInstanceException, ErrorMesssages, GenericException, InvalidContainerException, InvalidInputException, InvalidPayloadException, InvalidSessionInfoException, TiSdkError } from "./errors/ti.errors";
import { InteractionListener } from "./flow/interaction/interact.listener";
import { InteractManager } from "./flow/interaction/interact.manager";  
import { RouteHandler } from "./flow/route.handler";
import { ServerInteractEvent, CustomerInteractEvent, ClientInteractEvent } from "./flow/interaction/interact.events"; 

export {
    TaskOrder,
    CommunicationData,
    Interactor,
    FlowListener,
    ClientServerEventListener,
    DataType,
    EndPoint,
    SessionData,
    ResponseData,
    Route,
    ServerEvent,
    CustomerEvent,
    ClientEvent,
    DataInterface,
    comm_events,
    MessageAckListener,
    Operations,
    EventListener,
    CommunicationHandler,
    DataAddress,
    CommunicationFactory,
    Transporter,
    StateHandler,
    StoreContainerFactory,
    SdkNotificationData,
    StoreMethod,
    FlowDetails,
    FlowState,
    TaskState,
    StageState,
    UtilService,
    Task,
    UserAction,
    UserInput,
    Stage,
    Flow,
    InteractionListener,
    ServerInteractEvent,
    CustomerInteractEvent,
    ClientInteractEvent,
    Response
}    


export namespace handler {
    export interface TaskPathHandler {
        uniqueId:string
        nextTaskPath(path: string): void
    }

    export interface TiRouteConfig {
        routes: TiRoute[]
    }

    export interface TiRoute {
        path: string,
        controllerName: string
    }

    export enum Platform {
        ANGULAR = "ANGULAR",
        REACT = "REACT",
        VUE = "VUE"
    }

    export async function getCurrentTask(sessionId:string){
        return new Promise<TaskOrder>(async (resolve, reject) => {
           try {
               const sessionContainer = await getSessionContainerFor(sessionId)
               if (sessionContainer) {
                   const routeHandler: RouteHandler = sessionContainer.resolve(ParameterKeys.ROUTEHANDLER)
                   resolve(routeHandler.getCurrentTask()!)
               }    
           } catch (error) {
               reject()
           }
        })
    }

    export async function getFlowState(sessionId: string) {
        return new Promise<FlowState>(async (resolve, reject) => {
            try {
                const sessionContainer = await getSessionContainerFor(sessionId)
                if (sessionContainer) {
                    const flowState: FlowState = sessionContainer.resolve(ParameterKeys.FLOW_STATE)
                    resolve(flowState)
                }
            } catch (error) {
                reject()
            }
        })
    }

    export function isCurrentTask(sessionId:string,uniqueReferenceId:string){
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                const sessionContainer = await getSessionContainerFor(sessionId)
                if (sessionContainer) {
                    const routeHandler: RouteHandler = sessionContainer.resolve(ParameterKeys.ROUTEHANDLER)
                    if (routeHandler.isCurrentTask(uniqueReferenceId)){
                        resolve(true)
                    }
                    resolve(false)
                }
            } catch (error) {
                reject()
            }
        })
    }

    export function beginFlow(){
        return new Promise<void>(async (resolve, reject) => {
            try {
                const sessionContainer = await getSessionContainerFor(sessionId)
                if (sessionContainer) {
                    const routeHandler: RouteHandler = sessionContainer.resolve(ParameterKeys.ROUTEHANDLER)
                    await routeHandler.calculateNextTask()
                    resolve()
                }
            } catch (error) {
                reject(error)
            }
        })
    }

    export async function getSessionContainerFor(sessionId: string) {
        const blks = blocks.filter(x => x.sessionId === sessionId)
        if (blks.length > 0) {
            const sessioncontainer = blks[0].container
            return sessioncontainer
        }
    }
}

export namespace util {
    /**
     * getCommunicationData
     * @param data: data for which you would get back communicationData
     * @param sessionId: sessionId
     */
    export async function getCommunicationData(data:string,sessionId:string) {
        return new Promise<CommunicationData>(async (resolve, reject) => { 
            try {
                const sessionContainer = await handler.getSessionContainerFor(sessionId)
                if (sessionContainer) {
                    const util: UtilService = sessionContainer.resolve(ParameterKeys.UTIL)
                    const commdata: CommunicationData = await util.getCommunicationData(data)
                    resolve(commdata)
                }
            } catch (error) {
                reject(error)
            }
        })
    }

    export function validURL(str:string) {
        var pattern = new RegExp('^(https?:\\/\\/)?'); // fragment locator
        return !!pattern.test(str);
    }
}

export const serverUrl = 'http://206.81.3.151:3000/';
export const local_serverUrl = 'http://localhost:3000/';
export const interact_server_endpoint = 'http://206.81.3.151:80/interact'
export const interact_local_serverUrl = 'http://localhost:80/interact'

export let sessionId: string
export let channelId: string
export const deviceType = EndPoint.CLIENT
export let flowChannel: string
export let interactChannel: string

type block = {
    'sessionId': string,
    'container': typeof container,
    'manager': FlowManager
}

let blocks: block[] = []

export var URL: string
export var INTERACT_URL: string  
export var ENV_TYPE : EnvType

export enum EnvType{
    DEBUG,
    PROD
}

export function setEnv(serverUrl:string, envType: EnvType,interactServerUrl?:string) {
    URL = serverUrl
    if (envType === EnvType.DEBUG) {
        container.register(ParameterKeys.URL, { useValue: URL })

        container.register(ParameterKeys.INTERACT_URL, { useValue: interact_local_serverUrl })
    } else {
        URL = serverUrl 
        container.register(ParameterKeys.URL, { useValue: serverUrl })
        container.register(ParameterKeys.INTERACT_URL, { useValue: interact_server_endpoint })
    }
}

export type ServerConfig = {
    serverUrl:string,
    envType:EnvType,
    interactServerUrl:string
}

export function setServerEndpoint(config:ServerConfig) {
    if(config.serverUrl===undefined||config.serverUrl.length===0){
        throw new Error("please enter a valid server url");
    }
    if (config.interactServerUrl === undefined || config.interactServerUrl.length === 0) {
        throw new Error("please enter a valid interact server url");
    }
    if(config.envType===undefined){
        throw new Error("invalid config type");
    }
    if(config.serverUrl.charAt(config.serverUrl.length-1) !== '/'){
        URL = config.serverUrl + '/'
    }else {
        URL = config.serverUrl
    }
    
    INTERACT_URL = config.interactServerUrl
    ENV_TYPE = config.envType
    container.register(ParameterKeys.URL, { useValue: URL })
    container.register(ParameterKeys.ENV_TYPE, { useValue: ENV_TYPE })
    container.register(ParameterKeys.INTERACT_URL, { useValue: INTERACT_URL })
}

export let socket: SocketIOClient.Socket
export const titask = new TiTask()
export const tistage = new TiStage()
export const tiflow = new TiFlow()
export const ticustomer = new TiCustomer()


export function startInteraction(sessionId: string, deviceType: EndPoint, dataInterface: DataInterface) { 
    return new Promise(async (resolve, reject) => {
        try {
            const blks = blocks.filter(x => x.sessionId === sessionId)
            if (blks.length > 0 ) {
                const sessioncontainer = blks[0].container
                // sessioncontainer.registerInstance(ParameterKeys.INTERACT_CONNECT_LISTENER, connectListener)
                // if (sessioncontainer.isRegistered(ParameterKeys.INTERACT_CONNECT_LISTENER)) throw new DIRegisterInstanceException(ErrorMesssages.UNABLE_TO_REGISTER_INTERACT_CONNECT_LISTENER)

                // sessioncontainer.registerInstance(ParameterKeys.INTERACT_DATA_RECEIVER, receiver)
                // if (sessioncontainer.isRegistered(ParameterKeys.INTERACT_DATA_RECEIVER)) throw new DIRegisterInstanceException(ErrorMesssages.UNABLE_TO_REGISTER_INTERACT_DATA_RECEIVER)

                sessioncontainer.registerInstance(ParameterKeys.INTERACT_DATA_INTERFACE, dataInterface)
                if (!sessioncontainer.isRegistered(ParameterKeys.INTERACT_DATA_INTERFACE)) throw new DIRegisterInstanceException(ErrorMesssages.UNABLE_TO_REGISTER_INTERACT_DATA_INTERFACE)

                const interListner = sessioncontainer.resolve(InteractionListener)
                sessioncontainer.registerInstance(ParameterKeys.INTERACT_LISTENER, interListner)
                if (!sessioncontainer.isRegistered(ParameterKeys.INTERACT_LISTENER)) throw new DIRegisterInstanceException(ErrorMesssages.UNABLE_TO_REGISTER_INTERACT_LISTENER)

                //get communication handler and register to container
                const factory: CommunicationFactory = sessioncontainer.resolve(CommunicationFactory)
                const communicationhandler: CommunicationHandler = factory.getCommunicationHandler(Transporter.SOCKET, sessioncontainer, Mode.INTERACTION)!
                sessioncontainer.registerInstance(ParameterKeys.INTERACTION_COMMUNICATION_HANDLER, communicationhandler)
                if (!sessioncontainer.isRegistered(ParameterKeys.INTERACTION_COMMUNICATION_HANDLER)) throw new DIRegisterInstanceException(ErrorMesssages.UNABLE_TO_REGISTER_INTERACTION_COMMUNICATION_HANDLER)

                const interactManager = sessioncontainer.resolve(InteractManager)
                sessioncontainer.registerInstance(ParameterKeys.INTERACT_MANAGER, interactManager)
                if (!sessioncontainer.isRegistered(ParameterKeys.INTERACT_MANAGER)) throw new DIRegisterInstanceException(ErrorMesssages.UNABLE_TO_REGISTER_INTERACT_MANAGER)

                await interactManager.connect()
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            if (!error.code) {
                const errorString = JSON.stringify(error.message, null, 2)
                error = new GenericException(errorString ? errorString : "unable to start interaction")
            }
            reject(error)
        }
    })     
}

export async function sendInteractionData(sessionId: string, data: CommunicationData) {
    try {
        if (!sessionId || sessionId.length === 0) throw new InvalidSessionInfoException()
        if (!data) throw new InvalidPayloadException()
        
        const blks = blocks.filter(x => x.sessionId === sessionId)
        if (blks.length > 0) {
            const sessioncontainer = blks[0].container
            const interactManager = sessioncontainer.resolve(InteractManager)
            await interactManager.broadcastData(data)
        } else { 
            throw new InvalidContainerException()
        }
    } catch (error) {
        if (!error.code) {
            const errorString = JSON.stringify(error.message, null, 2)
            error = new InvalidPayloadException(errorString ? errorString : "")
        }
        return error
    }
}

export function factory<T>(classType: { new(): T }) {
    return new classType();
}

export function startFlow(flowId: String , listener: FlowListener): Promise<SessionInfo>{
    return new Promise(async (resolve, reject) => {
        try {
            if (flowId === undefined || flowId.length === 0) { 
                throw new InvalidInputException(ErrorMesssages.FLOWID_INVALID)
            }
            if (listener === undefined) { 
                throw new InvalidInputException(ErrorMesssages.FLOW_LISTENER_INVALID)
            }
           
            const response = await axios({
                method: 'post',
                url: URL + 'flow/initiate',
                data: { flowId: flowId }
            })
            const sessionInfo: SessionInfo = response.data
            if ((sessionInfo.sessionId && sessionInfo.sessionId.length > 1) &&
                (sessionInfo.channelId && sessionInfo.channelId.length > 1) &&
                (sessionInfo.inviteCode && sessionInfo.inviteCode.length > 1)) {
                await listener.flowUpdate({ type: ServerEvent.SESSION_INFO, data: response.data, time: Date.now() })
                await createFlowManagerForClient(sessionInfo, listener)
                resolve(sessionInfo)
            } else {
                throw new InvalidSessionInfoException()
            }
        } catch (error) {
            if (listener) listener.flowOperationError({ type: TISdkErrorMessages.PROCESSING_ERROR, data: { err: 'unable to process request' }, time: Date.now() })
            if (!error.code) {
                const errorString = JSON.stringify(error.message, null, 2)
                error = new GenericException(errorString?errorString:"")
            }
            reject(error)
        }
    })
}
 
export function createFlowManagerForClient(sessionInfo: SessionInfo, listener: FlowListener): Promise<void> {
    return new Promise(async (resolve, reject) => {
        try {
            if (sessionInfo === undefined || sessionInfo.sessionId.length === 0 || sessionInfo.channelId.length === 0) {
                throw new InvalidInputException(ErrorMesssages.INVALID_SESSION_INFO)
            }
            if (listener === undefined) {
                throw new InvalidInputException(ErrorMesssages.FLOW_LISTENER_INVALID)
            }

            const sessionContainer = await createContainerWithDetails(sessionInfo);

            sessionContainer.registerInstance(ParameterKeys.FLOWLISTENER, listener);
            if (!sessionContainer.isRegistered(ParameterKeys.FLOWLISTENER)) throw new DIRegisterInstanceException(ErrorMesssages.UNABLE_TO_REGISTER_FLOW_LISTENER)

            const util = sessionContainer.resolve(UtilService)
            sessionContainer.registerInstance(ParameterKeys.UTIL, util)

            //get event listener and register to container
            const clientServerEventListener = sessionContainer.resolve<ClientServerEventListener>(ClientServerEventListener)
            sessionContainer.registerInstance(ParameterKeys.EVENTLISTNER, clientServerEventListener)
            if (!sessionContainer.isRegistered(ParameterKeys.EVENTLISTNER)) throw new DIRegisterInstanceException(ErrorMesssages.UNABLE_TO_REGISTER_EVENTLISTENER)
            
            //get communication handler and register to container
            const factory: CommunicationFactory = sessionContainer.resolve(CommunicationFactory)
            const communicationhandler: CommunicationHandler = factory.getCommunicationHandler(Transporter.SOCKET, sessionContainer, Mode.FLOW)!
            sessionContainer.registerInstance(ParameterKeys.COMMUNICATION_HANDLER, communicationhandler)
            if (!sessionContainer.isRegistered(ParameterKeys.COMMUNICATION_HANDLER)) throw new DIRegisterInstanceException(ErrorMesssages.UNABLE_TO_REGISTER_COMMUNICATION_HANDLER)

            //set comm handler for event listener
            clientServerEventListener?.setCommunicationHandler(communicationhandler)

            const manager: FlowManager = sessionContainer.resolve(FlowManager)
            sessionContainer.registerInstance(ParameterKeys.FLOW_MANAGER, manager)
            if (!sessionContainer.isRegistered(ParameterKeys.FLOW_MANAGER)) throw new DIRegisterInstanceException(ErrorMesssages.UNABLE_TO_REGISTER_FLOW_MANAGER)

            await manager.connect()
            blocks.push({
                'sessionId': sessionId,
                'container': sessionContainer,
                'manager': manager
            })
            resolve()
        } catch (error) {
            if (!error.code) {
                const errorString = JSON.stringify(error.message, null, 2)
                error = new GenericException(errorString ? errorString : "")
            }
            reject(error)
        }
    })
}
    /**
     * create DI container with session details
     * 
     */
export function createContainerWithDetails(sessionInfo: SessionInfo):Promise<DependencyContainer> {
            return new Promise((resolve,reject)=>{
                try {
                    //TODO INVALID inpt exp sessin info
                    const sessionContainer = container.createChildContainer();
                    if(!sessionContainer)throw new InvalidContainerException()
                    
                    const initData: DataAddress = {
                        sessionId: sessionInfo.sessionId,
                        channelId: sessionInfo.channelId,
                        deviceType: EndPoint.CLIENT
                    };
                    sessionId = sessionInfo.sessionId;
                    channelId = sessionInfo.channelId;

                    flowChannel = getFlowChannel(sessionId, channelId);
                    interactChannel = getInteractChannel(sessionId, channelId);

                    const sessionData: SessionData = {
                        sessionId: sessionId,
                        channelId: channelId,
                        flowChannel: flowChannel,
                        interactChannel: interactChannel,
                        deviceType: EndPoint.CLIENT
                    }
                    if (!sessionData ||
                        (!sessionData.channelId || sessionData.channelId.length === 0) ||
                        (!sessionData.deviceType || sessionData.deviceType.length === 0) ||
                        (!sessionData.flowChannel || sessionData.flowChannel.length === 0) ||
                        (!sessionData.interactChannel || sessionData.interactChannel.length === 0) ||
                        (!sessionData.sessionId || sessionData.sessionId.length === 0)) { 
                            throw new InvalidSessionInfoException()
                        }
                        
                    sessionContainer.register(ParameterKeys.SESSIONID, { useValue: sessionId });
                    sessionContainer.register(ParameterKeys.INITDATA, { useValue: initData });
                    sessionContainer.register(ParameterKeys.FLOWCHANNEL, { useValue: flowChannel });
                    sessionContainer.register(ParameterKeys.INTERACTCHANNEL, { useValue: interactChannel });
                    sessionContainer.register(ParameterKeys.SESSIONDATA, { useValue: sessionData })
                    if (!sessionContainer.isRegistered(ParameterKeys.SESSIONID) ||
                        !sessionContainer.isRegistered(ParameterKeys.INITDATA) ||
                        !sessionContainer.isRegistered(ParameterKeys.FLOWCHANNEL) ||
                        !sessionContainer.isRegistered(ParameterKeys.INTERACTCHANNEL) ||
                        !sessionContainer.isRegistered(ParameterKeys.SESSIONDATA)
                    ) {
                        throw new DIRegisterInstanceException(ErrorMesssages.UNABLE_TO_REGISTER_SESSION_INFO)
                    }
                     
                    resolve(sessionContainer)
              } catch (error) {
                    if (!error.code) {
                        const errorString = JSON.stringify(error.message, null, 2)
                        error = new GenericException(errorString ? errorString : "unable to create session container")
                    }
                    reject(error)
              }
            })
    }


export function clearSessionData(sessionId:string){
    const index = blocks.findIndex(x => x.sessionId===sessionId)
    if (index > -1) {
        blocks[index].container.reset()
        blocks.splice(index,1)
    }
}

export async function wipeSession(sessionId: string, data?:any) {
    try {
        const index = blocks.findIndex(x => x.sessionId === sessionId)
        if (index > -1) {
            const sessionContainer = blocks[index].container
            if (!sessionContainer) throw new InvalidContainerException()
            const interactionManager: InteractManager = sessionContainer.resolve(ParameterKeys.INTERACT_MANAGER)
            if (!sessionContainer.isRegistered(ParameterKeys.INTERACT_MANAGER)) throw new DIResolveInstanceException(ErrorMesssages.UNABLE_TO_RESOLVE_INTERACT_MANAGER)

            await interactionManager?.interactionIsComplete(data ? data : undefined)

            const flowManager: FlowManager = sessionContainer.resolve(ParameterKeys.FLOW_MANAGER)
            if (!sessionContainer.isRegistered(ParameterKeys.FLOW_MANAGER)) throw new DIResolveInstanceException(ErrorMesssages.UNABLE_TO_RESOLVE_FLOW_MANAGER)
            await flowManager?.flowIsComplete(data ? data : undefined)

            sessionContainer.reset()
            blocks.splice(index, 1)
        }
    } catch (error) {
        if (!error.code) {
            const errorString = JSON.stringify(error.message, null, 2)
            error = new GenericException(errorString ? errorString : "unable to Wipe Session after flow is complete")
        }
    }
}


export function createFlowManagerForCustomer(registerData: any, routeConfig: handler.TiRouteConfig, flowState: FlowState, listener: FlowListener): Promise<void> {
    return new Promise(async (resolve, reject) => {
        try {
            if (registerData === undefined || registerData.sessionId.length === 0 || registerData.customerChannel.length === 0) {
                throw new InvalidInputException(ErrorMesssages.REGISTER_DATA_INVALID)
            }
            if (listener === undefined) {
                throw new InvalidInputException(ErrorMesssages.FLOW_LISTENER_INVALID)
            }
            if (routeConfig === undefined || routeConfig.routes.length===0) {
                throw new InvalidInputException(ErrorMesssages.ROUTE_CONFIG_INVALID)                
            } 
            const sessionContainer = await createContainerWithDetailsForCustomer(registerData);
            if (!sessionContainer) throw new InvalidContainerException()

            sessionContainer.register(ParameterKeys.ROUTECONFIG, { useValue: routeConfig })
            if (!sessionContainer.isRegistered(ParameterKeys.ROUTECONFIG)) throw new DIRegisterInstanceException(ErrorMesssages.UNABLE_TO_REGISTER_ROUTE_CONFIG)

            sessionContainer.register(ParameterKeys.FLOW_STATE, { useValue: flowState })
            if (!sessionContainer.isRegistered(ParameterKeys.FLOW_STATE)) throw new DIRegisterInstanceException(ErrorMesssages.UNABLE_TO_REGISTER_FLOW_STATE)

            const util = sessionContainer.resolve(UtilService)
            sessionContainer.registerInstance(ParameterKeys.UTIL, util)

            sessionContainer.registerInstance(ParameterKeys.FLOWLISTENER, listener);
            if (!sessionContainer.isRegistered(ParameterKeys.FLOWLISTENER)) throw new DIRegisterInstanceException(ErrorMesssages.UNABLE_TO_REGISTER_FLOW_LISTENER)

            const routeHandler = sessionContainer.resolve(RouteHandler)
            sessionContainer.registerInstance(ParameterKeys.ROUTEHANDLER, routeHandler)
            if (!sessionContainer.isRegistered(ParameterKeys.ROUTEHANDLER)) throw new DIRegisterInstanceException(ErrorMesssages.UNABLE_TO_REGISTER_ROUTE_HANDLER)
            await routeHandler.calculateNextTask()

            //get event listener and register to container
            const customerServerEventListener = sessionContainer.resolve<CustomerServerEventListener>(CustomerServerEventListener)
            sessionContainer.registerInstance(ParameterKeys.EVENTLISTNER, customerServerEventListener)
            if (!sessionContainer.isRegistered(ParameterKeys.EVENTLISTNER)) throw new DIRegisterInstanceException(ErrorMesssages.UNABLE_TO_REGISTER_EVENTLISTENER)
            
            //get communication handler and register to container
            const factory: CommunicationFactory = sessionContainer.resolve(CommunicationFactory)
            const communicationhandler: CommunicationHandler = factory.getCommunicationHandler(Transporter.SOCKET, sessionContainer, Mode.FLOW)!
            sessionContainer.registerInstance(ParameterKeys.COMMUNICATION_HANDLER, communicationhandler)
            if (!sessionContainer.isRegistered(ParameterKeys.COMMUNICATION_HANDLER)) throw new DIRegisterInstanceException(ErrorMesssages.UNABLE_TO_REGISTER_COMMUNICATION_HANDLER)

            //set comm handler for event listener
            customerServerEventListener?.setCommunicationHandler(communicationhandler)

            const manager: FlowManager = sessionContainer.resolve(FlowManager)
            sessionContainer.registerInstance(ParameterKeys.FLOW_MANAGER, manager)
            if (!sessionContainer.isRegistered(ParameterKeys.FLOW_MANAGER)) throw new DIRegisterInstanceException(ErrorMesssages.UNABLE_TO_REGISTER_FLOW_MANAGER)

            await manager.connect()
            blocks.push({
                'sessionId': sessionId,
                'container': sessionContainer,
                'manager': manager
            })
            resolve()
        } catch (error) {
            if (!error.code) {
                const errorString = JSON.stringify(error, null, 2)
                error = new GenericException(errorString ? errorString : "unable to create flow manager for customer")
            }
            reject(error)
        }
    })
}
    /**
     * create DI container with session details
     * 
     */
export function createContainerWithDetailsForCustomer(registerData: any): Promise<DependencyContainer> {
            return new Promise((resolve, reject) => {
                try {
                    if (registerData === undefined){
                        throw new InvalidInputException(ErrorMesssages.REGISTER_DATA_INVALID)
                    } 
                    const sessionContainer = container.createChildContainer();
                    //TODO Validate
                    const initData: DataAddress = {
                        sessionId: registerData.sessionId,
                        channelId: registerData.customerChannel,
                        deviceType: EndPoint.CUSTOMER
                    };
                    sessionId = registerData.sessionId;
                    channelId = registerData.customerChannel;

                    flowChannel = getFlowChannel(sessionId, channelId);
                    interactChannel = getInteractChannel(sessionId, channelId);

                    const sessionData: SessionData = {
                        sessionId: sessionId,
                        channelId: channelId,
                        flowChannel: flowChannel,
                        interactChannel: interactChannel,
                        deviceType: EndPoint.CUSTOMER
                    }
                    if (!sessionData ||
                        (!sessionData.channelId || sessionData.channelId.length === 0) ||
                        (!sessionData.deviceType || sessionData.deviceType.length === 0) ||
                        (!sessionData.flowChannel || sessionData.flowChannel.length === 0) ||
                        (!sessionData.interactChannel || sessionData.interactChannel.length === 0) ||
                        (!sessionData.sessionId || sessionData.sessionId.length === 0)) {
                        throw new InvalidSessionInfoException()
                    }

                    sessionContainer.register(ParameterKeys.SESSIONID, { useValue: sessionId });
                    sessionContainer.register(ParameterKeys.INITDATA, { useValue: initData });
                    sessionContainer.register(ParameterKeys.FLOWCHANNEL, { useValue: flowChannel });
                    sessionContainer.register(ParameterKeys.INTERACTCHANNEL, { useValue: interactChannel });
                    sessionContainer.register(ParameterKeys.SESSIONDATA, { useValue: sessionData })
                    if (!sessionContainer.isRegistered(ParameterKeys.SESSIONID) ||
                        !sessionContainer.isRegistered(ParameterKeys.INITDATA) ||
                        !sessionContainer.isRegistered(ParameterKeys.FLOWCHANNEL) ||
                        !sessionContainer.isRegistered(ParameterKeys.INTERACTCHANNEL) ||
                        !sessionContainer.isRegistered(ParameterKeys.SESSIONDATA)
                    ) {
                        throw new DIRegisterInstanceException(ErrorMesssages.UNABLE_TO_REGISTER_SESSION_INFO)
                    }
        
                    resolve(sessionContainer)
              } catch (error) {
                    if (!error.code) {
                        const errorString = JSON.stringify(error.message, null, 2)
                        error = new GenericException(errorString ? errorString : "unable to create session container")
                    }
                    reject(error)
            }
        })    
    }



/**
* Send Task Payload To Server, 
* @param taskPayload task payload which should be output
* @param event flow event - including task related status
*/
export async function sendTaskPayloadToServer(sessionId:string, taskPayload: any, event: CustomerEvent | ClientEvent) {
    const blks = blocks.filter(x => x.sessionId === sessionId)
    if (blks.length > 0) {
        const sessioncontainer = blks[0].container
        const flowManager : FlowManager = sessioncontainer.resolve(ParameterKeys.FLOW_MANAGER)
        await flowManager?.sendTaskPayloadToServer(taskPayload, event)
    }
}

export async function finishFlow(sessionid: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            if (!sessionid || sessionid.length === 0) throw new InvalidInputException(ErrorMesssages.INVALID_SESSION_INFO)

            const response = await axios({
                method: 'post',
                url: URL + 'flow/finish',
                data: { sessionId: sessionid }
            })
            const finishResponse = response.data
            if (finishResponse.isComplete) {
                //we would like to close the interaction channel first
                //and then the flow channel
                const iManager = await getInteractionManager(sessionid)
                await iManager?.interactionIsComplete()

                const manager = await getFlowManager(sessionid) 
                await manager?.flowIsComplete(finishResponse) 
                clearSessionData(sessionid)
                resolve(true)
            } else {
                 resolve(false)
            }
        } catch (error) {
            if (!error.code) {
                const errorString = JSON.stringify(error.message, null, 2)
                error = new GenericException(errorString ? errorString : "")
            }
            reject(error)
        }
    })
}

export async function getFlowManager(sessionId:String)
{
    const blks = blocks.filter(x => x.sessionId === sessionId)
    if (blks.length > 0) {
        const sessioncontainer = blks[0].container
        const flowManager: FlowManager = sessioncontainer.resolve(ParameterKeys.FLOW_MANAGER)
        return flowManager
    }
}


export async function getInteractionManager(sessionId: string) {
    const blks = blocks.filter(x => x.sessionId === sessionId)
    if (blks.length > 0) {
        const sessioncontainer = blks[0].container
        const interactionManager:InteractManager = sessioncontainer.resolve(ParameterKeys.INTERACT_MANAGER)
        return interactionManager
    }
}



export function getFlowChannel(sessionId:string,channelId:string){ 
    return sessionId + '.' + channelId
}


export function getInteractChannel(sessionId: string, channelId: string) {
    return 'comm:' + sessionId + '.' + channelId
}


/**
   * constructs TiRouteConfig based on angular routes
   * implement your custom TiRouteConfig construction in here
   * @param routes angular routes
   */
export function getTiRouteConfig(routes: any,platform: handler.Platform) {
    const rts: handler.TiRoute[] = []
    switch (platform) {
        case handler.Platform.ANGULAR:
            routes.forEach((rt:any) => {
                if (rt.component) {
                    const route: handler.TiRoute = {
                        controllerName: rt.component.name ? rt.component.name : "",
                        path: rt.path
                    }
                    rts.push(route)
                }
            });
            break;

        default:
            break;
    }

    const tiRouteConfig: handler.TiRouteConfig = {
        routes: rts
    }
    console.log('routeconfig' + JSON.stringify(tiRouteConfig))
    return tiRouteConfig
}


export namespace flowanalytics{
    /**
         * we need to update the flow state of the session 
         * as each task is been completed
         * @param flowState FlowState of the session/flow
         */
    export async function updateSessionFlowState(flowState: FlowState) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const sessionContainer = await handler.getSessionContainerFor(sessionId)
                if (sessionContainer) {
                    sessionContainer.register(ParameterKeys.FLOW_STATE, { useValue: flowState })
                }
                resolve()
            } catch (error) {
                reject(error)
            }
        })
    }
}
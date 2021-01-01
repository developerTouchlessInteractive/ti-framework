/// <reference types="socket.io-client" />
import "reflect-metadata";
import { TiTask } from './create/task/ticlient-task';
import { TiStage } from './create/stage/ticlient-stage';
import { TiFlow } from './create/flow/ticlient-flow';
import { TiCustomer } from './flow/ti-customer';
import { CommunicationData, DataInterface, comm_events, Interactor, MessageAckListener, Operations } from "./models/interact.model";
import { CommunicationFactory, CommunicationHandler, DataAddress, EventListener, Transporter } from './flow/transport/transport.protocol.interface';
import { DataType, EndPoint, ResponseData, Route, SessionData, SdkNotificationData } from './models/data.model';
import { ServerEvent, ClientEvent, CustomerEvent } from './flow/flow.events';
import { UtilService } from './utils/ti-util';
import { DependencyContainer } from 'tsyringe';
import { FlowManager } from './flow/flow.manager';
import { ClientServerEventListener } from './flow/event_listeners/client.event.listener';
import { FlowListener } from "./flow/flow.listener";
import { StateHandler, StoreContainerFactory, StoreMethod } from "./flow/store/store.interface";
import { FlowDetails, FlowState, StageState, Task, TaskState, UserAction, UserInput, Stage, Flow, SessionInfo, TaskOrder, Response } from "./models/ti.models";
import { InteractionListener } from "./flow/interaction/interact.listener";
import { InteractManager } from "./flow/interaction/interact.manager";
import { ServerInteractEvent, CustomerInteractEvent, ClientInteractEvent } from "./flow/interaction/interact.events";
export { TaskOrder, CommunicationData, Interactor, FlowListener, ClientServerEventListener, DataType, EndPoint, SessionData, ResponseData, Route, ServerEvent, CustomerEvent, ClientEvent, DataInterface, comm_events, MessageAckListener, Operations, EventListener, CommunicationHandler, DataAddress, CommunicationFactory, Transporter, StateHandler, StoreContainerFactory, SdkNotificationData, StoreMethod, FlowDetails, FlowState, TaskState, StageState, UtilService, Task, UserAction, UserInput, Stage, Flow, InteractionListener, ServerInteractEvent, CustomerInteractEvent, ClientInteractEvent, Response };
export declare namespace handler {
    interface TaskPathHandler {
        uniqueId: string;
        nextTaskPath(path: string): void;
    }
    interface TiRouteConfig {
        routes: TiRoute[];
    }
    interface TiRoute {
        path: string;
        controllerName: string;
    }
    enum Platform {
        ANGULAR = "ANGULAR",
        REACT = "REACT",
        VUE = "VUE"
    }
    function getCurrentTask(sessionId: string): Promise<TaskOrder>;
    function getFlowState(sessionId: string): Promise<FlowState>;
    function isCurrentTask(sessionId: string, uniqueReferenceId: string): Promise<boolean>;
    function beginFlow(): Promise<void>;
    function getSessionContainerFor(sessionId: string): Promise<DependencyContainer | undefined>;
}
export declare namespace util {
    /**
     * getCommunicationData
     * @param data: data for which you would get back communicationData
     * @param sessionId: sessionId
     */
    function getCommunicationData(data: string, sessionId: string): Promise<CommunicationData>;
    function validURL(str: string): boolean;
}
export declare const serverUrl = "http://206.81.3.151:3000/";
export declare const local_serverUrl = "http://localhost:3000/";
export declare const interact_server_endpoint = "http://206.81.3.151:80/interact";
export declare const interact_local_serverUrl = "http://localhost:80/interact";
export declare let sessionId: string;
export declare let channelId: string;
export declare const deviceType = EndPoint.CLIENT;
export declare let flowChannel: string;
export declare let interactChannel: string;
export declare var URL: string;
export declare var INTERACT_URL: string;
export declare var ENV_TYPE: EnvType;
export declare enum EnvType {
    DEBUG = 0,
    PROD = 1
}
export declare function setEnv(serverUrl: string, envType: EnvType, interactServerUrl?: string): void;
export declare type ServerConfig = {
    serverUrl: string;
    envType: EnvType;
    interactServerUrl: string;
};
export declare function setServerEndpoint(config: ServerConfig): void;
export declare let socket: SocketIOClient.Socket;
export declare const titask: TiTask;
export declare const tistage: TiStage;
export declare const tiflow: TiFlow;
export declare const ticustomer: TiCustomer;
export declare function startInteraction(sessionId: string, deviceType: EndPoint, dataInterface: DataInterface): Promise<unknown>;
export declare function sendInteractionData(sessionId: string, data: CommunicationData): Promise<any>;
export declare function factory<T>(classType: {
    new (): T;
}): T;
export declare function startFlow(flowId: String, listener: FlowListener): Promise<SessionInfo>;
export declare function createFlowManagerForClient(sessionInfo: SessionInfo, listener: FlowListener): Promise<void>;
/**
 * create DI container with session details
 *
 */
export declare function createContainerWithDetails(sessionInfo: SessionInfo): Promise<DependencyContainer>;
export declare function clearSessionData(sessionId: string): void;
export declare function wipeSession(sessionId: string, data?: any): Promise<void>;
export declare function createFlowManagerForCustomer(registerData: any, routeConfig: handler.TiRouteConfig, flowState: FlowState, listener: FlowListener): Promise<void>;
/**
 * create DI container with session details
 *
 */
export declare function createContainerWithDetailsForCustomer(registerData: any): Promise<DependencyContainer>;
/**
* Send Task Payload To Server,
* @param taskPayload task payload which should be output
* @param event flow event - including task related status
*/
export declare function sendTaskPayloadToServer(sessionId: string, taskPayload: any, event: CustomerEvent | ClientEvent): Promise<void>;
export declare function finishFlow(sessionid: string): Promise<any>;
export declare function getFlowManager(sessionId: String): Promise<FlowManager | undefined>;
export declare function getInteractionManager(sessionId: string): Promise<InteractManager | undefined>;
export declare function getFlowChannel(sessionId: string, channelId: string): string;
export declare function getInteractChannel(sessionId: string, channelId: string): string;
/**
   * constructs TiRouteConfig based on angular routes
   * implement your custom TiRouteConfig construction in here
   * @param routes angular routes
   */
export declare function getTiRouteConfig(routes: any, platform: handler.Platform): handler.TiRouteConfig;
export declare namespace flowanalytics {
    /**
         * we need to update the flow state of the session
         * as each task is been completed
         * @param flowState FlowState of the session/flow
         */
    function updateSessionFlowState(flowState: FlowState): Promise<void>;
}
//# sourceMappingURL=ti.d.ts.map
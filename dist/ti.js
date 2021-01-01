"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flowanalytics = exports.getTiRouteConfig = exports.getInteractChannel = exports.getFlowChannel = exports.getInteractionManager = exports.getFlowManager = exports.finishFlow = exports.sendTaskPayloadToServer = exports.createContainerWithDetailsForCustomer = exports.createFlowManagerForCustomer = exports.wipeSession = exports.clearSessionData = exports.createContainerWithDetails = exports.createFlowManagerForClient = exports.startFlow = exports.factory = exports.sendInteractionData = exports.startInteraction = exports.ticustomer = exports.tiflow = exports.tistage = exports.titask = exports.socket = exports.setServerEndpoint = exports.setEnv = exports.EnvType = exports.ENV_TYPE = exports.INTERACT_URL = exports.URL = exports.interactChannel = exports.flowChannel = exports.deviceType = exports.channelId = exports.sessionId = exports.interact_local_serverUrl = exports.interact_server_endpoint = exports.local_serverUrl = exports.serverUrl = exports.util = exports.handler = exports.ClientInteractEvent = exports.CustomerInteractEvent = exports.ServerInteractEvent = exports.InteractionListener = exports.UserInput = exports.UserAction = exports.UtilService = exports.StoreMethod = exports.StoreContainerFactory = exports.StateHandler = exports.Transporter = exports.CommunicationFactory = exports.comm_events = exports.ClientEvent = exports.CustomerEvent = exports.ServerEvent = exports.EndPoint = exports.DataType = exports.ClientServerEventListener = void 0;
require("reflect-metadata");
const ticlient_task_1 = require("./create/task/ticlient-task");
const ticlient_stage_1 = require("./create/stage/ticlient-stage");
const ticlient_flow_1 = require("./create/flow/ticlient-flow");
const axios_1 = __importDefault(require("axios"));
const ti_customer_1 = require("./flow/ti-customer");
const interact_model_1 = require("./models/interact.model");
Object.defineProperty(exports, "comm_events", { enumerable: true, get: function () { return interact_model_1.comm_events; } });
const transport_protocol_interface_1 = require("./flow/transport/transport.protocol.interface");
Object.defineProperty(exports, "CommunicationFactory", { enumerable: true, get: function () { return transport_protocol_interface_1.CommunicationFactory; } });
Object.defineProperty(exports, "Transporter", { enumerable: true, get: function () { return transport_protocol_interface_1.Transporter; } });
const data_model_1 = require("./models/data.model");
Object.defineProperty(exports, "DataType", { enumerable: true, get: function () { return data_model_1.DataType; } });
Object.defineProperty(exports, "EndPoint", { enumerable: true, get: function () { return data_model_1.EndPoint; } });
const flow_events_1 = require("./flow/flow.events");
Object.defineProperty(exports, "ServerEvent", { enumerable: true, get: function () { return flow_events_1.ServerEvent; } });
Object.defineProperty(exports, "ClientEvent", { enumerable: true, get: function () { return flow_events_1.ClientEvent; } });
Object.defineProperty(exports, "CustomerEvent", { enumerable: true, get: function () { return flow_events_1.CustomerEvent; } });
const ti_util_1 = require("./utils/ti-util");
Object.defineProperty(exports, "UtilService", { enumerable: true, get: function () { return ti_util_1.UtilService; } });
const tsyringe_1 = require("tsyringe");
const flow_manager_1 = require("./flow/flow.manager");
const client_event_listener_1 = require("./flow/event_listeners/client.event.listener");
Object.defineProperty(exports, "ClientServerEventListener", { enumerable: true, get: function () { return client_event_listener_1.ClientServerEventListener; } });
const injection_index_1 = require("./flow/injection.index");
const store_interface_1 = require("./flow/store/store.interface");
Object.defineProperty(exports, "StateHandler", { enumerable: true, get: function () { return store_interface_1.StateHandler; } });
Object.defineProperty(exports, "StoreContainerFactory", { enumerable: true, get: function () { return store_interface_1.StoreContainerFactory; } });
Object.defineProperty(exports, "StoreMethod", { enumerable: true, get: function () { return store_interface_1.StoreMethod; } });
const ti_models_1 = require("./models/ti.models");
Object.defineProperty(exports, "UserAction", { enumerable: true, get: function () { return ti_models_1.UserAction; } });
Object.defineProperty(exports, "UserInput", { enumerable: true, get: function () { return ti_models_1.UserInput; } });
const customer_event_listener_1 = require("./flow/event_listeners/customer.event.listener");
const ti_errors_1 = require("./errors/ti.errors");
const interact_listener_1 = require("./flow/interaction/interact.listener");
Object.defineProperty(exports, "InteractionListener", { enumerable: true, get: function () { return interact_listener_1.InteractionListener; } });
const interact_manager_1 = require("./flow/interaction/interact.manager");
const route_handler_1 = require("./flow/route.handler");
const interact_events_1 = require("./flow/interaction/interact.events");
Object.defineProperty(exports, "ServerInteractEvent", { enumerable: true, get: function () { return interact_events_1.ServerInteractEvent; } });
Object.defineProperty(exports, "CustomerInteractEvent", { enumerable: true, get: function () { return interact_events_1.CustomerInteractEvent; } });
Object.defineProperty(exports, "ClientInteractEvent", { enumerable: true, get: function () { return interact_events_1.ClientInteractEvent; } });
var handler;
(function (handler) {
    let Platform;
    (function (Platform) {
        Platform["ANGULAR"] = "ANGULAR";
        Platform["REACT"] = "REACT";
        Platform["VUE"] = "VUE";
    })(Platform = handler.Platform || (handler.Platform = {}));
    function getCurrentTask(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const sessionContainer = yield getSessionContainerFor(sessionId);
                    if (sessionContainer) {
                        const routeHandler = sessionContainer.resolve(injection_index_1.ParameterKeys.ROUTEHANDLER);
                        resolve(routeHandler.getCurrentTask());
                    }
                }
                catch (error) {
                    reject();
                }
            }));
        });
    }
    handler.getCurrentTask = getCurrentTask;
    function getFlowState(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const sessionContainer = yield getSessionContainerFor(sessionId);
                    if (sessionContainer) {
                        const flowState = sessionContainer.resolve(injection_index_1.ParameterKeys.FLOW_STATE);
                        resolve(flowState);
                    }
                }
                catch (error) {
                    reject();
                }
            }));
        });
    }
    handler.getFlowState = getFlowState;
    function isCurrentTask(sessionId, uniqueReferenceId) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const sessionContainer = yield getSessionContainerFor(sessionId);
                if (sessionContainer) {
                    const routeHandler = sessionContainer.resolve(injection_index_1.ParameterKeys.ROUTEHANDLER);
                    if (routeHandler.isCurrentTask(uniqueReferenceId)) {
                        resolve(true);
                    }
                    resolve(false);
                }
            }
            catch (error) {
                reject();
            }
        }));
    }
    handler.isCurrentTask = isCurrentTask;
    function beginFlow() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const sessionContainer = yield getSessionContainerFor(exports.sessionId);
                if (sessionContainer) {
                    const routeHandler = sessionContainer.resolve(injection_index_1.ParameterKeys.ROUTEHANDLER);
                    yield routeHandler.calculateNextTask();
                    resolve();
                }
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    handler.beginFlow = beginFlow;
    function getSessionContainerFor(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const blks = blocks.filter(x => x.sessionId === sessionId);
            if (blks.length > 0) {
                const sessioncontainer = blks[0].container;
                return sessioncontainer;
            }
        });
    }
    handler.getSessionContainerFor = getSessionContainerFor;
})(handler = exports.handler || (exports.handler = {}));
var util;
(function (util_1) {
    /**
     * getCommunicationData
     * @param data: data for which you would get back communicationData
     * @param sessionId: sessionId
     */
    function getCommunicationData(data, sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const sessionContainer = yield handler.getSessionContainerFor(sessionId);
                    if (sessionContainer) {
                        const util = sessionContainer.resolve(injection_index_1.ParameterKeys.UTIL);
                        const commdata = yield util.getCommunicationData(data);
                        resolve(commdata);
                    }
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    util_1.getCommunicationData = getCommunicationData;
    function validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'); // fragment locator
        return !!pattern.test(str);
    }
    util_1.validURL = validURL;
})(util = exports.util || (exports.util = {}));
exports.serverUrl = 'http://206.81.3.151:3000/';
exports.local_serverUrl = 'http://localhost:3000/';
exports.interact_server_endpoint = 'http://206.81.3.151:80/interact';
exports.interact_local_serverUrl = 'http://localhost:80/interact';
exports.deviceType = data_model_1.EndPoint.CLIENT;
let blocks = [];
var EnvType;
(function (EnvType) {
    EnvType[EnvType["DEBUG"] = 0] = "DEBUG";
    EnvType[EnvType["PROD"] = 1] = "PROD";
})(EnvType = exports.EnvType || (exports.EnvType = {}));
function setEnv(serverUrl, envType, interactServerUrl) {
    exports.URL = serverUrl;
    if (envType === EnvType.DEBUG) {
        tsyringe_1.container.register(injection_index_1.ParameterKeys.URL, { useValue: exports.URL });
        tsyringe_1.container.register(injection_index_1.ParameterKeys.INTERACT_URL, { useValue: exports.interact_local_serverUrl });
    }
    else {
        exports.URL = serverUrl;
        tsyringe_1.container.register(injection_index_1.ParameterKeys.URL, { useValue: serverUrl });
        tsyringe_1.container.register(injection_index_1.ParameterKeys.INTERACT_URL, { useValue: exports.interact_server_endpoint });
    }
}
exports.setEnv = setEnv;
function setServerEndpoint(config) {
    if (config.serverUrl === undefined || config.serverUrl.length === 0) {
        throw new Error("please enter a valid server url");
    }
    if (config.interactServerUrl === undefined || config.interactServerUrl.length === 0) {
        throw new Error("please enter a valid interact server url");
    }
    if (config.envType === undefined) {
        throw new Error("invalid config type");
    }
    if (config.serverUrl.charAt(config.serverUrl.length - 1) !== '/') {
        exports.URL = config.serverUrl + '/';
    }
    else {
        exports.URL = config.serverUrl;
    }
    exports.INTERACT_URL = config.interactServerUrl;
    exports.ENV_TYPE = config.envType;
    tsyringe_1.container.register(injection_index_1.ParameterKeys.URL, { useValue: exports.URL });
    tsyringe_1.container.register(injection_index_1.ParameterKeys.ENV_TYPE, { useValue: exports.ENV_TYPE });
    tsyringe_1.container.register(injection_index_1.ParameterKeys.INTERACT_URL, { useValue: exports.INTERACT_URL });
}
exports.setServerEndpoint = setServerEndpoint;
exports.titask = new ticlient_task_1.TiTask();
exports.tistage = new ticlient_stage_1.TiStage();
exports.tiflow = new ticlient_flow_1.TiFlow();
exports.ticustomer = new ti_customer_1.TiCustomer();
function startInteraction(sessionId, deviceType, dataInterface) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const blks = blocks.filter(x => x.sessionId === sessionId);
            if (blks.length > 0) {
                const sessioncontainer = blks[0].container;
                // sessioncontainer.registerInstance(ParameterKeys.INTERACT_CONNECT_LISTENER, connectListener)
                // if (sessioncontainer.isRegistered(ParameterKeys.INTERACT_CONNECT_LISTENER)) throw new DIRegisterInstanceException(ErrorMesssages.UNABLE_TO_REGISTER_INTERACT_CONNECT_LISTENER)
                // sessioncontainer.registerInstance(ParameterKeys.INTERACT_DATA_RECEIVER, receiver)
                // if (sessioncontainer.isRegistered(ParameterKeys.INTERACT_DATA_RECEIVER)) throw new DIRegisterInstanceException(ErrorMesssages.UNABLE_TO_REGISTER_INTERACT_DATA_RECEIVER)
                sessioncontainer.registerInstance(injection_index_1.ParameterKeys.INTERACT_DATA_INTERFACE, dataInterface);
                if (!sessioncontainer.isRegistered(injection_index_1.ParameterKeys.INTERACT_DATA_INTERFACE))
                    throw new ti_errors_1.DIRegisterInstanceException(ti_errors_1.ErrorMesssages.UNABLE_TO_REGISTER_INTERACT_DATA_INTERFACE);
                const interListner = sessioncontainer.resolve(interact_listener_1.InteractionListener);
                sessioncontainer.registerInstance(injection_index_1.ParameterKeys.INTERACT_LISTENER, interListner);
                if (!sessioncontainer.isRegistered(injection_index_1.ParameterKeys.INTERACT_LISTENER))
                    throw new ti_errors_1.DIRegisterInstanceException(ti_errors_1.ErrorMesssages.UNABLE_TO_REGISTER_INTERACT_LISTENER);
                //get communication handler and register to container
                const factory = sessioncontainer.resolve(transport_protocol_interface_1.CommunicationFactory);
                const communicationhandler = factory.getCommunicationHandler(transport_protocol_interface_1.Transporter.SOCKET, sessioncontainer, transport_protocol_interface_1.Mode.INTERACTION);
                sessioncontainer.registerInstance(injection_index_1.ParameterKeys.INTERACTION_COMMUNICATION_HANDLER, communicationhandler);
                if (!sessioncontainer.isRegistered(injection_index_1.ParameterKeys.INTERACTION_COMMUNICATION_HANDLER))
                    throw new ti_errors_1.DIRegisterInstanceException(ti_errors_1.ErrorMesssages.UNABLE_TO_REGISTER_INTERACTION_COMMUNICATION_HANDLER);
                const interactManager = sessioncontainer.resolve(interact_manager_1.InteractManager);
                sessioncontainer.registerInstance(injection_index_1.ParameterKeys.INTERACT_MANAGER, interactManager);
                if (!sessioncontainer.isRegistered(injection_index_1.ParameterKeys.INTERACT_MANAGER))
                    throw new ti_errors_1.DIRegisterInstanceException(ti_errors_1.ErrorMesssages.UNABLE_TO_REGISTER_INTERACT_MANAGER);
                yield interactManager.connect();
                resolve(true);
            }
            else {
                resolve(false);
            }
        }
        catch (error) {
            if (!error.code) {
                const errorString = JSON.stringify(error.message, null, 2);
                error = new ti_errors_1.GenericException(errorString ? errorString : "unable to start interaction");
            }
            reject(error);
        }
    }));
}
exports.startInteraction = startInteraction;
function sendInteractionData(sessionId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!sessionId || sessionId.length === 0)
                throw new ti_errors_1.InvalidSessionInfoException();
            if (!data)
                throw new ti_errors_1.InvalidPayloadException();
            const blks = blocks.filter(x => x.sessionId === sessionId);
            if (blks.length > 0) {
                const sessioncontainer = blks[0].container;
                const interactManager = sessioncontainer.resolve(interact_manager_1.InteractManager);
                yield interactManager.broadcastData(data);
            }
            else {
                throw new ti_errors_1.InvalidContainerException();
            }
        }
        catch (error) {
            if (!error.code) {
                const errorString = JSON.stringify(error.message, null, 2);
                error = new ti_errors_1.InvalidPayloadException(errorString ? errorString : "");
            }
            return error;
        }
    });
}
exports.sendInteractionData = sendInteractionData;
function factory(classType) {
    return new classType();
}
exports.factory = factory;
function startFlow(flowId, listener) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (flowId === undefined || flowId.length === 0) {
                throw new ti_errors_1.InvalidInputException(ti_errors_1.ErrorMesssages.FLOWID_INVALID);
            }
            if (listener === undefined) {
                throw new ti_errors_1.InvalidInputException(ti_errors_1.ErrorMesssages.FLOW_LISTENER_INVALID);
            }
            const response = yield axios_1.default({
                method: 'post',
                url: exports.URL + 'flow/initiate',
                data: { flowId: flowId }
            });
            const sessionInfo = response.data;
            if ((sessionInfo.sessionId && sessionInfo.sessionId.length > 1) &&
                (sessionInfo.channelId && sessionInfo.channelId.length > 1) &&
                (sessionInfo.inviteCode && sessionInfo.inviteCode.length > 1)) {
                yield listener.flowUpdate({ type: flow_events_1.ServerEvent.SESSION_INFO, data: response.data, time: Date.now() });
                yield createFlowManagerForClient(sessionInfo, listener);
                resolve(sessionInfo);
            }
            else {
                throw new ti_errors_1.InvalidSessionInfoException();
            }
        }
        catch (error) {
            if (listener)
                listener.flowOperationError({ type: flow_events_1.TISdkErrorMessages.PROCESSING_ERROR, data: { err: 'unable to process request' }, time: Date.now() });
            if (!error.code) {
                const errorString = JSON.stringify(error.message, null, 2);
                error = new ti_errors_1.GenericException(errorString ? errorString : "");
            }
            reject(error);
        }
    }));
}
exports.startFlow = startFlow;
function createFlowManagerForClient(sessionInfo, listener) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (sessionInfo === undefined || sessionInfo.sessionId.length === 0 || sessionInfo.channelId.length === 0) {
                throw new ti_errors_1.InvalidInputException(ti_errors_1.ErrorMesssages.INVALID_SESSION_INFO);
            }
            if (listener === undefined) {
                throw new ti_errors_1.InvalidInputException(ti_errors_1.ErrorMesssages.FLOW_LISTENER_INVALID);
            }
            const sessionContainer = yield createContainerWithDetails(sessionInfo);
            sessionContainer.registerInstance(injection_index_1.ParameterKeys.FLOWLISTENER, listener);
            if (!sessionContainer.isRegistered(injection_index_1.ParameterKeys.FLOWLISTENER))
                throw new ti_errors_1.DIRegisterInstanceException(ti_errors_1.ErrorMesssages.UNABLE_TO_REGISTER_FLOW_LISTENER);
            const util = sessionContainer.resolve(ti_util_1.UtilService);
            sessionContainer.registerInstance(injection_index_1.ParameterKeys.UTIL, util);
            //get event listener and register to container
            const clientServerEventListener = sessionContainer.resolve(client_event_listener_1.ClientServerEventListener);
            sessionContainer.registerInstance(injection_index_1.ParameterKeys.EVENTLISTNER, clientServerEventListener);
            if (!sessionContainer.isRegistered(injection_index_1.ParameterKeys.EVENTLISTNER))
                throw new ti_errors_1.DIRegisterInstanceException(ti_errors_1.ErrorMesssages.UNABLE_TO_REGISTER_EVENTLISTENER);
            //get communication handler and register to container
            const factory = sessionContainer.resolve(transport_protocol_interface_1.CommunicationFactory);
            const communicationhandler = factory.getCommunicationHandler(transport_protocol_interface_1.Transporter.SOCKET, sessionContainer, transport_protocol_interface_1.Mode.FLOW);
            sessionContainer.registerInstance(injection_index_1.ParameterKeys.COMMUNICATION_HANDLER, communicationhandler);
            if (!sessionContainer.isRegistered(injection_index_1.ParameterKeys.COMMUNICATION_HANDLER))
                throw new ti_errors_1.DIRegisterInstanceException(ti_errors_1.ErrorMesssages.UNABLE_TO_REGISTER_COMMUNICATION_HANDLER);
            //set comm handler for event listener
            clientServerEventListener === null || clientServerEventListener === void 0 ? void 0 : clientServerEventListener.setCommunicationHandler(communicationhandler);
            const manager = sessionContainer.resolve(flow_manager_1.FlowManager);
            sessionContainer.registerInstance(injection_index_1.ParameterKeys.FLOW_MANAGER, manager);
            if (!sessionContainer.isRegistered(injection_index_1.ParameterKeys.FLOW_MANAGER))
                throw new ti_errors_1.DIRegisterInstanceException(ti_errors_1.ErrorMesssages.UNABLE_TO_REGISTER_FLOW_MANAGER);
            yield manager.connect();
            blocks.push({
                'sessionId': exports.sessionId,
                'container': sessionContainer,
                'manager': manager
            });
            resolve();
        }
        catch (error) {
            if (!error.code) {
                const errorString = JSON.stringify(error.message, null, 2);
                error = new ti_errors_1.GenericException(errorString ? errorString : "");
            }
            reject(error);
        }
    }));
}
exports.createFlowManagerForClient = createFlowManagerForClient;
/**
 * create DI container with session details
 *
 */
function createContainerWithDetails(sessionInfo) {
    return new Promise((resolve, reject) => {
        try {
            //TODO INVALID inpt exp sessin info
            const sessionContainer = tsyringe_1.container.createChildContainer();
            if (!sessionContainer)
                throw new ti_errors_1.InvalidContainerException();
            const initData = {
                sessionId: sessionInfo.sessionId,
                channelId: sessionInfo.channelId,
                deviceType: data_model_1.EndPoint.CLIENT
            };
            exports.sessionId = sessionInfo.sessionId;
            exports.channelId = sessionInfo.channelId;
            exports.flowChannel = getFlowChannel(exports.sessionId, exports.channelId);
            exports.interactChannel = getInteractChannel(exports.sessionId, exports.channelId);
            const sessionData = {
                sessionId: exports.sessionId,
                channelId: exports.channelId,
                flowChannel: exports.flowChannel,
                interactChannel: exports.interactChannel,
                deviceType: data_model_1.EndPoint.CLIENT
            };
            if (!sessionData ||
                (!sessionData.channelId || sessionData.channelId.length === 0) ||
                (!sessionData.deviceType || sessionData.deviceType.length === 0) ||
                (!sessionData.flowChannel || sessionData.flowChannel.length === 0) ||
                (!sessionData.interactChannel || sessionData.interactChannel.length === 0) ||
                (!sessionData.sessionId || sessionData.sessionId.length === 0)) {
                throw new ti_errors_1.InvalidSessionInfoException();
            }
            sessionContainer.register(injection_index_1.ParameterKeys.SESSIONID, { useValue: exports.sessionId });
            sessionContainer.register(injection_index_1.ParameterKeys.INITDATA, { useValue: initData });
            sessionContainer.register(injection_index_1.ParameterKeys.FLOWCHANNEL, { useValue: exports.flowChannel });
            sessionContainer.register(injection_index_1.ParameterKeys.INTERACTCHANNEL, { useValue: exports.interactChannel });
            sessionContainer.register(injection_index_1.ParameterKeys.SESSIONDATA, { useValue: sessionData });
            if (!sessionContainer.isRegistered(injection_index_1.ParameterKeys.SESSIONID) ||
                !sessionContainer.isRegistered(injection_index_1.ParameterKeys.INITDATA) ||
                !sessionContainer.isRegistered(injection_index_1.ParameterKeys.FLOWCHANNEL) ||
                !sessionContainer.isRegistered(injection_index_1.ParameterKeys.INTERACTCHANNEL) ||
                !sessionContainer.isRegistered(injection_index_1.ParameterKeys.SESSIONDATA)) {
                throw new ti_errors_1.DIRegisterInstanceException(ti_errors_1.ErrorMesssages.UNABLE_TO_REGISTER_SESSION_INFO);
            }
            resolve(sessionContainer);
        }
        catch (error) {
            if (!error.code) {
                const errorString = JSON.stringify(error.message, null, 2);
                error = new ti_errors_1.GenericException(errorString ? errorString : "unable to create session container");
            }
            reject(error);
        }
    });
}
exports.createContainerWithDetails = createContainerWithDetails;
function clearSessionData(sessionId) {
    const index = blocks.findIndex(x => x.sessionId === sessionId);
    if (index > -1) {
        blocks[index].container.reset();
        blocks.splice(index, 1);
    }
}
exports.clearSessionData = clearSessionData;
function wipeSession(sessionId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const index = blocks.findIndex(x => x.sessionId === sessionId);
            if (index > -1) {
                const sessionContainer = blocks[index].container;
                if (!sessionContainer)
                    throw new ti_errors_1.InvalidContainerException();
                const interactionManager = sessionContainer.resolve(injection_index_1.ParameterKeys.INTERACT_MANAGER);
                if (!sessionContainer.isRegistered(injection_index_1.ParameterKeys.INTERACT_MANAGER))
                    throw new ti_errors_1.DIResolveInstanceException(ti_errors_1.ErrorMesssages.UNABLE_TO_RESOLVE_INTERACT_MANAGER);
                yield (interactionManager === null || interactionManager === void 0 ? void 0 : interactionManager.interactionIsComplete(data ? data : undefined));
                const flowManager = sessionContainer.resolve(injection_index_1.ParameterKeys.FLOW_MANAGER);
                if (!sessionContainer.isRegistered(injection_index_1.ParameterKeys.FLOW_MANAGER))
                    throw new ti_errors_1.DIResolveInstanceException(ti_errors_1.ErrorMesssages.UNABLE_TO_RESOLVE_FLOW_MANAGER);
                yield (flowManager === null || flowManager === void 0 ? void 0 : flowManager.flowIsComplete(data ? data : undefined));
                sessionContainer.reset();
                blocks.splice(index, 1);
            }
        }
        catch (error) {
            if (!error.code) {
                const errorString = JSON.stringify(error.message, null, 2);
                error = new ti_errors_1.GenericException(errorString ? errorString : "unable to Wipe Session after flow is complete");
            }
        }
    });
}
exports.wipeSession = wipeSession;
function createFlowManagerForCustomer(registerData, routeConfig, flowState, listener) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (registerData === undefined || registerData.sessionId.length === 0 || registerData.customerChannel.length === 0) {
                throw new ti_errors_1.InvalidInputException(ti_errors_1.ErrorMesssages.REGISTER_DATA_INVALID);
            }
            if (listener === undefined) {
                throw new ti_errors_1.InvalidInputException(ti_errors_1.ErrorMesssages.FLOW_LISTENER_INVALID);
            }
            if (routeConfig === undefined || routeConfig.routes.length === 0) {
                throw new ti_errors_1.InvalidInputException(ti_errors_1.ErrorMesssages.ROUTE_CONFIG_INVALID);
            }
            const sessionContainer = yield createContainerWithDetailsForCustomer(registerData);
            if (!sessionContainer)
                throw new ti_errors_1.InvalidContainerException();
            sessionContainer.register(injection_index_1.ParameterKeys.ROUTECONFIG, { useValue: routeConfig });
            if (!sessionContainer.isRegistered(injection_index_1.ParameterKeys.ROUTECONFIG))
                throw new ti_errors_1.DIRegisterInstanceException(ti_errors_1.ErrorMesssages.UNABLE_TO_REGISTER_ROUTE_CONFIG);
            sessionContainer.register(injection_index_1.ParameterKeys.FLOW_STATE, { useValue: flowState });
            if (!sessionContainer.isRegistered(injection_index_1.ParameterKeys.FLOW_STATE))
                throw new ti_errors_1.DIRegisterInstanceException(ti_errors_1.ErrorMesssages.UNABLE_TO_REGISTER_FLOW_STATE);
            const util = sessionContainer.resolve(ti_util_1.UtilService);
            sessionContainer.registerInstance(injection_index_1.ParameterKeys.UTIL, util);
            sessionContainer.registerInstance(injection_index_1.ParameterKeys.FLOWLISTENER, listener);
            if (!sessionContainer.isRegistered(injection_index_1.ParameterKeys.FLOWLISTENER))
                throw new ti_errors_1.DIRegisterInstanceException(ti_errors_1.ErrorMesssages.UNABLE_TO_REGISTER_FLOW_LISTENER);
            const routeHandler = sessionContainer.resolve(route_handler_1.RouteHandler);
            sessionContainer.registerInstance(injection_index_1.ParameterKeys.ROUTEHANDLER, routeHandler);
            if (!sessionContainer.isRegistered(injection_index_1.ParameterKeys.ROUTEHANDLER))
                throw new ti_errors_1.DIRegisterInstanceException(ti_errors_1.ErrorMesssages.UNABLE_TO_REGISTER_ROUTE_HANDLER);
            yield routeHandler.calculateNextTask();
            //get event listener and register to container
            const customerServerEventListener = sessionContainer.resolve(customer_event_listener_1.CustomerServerEventListener);
            sessionContainer.registerInstance(injection_index_1.ParameterKeys.EVENTLISTNER, customerServerEventListener);
            if (!sessionContainer.isRegistered(injection_index_1.ParameterKeys.EVENTLISTNER))
                throw new ti_errors_1.DIRegisterInstanceException(ti_errors_1.ErrorMesssages.UNABLE_TO_REGISTER_EVENTLISTENER);
            //get communication handler and register to container
            const factory = sessionContainer.resolve(transport_protocol_interface_1.CommunicationFactory);
            const communicationhandler = factory.getCommunicationHandler(transport_protocol_interface_1.Transporter.SOCKET, sessionContainer, transport_protocol_interface_1.Mode.FLOW);
            sessionContainer.registerInstance(injection_index_1.ParameterKeys.COMMUNICATION_HANDLER, communicationhandler);
            if (!sessionContainer.isRegistered(injection_index_1.ParameterKeys.COMMUNICATION_HANDLER))
                throw new ti_errors_1.DIRegisterInstanceException(ti_errors_1.ErrorMesssages.UNABLE_TO_REGISTER_COMMUNICATION_HANDLER);
            //set comm handler for event listener
            customerServerEventListener === null || customerServerEventListener === void 0 ? void 0 : customerServerEventListener.setCommunicationHandler(communicationhandler);
            const manager = sessionContainer.resolve(flow_manager_1.FlowManager);
            sessionContainer.registerInstance(injection_index_1.ParameterKeys.FLOW_MANAGER, manager);
            if (!sessionContainer.isRegistered(injection_index_1.ParameterKeys.FLOW_MANAGER))
                throw new ti_errors_1.DIRegisterInstanceException(ti_errors_1.ErrorMesssages.UNABLE_TO_REGISTER_FLOW_MANAGER);
            yield manager.connect();
            blocks.push({
                'sessionId': exports.sessionId,
                'container': sessionContainer,
                'manager': manager
            });
            resolve();
        }
        catch (error) {
            if (!error.code) {
                const errorString = JSON.stringify(error, null, 2);
                error = new ti_errors_1.GenericException(errorString ? errorString : "unable to create flow manager for customer");
            }
            reject(error);
        }
    }));
}
exports.createFlowManagerForCustomer = createFlowManagerForCustomer;
/**
 * create DI container with session details
 *
 */
function createContainerWithDetailsForCustomer(registerData) {
    return new Promise((resolve, reject) => {
        try {
            if (registerData === undefined) {
                throw new ti_errors_1.InvalidInputException(ti_errors_1.ErrorMesssages.REGISTER_DATA_INVALID);
            }
            const sessionContainer = tsyringe_1.container.createChildContainer();
            //TODO Validate
            const initData = {
                sessionId: registerData.sessionId,
                channelId: registerData.customerChannel,
                deviceType: data_model_1.EndPoint.CUSTOMER
            };
            exports.sessionId = registerData.sessionId;
            exports.channelId = registerData.customerChannel;
            exports.flowChannel = getFlowChannel(exports.sessionId, exports.channelId);
            exports.interactChannel = getInteractChannel(exports.sessionId, exports.channelId);
            const sessionData = {
                sessionId: exports.sessionId,
                channelId: exports.channelId,
                flowChannel: exports.flowChannel,
                interactChannel: exports.interactChannel,
                deviceType: data_model_1.EndPoint.CUSTOMER
            };
            if (!sessionData ||
                (!sessionData.channelId || sessionData.channelId.length === 0) ||
                (!sessionData.deviceType || sessionData.deviceType.length === 0) ||
                (!sessionData.flowChannel || sessionData.flowChannel.length === 0) ||
                (!sessionData.interactChannel || sessionData.interactChannel.length === 0) ||
                (!sessionData.sessionId || sessionData.sessionId.length === 0)) {
                throw new ti_errors_1.InvalidSessionInfoException();
            }
            sessionContainer.register(injection_index_1.ParameterKeys.SESSIONID, { useValue: exports.sessionId });
            sessionContainer.register(injection_index_1.ParameterKeys.INITDATA, { useValue: initData });
            sessionContainer.register(injection_index_1.ParameterKeys.FLOWCHANNEL, { useValue: exports.flowChannel });
            sessionContainer.register(injection_index_1.ParameterKeys.INTERACTCHANNEL, { useValue: exports.interactChannel });
            sessionContainer.register(injection_index_1.ParameterKeys.SESSIONDATA, { useValue: sessionData });
            if (!sessionContainer.isRegistered(injection_index_1.ParameterKeys.SESSIONID) ||
                !sessionContainer.isRegistered(injection_index_1.ParameterKeys.INITDATA) ||
                !sessionContainer.isRegistered(injection_index_1.ParameterKeys.FLOWCHANNEL) ||
                !sessionContainer.isRegistered(injection_index_1.ParameterKeys.INTERACTCHANNEL) ||
                !sessionContainer.isRegistered(injection_index_1.ParameterKeys.SESSIONDATA)) {
                throw new ti_errors_1.DIRegisterInstanceException(ti_errors_1.ErrorMesssages.UNABLE_TO_REGISTER_SESSION_INFO);
            }
            resolve(sessionContainer);
        }
        catch (error) {
            if (!error.code) {
                const errorString = JSON.stringify(error.message, null, 2);
                error = new ti_errors_1.GenericException(errorString ? errorString : "unable to create session container");
            }
            reject(error);
        }
    });
}
exports.createContainerWithDetailsForCustomer = createContainerWithDetailsForCustomer;
/**
* Send Task Payload To Server,
* @param taskPayload task payload which should be output
* @param event flow event - including task related status
*/
function sendTaskPayloadToServer(sessionId, taskPayload, event) {
    return __awaiter(this, void 0, void 0, function* () {
        const blks = blocks.filter(x => x.sessionId === sessionId);
        if (blks.length > 0) {
            const sessioncontainer = blks[0].container;
            const flowManager = sessioncontainer.resolve(injection_index_1.ParameterKeys.FLOW_MANAGER);
            yield (flowManager === null || flowManager === void 0 ? void 0 : flowManager.sendTaskPayloadToServer(taskPayload, event));
        }
    });
}
exports.sendTaskPayloadToServer = sendTaskPayloadToServer;
function finishFlow(sessionid) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!sessionid || sessionid.length === 0)
                    throw new ti_errors_1.InvalidInputException(ti_errors_1.ErrorMesssages.INVALID_SESSION_INFO);
                const response = yield axios_1.default({
                    method: 'post',
                    url: exports.URL + 'flow/finish',
                    data: { sessionId: sessionid }
                });
                const finishResponse = response.data;
                if (finishResponse.isComplete) {
                    //we would like to close the interaction channel first
                    //and then the flow channel
                    const iManager = yield getInteractionManager(sessionid);
                    yield (iManager === null || iManager === void 0 ? void 0 : iManager.interactionIsComplete());
                    const manager = yield getFlowManager(sessionid);
                    yield (manager === null || manager === void 0 ? void 0 : manager.flowIsComplete(finishResponse));
                    clearSessionData(sessionid);
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }
            catch (error) {
                if (!error.code) {
                    const errorString = JSON.stringify(error.message, null, 2);
                    error = new ti_errors_1.GenericException(errorString ? errorString : "");
                }
                reject(error);
            }
        }));
    });
}
exports.finishFlow = finishFlow;
function getFlowManager(sessionId) {
    return __awaiter(this, void 0, void 0, function* () {
        const blks = blocks.filter(x => x.sessionId === sessionId);
        if (blks.length > 0) {
            const sessioncontainer = blks[0].container;
            const flowManager = sessioncontainer.resolve(injection_index_1.ParameterKeys.FLOW_MANAGER);
            return flowManager;
        }
    });
}
exports.getFlowManager = getFlowManager;
function getInteractionManager(sessionId) {
    return __awaiter(this, void 0, void 0, function* () {
        const blks = blocks.filter(x => x.sessionId === sessionId);
        if (blks.length > 0) {
            const sessioncontainer = blks[0].container;
            const interactionManager = sessioncontainer.resolve(injection_index_1.ParameterKeys.INTERACT_MANAGER);
            return interactionManager;
        }
    });
}
exports.getInteractionManager = getInteractionManager;
function getFlowChannel(sessionId, channelId) {
    return sessionId + '.' + channelId;
}
exports.getFlowChannel = getFlowChannel;
function getInteractChannel(sessionId, channelId) {
    return 'comm:' + sessionId + '.' + channelId;
}
exports.getInteractChannel = getInteractChannel;
/**
   * constructs TiRouteConfig based on angular routes
   * implement your custom TiRouteConfig construction in here
   * @param routes angular routes
   */
function getTiRouteConfig(routes, platform) {
    const rts = [];
    switch (platform) {
        case handler.Platform.ANGULAR:
            routes.forEach((rt) => {
                if (rt.component) {
                    const route = {
                        controllerName: rt.component.name ? rt.component.name : "",
                        path: rt.path
                    };
                    rts.push(route);
                }
            });
            break;
        default:
            break;
    }
    const tiRouteConfig = {
        routes: rts
    };
    console.log('routeconfig' + JSON.stringify(tiRouteConfig));
    return tiRouteConfig;
}
exports.getTiRouteConfig = getTiRouteConfig;
var flowanalytics;
(function (flowanalytics) {
    /**
         * we need to update the flow state of the session
         * as each task is been completed
         * @param flowState FlowState of the session/flow
         */
    function updateSessionFlowState(flowState) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const sessionContainer = yield handler.getSessionContainerFor(exports.sessionId);
                    if (sessionContainer) {
                        sessionContainer.register(injection_index_1.ParameterKeys.FLOW_STATE, { useValue: flowState });
                    }
                    resolve();
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    flowanalytics.updateSessionFlowState = updateSessionFlowState;
})(flowanalytics = exports.flowanalytics || (exports.flowanalytics = {}));
//# sourceMappingURL=ti.js.map
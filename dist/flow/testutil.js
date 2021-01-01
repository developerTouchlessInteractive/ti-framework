"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEventListener = exports.TestFlowListener = exports.TestUtil = void 0;
const tsyringe_1 = require("tsyringe");
const injection_index_1 = require("./injection.index");
const ti_1 = require("../ti");
const transport_protocol_interface_1 = require("../flow/transport/transport.protocol.interface");
const ti = __importStar(require("../ti"));
let TestUtil = class TestUtil {
    constructor() {
        this.registerData = {
            sessionId: 'testSessionId',
            customerChannel: 'testChannelId'
        };
        this.sessionInfo = {
            sessionId: 'testSessionId',
            channelId: 'testChannelId',
            inviteCode: 'testInviteCode'
        };
        this.initData = {
            sessionId: 'testSessionId',
            channelId: 'testChannelId',
            deviceType: ti_1.EndPoint.CLIENT
        };
        this.sessionId = 'testSessionId';
        this.channelId = 'testChannelId';
        this.flowChannel = this.getFlowChannel(this.sessionId, this.channelId);
        this.interactChannel = this.getInteractChannel(this.sessionId, this.channelId);
        this.sessionData = {
            sessionId: this.sessionId,
            channelId: this.channelId,
            flowChannel: this.flowChannel,
            interactChannel: this.interactChannel,
            deviceType: ti_1.EndPoint.CLIENT
        };
    }
    addSessionInfo(testContainer) {
    }
    addSessionData(testContainer) {
        testContainer === null || testContainer === void 0 ? void 0 : testContainer.register(injection_index_1.ParameterKeys.SESSIONID, { useValue: this.sessionId });
        testContainer === null || testContainer === void 0 ? void 0 : testContainer.register(injection_index_1.ParameterKeys.INITDATA, { useValue: this.initData });
        testContainer === null || testContainer === void 0 ? void 0 : testContainer.register(injection_index_1.ParameterKeys.FLOWCHANNEL, { useValue: this.flowChannel });
        testContainer === null || testContainer === void 0 ? void 0 : testContainer.register(injection_index_1.ParameterKeys.INTERACTCHANNEL, { useValue: this.interactChannel });
        testContainer === null || testContainer === void 0 ? void 0 : testContainer.register(injection_index_1.ParameterKeys.SESSIONDATA, { useValue: this.sessionData });
        return testContainer;
    }
    addFlowListener(testContainer) {
        const flowListener = testContainer.resolve(TestFlowListener);
        return testContainer.registerInstance(injection_index_1.ParameterKeys.FLOWLISTENER, flowListener);
    }
    addEventListener(testContainer) {
        const eventListener = testContainer.resolve(TestEventListener);
        return testContainer.registerInstance(injection_index_1.ParameterKeys.EVENTLISTNER, eventListener);
    }
    getFlowListener(testContainer) {
        return testContainer.resolve(TestFlowListener);
    }
    addUtils(testContainer) {
        const util = testContainer.resolve(ti_1.UtilService);
        return testContainer.registerInstance(injection_index_1.ParameterKeys.UTIL, util);
    }
    getFlowChannel(sessionId, channelId) {
        return sessionId + '.' + channelId;
    }
    getInteractChannel(sessionId, channelId) {
        return 'comm:' + sessionId + '.' + channelId;
    }
    addCommunicationHandlerFromFactory(testContainer) {
        const factory = testContainer.resolve(ti.CommunicationFactory);
        const communicationhandler = factory.getCommunicationHandler(ti.Transporter.SOCKET, testContainer, transport_protocol_interface_1.Mode.FLOW);
        return testContainer.registerInstance(injection_index_1.ParameterKeys.COMMUNICATION_HANDLER, communicationhandler);
    }
};
TestUtil = __decorate([
    tsyringe_1.injectable()
], TestUtil);
exports.TestUtil = TestUtil;
let TestFlowListener = class TestFlowListener {
    constructor() {
    }
    flowUpdate(event) {
        return new Promise((resolve, reject) => {
            try {
                console.log('flowUpdate executed');
                resolve();
            }
            catch (error) {
                console.log('error while resolving promise' + JSON.stringify(error));
                reject(error);
            }
        });
    }
    flowOperationError(event) {
        console.log('flowOperationError executed');
    }
    flowExitedWithError(event) {
        console.log('flowOperationError executed');
    }
    taskUpdate(event) {
        return new Promise((resolve, reject) => {
            try {
                console.log('taskUpdate executed');
                resolve();
            }
            catch (error) {
                console.log('error while resolving promise' + JSON.stringify(error));
                reject(error);
            }
        });
    }
    flowConnected(event) {
        console.log('flowConnected executed');
    }
    flowDisconnected(event) {
        console.log('flowConnected executed');
    }
    taskIsComplete(event) {
        return new Promise((resolve, reject) => {
            try {
                console.log('taskIsComplete executed');
                resolve();
            }
            catch (error) {
                console.log('error while resolving promise' + JSON.stringify(error));
                reject(error);
            }
        });
    }
    stageIsComplete(event) {
        return new Promise((resolve, reject) => {
            try {
                console.log('stageIsComplete executed');
                resolve();
            }
            catch (error) {
                console.log('error while resolving promise' + JSON.stringify(error));
                reject(error);
            }
        });
    }
    flowIsComplete(event) {
        return new Promise((resolve, reject) => {
            try {
                console.log('flowIsComplete executed');
                resolve();
            }
            catch (error) {
                console.log('error while resolving promise' + JSON.stringify(error));
                reject(error);
            }
        });
    }
};
TestFlowListener = __decorate([
    tsyringe_1.injectable()
], TestFlowListener);
exports.TestFlowListener = TestFlowListener;
let TestEventListener = class TestEventListener {
    constructor() {
    }
    connected(data) {
        console.log('Event listener - connected executed');
    }
    listenEvent(data) {
        console.log('Event listener - listenEvent executed');
    }
    disconnected() {
        console.log('Event listener- disconnected executed');
    }
    listenTaskComplete(data) {
        console.log('Event listener - listenTaskComplete executed');
    }
    listenStageComplete(data) {
        console.log('Event listener - listenStageComplete executed');
    }
    listenFlowComplete(data) {
        console.log('Event listener - listenFlowComplete executed');
    }
};
TestEventListener = __decorate([
    tsyringe_1.injectable()
], TestEventListener);
exports.TestEventListener = TestEventListener;
//# sourceMappingURL=testutil.js.map
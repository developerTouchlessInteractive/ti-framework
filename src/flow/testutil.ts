import { DependencyContainer, injectable } from "tsyringe";
import { SdkNotificationData } from "../models/data.model";
import { ParameterKeys } from "./injection.index";
import { FlowListener, UtilService, EndPoint, SessionData } from "../ti";
import { CommunicationHandler, DataAddress, EventListener, Mode } from "../flow/transport/transport.protocol.interface";
import * as ti from '../ti'

@injectable()
export class TestUtil {
    registerData = {
        sessionId: 'testSessionId',
        customerChannel: 'testChannelId'
    }
    sessionInfo = {
        sessionId: 'testSessionId',
        channelId: 'testChannelId',
        inviteCode: 'testInviteCode'
    }
    initData: DataAddress = {
        sessionId: 'testSessionId',
        channelId: 'testChannelId',
        deviceType: EndPoint.CLIENT
    };
    sessionId = 'testSessionId'
    channelId = 'testChannelId';

    flowChannel = this.getFlowChannel(this.sessionId, this.channelId);
    interactChannel = this.getInteractChannel(this.sessionId, this.channelId);

    sessionData: SessionData = {
        sessionId: this.sessionId,
        channelId: this.channelId,
        flowChannel: this.flowChannel,
        interactChannel: this.interactChannel,
        deviceType: EndPoint.CLIENT
    }
    constructor() { }

    addSessionInfo(testContainer:DependencyContainer){

    }

    addSessionData(testContainer: DependencyContainer) {
        testContainer?.register(ParameterKeys.SESSIONID, { useValue: this.sessionId });
        testContainer?.register(ParameterKeys.INITDATA, { useValue: this.initData });
        testContainer?.register(ParameterKeys.FLOWCHANNEL, { useValue: this.flowChannel });
        testContainer?.register(ParameterKeys.INTERACTCHANNEL, { useValue: this.interactChannel });
        testContainer?.register(ParameterKeys.SESSIONDATA, { useValue: this.sessionData })
        return testContainer
    }

    addFlowListener(testContainer: DependencyContainer){
        const flowListener = testContainer.resolve(TestFlowListener)
        return testContainer.registerInstance(ParameterKeys.FLOWLISTENER,flowListener)
    }

    addEventListener(testContainer: DependencyContainer){
        const eventListener = testContainer.resolve(TestEventListener)
        return testContainer.registerInstance(ParameterKeys.EVENTLISTNER, eventListener)
    }
    getFlowListener(testContainer: DependencyContainer){
        return testContainer.resolve(TestFlowListener)
    }

    addUtils(testContainer: DependencyContainer){
        const util = testContainer.resolve(UtilService)
        return testContainer.registerInstance(ParameterKeys.UTIL, util)
    }

    getFlowChannel(sessionId: string, channelId: string) {
        return sessionId + '.' + channelId
    }


    getInteractChannel(sessionId: string, channelId: string) {
        return 'comm:' + sessionId + '.' + channelId
    }

    addCommunicationHandlerFromFactory(testContainer: DependencyContainer){
        const factory: ti.CommunicationFactory = testContainer.resolve(ti.CommunicationFactory)
        const communicationhandler: CommunicationHandler = factory.getCommunicationHandler(ti.Transporter.SOCKET, testContainer, Mode.FLOW)!
        return testContainer.registerInstance(ParameterKeys.COMMUNICATION_HANDLER, communicationhandler)
    }
} 
@injectable()
export class TestFlowListener implements FlowListener {
    constructor(){
    }

    flowUpdate(event?: ti.ResponseData | SdkNotificationData): Promise<void> {
            return new Promise((resolve, reject) => {
              try {
                console.log('flowUpdate executed')
                resolve()
              } catch (error) {
                console.log('error while resolving promise' + JSON.stringify(error))
                reject(error)
              }
            })
        
    }
    flowOperationError(event?: ti.ResponseData | SdkNotificationData): void {
        console.log('flowOperationError executed')    
    }
    flowExitedWithError(event?: ti.ResponseData): void {
        console.log('flowOperationError executed')  
        }
    taskUpdate(event?: ti.ResponseData): Promise<void> {
            return new Promise((resolve, reject) => {
              try {
                  console.log('taskUpdate executed') 
                resolve()
              } catch (error) {
                console.log('error while resolving promise' + JSON.stringify(error))
                reject(error)
              }
            })
    }
    flowConnected(event?: ti.ResponseData): void {
        console.log('flowConnected executed') 
    }
    flowDisconnected(event?: ti.ResponseData): void {
        console.log('flowConnected executed') 
    }
    taskIsComplete(event?: ti.ResponseData): Promise<void> {
            return new Promise((resolve, reject) => {
              try {
                  console.log('taskIsComplete executed') 
                resolve()
              } catch (error) {
                console.log('error while resolving promise' + JSON.stringify(error))
                reject(error)
              }
            })
        
        }
    stageIsComplete(event?: ti.ResponseData): Promise<void> {
            return new Promise((resolve, reject) => {
              try {
                  console.log('stageIsComplete executed') 
                resolve()
              } catch (error) {
                console.log('error while resolving promise' + JSON.stringify(error))
                reject(error)
              }
            })
        
    }
    flowIsComplete(event?: ti.ResponseData): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                console.log('flowIsComplete executed')
                resolve()
            } catch (error) {
                console.log('error while resolving promise' + JSON.stringify(error))
                reject(error)
            }
        })
        }

}

@injectable()
export class TestEventListener implements EventListener{

    constructor() {
    }
    connected(data?: any) {
        console.log('Event listener - connected executed')
    }
    listenEvent(data?: any) {
        console.log('Event listener - listenEvent executed')
    }
    disconnected() {
        console.log('Event listener- disconnected executed')
    }
    listenTaskComplete(data?: any) {
        console.log('Event listener - listenTaskComplete executed')
    }
    listenStageComplete(data?: any) {
        console.log('Event listener - listenStageComplete executed')
        }
    listenFlowComplete(data?: any) {
        console.log('Event listener - listenFlowComplete executed')
        }

}
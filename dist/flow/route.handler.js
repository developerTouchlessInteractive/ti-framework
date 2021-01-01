"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteHandler = void 0;
const tsyringe_1 = require("tsyringe");
const injection_index_1 = require("./injection.index");
let RouteHandler = class RouteHandler {
    constructor(sessionData, routeConfig, flowState, flowListener) {
        this.sessionData = sessionData;
        this.routeConfig = routeConfig;
        this.flowState = flowState;
        this.flowListener = flowListener;
    }
    getCurrentTask() {
        return this.currentTask ? this.currentTask : undefined;
    }
    isCurrentTask(reference) {
        var _a;
        return (((_a = this.getCurrentTask()) === null || _a === void 0 ? void 0 : _a.uniqueReference) === reference);
    }
    updateTaskComplete(uniqueReference) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.updateTaskLedger(uniqueReference);
                yield this.updateTaskStateForProgress(uniqueReference);
                yield this.isAnyStageComplete();
                yield this.isFlowComplete();
                yield this.calculateNextTask();
                yield this.reportNextTaskPath();
                resolve();
            }
            catch (error) {
                reject();
            }
        }));
    }
    /**
    * use this method to determine what task should be enabled next
    * @param order <order comes from flowSateService.ts>
    */
    calculateNextTask() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const order = this.flowState.taskLedger.sort((a, b) => (a.order > b.order) ? 1 : -1);
                if (order.every(task => task.isCompleted)) {
                    this.currentTask = undefined;
                }
                else {
                    this.currentTask = order[order.findIndex(task => !task.isCompleted)];
                    if (this.currentTask) {
                        const index = this.routeConfig.routes.findIndex(x => x.controllerName === this.currentTask.controllerName);
                        if (index > -1) {
                            const path = this.routeConfig.routes[index].path;
                            this.currentTask.path = path ? path : undefined;
                        }
                    }
                }
                resolve();
            }
            catch (error) {
                reject();
            }
        }));
    }
    reportNextTaskPath() {
        return new Promise((resolve, reject) => {
            if (this.currentTask) {
                if (this.currentTask.path.length <= 0) {
                    reject();
                }
                this.flowListener.nextTaskPath(this.currentTask.path, this.currentTask.uniqueReference);
            }
            resolve();
        });
    }
    isAnyStageComplete() {
        return new Promise((resolve, reject) => {
            try {
                this.flowState.stageStates.forEach((stage_state) => __awaiter(this, void 0, void 0, function* () {
                    if (!stage_state.isCompleted) {
                        const isStageComplete = stage_state.taskStates.every(x => x.isCompleted === true);
                        if (isStageComplete) {
                            yield this.updateStageState(stage_state.uniqueReference);
                        }
                    }
                }));
                resolve();
            }
            catch (error) {
                reject();
            }
        });
    }
    updateTaskLedger(ref) {
        return new Promise((resolve, reject) => {
            try {
                const task = this.flowState.taskLedger.find(x => x.uniqueReference === ref);
                if (task)
                    task.isCompleted = true;
                resolve();
            }
            catch (error) {
                reject();
            }
        });
    }
    updateTaskStateForProgress(reference) {
        return new Promise((resolve, reject) => {
            try {
                this.flowState.stageStates.find(stage => {
                    const task = stage.taskStates.find(task => task.uniqueReference === reference);
                    if (task)
                        task.isCompleted = true;
                });
                resolve();
            }
            catch (error) {
                reject();
            }
        });
    }
    updateStageState(reference) {
        return new Promise((resolve, reject) => {
            try {
                const stage = this.flowState.stageStates.find(x => x.uniqueReference === reference);
                if (stage)
                    stage.isCompleted = true;
                resolve();
            }
            catch (error) {
                reject();
            }
        });
    }
    updateFlowState() {
        return new Promise((resolve, reject) => {
            try {
                this.flowState.isCompleted = true;
                resolve();
            }
            catch (error) {
                reject();
            }
        });
    }
    isFlowComplete() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const isFlowComplete = this.flowState.stageStates.every(stage => stage.isCompleted === true);
                if (isFlowComplete)
                    yield this.updateFlowState();
                resolve(isFlowComplete);
            }
            catch (error) {
                reject();
            }
        }));
    }
};
RouteHandler = __decorate([
    tsyringe_1.injectable(),
    __param(0, tsyringe_1.inject(injection_index_1.ParameterKeys.SESSIONDATA)),
    __param(1, tsyringe_1.inject(injection_index_1.ParameterKeys.ROUTECONFIG)),
    __param(2, tsyringe_1.inject(injection_index_1.ParameterKeys.FLOW_STATE)),
    __param(3, tsyringe_1.inject(injection_index_1.ParameterKeys.FLOWLISTENER))
], RouteHandler);
exports.RouteHandler = RouteHandler;
//# sourceMappingURL=route.handler.js.map
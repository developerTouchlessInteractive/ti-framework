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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const ti = __importStar(require("../ti"));
const flow_manager_1 = require("./flow.manager");
const testutil_1 = require("./testutil");
const ti_errors_1 = require("../errors/ti.errors");
const testContainer = tsyringe_1.container.createChildContainer();
beforeAll(() => {
    ti.setEnv(ti.local_serverUrl, ti.EnvType.DEBUG, ti.interact_local_serverUrl);
    const testUtil = testContainer.resolve(testutil_1.TestUtil);
    testUtil.addSessionData(testContainer);
    testUtil.addEventListener(testContainer);
    testUtil.addCommunicationHandlerFromFactory(testContainer);
    testUtil.addFlowListener(testContainer);
    testUtil.addUtils(testContainer);
});
describe('test flow manager ti', () => {
    const type = ti.CustomerEvent;
    it('sendTaskPayloadToServer() should reject undefined inputs with 1001', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const flowMgr = testContainer.resolve(flow_manager_1.FlowManager);
            const result = yield flowMgr.sendTaskPayloadToServer(undefined, undefined);
        }
        catch (error) {
            console.log(JSON.stringify(error));
            expect(error.code).toEqual(1001);
            expect(error.message).toEqual(ti_errors_1.ErrorMesssages.UNABLE_TO_EMIT_PAYLOAD);
        }
    }));
});
//# sourceMappingURL=flow.manager.spec.js.map
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
const ti_1 = require("../ti");
const ti = __importStar(require("../ti"));
const testutil_1 = require("../flow/testutil");
describe('test Util ti', () => {
    const type = ti.CustomerEvent;
    it('getEventResponseData() should reject undefined inputs with 5001', () => __awaiter(void 0, void 0, void 0, function* () {
        const testCont = tsyringe_1.container.createChildContainer();
        try {
            const testUtil = testCont.resolve(testutil_1.TestUtil);
            // console.log('test util serv container' + JSON.stringify(testUtil))
            testUtil.addSessionData(testCont);
            const util = testCont.resolve(ti_1.UtilService);
            const result = yield util.getEventResponseData(type, undefined);
            testCont.reset();
        }
        catch (error) {
            testCont.reset();
            console.log(JSON.stringify(error));
            expect(error.code).toEqual(5001);
        }
    }));
    it('getCommunicationData() should reject undefined inputs with 5001', () => __awaiter(void 0, void 0, void 0, function* () {
        const testCont = tsyringe_1.container.createChildContainer();
        try {
            const testUtil = testCont.resolve(testutil_1.TestUtil);
            testUtil.addSessionData(testCont);
            const util = testCont.resolve(ti_1.UtilService);
            const result = yield util.getCommunicationData(undefined);
            testCont.reset();
        }
        catch (error) {
            testCont.reset();
            console.log(JSON.stringify(error));
            expect(error.code).toEqual(5001);
        }
    }));
});
//# sourceMappingURL=ti-util.spec.js.map
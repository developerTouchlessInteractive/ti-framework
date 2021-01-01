import * as ti from "../../ti";
import { Flow } from '../../models/ti.models';
declare class FlowClient {
    /**
     *
     * @param name name of the flow
     * @param stages stages included in the flow, provide as string array of stageIds
     * @param hostCanAbort optional -> an option for host to abort this flow.
     */
    createFlow(name: string, stages: string[], hostCanAbort?: Boolean): Promise<ti.Response>;
    getFlowById(id: string): Promise<unknown>;
    getFlowDetailById(id: string): Promise<String>;
    getAllFlows(): Promise<Flow[]>;
    deleteFlow(id: string): Promise<unknown>;
}
export { FlowClient as TiFlow };
//# sourceMappingURL=ticlient-flow.d.ts.map
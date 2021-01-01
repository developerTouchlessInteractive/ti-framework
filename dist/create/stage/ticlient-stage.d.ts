import * as ti from '../../ti';
declare class StageClient {
    /**
     * Creating a Stage
     * @param name provide a name for this stage
     * @param tasks list of tasks(task-ids) this stage should execute
     * @param canSkip option to skip for customer
     * @param hostConsentToProceed once stage is complete does this stage require a consent from the host
     */
    createStage(name: string, tasks: string[], canSkip: Boolean, hostConsentToProceed: Boolean): Promise<ti.Response>;
    getStageById(id: string): Promise<unknown>;
    getStageDetailById(id: string): Promise<String>;
    getAllStages(): Promise<ti.Stage[]>;
    deleteStage(id: string): Promise<unknown>;
}
export { StageClient as TiStage };
//# sourceMappingURL=ticlient-stage.d.ts.map
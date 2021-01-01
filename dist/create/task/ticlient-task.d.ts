import * as ti from '../../ti';
export declare class TaskClient {
    /**
    *
    * @param name name of the task
    * @param resource url or file or any other resource definition for the task to load/present to user
    * @param userAction type of user-action ex: accepting/denying a terms&condition case
    * @param userInput user provided input type, ex: signature or form input etc..,
    */
    createTask(name: string, controller_name: string, resource: string, userAction: ti.UserAction, userInput: ti.UserInput): Promise<ti.Response>;
    getTaskById(id: string): Promise<unknown>;
    getAllTasks(): Promise<ti.Task[]>;
    deleteTask(id: string): Promise<unknown>;
}
export { TaskClient as TiTask };
//# sourceMappingURL=ticlient-task.d.ts.map
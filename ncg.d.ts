interface INCGCore {
    init: any;
    config: Record<string, unknown> | null;
    pagination: {
        paginate: (taskId: string, payload: Record<string, any>) => any;
    };
}
declare const NCGCore: INCGCore;

export { NCGCore as default };

import { Ctx } from './types';
interface MemoizedRecords {
    offset: string;
    results: any[];
    taskId: string;
}
export declare const pagination: (ctx: Ctx) => {
    paginate: (taskId: string, payload: {
        type: string;
        pageNumber: string;
    }) => Promise<MemoizedRecords | {
        data: any;
        error: null;
        results?: undefined;
    } | {
        results: never[];
        error: string;
        data?: undefined;
    }>;
};
export {};

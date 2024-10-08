import { Ctx } from "./types";
export declare const pagination: (ctx: Ctx) => {
    paginate: (taskId: string, payload: {
        type: string;
        pageNumber: string;
    }) => Promise<{
        data: any;
        error: null;
        results?: undefined;
    } | {
        results: never[];
        error: string;
        data?: undefined;
    }>;
};

import { Ctx } from './types';
export declare const Config: (context: Ctx) => {
    load: (siteId: string) => Promise<any>;
};

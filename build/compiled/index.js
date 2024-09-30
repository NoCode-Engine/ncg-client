// @ts-ignore
import { axios } from '@bundled-es-modules/axios';
import { Config } from './config';
import { pagination } from './pagination';
const NCGCore = (() => {
    let websiteId = '';
    const httpClient = axios.create({ timeout: 60000 });
    const ctx = {
        httpClient,
    };
    const config = Config(ctx);
    return {
        init: async (siteId) => {
            websiteId = siteId;
            NCGCore.config = await config.load(siteId); // TODO - Catch, log and rethrow error if config cannot be loaded
            ctx.websiteId = siteId;
        },
        config: null,
        pagination: pagination(ctx),
    };
})();
export default NCGCore;
//# sourceMappingURL=index.js.map
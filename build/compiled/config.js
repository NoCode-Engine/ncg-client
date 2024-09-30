// @ts-ignore
import { NCG_BASE_URL } from 'process.env';
export const Config = (context) => {
    return {
        load: async (siteId) => {
            if (!siteId)
                throw new Error('missing siteId, please provide one!');
            const { data } = await context.httpClient.get(`${NCG_BASE_URL}/scripts/${siteId}`);
            return data;
        },
    };
};
//# sourceMappingURL=config.js.map
// @ts-ignore
import { NCG_BASE_URL } from 'process.env';
export const pagination = (ctx) => {
    const records = {};
    return {
        paginate: async (taskId, payload) => {
            console.log({ records, taskId, payload }, 'entering function');
            if (records[payload.pageNumber] != null) {
                return { data: records[payload.pageNumber], error: null };
            }
            let offset = null;
            if (payload.pageNumber !== '1') {
                let newPageNum = Number.parseInt(payload.pageNumber, 10);
                --newPageNum;
                if (records[newPageNum.toString()]) {
                    offset = records[newPageNum.toString()].offset;
                }
            }
            const data = {
                type: 'pagination',
            };
            if (offset) {
                data.pageNumber = offset;
            }
            console.log({ newRecord: records, data }, 'calling API');
            try {
                const res = await ctx.httpClient.post(`${NCG_BASE_URL}/tasks/${taskId}`, data, {
                    headers: {
                        'X-AppId': ctx.websiteId,
                    },
                });
                const response = res.data;
                if (!records[payload.pageNumber]) {
                    records[payload.pageNumber] = response;
                }
                return { data: response, error: null };
            }
            catch (e) {
                // TODO - Log error remotely so user can see it on dashboard
                return { results: [], error: 'Error occurred fetching data' };
            }
        },
    };
};
//# sourceMappingURL=pagination.js.map
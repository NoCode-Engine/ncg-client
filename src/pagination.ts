import { Ctx } from './types';
// @ts-ignore
import { NCG_BASE_URL } from 'process.env';

interface MemoizedRecords {
  offset: string;
  results: any[];
  taskId: string;
}

export const pagination = (ctx: Ctx) => {
  const records: Record<string, MemoizedRecords> = {};
  return {
    paginate: async (taskId: string, payload: { type: string; pageNumber: string }) => {
      console.log({ records, taskId, payload }, 'entering function');
      if (records[payload.pageNumber] != null) {
        return records[payload.pageNumber];
      }

      let offset = null;
      if (payload.pageNumber !== '1') {
        let newPageNum = Number.parseInt(payload.pageNumber, 10);
        --newPageNum;
        if (records[newPageNum.toString()]) {
          offset = records[newPageNum.toString()].offset;
        }
      }
      const data: any = {
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
      } catch (e) {
        // TODO - Log error remotely so user can see it on dashboard
        return { results: [], error: 'Error occurred fetching data' };
      }
    },
  };
};

// @ts-ignore
import { NCG_BASE_URL } from 'process.env';
import { Ctx } from './types';

export const Config = (context: Ctx) => {
  return {
    load: async (siteId: string) => {
      if (!siteId) throw new Error('missing siteId, please provide one!');
      const { data } = await context.httpClient.get(`${NCG_BASE_URL}/scripts/${siteId}`);
      return data;
    },
  };
};

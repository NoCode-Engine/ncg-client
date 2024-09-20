// @ts-ignore
import { NCG_BASE_URL } from 'process.env';
import { Ctx } from './types';

export const Config = (context: Ctx) => {
  return {
    load: async () => {
      const { data } = await context.httpClient.get(`${NCG_BASE_URL}/scripts/73dec9e6-8ac6-4fac-894b-02bacf271bc4`);
      console.log({ data });
      return data;
    },
  };
};
